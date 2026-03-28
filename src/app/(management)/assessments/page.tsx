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

/* ================= PAGE ================= */
export default function AssessmentsPage() {
  const [grade, setGrade] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');

  /* 🔥 template กลาง */
  const [scoreTemplate, setScoreTemplate] = useState<ScoreTemplate[]>([
    { label: 'Homework', max: 10 },
    { label: 'Quiz', max: 20 },
  ]);

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
    setScoreTemplate(updated);
  };

  const addTemplate = () => {
    setScoreTemplate(prev => [...prev, { label: 'New', max: 10 }]);
  };

  const removeTemplate = (index: number) => {
    setScoreTemplate(prev => prev.filter((_, i) => i !== index));
  };

  /* 🔥 apply ให้ทั้ง class */
  const applyTemplateToStudents = () => {
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

        {/* template items */}
        <div className="flex flex-wrap gap-4">
          {scoreTemplate.map((item, i) => (
            <div
              key={i}
              className="relative border rounded-xl p-3 w-40 space-y-2 bg-muted/30"
            >
              <button
                onClick={() => removeTemplate(i)}
                className="absolute top-1 right-1 text-red-500"
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

          {/* add */}
          <button
            onClick={addTemplate}
            className="w-40 h-24 border-dashed border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted/50"
          >
            <Plus />
          </button>
        </div>

        {/* APPLY BUTTON */}
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
