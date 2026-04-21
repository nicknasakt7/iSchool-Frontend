'use client';

import { useSchoolAttendanceSummary } from '@/lib/api/attendance/hooks/useSchoolAttendanceSummary';
import { Check, X } from 'lucide-react';

export default function SummaryCards() {
  const { data, isLoading } = useSchoolAttendanceSummary();

  const cards = [
    {
      title: 'Students Present Today',
      value: data?.present ?? 0,
      total: data?.total ?? 0,
      color: 'green' as const,
    },
    {
      title: 'Students Absent Today',
      value: data?.absent ?? 0,
      total: null,
      color: 'red' as const,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex items-center justify-between p-6 rounded-3xl shadow-lg w-full ${
            card.color === 'green'
              ? 'bg-linear-to-br from-emerald-100 to-teal-200'
              : 'bg-linear-to-br from-rose-100 to-red-200'
          }`}
        >
          <div className="flex items-center gap-5">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                card.color === 'green' ? 'bg-emerald-200/70' : 'bg-rose-200/70'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  card.color === 'green'
                    ? 'bg-emerald-400 text-white'
                    : 'bg-rose-400 text-white'
                }`}
              >
                {card.color === 'green' ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <X className="w-6 h-6" />
                )}
              </div>
            </div>

            <div>
              <p
                className={`text-base font-medium ${
                  card.color === 'green' ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {card.title}
              </p>
              <div className="flex items-end gap-3">
                {isLoading ? (
                  <div className="h-10 w-24 bg-current opacity-20 animate-pulse rounded-xl" />
                ) : (
                  <>
                    <p
                      className={`text-4xl font-bold ${
                        card.color === 'green' ? 'text-emerald-800' : 'text-rose-800'
                      }`}
                    >
                      {card.value.toLocaleString()}
                    </p>
                    {card.total !== null && (
                      <span
                        className={`text-lg ${
                          card.color === 'green' ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        / {card.total.toLocaleString()}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
