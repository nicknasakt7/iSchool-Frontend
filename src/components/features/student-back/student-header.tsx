'use client';

import FilterDropdown from '@/components/shared/filter-dropdown';
import SearchInput from '@/components/shared/search-input';

type StudentsHeaderProps = {
  onGradeChange?: (value: string) => void;
  onClassroomChange?: (value: string) => void;
  onSubjectChange?: (value: string) => void;
  subject?: string;
  onSearch?: (value: string) => void;
};

const grades = [
  { label: 'All Grades', value: 'all' },
  { label: 'P.1', value: 'P.1' },
  { label: 'P.2', value: 'P.2' },
];

export default function StudentsHeader({
  onSearch,
  onGradeChange,
}: StudentsHeaderProps) {
  const classrooms = null;

  return (
    <div className="flex flex-col gap-4">
      {/* 🔥 TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Student Directory</h1>

        <div className="flex gap-3">
          <FilterDropdown
            label="All Grades"
            options={grades}
            onChange={onGradeChange}
          />
          <FilterDropdown label="All Classrooms" options={classrooms} />
        </div>
      </div>

      {/* 🔥 SEARCH */}
      <SearchInput
        placeholder="Search students..."
        className="md:w-80"
        onSearch={onSearch}
      />
    </div>
  );
}
