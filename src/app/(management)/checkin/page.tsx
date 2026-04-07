'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/shared/search-input';
import AttendanceHeader from '@/components/features/checkin/attendance-header';
import StudentRow from '@/components/features/checkin/student-row';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { useAttendance } from '@/lib/api/attendance/hooks/useAttendance';
import { useAttendanceSummary } from '@/lib/api/attendance/hooks/useAttendanceSummary';
import { AttendanceStatus } from '@/lib/api/attendance/attendance.type';
import { AttendanceState } from './types.ts/attendance.type';

export default function CheckInPage() {
  const [search, setSearch] = useState('');
  const [classId, setClassId] = useState('');
  const [attendance, setAttendance] = useState<AttendanceState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const todayKey = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    return `attendance_submitted_${id}_${today}`;
  };

  const shouldFetch = !!classId;

  const { data, isLoading } = useStudents(
    { classId: classId || undefined },
    { enabled: shouldFetch },
  );
  const students = data?.data ?? [];

  const { mutate: submitAttendance, isPending } = useAttendance();
  const { data: summary, refetch: refetchSummary } = useAttendanceSummary(
    classId,
    { enabled: shouldFetch },
  );

  const handleClassChange = (id: string) => {
    setClassId(id);
    setAttendance({});
    setIsSubmitted(id ? localStorage.getItem(todayKey(id)) === 'true' : false);
  };

  const handleSelect = (id: string, status: AttendanceStatus) => {
    if (isSubmitted) return;
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const selectedCount = Object.keys(attendance).length;
  const presentCount = Object.values(attendance).filter(
    v => v === 'PRESENT',
  ).length;
  const absentCount = Object.values(attendance).filter(
    v => v === 'ABSENT',
  ).length;

  // All students must have a non-null status before submitting
  const isComplete =
    students.length > 0 && students.every(s => attendance[s.id] != null);

  const filteredStudents = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status,
    }));

    submitAttendance(
      { records },
      {
        onSuccess: () => {
          localStorage.setItem(todayKey(classId), 'true');
          setIsSubmitted(true);
          refetchSummary();
        },
        onError: () => {
          alert('Failed to save attendance');
        },
      },
    );
  };

  // After submit, show backend-confirmed counts; during selection show live counts
  const displayTotal = isSubmitted
    ? (summary?.total ?? students.length)
    : students.length;
  const displayPresent = isSubmitted
    ? (summary?.present ?? presentCount)
    : presentCount;
  const displayAbsent = isSubmitted
    ? (summary?.absent ?? absentCount)
    : absentCount;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <AttendanceHeader
        total={displayTotal}
        present={displayPresent}
        absent={displayAbsent}
        onClassChange={handleClassChange}
        hasClassroom={shouldFetch}
      />

      <SearchInput onSearch={setSearch} />

      {classId && (
        <p className="text-sm text-muted-foreground text-center">
          {selectedCount}/{students.length} students selected
        </p>
      )}

      <div className="space-y-4">
        {!classId && (
          <p className="text-center py-6 text-muted-foreground">
            Select a grade and classroom to begin
          </p>
        )}

        {classId && isLoading && (
          <p className="text-center">Loading students...</p>
        )}

        {classId &&
          !isLoading &&
          filteredStudents.map(s => (
            <StudentRow
              key={s.id}
              student={{
                id: s.id,
                name: `${s.firstName} ${s.lastName}`,
                studentCode: s.studentCode,
                profileImageUrl: s.profileImageUrl,
              }}
              selected={attendance[s.id] ?? null}
              onSelect={handleSelect}
              disabled={isSubmitted}
            />
          ))}

        {classId && !isLoading && filteredStudents.length === 0 && (
          <p className="text-center py-6 text-muted-foreground">
            No students found
          </p>
        )}
      </div>

      {classId && (
        <div className="flex justify-center">
          <Button
            disabled={!isComplete || isPending || isSubmitted}
            onClick={handleSubmit}
          >
            {isPending ? (
              <>
                Saving... <Loader className="animate-spin" />
              </>
            ) : isSubmitted ? (
              <>
                Saved <Check />
              </>
            ) : (
              'Complete Attendance'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
