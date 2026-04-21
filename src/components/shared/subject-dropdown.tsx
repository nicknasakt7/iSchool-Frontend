import { useSubjectsByClassroom } from '@/lib/api/subjects/hooks/useSubjectsByClassroom';
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
  classroomId?: string;
};

export default function SubjectDropdown({
  value,
  onSubjectChange,
  classroomId,
}: SubjectDropdownProps) {
  const { data, isLoading } = useSubjectsByClassroom(
    classroomId && classroomId !== 'all' ? classroomId : undefined,
  );

  // Deduplicate by subjectId — a subject may be assigned multiple times
  const seen = new Set<string>();
  const subjects = (data ?? [])
    .filter(a => {
      if (seen.has(a.subject.id)) return false;
      seen.add(a.subject.id);
      return true;
    })
    .map(a => ({
      assignmentId: a.id,
      label: a.subject.name,
      value: a.subject.id,
    }));

  if (!classroomId || classroomId === 'all') return null;

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading subjects...</p>;

  if (subjects.length === 0) return null;

  return (
    <Select value={value ?? ''} onValueChange={onSubjectChange}>
      <SelectTrigger className="w-45 bg-card rounded-full">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map(s => (
          <SelectItem key={s.assignmentId} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
