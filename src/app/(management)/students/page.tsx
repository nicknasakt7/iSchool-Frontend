'use client';

import MainHeader from '@/components/features/dashboard/main-header';
import StudentsHeader from '@/components/features/student-back/student-header';
import StudentsList from '@/components/features/student-back/student-list';

import { useState } from 'react';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('all');

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <MainHeader />
      <StudentsHeader onSearch={setSearch} onGradeChange={setGrade} />
      <StudentsList search={search} grade={grade} />
    </div>
  );
}
