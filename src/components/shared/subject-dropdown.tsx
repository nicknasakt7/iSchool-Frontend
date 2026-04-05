import { useSubjects } from '@/lib/api/subjects/hooks/useSubjects';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type SubjectDropdownProps = {
  value?: string;
  onSubjectChange?: (value: string) => void;
};

export default function SubjectDropdown({
  value,
  onSubjectChange,
}: SubjectDropdownProps) {
  const { data, isLoading } = useSubjects();

  const subjects = data?.map(s => ({
    label: s.name,
    value: s.id,
  }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Select value={value ?? ''} onValueChange={onSubjectChange}>
      <SelectTrigger className="w-45 bg-card rounded-full">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>

      <SelectContent>
        {subjects?.map(s => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
