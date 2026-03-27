'use client';

import { useState } from 'react';
import MainHeader from '@/components/features/dashboard/main-header';
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

  // 🔥 filter ตรงนี้
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <MainHeader />

      {/* 🔥 ส่ง onSearch เข้าไป */}
      <SearchInput onSearch={setSearch} />

      <AttendanceHeader showUpdated />

      <div className="space-y-4">
        {filteredStudents.map(s => (
          <StudentRow key={s.id} student={s} />
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6">
            No content
          </div>
        )}
      </div>

      {/* bottom action */}
      <div className="bottom-6 flex justify-center items-center">
        <Button>
          Complete Attendance <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
