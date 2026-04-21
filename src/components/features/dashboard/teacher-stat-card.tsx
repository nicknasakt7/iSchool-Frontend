'use client';

import { useTeacherSummary } from '@/lib/api/teacher/hooks/useTeacherSummary';
import { GraduationCap } from 'lucide-react';

const SUBJECT_COLORS = [
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-amber-100 text-amber-700 border-amber-200',
  'bg-rose-100 text-rose-700 border-rose-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-pink-100 text-pink-700 border-pink-200',
];

const CLASSROOM_COLORS = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-sky-500',
  'bg-teal-500',
  'bg-emerald-500',
  'bg-green-500',
];

export default function TeacherStatCard() {
  const { data, isLoading } = useTeacherSummary();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* ===== TOTAL ===== */}
      <div className="bg-linear-to-br from-violet-100 to-purple-200 rounded-4xl p-6 shadow-lg flex flex-col justify-between">
        <div className="w-12 h-12 rounded-xl bg-violet-300/50 flex items-center justify-center mb-4">
          <GraduationCap className="w-6 h-6 text-violet-700" />
        </div>
        <p className="text-violet-500 text-sm mb-1">Total Teachers</p>
        {isLoading ? (
          <div className="h-12 w-28 bg-violet-200 animate-pulse rounded-xl" />
        ) : (
          <div className="flex items-end gap-2">
            <h2 className="text-5xl font-bold text-violet-800">{data?.total ?? 0}</h2>
            <span className="text-violet-500 text-sm mb-1">Staff</span>
          </div>
        )}
      </div>

      {/* ===== BY SUBJECT ===== */}
      <div className="bg-card rounded-4xl p-6 shadow-lg border flex flex-col gap-4">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-1">BY SUBJECT</p>
          <p className="font-semibold text-foreground">Teachers per Subject</p>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (data?.bySubject ?? []).length === 0 ? (
          <p className="text-muted-foreground text-sm">No subject assignments yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(data?.bySubject ?? []).map((s, i) => (
              <div
                key={s.subjectId}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${SUBJECT_COLORS[i % SUBJECT_COLORS.length]}`}
              >
                <span>{s.subjectName}</span>
                <span className="bg-white/60 rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== BY CLASSROOM ===== */}
      <div className="bg-card rounded-4xl p-6 shadow-lg border flex flex-col gap-4">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-1">BY CLASSROOM</p>
          <p className="font-semibold text-foreground">Homeroom Distribution</p>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (data?.byClassroom ?? []).length === 0 ? (
          <p className="text-muted-foreground text-sm">No homeroom assignments yet</p>
        ) : (
          <div className="space-y-2">
            {(data?.byClassroom ?? []).map((c, i) => (
              <div key={c.classroomId} className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${CLASSROOM_COLORS[i % CLASSROOM_COLORS.length]}`}
                />
                <span className="text-sm text-foreground flex-1">
                  {c.gradeName}/{c.classroomName}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
