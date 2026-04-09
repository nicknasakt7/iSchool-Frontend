import { Check, X } from 'lucide-react';

type SummaryCardProps = {
  title: string;
  value: number;
  color: 'green' | 'red';
};

export default function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-6 rounded-3xl shadow-lg w-full ${
        color === 'green'
          ? 'bg-linear-to-br from-emerald-500 to-teal-700'
          : 'bg-linear-to-br from-rose-500 to-red-700'
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-5">
        {/* 🔥 DOUBLE CIRCLE */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center ${
            color === 'green' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          {/* INNER CIRCLE */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              color === 'green'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {color === 'green' ? (
              <Check className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </div>
        </div>

        {/* TEXT */}
        <div>
          <p className="text-base font-medium text-white/80">{title}</p>

          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-white">{value.toLocaleString()}</p>

            <span className="text-lg text-white/70">
              {color === 'green' ? '/ 1,248' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
