'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Status = 'all' | 'contacted' | 'waiting';

type StatusFilterProps = {
  status?: Status;
  grade?: string;
  onStatusChange?: (value: Status) => void;
  onGradeChange?: (value: string) => void;
};

export default function StatusFilter({
  status = 'all',
  grade = 'all',
  onStatusChange,
  onGradeChange,
}: StatusFilterProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Status Select */}
      <Select
        value={status}
        onValueChange={(value: Status) => onStatusChange?.(value)}
      >
        <SelectTrigger className="w-35 rounded-full bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="waiting">Waiting</SelectItem>
        </SelectContent>
      </Select>

      {/* Grade Select */}
      <Select value={grade} onValueChange={value => onGradeChange?.(value)}>
        <SelectTrigger className="w-35 rounded-full bg-card">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Grades</SelectItem>
          <SelectItem value="P.1">P.1</SelectItem>
          <SelectItem value="P.2">P.2</SelectItem>
          <SelectItem value="P.3">P.3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
