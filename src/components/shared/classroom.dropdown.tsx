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
  const options = [
    { label: 'All', value: 'all' },
    ...(classrooms ?? []).map(c => ({
      label: c.name,
      value: c.id,
    })),
  ];

  // ถ้ามีแค่ All (ไม่มี classroom จริง) → ไม่ต้องโชว์
  if (options.length <= 1) return null;

  return (
    <FilterDropdown
      label="Classroom"
      value={value ?? 'all'}
      options={options}
      onChange={onChange}
    />
  );
}
