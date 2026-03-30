'use client';

import { Button } from '@/components/ui/button';

type Status = 'all' | 'phoned' | 'waiting';

type GradeFiltersProps = {
  status: Status;
  grade: string;
  onStatusChange: (value: Status) => void;
  onGradeChange: (value: string) => void;
};

export default function GradeFilters({
  status,
  grade,
  onStatusChange,
  onGradeChange,
}: GradeFiltersProps) {
  const statusOptions: Status[] = ['all', 'phoned', 'waiting'];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/*  Status Filter */}
      <div className="flex gap-2 bg-muted p-1 rounded-full">
        {statusOptions.map(s => {
          const isActive = status === s;

          return (
            <Button
              key={s}
              variant={isActive ? 'default' : 'ghost'}
              onClick={() => onStatusChange(s)}
              className={`
                rounded-full px-4 capitalize
                transition-all duration-200
                ${isActive ? 'shadow-sm' : 'opacity-70 hover:opacity-100'}
              `}
            >
              {s}
            </Button>
          );
        })}
      </div>

      {/* Grade Filter */}
      <select
        value={grade}
        onChange={e => onGradeChange(e.target.value)}
        className="
          border rounded-full px-4 py-2 text-sm
          bg-card
          focus:outline-none focus:ring-2 focus:ring-primary
          transition-all duration-200
        "
      >
        <option value="all">All Grades</option>
        <option value="P.1">P.1</option>
        <option value="P.2">P.2</option>
      </select>
    </div>
  );
}
