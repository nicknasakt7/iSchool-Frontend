'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Student } from './types/type';
import { useState } from 'react';

type AudiencePanelProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const students: Student[] = [
  { id: '1', name: 'Somchai Rakdee', code: 'ST-16492' },
  { id: '2', name: 'Kanya Srisai', code: 'ST-16501' },
  { id: '3', name: 'Arthit Boon', code: 'ST-16338' },
];

export default function AudiencePanel({
  selected,
  setSelected,
}: AudiencePanelProps) {
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  // 🔥 toggle student
  const toggleStudent = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  // 🔥 toggle grade
  const toggleGrade = (grade: number) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
    );
  };

  // 🔍 filter
  const filtered = students.filter((s) =>
    `${s.name} ${s.code}`.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔥 select all
  const handleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((s) => s.id));
    }
  };

  // 🧠 initials
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const [classroom, setClassroom] = useState<string>('');
  return (
    <div className="space-y-6 bg-white p-5 rounded-lg">
      <h2 className="font-semibold text-lg">Apply Payment To</h2>

      {/* 🔥 ENTIRE GRADE */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-500">ENTIRE GRADE</p>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((g) => {
            const isActive = selectedGrades.includes(g);

            return (
              <button
                key={g}
                onClick={() => toggleGrade(g)}
                className={`
                  py-2 rounded-lg border text-lg font-medium transition
                  ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }
                `}
              >
                P.{g}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🔥 CLASSROOM */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">SPECIFIC CLASSROOMS</p>

        <Select
          value={classroom}
          onValueChange={(value) => setClassroom(value)}
        >
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder="Select Classroom" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="room-2-1">Room 2/1</SelectItem>
            <SelectItem value="room-2-2">Room 2/2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔥 STUDENTS */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-500 ">
          INDIVIDUAL STUDENTS
        </p>

        {/* 🔍 Search */}
        <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-gray-50">
          <span className="text-gray-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or student ID..."
            className="outline-none w-full"
          />
        </div>

        {/* 🔥 Select All + Count */}
        <div className="flex justify-between text-sm">
          <button
            onClick={handleSelectAll}
            className="text-blue-600 font-medium"
          >
            Select All Students
          </button>

          <p className="text-blue-600 font-medium">
            {selected.length} SELECTED
          </p>
        </div>

        {/* 🔥 List */}
        <div className="space-y-3">
          {filtered.map((s) => {
            const isSelected = selected.includes(s.id);

            return (
              <div
                key={s.id}
                onClick={() => toggleStudent(s.id)}
                className={`
                  flex justify-between items-center p-4 rounded-xl cursor-pointer transition
                  ${isSelected ? 'bg-gray-100' : 'bg-white'}
                `}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                    {getInitials(s.name)}
                  </div>

                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm text-gray-400">{s.code} • ฿ 2</p>
                  </div>
                </div>

                {/* Right circle */}
                <div
                  className={`
                    w-6 h-6 rounded-full border flex items-center justify-center
                    ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300'
                    }
                  `}
                >
                  {isSelected && '✓'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
