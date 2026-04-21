'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type StudentStatus = 'Eligible' | 'On Hold' | 'Repeat';

type Student = {
  id: string;
  name: string;
  nickname: string;
  code: string;
  classroom: string;
  grade: string;
  status: StudentStatus;
};

type StudentPromotionProps = {
  currentGrade: string;
  nextGrade: string;
  classroom: string;
};

export default function StudentPromotionList({
  currentGrade,
  nextGrade,
  classroom,
}: StudentPromotionProps) {
  const students: Student[] = [
    {
      id: '1',
      name: 'Somchai Rakdee',
      nickname: 'Som',
      code: 'ST-16492',
      classroom: '1/A',
      grade: 'Grade 1',
      status: 'Eligible',
    },
    {
      id: '2',
      name: 'Kanya Srisai',
      nickname: 'Nan',
      code: 'ST-16501',
      classroom: '1/A',
      grade: 'Grade 1',
      status: 'Eligible',
    },
    {
      id: '3',
      name: 'Arthit Boonmee',
      nickname: 'Art',
      code: 'ST-16338',
      classroom: '1/B',
      grade: 'Grade 1',
      status: 'On Hold',
    },
    {
      id: '4',
      name: 'Malee Wattana',
      nickname: 'May',
      code: 'ST-16421',
      classroom: '1/B',
      grade: 'Grade 1',
      status: 'Eligible',
    },
    {
      id: '5',
      name: 'Panya Siriwan',
      nickname: 'Pan',
      code: 'ST-16445',
      classroom: '1/C',
      grade: 'Grade 1',
      status: 'Repeat',
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'eligible' | 'hold' | 'repeat'>(
    'all',
  );
  const [search, setSearch] = useState('');

  // 🔥 FILTER LOGIC (เชื่อมกับ settings แล้ว)
  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'eligible'
          ? s.status === 'Eligible'
          : filter === 'hold'
            ? s.status === 'On Hold'
            : s.status === 'Repeat';

    const matchClassroom =
      classroom === 'All' ? true : s.classroom === classroom;

    const matchGrade = s.grade === currentGrade;

    return matchSearch && matchFilter && matchClassroom && matchGrade;
  });

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const getStatusStyle = (status: StudentStatus) => {
    if (status === 'Eligible') return 'bg-green-100 text-green-600';
    if (status === 'On Hold') return 'bg-yellow-100 text-yellow-600';
    return 'bg-orange-100 text-orange-600';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Select Students to Promote</h2>

        <span className="text-blue-600 text-sm font-medium">
          {selected.length} SELECTED
        </span>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or student ID..."
        className="w-full border rounded-lg px-4 py-2"
      />

      {/* FILTER */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'eligible', label: 'Eligible' },
          { key: 'hold', label: 'On Hold' },
          { key: 'repeat', label: 'Repeat' },
        ].map((tab) => {
          const isActive = filter === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() =>
                setFilter(tab.key as 'all' | 'eligible' | 'hold' | 'repeat')
              }
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SELECT ALL */}
      <div className="flex justify-between text-sm text-blue-600">
        <button
          onClick={() =>
            setSelected(
              filteredStudents
                .filter((s) => s.status === 'Eligible')
                .map((s) => s.id),
            )
          }
        >
          Select All Eligible Students
        </button>

        <span>
          {students.filter((s) => s.status === 'Eligible').length} eligible
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filteredStudents.map((s) => {
          const isSelected = selected.includes(s.id);

          return (
            <div
              key={s.id}
              className={`
                flex items-center justify-between p-4 rounded-xl border
                ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400 text-white flex items-center justify-center font-semibold">
                  {s.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="font-medium">
                    {s.name} • {s.nickname}
                  </p>
                  <p className="text-sm text-gray-400">
                    {s.code} • Classroom {s.classroom}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                    s.status,
                  )}`}
                >
                  {s.status}
                </span>

                {s.status === 'Eligible' && (
                  <button
                    onClick={() => toggle(s.id)}
                    className={`
                      w-6 h-6 rounded-full border flex items-center justify-center
                      ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300'
                      }
                    `}
                  >
                    {isSelected && <CheckCircle2 size={14} />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTION */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium mt-4">
        Promote {selected.length} Students to {nextGrade} →
      </button>

      <p className="text-center text-xs text-gray-400">
        ACTION CANNOT BE UNDONE • BACKUP RECOMMENDED
      </p>
    </div>
  );
}
