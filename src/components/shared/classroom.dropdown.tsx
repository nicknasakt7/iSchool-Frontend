import { Classroom } from '@/lib/api/classroom/classroom.type';
import FilterDropdown from './filter-dropdown';

type ClassroomDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
  classrooms?: Classroom[] | null;
};

export default function ClassroomDropdown({
  value,
  onChange,
  classrooms,
}: ClassroomDropdownProps) {
  const options = classrooms?.map(c => ({
    label: c.name,
    value: c.id,
  }));

  // ไม่มี classroom = ไม่โชว์เลย
  if (!options?.length) return null;

  return (
    <FilterDropdown
      label="Classroom"
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}
