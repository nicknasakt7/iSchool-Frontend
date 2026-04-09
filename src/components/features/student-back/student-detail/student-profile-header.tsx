'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoreVertical, Pencil, Trash2, GraduationCap, BookOpen, Hash, User } from 'lucide-react';
import { useState } from 'react';
import type { StudentDetail } from '@/lib/api/student/student.type';

type Props = {
  student: StudentDetail;
  studentId: string;
};

export default function StudentProfileHeader({ student, studentId }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const badges = [
    { icon: GraduationCap, label: student.grade?.name ?? '—', show: true },
    { icon: BookOpen, label: student.classroom?.name ?? '—', show: true },
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
            width={80}
            height={80}
            className="size-20 rounded-2xl object-cover border border-border"
          />
        ) : (
          <div className="size-20 rounded-2xl bg-muted flex items-center justify-center border border-border">
            <User className="size-8 text-muted-foreground" />
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

          {/* Kebab action menu */}
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
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
            >
              <Icon className="size-3 text-muted-foreground" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}