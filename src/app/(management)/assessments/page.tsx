'use client';

import { useState } from 'react';
import AssessmentsHeader from '@/components/features/assessments/assessments-header';
import { mockStudents } from '@/components/mocks/assessment-student';
import ClassPerformanceSummary from '@/components/features/assessments/class-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import StudentPerformanceCard from '@/components/features/assessments/studentPerformance-card';

/* ================= TYPES ================= */
type ScoreTemplate = {
  label: string;
  max: number;
};

export default function AssessmentsPage() {
  const [grade, setGrade] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');

  /* ================= TEMPLATE ================= */
  const [scoreTemplate, setScoreTemplate] = useState<ScoreTemplate[]>([
    { label: 'Homework', max: 10 },
    { label: 'Quiz', max: 20 },
  ]);

  /* ================= HELPER ================= */
  const getTotalMax = (template: ScoreTemplate[]) =>
    template.reduce((sum, item) => sum + item.max, 0);

  const totalMax = getTotalMax(scoreTemplate);
  const nextTotal = totalMax + 10;

  /* ================= TEMPLATE HANDLER ================= */
  const handleTemplateChange = (
    index: number,
    field: keyof ScoreTemplate,
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

  /* ================= APPLY ================= */
  const applyTemplateToStudents = () => {
    if (totalMax > 100) return;

    setStudents(prev =>
      prev.map(student => ({
        ...student,
        scores: scoreTemplate.map(t => ({
          label: t.label,
          max: t.max,
          score: 0,
        })),
        total: 0,
      })),
    );
  };

  /* ================= SCORE ================= */
  const handleScoreChange = (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => {
    setStudents(prev => {
      const updated = [...prev];

      updated[studentIndex].scores[scoreIndex].score = value;

      const total = updated[studentIndex].scores.reduce(
        (sum, s) => sum + s.score,
        0,
      );

      updated[studentIndex].total = total;

      return updated;
    });
  };

  /* ================= FILTER ================= */
  const filteredStudents = students.filter(student => {
    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      (student.nickname || '').toLowerCase().includes(search.toLowerCase());

    return (
      (!grade || student.grade === grade) &&
      (!classroom || student.classroom === classroom) &&
      (!subject || student.subject === subject) &&
      (!search || matchSearch)
    );
  });

  /* ================= UI ================= */
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* HEADER */}
      <AssessmentsHeader
        onGradeChange={setGrade}
        onClassroomChange={setClassroom}
        onSubjectChange={setSubject}
        grade={grade}
        classroom={classroom}
        subject={subject}
        onSearch={setSearch}
      />

      {/* ================= BUILDER ================= */}
      <div className="bg-card rounded-2xl p-6 space-y-6 shadow-sm">
        <div>
          <p className="text-lg font-semibold">Create Assessment Group</p>
          <p className="text-sm text-muted-foreground">
            Create once and apply scoring to the entire class
          </p>
        </div>

        {/* TOTAL */}
        <p className="text-sm text-muted-foreground">
          Total Score: {totalMax} / 100
        </p>

        {/* TEMPLATE ITEMS */}
        <div className="flex flex-wrap gap-4">
          {scoreTemplate.map((item, i) => (
            <div
              key={i}
              className="relative border rounded-xl p-4 w-40 space-y-2 bg-muted/30 overflow-visible"
            >
              <button
                onClick={() => removeTemplate(i)}
                className="absolute rounded-full -top-2 -right-2 bg-cardrounded-full p-1 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 text-new-red-600"
              >
                <X size={14} />
              </button>

              <Input
                value={item.label}
                onChange={e => handleTemplateChange(i, 'label', e.target.value)}
              />

              <Input
                type="number"
                value={item.max}
                onChange={e => handleTemplateChange(i, 'max', e.target.value)}
              />
            </div>
          ))}

          {/* ADD BUTTON */}
          <button
            onClick={addTemplate}
            disabled={nextTotal > 100}
            className={`w-40 h-24 border-dashed border rounded-xl flex flex-col items-center justify-center
              ${
                nextTotal > 100
                  ? 'opacity-40 cursor-not-allowed'
                  : 'text-muted-foreground hover:bg-muted'
              }
            `}
          >
            <Plus /> Add score
          </button>
        </div>

        {/* APPLY */}
        <div className="flex justify-end">
          <Button onClick={applyTemplateToStudents}>Apply to Class</Button>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredStudents.length} Students
      </p>

      <div className="space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((s, i) => (
            <StudentPerformanceCard
              key={i}
              {...s}
              studentIndex={i}
              onScoreChange={handleScoreChange}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-10">
            No content
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <ClassPerformanceSummary />
    </div>
  );
}
