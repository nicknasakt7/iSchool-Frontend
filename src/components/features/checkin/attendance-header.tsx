'use client';

import { useEffect, useState } from 'react';
import AttendanceStats from './attendance-stats';
import FilterDropdown from '@/components/shared/filter-dropdown';

type AttendanceHeaderProps = {
  showUpdated?: boolean;
  total: number;
  present: number;
  absent: number;
};

const grades = [
  { label: 'P.1', value: '2' },
  { label: 'P.2', value: '10' },
];

const classrooms = [{ label: '1', value: '1' }];

export default function AttendanceHeader({
  showUpdated,
  present,
  total,
  absent,
}: AttendanceHeaderProps) {
  const [time, setTime] = useState('');
  const [grade, setGrade] = useState('');
  const [classroom, setClassroom] = useState('');

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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        {/* left */}
        <div>
          <h1 className="text-4xl font-bold">Morning Attendance</h1>

          <p className="text-sm text-muted-foreground">
            Daily student check-in for{' '}
            <span className="text-primary font-medium">{time}</span>
          </p>
        </div>

        {/* right */}
        <AttendanceStats total={total} present={present} absent={absent} />
      </div>

      {/*  Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <FilterDropdown
          label="Select Grade"
          options={grades}
          value={grade}
          onChange={setGrade}
        />

        <FilterDropdown
          label="Select Classroom"
          options={classrooms}
          value={classroom}
          onChange={setClassroom}
        />

        {showUpdated && (
          <p className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
            Updated 2 minutes ago
          </p>
        )}
      </div>
    </div>
  );
}
