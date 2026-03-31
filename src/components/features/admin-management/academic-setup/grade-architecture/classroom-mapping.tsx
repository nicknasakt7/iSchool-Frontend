import { Button } from '@/components/ui/button';
import MappingRow from './mapping-row';
import { Pen, Plus } from 'lucide-react';

type Mapping = {
  grade: string;
  classroom: string;
};

type ClassroomMappingProps = {
  grades: string[];
  mappings: Mapping[];
  onAdd: () => void;
  onUpdate: (index: number, key: keyof Mapping, value: string) => void;
  onDelete: (index: number) => void;
  onSave: () => void;
  onEdit: () => void;
  isSaved: boolean;
};

export default function ClassroomMapping({
  grades,
  mappings,
  onAdd,
  onUpdate,
  onDelete,
  onSave,
  onEdit,
  isSaved,
}: ClassroomMappingProps) {
  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Classroom Mapping</h3>

      {mappings.map((m, i) => (
        <MappingRow
          key={i}
          data={m}
          grades={grades}
          disabled={isSaved}
          onChange={(k, v) => onUpdate(i, k, v)}
          onDelete={() => onDelete(i)}
        />
      ))}

      <button
        disabled={isSaved}
        onClick={onAdd}
        className="flex items-center gap-2 text-blue-600"
      >
        <Plus size={16} /> Add New Mapping
      </button>

      <div className="flex justify-end pt-4">
        {isSaved ? (
          <Button
            variant="secondary"
            onClick={onEdit}
            className="flex gap-2 px-6 py-3 rounded-full border border-blue-500 text-blue-500"
          >
            <Pen /> Edit Configuration
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button variant="outline">Discard</Button>
            <Button
              onClick={onSave}
              className="px-6 py-3 rounded-full bg-blue-600 text-white"
            >
              Save Configuration
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
