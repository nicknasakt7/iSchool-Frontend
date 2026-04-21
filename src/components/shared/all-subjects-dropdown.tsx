import { useSubjects } from '@/lib/api/subjects/hooks/useSubjects';
import FilterDropdown from './filter-dropdown';

type AllSubjectsDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function AllSubjectsDropdown({ value, onChange }: AllSubjectsDropdownProps) {
  const { data: subjects } = useSubjects();

  const options = [
    { label: 'All Subjects', value: 'all' },
    ...(subjects ?? []).map(s => ({ label: s.name, value: s.id })),
  ];

  return (
    <FilterDropdown
      label="Subject"
      value={value ?? 'all'}
      options={options}
      onChange={onChange}
    />
  );
}
