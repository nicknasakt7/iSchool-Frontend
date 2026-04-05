'use client';

import { useState } from 'react';
import AssessmentsHeader from '@/components/features/assessments/assessments-header';
import ClassPerformanceSummary from '@/components/features/assessments/class-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import StudentPerformanceCard from '@/components/features/assessments/studentPerformance-card';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { useCreateAssessmentGroup } from '@/lib/api/assessment/hooks/useCreateAssessmentGroup';
import { ScoreItem } from '@/lib/api/assessment/assessment.type';

/* ================= HELPERS ================= */

const computeGrade = (total: number): string => {
  if (total >= 80) return 'A';
  if (total >= 70) return 'B';
  if (total >= 60) return 'C';
  if (total >= 50) return 'D';
  return 'F';
};

const getTotalMax = (template: ScoreItem[]) =>
  template.reduce((sum, item) => sum + item.max, 0);

/* ================= PAGE ================= */

export default function AssessmentsPage() {
  /* --- filter state --- */
  const [gradeId, setGradeId] = useState('all');
  const [classroomId, setClassroomId] = useState('all');
  const [subjectId, setSubjectId] = useState('');
  const [search, setSearch] = useState('');

  /* --- template state --- */
  const [scoreTemplate, setScoreTemplate] = useState<ScoreItem[]>([
    { label: 'Homework', max: 10 },
    { label: 'Quiz', max: 20 },
  ]);
  const [templateApplied, setTemplateApplied] = useState(false);

  /* --- per-student scores: studentId → score per template item --- */
  const [studentScores, setStudentScores] = useState<Record<string, number[]>>(
    {},
  );

  /* ================= DATA FETCHING ================= */

  const { data: grades, isLoading: isLoadingGrades } = useGrades();

  const { data: classrooms } = useClassrooms(
    gradeId === 'all' ? undefined : gradeId,
  );

  const shouldFetch = classroomId !== 'all';

  const { data: studentsData, isLoading: isLoadingStudents } = useStudents(
    { classId: classroomId === 'all' ? undefined : classroomId },
    { enabled: shouldFetch },
  );

  const { mutate: createGroup, isPending: isCreating } =
    useCreateAssessmentGroup();

  /* ================= DERIVED ================= */

  const students = studentsData?.data ?? [];

  const filteredStudents = students.filter(s =>
    `${s.firstName} ${s.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalMax = getTotalMax(scoreTemplate);
  const nextTotal = totalMax + 10;

  /* ================= HANDLERS — filters ================= */

  const handleGradeChange = (value: string) => {
    setGradeId(value);
    setClassroomId('all');
    setTemplateApplied(false);
    setStudentScores({});
  };

  const handleClassroomChange = (value: string) => {
    setClassroomId(value);
    setTemplateApplied(false);
    setStudentScores({});
  };

  const handleSubjectChange = (value: string) => {
    setSubjectId(value);
  };

  /* ================= HANDLERS — template ================= */

  const handleTemplateChange = (
    index: number,
    field: keyof ScoreItem,
    value: string,
  ) => {
    const updated = [...scoreTemplate];
    updated[index] = {
      ...updated[index],
      [field]: field === 'label' ? value : Number(value),
    };
    if (getTotalMax(updated) > 100) return;
    setScoreTemplate(updated);
  };

  const addTemplate = () => {
    const updated = [...scoreTemplate, { label: 'New', max: 10 }];
    if (getTotalMax(updated) > 100) return;
    setScoreTemplate(updated);
  };

  const removeTemplate = (index: number) => {
    setScoreTemplate(prev => prev.filter((_, i) => i !== index));
  };

  /* ================= HANDLERS — apply to class ================= */

  const handleApplyToClass = () => {
    if (!shouldFetch || totalMax > 100) return;

    createGroup(
      {
        classId: classroomId,
        subjectId: subjectId || undefined,
        items: scoreTemplate,
      },
      {
        onSuccess: () => {
          const initial: Record<string, number[]> = {};
          students.forEach(s => {
            initial[s.id] = Array(scoreTemplate.length).fill(0);
          });
          setStudentScores(initial);
          setTemplateApplied(true);
        },
        onError: () => {
          alert('Failed to save assessment group');
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

    setStudentScores(prev => {
      const existing = prev[student.id] ?? Array(scoreTemplate.length).fill(0);
      const updated = [...existing];
      updated[scoreIndex] = value;
      return { ...prev, [student.id]: updated };
    });
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
      />

      {/* PLACEHOLDER */}
      {!shouldFetch && (
        <p className="text-center text-muted-foreground py-6">
          Please select a classroom to begin
        </p>
      )}

      {/* TEMPLATE BUILDER */}
      {shouldFetch && (
        <div className="bg-card rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <p className="text-lg font-semibold">Create Assessment Group</p>
            <p className="text-sm text-muted-foreground">
              Create once and apply scoring to the entire class
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Total Score: {totalMax} / 100
          </p>

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
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleApplyToClass}
              disabled={templateApplied || isCreating || totalMax === 0}
            >
              {isCreating
                ? 'Saving...'
                : templateApplied
                  ? 'Applied ✔'
                  : 'Apply to Class'}
            </Button>
          </div>
        </div>
      )}

      {/* STUDENT LIST */}
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
                      score: studentScores[s.id]?.[idx] ?? 0,
                    }));
                    const total = scores.reduce(
                      (sum, item) => sum + item.score,
                      0,
                    );
                    return (
                      <StudentPerformanceCard
                        key={s.id}
                        name={`${s.firstName} ${s.lastName}`}
                        nickname={s.nickName}
                        scores={scores}
                        total={total}
                        grade={computeGrade(total)}
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

              <ClassPerformanceSummary />
            </>
          )}
        </>
      )}
    </div>
  );
}
