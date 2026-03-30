'use client';

import { useState } from 'react';
import SearchInput from '@/components/shared/search-input';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceHeader from '@/components/features/checkin/attendance-header';
import StudentRow from '@/components/features/checkin/student-row';

const students = [
  { id: '1', name: 'Alex Johnson' },
  { id: '2', name: 'Marcus Reed' },
  { id: '3', name: 'Sarah Miller' },
  { id: '4', name: 'David Chen' },
];

export default function CheckInPage() {
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState<{
    [key: string]: 'present' | 'absent';
  }>({});
  const [finalPresent, setFinalPresent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 👉 เลือกสถานะ
  const handleSelect = (id: string, value: 'present' | 'absent') => {
    if (isSubmitted) return; // 🔒 กันแก้หลัง submit
    setAttendance(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const total = students.length;

  const selectedCount = Object.keys(attendance).length;

  const presentCount = Object.values(attendance).filter(
    v => v === 'present',
  ).length;

  const absentCount = total - presentCount;

  const isComplete = selectedCount === total && total > 0;

  // 🔍 filter
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <SearchInput onSearch={setSearch} />

      {/* Header */}
      <AttendanceHeader
        showUpdated
        total={total}
        present={isSubmitted ? finalPresent : 0}
        absent={isSubmitted ? absentCount : 0}
      />

      {/* Progress */}
      <p className="text-sm text-muted-foreground text-center">
        {selectedCount}/{total} students selected
      </p>

      {/* List */}
      <div className="space-y-4">
        {filteredStudents.map(s => (
          <StudentRow
            key={s.id}
            student={s}
            selected={attendance[s.id] || null}
            onSelect={handleSelect}
          />
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6">
            No content
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center items-center pt-2">
        <Button
          disabled={!isComplete || isSubmitted}
          className={
            !isComplete || isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
          }
          onClick={() => {
            setFinalPresent(presentCount);
            setIsSubmitted(true);
          }}
        >
          Complete Attendance <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
