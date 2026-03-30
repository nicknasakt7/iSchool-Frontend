'use client';

import { useState } from 'react';
import SearchInput from '@/components/shared/search-input';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceHeader from '@/components/features/checkin/attendance-header';
import StudentRow from '@/components/features/checkin/student-row';

const students = [
  { id: '1', name: 'Alex Johnson', status: 'present' as const },
  { id: '2', name: 'Marcus Reed', status: 'present' as const },
  { id: '3', name: 'Sarah Miller', status: 'present' as const },
  { id: '4', name: 'David Chen', status: 'absent' as const },
];

export default function CheckInPage() {
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState<{
    [key: string]: 'present' | 'absent';
  }>({});
  const [finalPresent, setFinalPresent] = useState(0);

  // Check ชื่อ
  const handleSelect = (id: string, value: 'present' | 'absent') => {
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

  const isComplete = selectedCount === total;

  //  filter ตรงนี้
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
        <SearchInput onSearch={setSearch} />
        <AttendanceHeader showUpdated total={total} present={finalPresent} />

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

        <div className="flex justify-center items-center pt-2">
          <Button
            disabled={!isComplete}
            className={!isComplete ? 'opacity-50 cursor-not-allowed' : ''}
            onClick={() => {
              setFinalPresent(presentCount); // 👈 อัปเดตตรงนี้
            }}
          >
            Complete Attendance <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
