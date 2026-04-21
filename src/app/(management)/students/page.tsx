'use client';
import StudentsHeader from '@/components/features/student-back/student-header';
import StudentsList from '@/components/features/student-back/student-list';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import { useState } from 'react';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('all');
  const [page, setPage] = useState(1);
  const [classId, setClassId] = useState('all');

  const debouncedSearch = useDebounce(search, 500);
  const shouldFetch = classId !== 'all';

  const { data: grades, isLoading: isLoadingGrades } = useGrades();

  //  ยิงเฉพาะตอนเลือก grade
  const { data: classrooms } = useClassrooms(
    grade === 'all' ? undefined : { gradeId: grade },
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleGrade = (value: string) => {
    setGrade(value);
    setClassId('all');
    setPage(1);
  };

  const handleClass = (value: string) => {
    setClassId(value);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <StudentsHeader
        onSearch={handleSearch}
        onGradeChange={handleGrade}
        onClassChange={handleClass}
        grades={grades}
        isLoadingGrades={isLoadingGrades}
        classrooms={classrooms}
        gradeValue={grade}
        classValue={classId}
      />

      <StudentsList
        search={debouncedSearch}
        grade={grade}
        page={page}
        setPage={setPage}
        classId={classId}
        shouldFetch={shouldFetch}
      />
    </div>
  );
}
