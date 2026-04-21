import { Classroom } from '@/lib/api/classroom/classroom.type';
import FilterDropdown from './filter-dropdown';

type ClassroomDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
  classrooms?: Classroom[] | null;
};

function classroomLabel(c: Classroom): string {
  if (!c.term) return c.name;
  return `${c.name} · เทอม ${c.term}`;
}

export default function ClassroomDropdown({
  value,
  onChange,
  classrooms,
}: ClassroomDropdownProps) {
  const options = [
    { label: 'All', value: 'all' },
    ...(classrooms ?? []).map(c => ({
      label: classroomLabel(c),
      value: c.id,
    })),
  ];

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
