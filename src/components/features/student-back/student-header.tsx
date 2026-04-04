import ClassroomDropdown from '@/components/shared/classroom.dropdown';
import GradeDropdown from '@/components/shared/grade-dropdown';
import SearchInput from '@/components/shared/search-input';
import { Classroom } from '@/lib/api/classroom/classroom.type';
import { Grade } from '@/lib/api/grade/grade.type';

type StudentsHeaderProps = {
  onGradeChange?: (value: string) => void;
  onClassChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  grades?: Grade[];
  classrooms?: Classroom[] | null;
  isLoadingGrades?: boolean;
};

export default function StudentsHeader({
  onSearch,
  onGradeChange,
  onClassChange,
  grades,
  classrooms,
  isLoadingGrades,
}: StudentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Student Directory</h1>

        <div className="flex gap-3">
          <GradeDropdown grades={grades} onChange={onGradeChange} isLoading={isLoadingGrades} />

          <ClassroomDropdown classrooms={classrooms} onChange={onClassChange} />
        </div>

        <SearchInput
          placeholder="Search students..."
          className="md:w-80"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}
