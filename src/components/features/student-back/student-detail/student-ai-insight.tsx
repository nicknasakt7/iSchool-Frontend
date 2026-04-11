'use client';

import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetStudentInsight } from '@/lib/api/ai-insight/hooks/useGetStudentInsight';
import { useGenerateStudentInsight } from '@/lib/api/ai-insight/hooks/useGenerateStudentInsight';
import type { Trend, RiskLevel } from '@/lib/api/ai-insight/ai-insight.type';

type Props = {
  studentId: string;
  term: number;
  year: number;
};

const trendConfig: Record<
  Trend,
  { label: string; icon: React.ElementType; color: string }
> = {
  IMPROVED: { label: 'พัฒนาขึ้น', icon: TrendingUp, color: 'text-emerald-400' },
  DECLINED: { label: 'ถดถอย', icon: TrendingDown, color: 'text-red-400' },
  STABLE: { label: 'คงที่', icon: Minus, color: 'text-amber-400' },
};

const riskConfig: Record<
  RiskLevel,
  { label: string; color: string; bg: string }
> = {
  LOW: {
    label: 'ความเสี่ยงต่ำ',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/20',
  },
  MEDIUM: {
    label: 'ความเสี่ยงปานกลาง',
    color: 'text-amber-300',
    bg: 'bg-amber-500/20',
  },
  HIGH: { label: 'ความเสี่ยงสูง', color: 'text-red-300', bg: 'bg-red-500/20' },
};

export default function StudentAiInsight({ studentId, term, year }: Props) {
  const { data: insight, isLoading: isLoadingInsight } = useGetStudentInsight(
    studentId,
    term,
    year,
  );
  const { mutate: generate, isPending } = useGenerateStudentInsight();

  const trend = insight ? trendConfig[insight.trend] : null;
  const risk = insight ? riskConfig[insight.riskLevel] : null;
  const TrendIcon = trend?.icon;

  return (
    <div className="bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 text-card rounded-2xl shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-blue-300" />
          <h2 className="font-semibold text-lg">AI Student Insight</h2>
          <span className="text-md text-white/40 ml-1">
            เทอม {term}/{year}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {trend && TrendIcon && (
            <span
              className={cn(
                'flex items-center gap-1.5 text-md font-medium',
                trend.color,
              )}
            >
              <TrendIcon className="size-4" />
              {trend.label}
            </span>
          )}
          <button
            onClick={() => generate({ studentId, term, year })}
            disabled={isPending || isLoadingInsight}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 disabled:opacity-50 border border-white/20 px-3 py-1.5 rounded-lg text-md font-medium transition-all"
          >
            {isPending ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Sparkles className="size-3.5" />
            )}
            {isPending
              ? 'กำลังวิเคราะห์...'
              : insight
                ? 'Regenerate'
                : 'Generate Insight'}
          </button>
        </div>
      </div>

      {insight ? (
        <div className="p-6 space-y-5">
          {/* Summary */}
          <p className="text-white/90 leading-relaxed">{insight.summary}</p>

          {/* 3 content cards */}
          <div className="grid sm:grid-cols-3 gap-3 text-md">
            <InsightCard
              label="Stength"
              value={insight.strength}
              accent="emerald"
            />
            <InsightCard
              label="Weakness"
              value={insight.weakness}
              accent="amber"
            />
            <InsightCard
              label="Suggestion"
              value={insight.suggestion}
              accent="blue"
            />
          </div>

          {/* Risk badge */}
          {risk && (
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4 text-white/50" />
              <span
                className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-full',
                  risk.bg,
                  risk.color,
                )}
              >
                {risk.label}
              </span>
              <span className="text-xs text-white/40">
                สร้างเมื่อ{' '}
                {new Date(insight.generatedAt).toLocaleDateString('th-TH')}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-white/50">
          <Sparkles className="size-8" />
          <p className="text-sm">
            กด &ldquo;Generate Insight&rdquo; เพื่อให้ AI วิเคราะห์นักเรียนคนนี้
          </p>
        </div>
      )}
    </div>
  );
}

function InsightCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: 'emerald' | 'amber' | 'blue';
}) {
  const borderColor = {
    emerald: 'border-l-emerald-400',
    amber: 'border-l-amber-400',
    blue: 'border-l-blue-400',
  }[accent];

  return (
    <div
      className={cn(
        'bg-white/10 rounded-xl p-3.5 space-y-1 border-l-2',
        borderColor,
      )}
    >
      <p className="text-xs text-white/50 uppercase tracking-wide">{label}</p>
      <p className="text-white/90 leading-snug">{value}</p>
    </div>
  );
}
