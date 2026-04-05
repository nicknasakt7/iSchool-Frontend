'use client';

import GradeDropdown from '@/components/shared/grade-dropdown';
import ClassroomDropdown from '@/components/shared/classroom.dropdown';
import SearchInput from '@/components/shared/search-input';
import SubjectDropdown from '@/components/shared/subject-dropdown';
import { Grade } from '@/lib/api/grade/grade.type';
import { Classroom } from '@/lib/api/classroom/classroom.type';

type AssessmentsHeaderProps = {
  onGradeChange?: (value: string) => void;
  onClassroomChange?: (value: string) => void;
  onSubjectChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  grade?: string;
  classroom?: string;
  subject?: string;
  grades?: Grade[];
  classrooms?: Classroom[] | null;
  isLoadingGrades?: boolean;
};

export default function AssessmentsHeader({
  onSearch,
  onGradeChange,
  onClassroomChange,
  onSubjectChange,
  grade,
  classroom,
  subject,
  grades,
  classrooms,
  isLoadingGrades,
}: AssessmentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Assessments</h1>
      </div>

      <SearchInput
        placeholder="Find student by name or student ID..."
        onSearch={onSearch}
      />

      <div className="flex flex-wrap gap-4">
        <GradeDropdown
          value={grade}
          grades={grades}
          onChange={onGradeChange}
          isLoading={isLoadingGrades}
        />

        <ClassroomDropdown
          value={classroom}
          classrooms={classrooms}
          onChange={onClassroomChange}
        />

        <SubjectDropdown value={subject} onSubjectChange={onSubjectChange} />
      </div>
    </div>
  );
}
