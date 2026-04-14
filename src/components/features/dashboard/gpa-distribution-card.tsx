'use client';

import { useGpaDistribution } from '@/lib/api/student/hooks/useGpaDistribution';
import { Star } from 'lucide-react';

const BUCKET_COLORS = [
  'bg-emerald-100 text-emerald-700 border-emerald-300',
  'bg-teal-100 text-teal-700 border-teal-300',
  'bg-cyan-100 text-cyan-700 border-cyan-300',
  'bg-blue-100 text-blue-700 border-blue-300',
  'bg-indigo-100 text-indigo-700 border-indigo-300',
  'bg-violet-100 text-violet-700 border-violet-300',
  'bg-purple-100 text-purple-700 border-purple-300',
];

export default function GpaDistributionCard() {
  const { data, isLoading } = useGpaDistribution();

  return (
    <div className="bg-card rounded-4xl p-6 shadow-lg border flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Star className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs tracking-widest text-muted-foreground">GPA DISTRIBUTION</p>
          <p className="font-semibold text-foreground">Students by Cumulative GPA</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-muted animate-pulse rounded-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {(data?.distribution ?? []).map((bucket, i) => (
            <div
              key={bucket.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${BUCKET_COLORS[i % BUCKET_COLORS.length]}`}
            >
              <span>{bucket.label}</span>
              <span className="bg-white/60 rounded-full px-1.5 py-0.5 text-xs font-bold">
                {bucket.count}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Term {data?.term ?? '—'} / {data?.year ?? '—'} · Only students with recorded scores
      </p>
    </div>
  );
}
