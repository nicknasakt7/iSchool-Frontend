'use client';

import Image from 'next/image';
import { useAtRiskStudents } from '@/lib/api/student/hooks/useAtRiskStudents';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, User } from 'lucide-react';

export default function AlertCard() {
  const { data, isLoading } = useAtRiskStudents();

  const count = data?.count ?? 0;
  const topSubject =
    data?.students
      ?.flatMap((s) => s.subjects)
      .sort((a, b) => a.grade - b.grade)[0]?.name ?? null;

  const displayStudents = (data?.students ?? []).slice(0, 10);

  return (
    <div className="w-full h-full rounded-4xl p-6 text-chart-1 bg-linear-to-r from-new-orange-400 to-new-orange-700/90 shadow-lg flex flex-col gap-6">
      {/* TOP ROW */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <p className="text-sm opacity-80 mb-2">⚠️ ACADEMIC ALERT</p>

          {isLoading ? (
            <div className="h-8 w-56 bg-white/20 animate-pulse rounded-xl mb-3" />
          ) : count === 0 ? (
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              All students on track
            </h2>
          ) : (
            <h2 className="text-2xl md:text-3xl font-bold mb-3 wrap-break-word">
              {count} student{count !== 1 ? 's' : ''} need attention
            </h2>
          )}

          <p className="text-sm opacity-90 mb-4 wrap-break-word">
            {isLoading
              ? 'Analyzing student performance...'
              : count === 0
                ? 'No students are at risk this term.'
                : topSubject
                  ? `Predictive analysis indicates a high risk of academic decline in ${topSubject}.`
                  : 'Predictive analysis indicates students at risk of academic decline.'}
          </p>

          {!isLoading && count > 0 && (
            <Button
              variant="destructive"
              className="flex items-center gap-2 rounded-full bg-white text-red-500 font-bold px-4 py-2 text-sm hover:bg-gray-100"
            >
              Review Student Profiles <ArrowRightIcon />
            </Button>
          )}
        </div>

        {/* RIGHT — count badge */}
        <div className="shrink-0 flex items-center justify-center md:justify-end">
          <div className="bg-white/10 backdrop-blur rounded-3xl px-6 py-8 text-center border">
            {isLoading ? (
              <div className="h-12 w-20 bg-white/20 animate-pulse rounded-xl mx-auto" />
            ) : (
              <p className="text-4xl md:text-5xl font-bold whitespace-nowrap">
                {count}
              </p>
            )}
            <p className="text-xs opacity-80 mt-1">AT RISK</p>
          </div>
        </div>
      </div>

      {/* STUDENT LIST */}
      {!isLoading && displayStudents.length > 0 && (
        <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 overflow-hidden">
          {displayStudents.map((student, idx) => (
            <div
              key={student.id}
              className={`flex items-center gap-3 px-4 py-2.5 ${
                idx !== 0 ? 'border-t border-white/10' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-white/20 flex items-center justify-center">
                {student.profileImageUrl ? (
                  <Image
                    src={student.profileImageUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 opacity-80" />
                )}
              </div>

              {/* Name */}
              <p className="text-sm font-medium truncate">
                {student.firstName} {student.lastName}
              </p>

              {/* Avg grade badge */}
              <span className="ml-auto shrink-0 text-xs font-semibold bg-white/20 rounded-full px-2 py-0.5">
                avg {student.avgGrade}
              </span>
            </div>
          ))}

          {count > 10 && (
            <div className="px-4 py-2 border-t border-white/10 text-xs opacity-70 text-center">
              +{count - 10} more students
            </div>
          )}
        </div>
      )}
    </div>
  );
}
