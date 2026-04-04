'use client';
import SearchInput from '@/components/shared/search-input';
import SubjectDropdown from '@/components/shared/subject-dropdown';
import GradeDropdown from './grade-dropdown';

import { useState } from 'react';
import { useGrades } from '@/lib/api/classroom/hooks/useGrade';
import ClassroomDropdown from './classroom.dropdown';

type Props = {
  onSearch?: (value: string) => void;
  onSubjectChange?: (value: string) => void;
  onGradeChange?: (value: string) => void;
  onClassroomChange?: (value: string) => void;
};

export default function FilterBar({
  onSearch,
  onSubjectChange,
  onGradeChange,
  onClassroomChange,
}: Props) {
  const { data: grades } = useGrades();

  console.log('gradessssssssss', grades);
  const [gradeId, setGradeId] = useState<string>();

  const selectedGrade = grades?.find(g => g.id === gradeId);
  const classrooms = selectedGrade?.classrooms ?? [];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/*  Search */}
      <SearchInput onSearch={onSearch} />

      {/* Subject */}
      <SubjectDropdown onSubjectChange={onSubjectChange} />

      {/*  Grade */}
      <GradeDropdown
        value={gradeId}
        grades={grades}
        onChange={v => {
          setGradeId(v);
          onGradeChange?.(v);
        }}
      />

      {/*  Classroom (auto hide) */}
      <ClassroomDropdown classrooms={classrooms} onChange={onClassroomChange} />
    </div>
  );
}
