'use client';

import ClassroomMapping from '@/components/features/admin-management/academic-setup/grade-architecture/classroom-mapping';
import GradeLevels from '@/components/features/admin-management/academic-setup/grade-architecture/grade-levels';
import { useState } from 'react';

type Mapping = {
  grade: string;
  classroom: string;
};

export default function GradeArchitecturePage() {
  const [year, setYear] = useState('2024');
  const [term, setTerm] = useState('Term 1');
  const [isSaved, setIsSaved] = useState(false);

  const [grades, setGrades] = useState(['P.1', 'P.2', 'P.3', 'P.4']);

  const [mappings, setMappings] = useState<Mapping[]>([
    { grade: 'P.1', classroom: 'ห้อง 1' },
    { grade: 'P.2', classroom: 'ห้อง 2' },
  ]);

  // grade
  const addGrade = () => {
    const next = `P.${grades.length + 1}`;
    setGrades([...grades, next]);
  };

  const removeGrade = (g: string) => {
    setGrades(grades.filter(x => x !== g));
    setMappings(mappings.filter(m => m.grade !== g));
  };

  // mapping
  const addMapping = () => {
    setMappings([...mappings, { grade: grades[0], classroom: '' }]);
  };

  const updateMapping = (index: number, key: keyof Mapping, value: string) => {
    const copy = [...mappings];
    copy[index][key] = value;
    setMappings(copy);
  };

  const removeMapping = (index: number) => {
    setMappings(mappings.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({ year, term, grades, mappings });
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Grade Architecture</h2>
        <p className="text-sm text-muted-foreground">
          Define grade levels and map classrooms for each level.
        </p>
      </div>

      {/* YEAR / TERM */}
      <div className="grid grid-cols-2 gap-6">
        <select
          disabled={isSaved}
          value={year}
          onChange={e => setYear(e.target.value)}
          className="p-4 border rounded-xl"
        >
          <option>2024</option>
          <option>2025</option>
        </select>

        <select
          disabled={isSaved}
          value={term}
          onChange={e => setTerm(e.target.value)}
          className="p-4 border rounded-xl"
        >
          <option>Term 1</option>
          <option>Term 2</option>
        </select>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-2 gap-6">
        <GradeLevels
          grades={grades}
          onAdd={addGrade}
          onRemove={removeGrade}
          disabled={isSaved}
        />

        <ClassroomMapping
          grades={grades}
          mappings={mappings}
          onAdd={addMapping}
          onUpdate={updateMapping}
          onDelete={removeMapping}
          onSave={handleSave}
          onEdit={handleEdit}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
}
