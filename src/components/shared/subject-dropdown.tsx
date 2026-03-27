import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
const subjects = [
  { label: 'Mathematics', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'English', value: 'english' },
];

type SubjectDropdownProps = {
  value?: string;
  onSubjectChange?: (value: string) => void;
};
export default function SubjectDropdown({
  value,
  onSubjectChange,
}: SubjectDropdownProps) {
  return (
    <Select value={value ?? ''} onValueChange={onSubjectChange}>
      <SelectTrigger className="w-45 bg-card rounded-full">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>

      <SelectContent>
        {subjects.map(s => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
