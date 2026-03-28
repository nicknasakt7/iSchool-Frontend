'use client';

import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

type ScoreTemplate = {
  label: string;
  max: number;
};

type Props = {
  template: ScoreTemplate[];
  setTemplate: (t: ScoreTemplate[]) => void;
};

export default function AssessmentBuilder({ template, setTemplate }: Props) {
  const handleChange = (i: number, field: string, value: string) => {
    const updated = [...template];
    updated[i] = {
      ...updated[i],
      [field]: field === 'label' ? value : Number(value),
    };
    setTemplate(updated);
  };

  const addItem = () => {
    setTemplate([...template, { label: 'New', max: 10 }]);
  };

  const removeItem = (i: number) => {
    setTemplate(template.filter((_, index) => index !== i));
  };

  return (
    <div className="bg-card rounded-2xl p-6 space-y-6">
      <div>
        <p className="text-lg font-semibold">Create Assessment Group</p>
        <p className="text-sm text-muted-foreground">
          Set up scoring criteria once, apply to all students
        </p>
      </div>

      {/* items */}
      <div className="flex flex-wrap gap-4">
        {template.map((item, i) => (
          <div
            key={i}
            className="relative border rounded-xl p-3 w-40 space-y-2"
          >
            <button
              onClick={() => removeItem(i)}
              className="absolute top-1 right-1 text-red-500"
            >
              <X size={14} />
            </button>

            <Input
              value={item.label}
              onChange={e => handleChange(i, 'label', e.target.value)}
            />

            <Input
              type="number"
              value={item.max}
              onChange={e => handleChange(i, 'max', e.target.value)}
            />
          </div>
        ))}

        {/* add */}
        <button
          onClick={addItem}
          className="w-40 h-24 border-dashed border rounded-xl flex items-center justify-center text-muted-foreground"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
