'use client';

import { useEffect, useState } from 'react';
import GradeDropdown from '@/components/shared/grade-dropdown';
import ClassroomDropdown from '@/components/shared/classroom.dropdown';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import AttendanceStats from './attendance-stats';

type AttendanceHeaderProps = {
  total: number;
  present: number;
  absent: number;
  onClassChange: (classId: string) => void;
};

export default function AttendanceHeader({
  total,
  present,
  absent,
  onClassChange,
}: AttendanceHeaderProps) {
  const [time, setTime] = useState('');
  const [gradeId, setGradeId] = useState<string | undefined>(undefined);
  const [classroomId, setClassroomId] = useState<string>('all');

  const { data: grades } = useGrades();
  const { data: classrooms } = useClassrooms(gradeId);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleGradeChange = (value: string) => {
    setGradeId(value === 'all' ? undefined : value);
    setClassroomId('all');
    onClassChange('');
  };

  const handleClassroomChange = (value: string) => {
    setClassroomId(value);
    onClassChange(value === 'all' ? '' : value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Morning Attendance</h1>
          <p className="text-sm text-muted-foreground">
            Daily student check-in for{' '}
            <span className="text-primary font-medium">{time}</span>
          </p>
        </div>

        <AttendanceStats total={total} present={present} absent={absent} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GradeDropdown
          value={gradeId ?? 'all'}
          grades={grades}
          onChange={handleGradeChange}
        />

        <ClassroomDropdown
          value={classroomId}
          classrooms={classrooms}
          onChange={handleClassroomChange}
        />
      </div>
    </div>
  );
}
