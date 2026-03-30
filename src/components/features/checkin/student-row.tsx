import { Button } from '@/components/ui/button';

type StudentRowProps = {
  student: {
    id: string;
    name: string;
  };
  selected: 'present' | 'absent' | null;
  onSelect: (id: string, value: 'present' | 'absent') => void;
};

export default function StudentRow({
  student,
  selected,
  onSelect,
}: StudentRowProps) {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-2xl shadow-sm">
      {/* left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-xs text-muted-foreground">ID: #{student.id}</p>
        </div>
      </div>

      {/* right */}
      <div className="flex gap-2">
        {/* Present */}
        <Button
          onClick={() => onSelect(student.id, 'present')}
          className={`
            rounded-full px-4
            ${selected === 'present' ? 'opacity-70' : ''}
          `}
        >
          Present
        </Button>

        {/* Absent */}
        <Button
          onClick={() => onSelect(student.id, 'absent')}
          className={`
            rounded-full px-4
            ${selected === 'absent' ? 'bg-red-600 text-white' : ''}
          `}
          variant="outline"
        >
          Absent
        </Button>
      </div>
    </div>
  );
}
