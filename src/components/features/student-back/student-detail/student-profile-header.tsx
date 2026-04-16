'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoreVertical, Pencil, Trash2, GraduationCap, BookOpen, Hash, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { StudentDetail } from '@/lib/api/student/student.type';

type Props = {
  student: StudentDetail;
  studentId: string;
  selectedTerm: number;
  selectedYear: number;
  onTermYearChange: (term: number, year: number) => void;
};

export default function StudentProfileHeader({ student, studentId, selectedTerm, selectedYear, onTermYearChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const canManage = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN';

  const enrollments = student.studentEnrollments ?? [];

  // หา enrollment ที่ตรงกับ term/year ที่เลือก เพื่อแสดง grade/classroom ที่ถูกต้อง
  const selectedEnrollment = enrollments.find(
    (e) => e.term === selectedTerm && e.year === selectedYear,
  );
  const displayGrade = selectedEnrollment?.grade?.name ?? student.grade?.name ?? '—';
  const displayClassroom = selectedEnrollment?.classroom?.name ?? student.classroom?.name ?? '—';

  const badges = [
    { icon: GraduationCap, label: displayGrade, show: true },
    { icon: BookOpen, label: displayClassroom, show: true },
    { icon: Hash, label: student.favorite, show: !!student.favorite },
  ].filter((b) => b.show);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col sm:flex-row gap-5">
      {/* Avatar */}
      <div className="shrink-0">
        {student.profileImageUrl ? (
          <Image
            src={student.profileImageUrl}
            alt={student.firstName}
            width={160}
            height={160}
            className="w-36 h-36 rounded-xl object-cover border border-border"
          />
        ) : (
          <div className="w-36 h-36 rounded-xl bg-muted flex items-center justify-center border border-border">
            <User className="size-14 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {student.firstName} {student.lastName}
              {student.nickName && (
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  ({student.nickName})
                </span>
              )}
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {student.studentCode}
            </p>
          </div>

          {/* Kebab action menu — Admin/SuperAdmin only */}
          {canManage && (
            <div className="relative shrink-0">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center justify-center size-8 rounded-lg border border-border text-muted-foreground hover:bg-accent transition-colors"
              >
                <MoreVertical className="size-4" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-border bg-popover shadow-lg py-1 overflow-hidden">
                    <Link
                      href={`/students/${studentId}/edit`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Pencil className="size-3.5 text-muted-foreground" />
                      Edit Profile
                    </Link>
                    <button
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Trash2 className="size-3.5" />
                      Delete Student
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Badges + Term/Year selector */}
        <div className="flex flex-wrap items-center gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
            >
              <Icon className="size-3 text-muted-foreground" />
              {label}
            </span>
          ))}

          {enrollments.length > 0 && (
            <div className="relative ml-auto">
              <select
                value={`${selectedTerm}-${selectedYear}`}
                onChange={(e) => {
                  const [term, year] = e.target.value.split('-').map(Number);
                  onTermYearChange(term, year);
                }}
                className="appearance-none flex items-center gap-1.5 pl-3 pr-7 py-1 bg-muted rounded-full text-xs font-medium text-foreground border border-border cursor-pointer focus:outline-none"
              >
                {enrollments.map((e) => (
                  <option key={e.id} value={`${e.term}-${e.year}`}>
                    เทอม {e.term} / {e.year + 543}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}