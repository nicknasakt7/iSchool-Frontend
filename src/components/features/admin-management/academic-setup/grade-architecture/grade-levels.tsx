import GradeChip from './grade-chip';
import { Plus, Save } from 'lucide-react';

type GradeLevelsProps = {
  grades: string[];
  onAdd: () => void;
  onRemove: (g: string) => void;
  onSave: () => void; // 🔥 เพิ่ม
  disabled?: boolean;
};

export default function GradeLevels({
  grades,
  onAdd,
  onRemove,
  onSave,
  disabled,
}: GradeLevelsProps) {
  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Define Grade Levels</h3>

      <div className="flex flex-wrap gap-2">
        {grades.map((g) => (
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

      {/* 🔥 SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Save size={16} />
          Save Grades
        </button>
      </div>
    </div>
  );
}
