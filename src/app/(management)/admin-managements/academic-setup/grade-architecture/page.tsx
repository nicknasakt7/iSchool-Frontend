'use client';

// 'use client';

// import ClassroomMapping from '@/components/features/admin-management/academic-setup/grade-architecture/classroom-mapping';
// import GradeLevels from '@/components/features/admin-management/academic-setup/grade-architecture/grade-levels';
// import { useState } from 'react';

// type Mapping = {
//   grade: string;
//   classroom: string;
// };

// export default function GradeArchitecturePage() {
//   const [year, setYear] = useState('2024');
//   const [term, setTerm] = useState('Term 1');
//   const [isSaved, setIsSaved] = useState(false);

//   const [grades, setGrades] = useState(['P.1', 'P.2', 'P.3', 'P.4']);

//   const [mappings, setMappings] = useState<Mapping[]>([
//     { grade: 'P.1', classroom: 'ห้อง 1' },
//     { grade: 'P.2', classroom: 'ห้อง 2' },
//   ]);

//   // grade
//   const addGrade = () => {
//     const next = `P.${grades.length + 1}`;
//     setGrades([...grades, next]);
//   };

//   const removeGrade = (g: string) => {
//     setGrades(grades.filter((x) => x !== g));
//     setMappings(mappings.filter((m) => m.grade !== g));
//   };

//   // mapping
//   const addMapping = () => {
//     setMappings([...mappings, { grade: grades[0], classroom: '' }]);
//   };

//   const updateMapping = (index: number, key: keyof Mapping, value: string) => {
//     const copy = [...mappings];
//     copy[index][key] = value;
//     setMappings(copy);
//   };

//   const removeMapping = (index: number) => {
//     setMappings(mappings.filter((_, i) => i !== index));
//   };

//   const handleSave = () => {
//     console.log({ year, term, grades, mappings });
//     setIsSaved(true);
//   };

//   const handleEdit = () => {
//     setIsSaved(false);
//   };

//   return (
//     <div className="p-8 space-y-8">
//       {/* HEADER */}
//       <div>
//         <h2 className="text-3xl font-semibold mb-2">Grade Architecture</h2>
//         <p className="text-sm text-muted-foreground">
//           Define grade levels and map classrooms for each level.
//         </p>
//       </div>

//       {/* YEAR / TERM */}
//       <div className="grid grid-cols-2 gap-6">
//         <select
//           disabled={isSaved}
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           className="p-4 border rounded-xl"
//         >
//           <option>2024</option>
//           <option>2025</option>
//         </select>

//         <select
//           disabled={isSaved}
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           className="p-4 border rounded-xl"
//         >
//           <option>Term 1</option>
//           <option>Term 2</option>
//         </select>
//       </div>

//       {/* MAIN */}
//       <div className="grid grid-cols-2 gap-6">
//         <GradeLevels
//           grades={grades}
//           onAdd={addGrade}
//           onRemove={removeGrade}
//           disabled={isSaved}
//         />

//         <ClassroomMapping
//           grades={grades}
//           mappings={mappings}
//           onAdd={addMapping}
//           onUpdate={updateMapping}
//           onDelete={removeMapping}
//           onSave={handleSave}
//           onEdit={handleEdit}
//           isSaved={isSaved}
//         />
//       </div>
//     </div>
//   );
// }

import ClassroomMapping from '@/components/features/admin-management/academic-setup/grade-architecture/classroom-mapping';
import GradeLevels from '@/components/features/admin-management/academic-setup/grade-architecture/grade-levels';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getGrade } from '@/lib/actions/grade.action';

import { useEffect, useState } from 'react';

type Mapping = {
  grade: string;
  classroom: string;
};

export default function GradeArchitecturePage() {
  // 🔥 Academic logic
  const [year, setYear] = useState('2026'); // Academic Year
  const [term, setTerm] = useState('1'); // "1" | "2"

  const [isSaved, setIsSaved] = useState(false);

  const [grades, setGrades] = useState(['P.1', 'P.2', 'P.3', 'P.4']);

  const [mappings, setMappings] = useState<Mapping[]>([
    { grade: 'P.1', classroom: 'ห้อง 1' },
    { grade: 'P.2', classroom: 'ห้อง 2' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // หรือ external API
        const json = await getGrade();
        console.log('jjjjjjjjjjsonn', json);
        setMappings(json);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // 🔥 helper: show correct year per term
  const getTermLabel = (year: string, term: string) => {
    if (!year) return '';

    const y = Number(year);

    if (term === '1') return `Term 1 (${y})`;
    if (term === '2') return `Term 2 (${y + 1})`;

    return '';
  };

  // grade
  const addGrade = () => {
    const next = `P.${grades.length + 1}`;
    setGrades([...grades, next]);
  };

  const removeGrade = (g: string) => {
    setGrades(grades.filter((x) => x !== g));
    setMappings(mappings.filter((m) => m.grade !== g));
  };

  const handleSaveGrades = () => {
    console.log('Saved grades:', grades);

    // 🔥 ล็อก UI
    setIsSaved(true);
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
    console.log({
      academicYear: year,
      term,
      grades,
      mappings,
    });
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">Grade Architecture</h2>
        <p className="text-sm text-muted-foreground">
          Define grade levels and map classrooms for each level.
        </p>
      </div>

      {/* 🔥 ACADEMIC YEAR / TERM */}
      <div className="grid grid-cols-2 gap-6">
        {/* Academic Year */}
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Academic Year</label>

          <Select value={year} onValueChange={setYear} disabled={isSaved}>
            <SelectTrigger className="w-full p-4 rounded-xl bg-white">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Academic Term */}
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Academic Term</label>

          <Select value={term} onValueChange={setTerm} disabled={isSaved}>
            <SelectTrigger className="w-full p-4 rounded-xl bg-white">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">{getTermLabel(year, '1')}</SelectItem>
              <SelectItem value="2">{getTermLabel(year, '2')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* 🔥 MAIN */}
      <div className="grid grid-cols-2 gap-6">
        {/* =========================== */}
        <GradeLevels
          grades={grades}
          onAdd={addGrade}
          onRemove={removeGrade}
          onSave={handleSaveGrades} // 🔥 เพิ่มตรงนี้
          disabled={isSaved}
        />
        {/* =========================== */}
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
