'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AttendanceStatus } from '@/lib/api/attendance/attendance.type';

type StudentRowProps = {
  student: {
    id: string;
    name: string;
    studentCode: string;
    profileImageUrl?: string | null;
  };
  selected: AttendanceStatus | null;
  onSelect: (id: string, status: AttendanceStatus) => void;
  disabled?: boolean;
};

export default function StudentRow({
  student,
  selected,
  onSelect,
  disabled,
}: StudentRowProps) {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* left */}
      <div className="flex items-center gap-3">
        <Image
          src={student.profileImageUrl ?? '/user.png'}
          alt={student.name}
          width={56}
          height={56}
          className="rounded-full object-cover size-14 shrink-0"
        />
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-xs text-muted-foreground">{student.studentCode}</p>
        </div>
      </div>

      {/* right */}
      <div className="flex gap-2">
        <Button
          onClick={() => onSelect(student.id, 'PRESENT')}
          disabled={disabled}
          variant={selected === 'PRESENT' ? 'default' : 'outline'}
          className="rounded-full px-4"
        >
          Present
        </Button>

        <Button
          onClick={() => onSelect(student.id, 'ABSENT')}
          disabled={disabled}
          variant={selected === 'ABSENT' ? 'destructive' : 'outline'}
          className="rounded-full px-4"
        >
          Absent
        </Button>
      </div>
    </div>
  );
}
