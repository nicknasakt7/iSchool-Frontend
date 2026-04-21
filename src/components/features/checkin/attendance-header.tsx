'use client';

import { useRef, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import GradeDropdown from '@/components/shared/grade-dropdown';
import ClassroomDropdown from '@/components/shared/classroom.dropdown';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import AttendanceStats from './attendance-stats';

type AttendanceHeaderProps = {
  total: number;
  present: number;
  absent: number;
  selectedDate: string; // YYYY-MM-DD
  onClassChange: (classId: string) => void;
  onDateChange: (date: string) => void;
  hasClassroom: boolean;
};

function toISODate(d: Date) {
  return d.toISOString().split('T')[0];
}

function isWeekend(isoDate: string) {
  const day = new Date(isoDate + 'T00:00:00').getDay();
  return day === 0 || day === 6;
}

export default function AttendanceHeader({
  total,
  present,
  absent,
  selectedDate,
  onClassChange,
  onDateChange,
  hasClassroom,
}: AttendanceHeaderProps) {
  const [gradeId, setGradeId] = useState<string | undefined>(undefined);
  const [classroomId, setClassroomId] = useState<string>('all');
  const [weekendError, setWeekendError] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const { data: grades } = useGrades();
  const { data: classrooms } = useClassrooms(gradeId ? { gradeId } : undefined);

  const today = toISODate(new Date());
  const isToday = selectedDate === today;

  const displayDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleGradeChange = (value: string) => {
    setGradeId(value === 'all' ? undefined : value);
    setClassroomId('all');
    onClassChange('');
  };

  const handleClassroomChange = (value: string) => {
    setClassroomId(value);
    onClassChange(value === 'all' ? '' : value);
  };

  const handleDateChange = (value: string) => {
    if (!value) return;
    if (isWeekend(value)) {
      setWeekendError(true);
      setTimeout(() => setWeekendError(false), 2500);
      return;
    }
    setWeekendError(false);
    onDateChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Morning Attendance</h1>

          {/* Date pill — โผล่เฉพาะหลัง select classroom */}
          {hasClassroom && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => dateInputRef.current?.showPicker?.()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white hover:bg-muted transition text-sm font-medium shadow-sm"
              >
                <CalendarDays size={14} className="text-muted-foreground" />
                <span>{displayDate}</span>
              </button>

              {/* hidden date input */}
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                max={today}
                onChange={e => handleDateChange(e.target.value)}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
              />

              {weekendError && (
                <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                  ไม่สามารถเช็คชื่อวันเสาร์–อาทิตย์ได้
                </span>
              )}

              {!isToday && !weekendError && (
                <>
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    ⚠ Backdated
                  </span>
                  <button
                    type="button"
                    onClick={() => onDateChange(today)}
                    className="text-xs text-muted-foreground underline hover:text-foreground transition"
                  >
                    Back to today
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {hasClassroom ? (
          <AttendanceStats total={total} present={present} absent={absent} />
        ) : (
          <p className="text-sm text-muted-foreground self-center">
            Please select a classroom to view summary
          </p>
        )}
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
