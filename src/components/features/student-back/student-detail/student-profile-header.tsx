'use client';

import Link from 'next/link';
import { MoreVertical, Pencil, Trash2, GraduationCap, BookOpen, Hash } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { StudentDetail } from '@/lib/api/student/student.type';

type Props = {
  student: StudentDetail;
  studentId: string;
};

export default function StudentProfileHeader({ student, studentId }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const badges = [
    { icon: GraduationCap, label: student.grade?.name ?? '—' },
    { icon: BookOpen, label: student.classroom?.name ?? '—' },
    ...(student.favorite ? [{ icon: Hash, label: student.favorite }] : []),
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col sm:flex-row justify-between gap-4">
      {/* LEFT: Name + info */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {student.firstName} {student.lastName}
          </h1>
          {student.nickName && (
            <p className="text-sm text-muted-foreground mt-0.5">
              ชื่อเล่น: <span className="font-medium text-foreground">{student.nickName}</span>
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          Student Code: {student.studentCode}
        </p>

        <div className="flex flex-wrap gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-sm text-foreground"
            >
              <Icon className="size-3.5 text-muted-foreground" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Actions (kebab menu) */}
      <div className="relative self-start">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center justify-center size-9 rounded-md border border-border hover:bg-accent transition-colors"
        >
          <MoreVertical className="size-4 text-muted-foreground" />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-border bg-popover shadow-md py-1">
              <Link
                href={`/students/${studentId}/edit`}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
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
    </div>
  );
}
