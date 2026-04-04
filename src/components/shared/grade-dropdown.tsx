import FilterDropdown from '@/components/shared/filter-dropdown';
import { Grade } from '@/lib/api/grade/grade.type';

type GradeDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
  grades?: Grade[];
  isLoading?: boolean;
};

export default function GradeDropdown({
  value,
  onChange,
  grades,
  isLoading,
}: GradeDropdownProps) {
  const options = [
    { label: 'All Grades', value: 'all' },
    ...(grades ?? []).map(g => ({
      label: g.name,
      value: g.id,
    })),
  ];

  return (
    <FilterDropdown
      label="Grade"
      value={value ?? 'all'}
      options={options}
      onChange={onChange}
      disabled={isLoading}
    />
  );
}
