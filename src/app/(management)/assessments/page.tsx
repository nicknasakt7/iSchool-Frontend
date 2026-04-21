'use client';

import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AssessmentsHeader from '@/components/features/assessments/assessments-header';
import ClassPerformanceSummary from '@/components/features/assessments/class-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Sparkles } from 'lucide-react';
import StudentPerformanceCard from '@/components/features/assessments/studentPerformance-card';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { ScoreTemplateItem } from '@/lib/api/assessment/assessment.type';
import { useAcademic } from '@/lib/context/academic-context';

import { useFullAssessment } from '@/lib/api/assessment/hooks/useFullAssessment';
import { useUpsertConfig } from '@/lib/api/assessment/hooks/useUpsertConfig';
import { useApplyAssessment } from '@/lib/api/assessment/hooks/useApplyAssessment';
import { useDeleteConfig } from '@/lib/api/assessment/hooks/useDeleteConfig';
import { useSubjectAssignment } from '@/lib/api/assessment/hooks/useSubjectAssignment';
import { useConfigSuggestions } from '@/lib/api/assessment/hooks/useConfigSuggestions';

/* ================= HELPERS ================= */

const DEFAULT_TEMPLATE: ScoreTemplateItem[] = [
  { label: 'Midterm', max: 30 },
  { label: 'Final', max: 30 },
];

const getTotalMax = (template: ScoreTemplateItem[]) =>
  template.reduce((sum, item) => sum + item.max, 0);

/* ================= PAGE ================= */

export default function AssessmentsPage() {
  const { year, term } = useAcademic();
  const queryClient = useQueryClient();

  /* --- filter state --- */
  const [gradeId, setGradeId] = useState('all');
  const [classroomId, setClassroomId] = useState('all');
  const [subjectId, setSubjectId] = useState('');
  const [search, setSearch] = useState('');

  const [localTemplate, setLocalTemplate] =
    useState<ScoreTemplateItem[]>(DEFAULT_TEMPLATE);
  const [justApplied, setJustApplied] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);

  /* ================= DATA FETCHING ================= */

  const { data: grades, isLoading: isLoadingGrades } = useGrades();
  const { data: classrooms } = useClassrooms(
    gradeId === 'all' ? undefined : { gradeId },
  );

  const shouldFetch = classroomId !== 'all';
  const shouldFetchConfig = shouldFetch && subjectId !== '';

  // Full assessment: configs + all students with real scoreItemIds
  const { data: fullData, isLoading: isLoadingFull } = useFullAssessment(
    shouldFetchConfig ? { classroomId, subjectId, term, year } : null,
  );

  // Fetch subjectAssignmentId for fresh setups (no config yet)
  const { data: subjectAssignmentData } = useSubjectAssignment(
    shouldFetchConfig ? { classroomId, subjectId } : null,
  );

  /* ================= DERIVED FROM SERVER DATA ================= */

  const configExists = (fullData?.configs?.length ?? 0) > 0;

  const subjectAssignmentId =
    fullData?.configs?.[0]?.id != null
      ? subjectAssignmentData?.id ?? null
      : subjectAssignmentData?.id ?? null;

  const configTemplate = useMemo(
    (): ScoreTemplateItem[] =>
      fullData?.configs?.map(c => ({
        id: c.id,
        label: c.name,
        max: c.maxScore,
      })) ?? [],
    [fullData],
  );

  const scoreTemplate = (configExists && !isEditingConfig) ? configTemplate : localTemplate;

  /* ================= MUTATIONS ================= */

  const { mutate: upsertConfig, isPending: isUpserting } = useUpsertConfig();
  const { mutate: applyAssessment, isPending: isApplying } = useApplyAssessment();
  const { mutate: deleteConfig } = useDeleteConfig();

  const isSaving = isUpserting || isApplying;

  /* ================= DERIVED ================= */

  const students = fullData?.students ?? [];

  // true only when at least one student already has real score items
  const scoresApplied = students.length > 0 && students.some(s => s.scores.length > 0);

  // templateApplied = ซ่อน Apply button และ lock template fields
  const templateApplied = (configExists && scoresApplied && !isEditingConfig) || justApplied;

  // Suggestions from past configs of the same subject (fetch only when no config yet)
  const { data: suggestions = [] } = useConfigSuggestions(
    shouldFetchConfig && !configExists && !isEditingConfig ? subjectId : undefined,
  );

  const filteredStudents = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalMax = getTotalMax(scoreTemplate);
  const nextTotal = totalMax + 10;
  const isInvalidTotal = totalMax !== 100;

  /* ================= HANDLERS — filters ================= */

  const resetLocalState = () => {
    setJustApplied(false);
    setLocalTemplate(DEFAULT_TEMPLATE);
    setIsEditingConfig(false);
  };

  const invalidateFullAssessment = () => {
    queryClient.invalidateQueries({ queryKey: ['full-assessment'] });
  };

  const handleGradeChange = (value: string) => {
    setGradeId(value);
    setClassroomId('all');
    resetLocalState();
  };

  const handleClassroomChange = (value: string) => {
    setClassroomId(value);
    resetLocalState();
  };

  const handleSubjectChange = (value: string) => {
    setSubjectId(value);
    resetLocalState();
  };

  /* ================= HANDLERS — template (local only) ================= */

  const handleTemplateChange = (
    index: number,
    field: keyof ScoreTemplateItem,
    value: string,
  ) => {
    const item = scoreTemplate[index];

    // If editing an existing config item — check if any student has scores entered
    if (item.id && isEditingConfig) {
      const hasScores = students.some(s =>
        s.scores.some(si => si.configId === item.id && si.value > 0),
      );
      if (hasScores) {
        const confirmed = window.confirm(
          `"${item.label}" มีการกรอกคะแนนไปแล้ว การแก้ไขช่องนี้จะลบคะแนนที่กรอกไปทั้งหมด ยืนยันหรือไม่?`,
        );
        if (!confirmed) return;
      }
    }

    setLocalTemplate(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === 'label' ? value : Number(value),
      };
      if (getTotalMax(updated) > 100) return prev;
      return updated;
    });
  };

  const addTemplate = () => {
    setLocalTemplate(prev => {
      const updated = [...prev, { label: 'New', max: 10 }];
      if (getTotalMax(updated) > 100) return prev;
      return updated;
    });
  };

  const removeTemplate = (index: number) => {
    if (
      !window.confirm(
        'Remove this score item? Student scores for this item will be permanently deleted.',
      )
    )
      return;

    const item = scoreTemplate[index];

    const applyLocalRemove = () => {
      setLocalTemplate(prev => prev.filter((_, i) => i !== index));
      invalidateFullAssessment();
    };

    if (item.id) {
      deleteConfig(item.id, { onSuccess: applyLocalRemove });
    } else {
      setLocalTemplate(prev => prev.filter((_, i) => i !== index));
    }
  };

  /* ================= HANDLERS — edit existing config ================= */

  const handleStartEdit = () => {
    setLocalTemplate(configTemplate); // copy server config into local editable state
    setIsEditingConfig(true);
  };

  const handleCancelEdit = () => {
    setLocalTemplate(configTemplate);
    setIsEditingConfig(false);
  };

  /* ================= HANDLERS — apply to class ================= */

  const handleApplyToClass = () => {
    if (!shouldFetch || isInvalidTotal || !subjectAssignmentId) return;

    upsertConfig(
      {
        subjectAssignmentId,
        term,
        year,
        items: scoreTemplate.map((item, index) => ({
          id: item.id,
          name: item.label,
          maxScore: item.max,
          order: index,
        })),
      },
      {
        onSuccess: configs => {
          setLocalTemplate(
            configs.map(c => ({ id: c.id, label: c.name, max: c.maxScore })),
          );

          applyAssessment(
            { subjectAssignmentId, classroomId, subjectId, term, year },
            {
              onSuccess: () => {
                setJustApplied(true);
                setIsEditingConfig(false);
                invalidateFullAssessment();
              },
            },
          );
        },
      },
    );
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* HEADER */}
      <AssessmentsHeader
        grade={gradeId}
        classroom={classroomId}
        subject={subjectId}
        grades={grades}
        classrooms={classrooms}
        isLoadingGrades={isLoadingGrades}
        onGradeChange={handleGradeChange}
        onClassroomChange={handleClassroomChange}
        onSubjectChange={handleSubjectChange}
        onSearch={setSearch}
        term={term}
        year={year}
        hasClassroom={shouldFetch}
        hasSubject={shouldFetchConfig}
      />

      {/* PLACEHOLDER — no classroom selected */}
      {!shouldFetch && (
        <p className="text-center text-muted-foreground py-6">
          Please select a classroom to begin
        </p>
      )}

      {/* TEMPLATE BUILDER */}
      {shouldFetchConfig && (
        <div className="bg-card rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold">
                {configExists ? 'Assessment Group' : 'Create Assessment Group'}
              </p>
              <p className="text-sm text-muted-foreground">
                {templateApplied && !isEditingConfig
                  ? 'Config already applied to this class'
                  : isEditingConfig
                    ? 'Editing config — changes will re-apply to all students'
                    : configExists && !scoresApplied
                      ? 'Config created — click Apply to Class to assign scores to students'
                      : 'Create once and apply scoring to the entire class'}
              </p>
            </div>
            {templateApplied && !isEditingConfig && (
              <Button variant="outline" size="sm" onClick={handleStartEdit}>
                Edit Config
              </Button>
            )}
          </div>

          {/* Suggestions — only when creating fresh (no scores applied yet) */}
          {!templateApplied && !isEditingConfig && suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={12} className="text-primary" />
                ใช้รูปแบบจากวิชานี้ที่เคยสร้างไว้
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setLocalTemplate(
                        s.items.map(item => ({ label: item.name, max: item.maxScore })),
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Sparkles size={11} />
                    {s.items.map(item => `${item.name} ${item.maxScore}`).join(' · ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(!templateApplied || isEditingConfig) && (
            <div className="space-y-1">
              <p
                className={`text-sm font-medium ${
                  isInvalidTotal ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                Total Score: {totalMax} / 100
              </p>
              {totalMax < 100 && (
                <p className="text-sm font-medium text-destructive">
                  Total score must equal 100
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {scoreTemplate.map((item, i) => (
              <div
                key={i}
                className="relative border rounded-xl p-4 w-40 space-y-2 bg-muted/30 overflow-visible"
              >
                <button
                  onClick={() => removeTemplate(i)}
                  disabled={templateApplied}
                  className="absolute rounded-full -top-2 -right-2 bg-card p-1 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 text-destructive disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <X size={14} />
                </button>

                <Input
                  value={item.label}
                  disabled={templateApplied}
                  onChange={e => handleTemplateChange(i, 'label', e.target.value)}
                />

                <Input
                  type="number"
                  value={item.max}
                  disabled={templateApplied}
                  onChange={e => handleTemplateChange(i, 'max', e.target.value)}
                />
              </div>
            ))}

            {(!templateApplied || isEditingConfig) && (
              <button
                onClick={addTemplate}
                disabled={nextTotal > 100}
                className={`w-40 h-24 border-dashed border rounded-xl flex flex-col items-center justify-center
                  ${nextTotal > 100
                    ? 'opacity-40 cursor-not-allowed'
                    : 'text-muted-foreground hover:bg-muted'}
                `}
              >
                <Plus /> Add score
              </button>
            )}
          </div>

          {(!templateApplied || isEditingConfig) && (
            <div className="flex items-center justify-end gap-3">
              {isInvalidTotal && !justApplied && (
                <p className="text-sm text-destructive font-medium">
                  Total must equal 100 to apply
                </p>
              )}
              {isEditingConfig && (
                <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleApplyToClass}
                disabled={
                  justApplied ||
                  isSaving ||
                  isInvalidTotal ||
                  !subjectAssignmentId
                }
              >
                {isSaving
                  ? 'Saving...'
                  : justApplied
                    ? 'Applied ✔'
                    : isEditingConfig
                      ? 'Save Changes'
                      : 'Apply to Class'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* STUDENT LIST */}
      {shouldFetchConfig && templateApplied && (
        <>
          {isLoadingFull && (
            <p className="text-center text-muted-foreground py-6">Loading students...</p>
          )}

          {!isLoadingFull && (
            <>
              <p className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} students
              </p>

              <div className="space-y-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s, i) => {
                    // Map config items → real scoreItems with actual scoreItemId and value
                    const scores = scoreTemplate.map(t => {
                      const scoreItem = s.scores.find(si => si.configId === t.id);
                      return {
                        label: t.label,
                        max: t.max,
                        score: scoreItem?.value ?? 0,
                        scoreItemId: scoreItem?.scoreItemId,
                      };
                    });

                    return (
                      <StudentPerformanceCard
                        key={s.id}
                        studentId={s.id}
                        name={`${s.firstName} ${s.lastName}`}
                        nickName={s.nickName ?? undefined}
                        profileImageUrl={s.profileImageUrl}
                        scores={scores}
                        subjectId={subjectId}
                        term={term}
                        year={year}
                        studentIndex={i}
                      />
                    );
                  })
                ) : (
                  <p className="text-center text-muted-foreground py-10">
                    No students found
                  </p>
                )}
              </div>

              <ClassPerformanceSummary classroomId={classroomId} term={term} year={year} />
            </>
          )}
        </>
      )}
    </div>
  );
}
