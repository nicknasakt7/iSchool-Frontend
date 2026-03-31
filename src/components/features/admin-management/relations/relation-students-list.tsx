'use client';

import { useState } from 'react';
import FilterDropdown from '@/components/shared/filter-dropdown';
import RelationStudentCard from './relation-student-card';
import { Student } from '@/app/(management)/admin-managements/relations/page';

type Props = {
  selectedStudent: Student | null;
  onSelect: (student: Student) => void;
};

export default function RelationStudentsList({
  selectedStudent,
  onSelect,
}: Props) {
  const [grade, setGrade] = useState('all');
  const [room, setRoom] = useState('all');

  const students: Student[] = [
    {
      id: '1',
      name: 'Alexander Chen',
      parentsName: 'Robert Chen',
      email: 'robert.chen@email.com',
      grade: 'P.1',
      room: '1',
    },
    {
      id: '2',
      name: 'Maya Thompson',
      parentsName: 'Sarah Thompson',
      email: 'sarah.thompson@email.com',
      grade: 'P.2',
      room: '2',
    },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Available Students</h2>
      </div>

      {/* FILTER */}
      <div className="flex gap-3">
        <FilterDropdown
          label="All Grade Levels"
          value={grade}
          onChange={setGrade}
          options={[
            { label: 'All Grade Levels', value: 'all' },
            { label: 'P.1', value: 'P.1' },
            { label: 'P.2', value: 'P.2' },
          ]}
        />

        <FilterDropdown
          label="All Classrooms"
          value={room}
          onChange={setRoom}
          options={[
            { label: 'All Classrooms', value: 'all' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
          ]}
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {students.map(s => (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            className={`
              cursor-pointer rounded-2xl transition
              ${selectedStudent?.id === s.id ? 'border-2 border-blue-500' : ''}
            `}
          >
            <RelationStudentCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
}
