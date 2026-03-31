import GradeChip from './grade-chip';
import { Plus } from 'lucide-react';

type Props = {
  grades: string[];
  onAdd: () => void;
  onRemove: (g: string) => void;
  disabled?: boolean;
};

export default function GradeLevels({
  grades,
  onAdd,
  onRemove,
  disabled,
}: Props) {
  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Define Grade Levels</h3>

      <div className="flex flex-wrap gap-2">
        {grades.map(g => (
          <GradeChip
            key={g}
            label={g}
            onRemove={() => onRemove(g)}
            disabled={disabled}
          />
        ))}

        <button
          disabled={disabled}
          onClick={onAdd}
          className="w-10 h-10 border rounded-full flex items-center justify-center"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
