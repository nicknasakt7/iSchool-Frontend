'use client';

import { useState, useMemo } from 'react';
import AssessmentsHeader from '@/components/features/assessments/assessments-header';
import ClassPerformanceSummary from '@/components/features/assessments/class-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import StudentPerformanceCard from '@/components/features/assessments/studentPerformance-card';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { ScoreTemplateItem } from '@/lib/api/assessment/assessment.type';

// Using TanStack Query for mutation/query lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useAssessmentConfig } from '@/lib/api/assessment/hooks/useAssessmentConfig';
import { useUpsertConfig } from '@/lib/api/assessment/hooks/useUpsertConfig';
import { useApplyAssessment } from '@/lib/api/assessment/hooks/useApplyAssessment';
import { useDeleteConfig } from '@/lib/api/assessment/hooks/useDeleteConfig';
import { useSubjectAssignment } from '@/lib/api/assessment/hooks/useSubjectAssignment';

/* ================= HELPERS ================= */

const computeGrade = (total: number): string => {
  if (total >= 80) return 'A';
  if (total >= 70) return 'B';
  if (total >= 60) return 'C';
  if (total >= 50) return 'D';
  return 'F';
};

const getTotalMax = (template: ScoreTemplateItem[]) =>
  template.reduce((sum, item) => sum + item.max, 0);

// Derive academic term from current month: May–Oct → 1, Nov–Apr → 2
const getCurrentTerm = () => {
  const month = new Date().getMonth() + 1;
  return month >= 5 && month <= 10 ? 1 : 2;
};

const DEFAULT_TEMPLATE: ScoreTemplateItem[] = [
  { label: 'Midterm', max: 30 },
  { label: 'Final', max: 30 },
];

/* ================= PAGE ================= */

export default function AssessmentsPage() {
  /* --- filter state --- */
  const [gradeId, setGradeId] = useState('all');
  const [classroomId, setClassroomId] = useState('all');
  const [subjectId, setSubjectId] = useState('');
  const [search, setSearch] = useState('');

  // Term and year are fixed to the current academic period
  const [term] = useState<number>(() => getCurrentTerm());
  const [year] = useState<number>(() => new Date().getFullYear());

  // Local template — editable by the user before config exists on the server.
  // Once configExists is true, the server template (configTemplate) takes over.
  const [localTemplate, setLocalTemplate] =
    useState<ScoreTemplateItem[]>(DEFAULT_TEMPLATE);

  // True after user successfully applies config in this session.
  // On page refresh, configExists from the server takes over.
  const [justApplied, setJustApplied] = useState(false);

  // IMPORTANT:
  // Students are fetched independently from scores.
  // Scores may or may not exist yet.
  const [studentScores, setStudentScores] = useState<Record<string, number[]>>(
    {},
  );

  /* ================= DATA FETCHING ================= */

  const { data: grades, isLoading: isLoadingGrades } = useGrades();

  const { data: classrooms } = useClassrooms(
    gradeId === 'all' ? undefined : { gradeId },
  );

  const shouldFetch = classroomId !== 'all';

  // Config fetch requires both classroomId AND subjectId
  const shouldFetchConfig = shouldFetch && subjectId !== '';

  // Single source of truth for students — reuses existing useStudents hook
  const { data: studentsData, isLoading: isLoadingStudents } = useStudents(
    { classId: classroomId === 'all' ? undefined : classroomId },
    { enabled: shouldFetch },
  );

  // Fetch existing assessment config for this class + subject + term + year
  const { data: configData } = useAssessmentConfig(
    shouldFetchConfig ? { classroomId, subjectId, term, year } : null,
  );

  // Fetch subjectAssignmentId as soon as classroom + subject are selected,
  // even before any config exists (fixes greyed-out Apply button on first setup)
  const { data: subjectAssignmentData } = useSubjectAssignment(
    shouldFetchConfig ? { classroomId, subjectId } : null,
  );

  /* ================= DERIVED FROM SERVER DATA ================= */
  // These are derived directly — no useEffect / no setState needed.

  // True when the backend already has a config for this class+subject+term+year
  const configExists = (configData?.length ?? 0) > 0;

  // subjectAssignmentId is required for upsert and apply mutations.
  // Prefer the value from configData (already loaded), fallback to the
  // dedicated find endpoint for fresh setups where no config exists yet.
  const subjectAssignmentId =
    configData?.[0]?.subjectAssignmentId ?? subjectAssignmentData?.id ?? null;

  // Template derived from server config — read-only, used when configExists
  const configTemplate = useMemo(
    (): ScoreTemplateItem[] =>
      configData?.map(item => ({
        id: item.id,
        label: item.name,
        max: item.maxScore,
      })) ?? [],
    [configData],
  );

  // Active template: server config when it exists, local editable state otherwise
  const scoreTemplate = configExists ? configTemplate : localTemplate;

  // Template is "applied" if server already has a config OR user just applied in this session
  const templateApplied = configExists || justApplied;

  /* ================= MUTATIONS ================= */

  // Step 1: save the score template config to the backend
  const { mutate: upsertConfig, isPending: isUpserting } = useUpsertConfig();

  // Step 2: apply the saved config to the class (creates per-student score records)
  const { mutate: applyAssessment, isPending: isApplying } =
    useApplyAssessment();

  // Delete a single score config item (and all linked student score records)
  const { mutate: deleteConfig } = useDeleteConfig();

  const isSaving = isUpserting || isApplying;

  /* ================= DERIVED ================= */

  const students = studentsData?.data ?? [];

  const filteredStudents = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalMax = getTotalMax(scoreTemplate);
  const nextTotal = totalMax + 10;

  // Business rule:
  // Total max score must be exactly 100 before applying
  const isInvalidTotal = totalMax !== 100;

  /* ================= HANDLERS — filters ================= */

  const resetLocalState = () => {
    setJustApplied(false);
    setStudentScores({});
    setLocalTemplate(DEFAULT_TEMPLATE);
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
  // These only modify localTemplate — they have no effect when configExists is true
  // because scoreTemplate points to configTemplate in that case.

  const handleTemplateChange = (
    index: number,
    field: keyof ScoreTemplateItem,
    value: string,
  ) => {
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
      // Remove the corresponding score index from every student's record
      setStudentScores(prev => {
        const updated: Record<string, number[]> = {};
        Object.entries(prev).forEach(([sid, scores]) => {
          updated[sid] = scores.filter((_, i) => i !== index);
        });
        return updated;
      });
    };

    if (item.id) {
      // Item exists on backend — delete it there first, then update local state
      deleteConfig(item.id, { onSuccess: applyLocalRemove });
    } else {
      // Local-only item — just remove from state
      applyLocalRemove();
    }
  };

  /* ================= HANDLERS — apply to class ================= */

  const handleApplyToClass = () => {
    if (!shouldFetch || isInvalidTotal || !subjectAssignmentId) return;

    // Step 1: upsert config — backend requires subjectAssignmentId + term + year
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
          // Sync backend ids into localTemplate so future edits carry the correct ids
          setLocalTemplate(
            configs.map(c => ({ id: c.id, label: c.name, max: c.maxScore })),
          );

          // Step 2: apply config to class — creates ScoreItem records per student
          applyAssessment(
            { subjectAssignmentId, classroomId, subjectId, term, year },
            {
              onSuccess: () => {
                // Initialize zeros only for students that don't have scores yet
                setStudentScores(prev => {
                  const next = { ...prev };
                  students.forEach(s => {
                    if (!next[s.id]) next[s.id] = Array(configs.length).fill(0);
                  });
                  return next;
                });
                setJustApplied(true);
              },
            },
          );
        },
      },
    );
  };

  /* ================= HANDLERS — scores ================= */

  const handleScoreChange = (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => {
    const student = filteredStudents[studentIndex];
    if (!student) return;

    // Optimistic local update; StudentPerformanceCard persists via useUpdateScoreItem
    setStudentScores(prev => {
      const existing = prev[student.id] ?? Array(scoreTemplate.length).fill(0);
      const updated = [...existing];
      updated[scoreIndex] = value;
      return { ...prev, [student.id]: updated };
    });
  };

  /* ================= UI ================= */

  // CASE 1: No config → editable template builder + Apply button
  // CASE 2: Config exists, no scores fetched yet → template (read-only) + student cards with zeros
  // CASE 3: Config exists + scores loaded → student cards with real scores

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
      />

      {/* PLACEHOLDER — no classroom selected */}
      {!shouldFetch && (
        <p className="text-center text-muted-foreground py-6">
          Please select a classroom to begin
        </p>
      )}

      {/* TEMPLATE BUILDER (CASE 1 & 2) */}
      {shouldFetch && (
        <div className="bg-card rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <p className="text-lg font-semibold">
              {configExists ? 'Assessment Group' : 'Create Assessment Group'}
            </p>
            <p className="text-sm text-muted-foreground">
              {configExists
                ? 'Config already applied to this class'
                : 'Create once and apply scoring to the entire class'}
            </p>
          </div>

          {/* Total score counter + validation warning (only shown in create mode) */}
          {!configExists && (
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
                {/* Remove button — only visible in create mode */}
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
                  onChange={e =>
                    handleTemplateChange(i, 'label', e.target.value)
                  }
                />

                <Input
                  type="number"
                  value={item.max}
                  disabled={templateApplied}
                  onChange={e => handleTemplateChange(i, 'max', e.target.value)}
                />
              </div>
            ))}

            {/* Add button — only shown in create mode */}
            {!configExists && (
              <button
                onClick={addTemplate}
                disabled={nextTotal > 100 || templateApplied}
                className={`w-40 h-24 border-dashed border rounded-xl flex flex-col items-center justify-center
                  ${
                    nextTotal > 100 || templateApplied
                      ? 'opacity-40 cursor-not-allowed'
                      : 'text-muted-foreground hover:bg-muted'
                  }
                `}
              >
                <Plus /> Add score
              </button>
            )}
          </div>

          {/* Apply button — only shown when config does not exist yet */}
          {!configExists && (
            <div className="flex items-center justify-end gap-3">
              {/* Business rule: Total max score must be exactly 100 before applying */}
              {isInvalidTotal && !justApplied && (
                <p className="text-sm text-destructive font-medium">
                  Total must equal 100 to apply
                </p>
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
                    : 'Apply to Class'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* STUDENT LIST (CASE 2 & 3) — shown when template is applied */}
      {shouldFetch && templateApplied && (
        <>
          {isLoadingStudents && (
            <p className="text-center">Loading students...</p>
          )}

          {!isLoadingStudents && (
            <>
              <p className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} students
              </p>

              <div className="space-y-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s, i) => {
                    const scores = scoreTemplate.map((t, idx) => ({
                      label: t.label,
                      max: t.max,
                      // Fallback to 0 — scores are loaded after a GET /scores endpoint is added
                      score: studentScores[s.id]?.[idx] ?? 0,
                      // scoreItemId will be populated once a GET /scores endpoint
                      // returns ScoreItem.id per student — required by PATCH /score-item
                      scoreItemId: undefined as string | undefined,
                    }));
                    const total = scores.reduce(
                      (sum, item) => sum + item.score,
                      0,
                    );
                    return (
                      <StudentPerformanceCard
                        key={s.id}
                        studentId={s.id}
                        name={`${s.firstName} ${s.lastName}`}
                        nickname={s.nickName}
                        scores={scores}
                        total={total}
                        grade={computeGrade(total)}
                        subjectId={subjectId}
                        term={term}
                        year={year}
                        studentIndex={i}
                        onScoreChange={handleScoreChange}
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
