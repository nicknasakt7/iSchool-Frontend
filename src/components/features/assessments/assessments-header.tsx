'use client';

import FilterDropdown from '@/components/shared/filter-dropdown';
import SearchInput from '@/components/shared/search-input';
import SubjectDropdown from '@/components/shared/subject-dropdown';

type assessmentsHeaderProps = {
  onGradeChange?: (value: string) => void;
  onClassroomChange?: (value: string) => void;
  onSubjectChange?: (value: string) => void;
  onSearch?: (value: string) => void;

  grade?: string;
  classroom?: string;
  subject?: string;
};

export default function AssessmentsHeader({
  onSearch,
  classroom,
  grade,
  onSubjectChange,
  subject,
  onGradeChange,
  onClassroomChange,
}: assessmentsHeaderProps) {
  const grades = [
    { label: 'P.1', value: '2' },
    { label: 'P.2', value: '10' },
  ];

  const classrooms = [{ label: '1', value: '1' }];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔥 TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Assessments</h1>
      </div>
      <SearchInput
        placeholder="Find student by name or student ID..."
        onSearch={onSearch}
      />

      {/* 🔥 FILTER ROW */}
      <div className="flex flex-wrap gap-4">
        {/* Grade */}
        <FilterDropdown
          label="Select Grade"
          options={grades}
          value={grade}
          onChange={onGradeChange}
        />

        <FilterDropdown
          label="Select Classroom"
          options={classrooms}
          value={classroom}
          onChange={onClassroomChange}
        />

        <SubjectDropdown value={subject} onSubjectChange={onSubjectChange} />
      </div>
    </div>
  );
}
