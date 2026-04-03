import { Trash2 } from 'lucide-react';

type Mapping = {
  grade: string;
  classroom: string;
};

type MappingRowProps = {
  data: Mapping;
  grades: string[];
  onChange: (key: keyof Mapping, value: string) => void;
  onDelete: () => void;
  disabled?: boolean;
};

export default function MappingRow({
  data,
  grades,
  onChange,
  onDelete,
  disabled = false,
}: MappingRowProps) {
  return (
    <div className="flex gap-3">
      <select
        disabled={disabled}
        value={data.grade}
        onChange={(e) => onChange('grade', e.target.value)}
        className="p-2 rounded-lg bg-muted"
      >
        {grades.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      <input
        disabled={disabled}
        value={data.classroom}
        onChange={(e) => onChange('classroom', e.target.value)}
        className="flex-1 p-2 rounded-lg bg-muted"
        placeholder="Classroom"
      />

      <button disabled={disabled} onClick={onDelete}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
