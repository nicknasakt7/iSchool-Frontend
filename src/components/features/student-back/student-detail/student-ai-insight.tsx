'use client';

import { Sparkles, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetStudentInsight } from '@/lib/api/ai-insight/hooks/useGetStudentInsight';
import { useGenerateStudentInsight } from '@/lib/api/ai-insight/hooks/useGenerateStudentInsight';
import type { Trend, RiskLevel } from '@/lib/api/ai-insight/ai-insight.type';

type Props = {
  studentId: string;
  term: number;
  year: number;
};

const trendConfig: Record<Trend, { label: string; icon: React.ElementType; color: string }> = {
  IMPROVED: { label: 'พัฒนาขึ้น', icon: TrendingUp, color: 'text-green-400' },
  DECLINED: { label: 'ถดถอย', icon: TrendingDown, color: 'text-red-400' },
  STABLE: { label: 'คงที่', icon: Minus, color: 'text-yellow-400' },
};

const riskColor: Record<RiskLevel, string> = {
  LOW: 'text-green-300',
  MEDIUM: 'text-yellow-300',
  HIGH: 'text-red-300',
};

export default function StudentAiInsight({ studentId, term, year }: Props) {
  const { data: insight } = useGetStudentInsight(studentId, term, year);
  const { mutate: generate, isPending } = useGenerateStudentInsight();

  const trend = insight ? trendConfig[insight.trend] : null;
  const TrendIcon = trend?.icon;

  return (
    <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 shadow-lg">
      {/* LEFT */}
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-blue-300" />
          <h2 className="text-xl font-semibold">AI Student Insight</h2>
          {trend && TrendIcon && (
            <span className={cn('flex items-center gap-1 text-sm font-medium ml-auto', trend.color)}>
              <TrendIcon className="size-4" />
              {trend.label}
            </span>
          )}
        </div>

        {insight ? (
          <>
            <p className="text-gray-200 leading-relaxed">{insight.summary}</p>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white/10 rounded-xl p-3 space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">จุดแข็ง</p>
                <p className="text-gray-100">{insight.strength}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">จุดที่ต้องพัฒนา</p>
                <p className="text-gray-100">{insight.weakness}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              แนะนำ: {insight.suggestion}
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-sm">
            ยังไม่มี insight — กด &ldquo;Generate&rdquo; เพื่อให้ AI วิเคราะห์นักเรียนคนนี้
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-5 flex flex-col items-center justify-center gap-3 min-w-[160px]">
        {insight && (
          <>
            <p className="text-xs text-gray-300 tracking-widest uppercase">Risk Level</p>
            <p className={cn('text-2xl font-bold', riskColor[insight.riskLevel])}>
              {insight.riskLevel}
            </p>
          </>
        )}
        <button
          onClick={() => generate({ studentId, term, year })}
          disabled={isPending}
          className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:opacity-60 px-4 py-2 rounded-full text-sm font-medium transition-all"
        >
          {isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Sparkles className="size-3.5" />
          )}
          {insight ? 'Regenerate' : 'Generate'}
        </button>
      </div>
    </div>
  );
}
