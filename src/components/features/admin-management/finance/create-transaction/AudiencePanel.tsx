'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AudienceSelection, Student } from './types/type';
import { useState } from 'react';

type AudiencePanelProps = {
  selection: AudienceSelection;
  setSelection: React.Dispatch<React.SetStateAction<AudienceSelection>>;
};

// Mock students — teammate replaces with real useStudents() hook
const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Somchai Rakdee', code: 'ST-16492' },
  { id: '2', name: 'Kanya Srisai', code: 'ST-16501' },
  { id: '3', name: 'Arthit Boon', code: 'ST-16338' },
];

const GRADES = [
  { id: 'grade-1', name: 'P.1' },
  { id: 'grade-2', name: 'P.2' },
  { id: 'grade-3', name: 'P.3' },
  { id: 'grade-4', name: 'P.4' },
  { id: 'grade-5', name: 'P.5' },
  { id: 'grade-6', name: 'P.6' },
];

export default function AudiencePanel({ selection, setSelection }: AudiencePanelProps) {
  const [search, setSearch] = useState('');
  const [classroomId, setClassroomId] = useState<string>('');

  const toggleGrade = (gradeId: string) => {
    setSelection(prev => ({
      ...prev,
      gradeIds: prev.gradeIds.includes(gradeId)
        ? prev.gradeIds.filter(id => id !== gradeId)
        : [...prev.gradeIds, gradeId],
    }));
  };

  const toggleStudent = (studentId: string) => {
    setSelection(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId],
    }));
  };

  const handleClassroomChange = (value: string) => {
    const id = value === '__none__' ? '' : value;
    setClassroomId(id);
    setSelection(prev => ({
      ...prev,
      classroomIds: id ? [id] : [],
    }));
  };

  const filtered = MOCK_STUDENTS.filter(s =>
    `${s.name} ${s.code}`.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelectAll = () => {
    const allIds = filtered.map(s => s.id);
    const allSelected = allIds.every(id => selection.studentIds.includes(id));
    setSelection(prev => ({
      ...prev,
      studentIds: allSelected
        ? prev.studentIds.filter(id => !allIds.includes(id))
        : [...new Set([...prev.studentIds, ...allIds])],
    }));
  };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const totalLabel =
    selection.gradeIds.length > 0
      ? `${selection.gradeIds.length} grade(s)`
      : selection.classroomIds.length > 0
      ? `1 classroom`
      : `${selection.studentIds.length} student(s)`;

  return (
    <div className="space-y-6 bg-white p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Apply Payment To</h2>
        <span className="text-sm text-blue-600 font-medium">{totalLabel} selected</span>
      </div>

      {/* ENTIRE GRADE */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-500">ENTIRE GRADE</p>
        <div className="grid grid-cols-3 gap-3">
          {GRADES.map(g => {
            const isActive = selection.gradeIds.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGrade(g.id)}
                className={`py-2 rounded-lg border text-base font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SPECIFIC CLASSROOM */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">SPECIFIC CLASSROOMS</p>
        <Select value={classroomId} onValueChange={handleClassroomChange}>
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder="Select Classroom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">— None —</SelectItem>
            {/* Teammate: replace with real classrooms from useClassrooms() */}
            <SelectItem value="room-1-1">P.1/1</SelectItem>
            <SelectItem value="room-1-2">P.1/2</SelectItem>
            <SelectItem value="room-2-1">P.2/1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* INDIVIDUAL STUDENTS */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-500">INDIVIDUAL STUDENTS</p>

        <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-gray-50">
          <span className="text-gray-400">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or student ID..."
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>

        <div className="flex justify-between text-sm">
          <button onClick={handleSelectAll} className="text-blue-600 font-medium">
            Select All Students
          </button>
          <span className="text-blue-600 font-medium">
            {selection.studentIds.length} SELECTED
          </span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filtered.map(s => {
            const isSelected = selection.studentIds.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggleStudent(s.id)}
                className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition ${
                  isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold text-sm">
                    {getInitials(s.name)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.code}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                  isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
                }`}>
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
