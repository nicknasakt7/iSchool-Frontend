'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/components/shared/search-input';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceHeader from '@/components/features/checkin/attendance-header';
import StudentRow from '@/components/features/checkin/student-row';
import { takeAttendance } from '@/lib/api/attendance/attendance.service';

import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { AttendanceState } from './types.ts/attendance.type';

export default function CheckInPage() {
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState<AttendanceState>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [classId, setClassId] = useState('');

  // ดึง student จาก backend
  const { data, isLoading } = useStudents({ classId });

  const students = data || [];

  //  reset ทุกครั้งที่เปลี่ยนห้อง
  useEffect(() => {
    setAttendance({});
    setIsSubmitted(false);
  }, [classId]);

  const handleSelect = (id: string, value: 'present' | 'absent') => {
    if (isSubmitted) return;

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

  const absentCount = selectedCount - presentCount;

  const isComplete = selectedCount === total && total > 0;

  const filteredStudents = students.filter((s: any) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const records = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      await takeAttendance({ records });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to save attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SearchInput onSearch={setSearch} />

      {/* เลือกห้อง → ยิง API */}
      <AttendanceHeader
        showUpdated
        total={total}
        present={presentCount}
        absent={absentCount}
        onClassChange={setClassId}
      />

      <p className="text-sm text-muted-foreground text-center">
        {selectedCount}/{total} students selected
      </p>

      <div className="space-y-4">
        {isLoading && <p className="text-center">Loading students...</p>}

        {!isLoading &&
          filteredStudents.map((s: any) => (
            <StudentRow
              key={s.id}
              student={{
                id: s.id,
                name: `${s.firstName} ${s.lastName}`,
              }}
              selected={attendance[s.id] || null}
              onSelect={handleSelect}
            />
          ))}

        {!isLoading && filteredStudents.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No students found
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          disabled={!isComplete || loading || isSubmitted}
          onClick={handleSubmit}
        >
          {loading
            ? 'Saving...'
            : isSubmitted
              ? 'Saved ✔'
              : 'Complete Attendance'}{' '}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
