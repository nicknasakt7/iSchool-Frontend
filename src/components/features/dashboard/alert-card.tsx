'use client';

import { useAtRiskStudents } from '@/lib/api/student/hooks/useAtRiskStudents';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function AlertCard() {
  const { data, isLoading } = useAtRiskStudents();

  const count = data?.count ?? 0;
  const topSubject =
    data?.students
      ?.flatMap((s) => s.subjects)
      .sort((a, b) => a.grade - b.grade)[0]?.name ?? null;

  return (
    <div className="w-full h-full rounded-4xl p-6 text-chart-1 bg-linear-to-r from-new-orange-400 to-new-orange-700/90 shadow-lg flex flex-col md:flex-row gap-6">
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

      {/* RIGHT */}
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
  );
}
