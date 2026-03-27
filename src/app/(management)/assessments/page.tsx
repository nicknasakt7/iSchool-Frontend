'use client';

import { useState } from 'react';
import AssessmentsHeader from '@/components/features/assessments/assessments-header';
import MainHeader from '@/components/features/dashboard/main-header';
import { mockStudents } from '@/components/mocks/assessment-student';
import StudentPerformanceCard from '@/components/features/assessments/student0performance-card';
import ClassPerformanceSummary from '@/components/features/assessments/class-summary';

export default function AssessmentsPage() {
  const [grade, setGrade] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');

  const handleScoreChange = (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => {
    setStudents(prev => {
      const updated = [...prev];

      updated[studentIndex].scores[scoreIndex].score = value;

      // 💥 recompute total
      const total = updated[studentIndex].scores.reduce(
        (sum, s) => sum + s.score,
        0,
      );

      updated[studentIndex].total = total;

      return updated;
    });
  };

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
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <MainHeader />
      <AssessmentsHeader
        onGradeChange={setGrade}
        onClassroomChange={setClassroom}
        onSubjectChange={setSubject}
        grade={grade}
        classroom={classroom}
        subject={subject}
        onSearch={setSearch}
      />

      {/* 🔥 debug ดูก่อน */}
      <div className="text-sm text-muted-foreground">
        grade: {grade} | classroom: {classroom} | subject: {subject}
      </div>
      {/* count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredStudents.length} Students
      </p>
      {/* list */}
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

      <ClassPerformanceSummary />
    </div>
  );
}
