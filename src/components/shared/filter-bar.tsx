'use client';
import SearchInput from '@/components/shared/search-input';
import AllSubjectsDropdown from '@/components/shared/all-subjects-dropdown';
import GradeDropdown from './grade-dropdown';

import { useState } from 'react';

import ClassroomDropdown from './classroom.dropdown';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';

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

  const [gradeId, setGradeId] = useState<string>();
  const [subjectValue, setSubjectValue] = useState('all');

  const selectedGrade = grades?.find(g => g.id === gradeId);
  const classrooms = selectedGrade?.classrooms ?? [];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/*  Search */}
      <SearchInput onSearch={onSearch} />

      {/* Subject — all subjects for teacher filtering */}
      <AllSubjectsDropdown
        value={subjectValue}
        onChange={v => {
          setSubjectValue(v);
          onSubjectChange?.(v === 'all' ? '' : v);
        }}
      />

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
