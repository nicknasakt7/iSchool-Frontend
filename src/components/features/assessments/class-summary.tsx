'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGenerateClassInsight } from '@/lib/api/ai-insight/hooks/useGenerateClassInsight';
import { useGetClassInsight } from '@/lib/api/ai-insight/hooks/useGetClassInsight';
import {
  Loader,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';

type ClassPerformanceSummaryProps = {
  classroomId: string;
  term: number;
  year: number;
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'IMPROVED')
    return <TrendingUp size={16} className="text-green-300" />;
  if (trend === 'DECLINED')
    return <TrendingDown size={16} className="text-red-300" />;
  return <Minus size={16} className="text-yellow-300" />;
};

const trendLabel: Record<string, string> = {
  IMPROVED: 'ดีขึ้น',
  DECLINED: 'ลดลง',
  STABLE: 'คงที่',
};

const riskColor: Record<string, string> = {
  LOW: 'bg-green-500/30 text-green-200',
  MEDIUM: 'bg-yellow-500/30 text-yellow-200',
  HIGH: 'bg-red-500/30 text-red-200',
};

const riskLabel: Record<string, string> = {
  LOW: 'ความเสี่ยงต่ำ',
  MEDIUM: 'ความเสี่ยงปานกลาง',
  HIGH: 'ความเสี่ยงสูง',
};

export default function ClassPerformanceSummary({
  classroomId,
  term,
  year,
}: ClassPerformanceSummaryProps) {
  const { mutate, isPending } = useGenerateClassInsight();
  const { data: queryData } = useGetClassInsight({ classroomId, term, year });

  // Show query data (existing insight) — mutation updates the cache on success so queryData reflects it
  const data = queryData ?? null;

  return (
    <Card className="rounded-2xl bg-linear-to-r from-blue-700 to-blue-400 text-white shadow">
      <CardContent className="p-6 space-y-5">
        {/* Top row: title + stats + button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-2xl font-semibold">Class Performance Summary</p>
            {data ? (
              <p className="text-sm opacity-90 mt-1 leading-relaxed">
                {data.summary}
              </p>
            ) : (
              <p className="text-sm opacity-60 mt-1">
                กด Generate เพื่อวิเคราะห์ผลการเรียนของชั้นเรียน
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Stats */}
            <div className="text-center">
              <p className="text-xs opacity-70 uppercase tracking-wide">
                Average
              </p>
              <p className="text-2xl font-bold">{data?.avg ?? '-'}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70 uppercase tracking-wide">
                Submission
              </p>
              <p className="text-2xl font-bold">
                {data?.submissionRate ?? '-'}%
              </p>
            </div>

            {/* Trend + Risk badges */}
            {data && (
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1 text-xs font-medium">
                  <TrendIcon trend={data.trend} />
                  {trendLabel[data.trend] ?? data.trend}
                </span>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium ${riskColor[data.riskLevel] ?? 'bg-white/20'}`}
                >
                  {riskLabel[data.riskLevel] ?? data.riskLevel}
                </span>
              </div>
            )}

            {/* Generate button */}
            <Button
              variant="secondary"
              className="font-bold shadow-2xl rounded-full w-24 h-16 text-base text-primary shrink-0"
              disabled={isPending}
              onClick={() => mutate({ classroomId, term, year })}
            >
              {isPending ? <Loader className="animate-spin" /> : 'Generate'}
            </Button>
          </div>
        </div>

        {/* Detail sections — shown after generate */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-white/20">
            <div className="bg-white/10 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-200">
                <CheckCircle size={15} />
                จุดแข็ง
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {data.strength}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-200">
                <AlertCircle size={15} />
                จุดอ่อน
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {data.weakness}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-yellow-200">
                <Info size={15} />
                ข้อเสนอแนะ
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {data.suggestion}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
