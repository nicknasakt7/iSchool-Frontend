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
          ? 'bg-linear-to-br from-emerald-100 to-teal-200'
          : 'bg-linear-to-br from-rose-100 to-red-200'
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-5">
        {/* 🔥 DOUBLE CIRCLE */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center ${
            color === 'green' ? 'bg-emerald-200/70' : 'bg-rose-200/70'
          }`}
        >
          {/* INNER CIRCLE */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              color === 'green'
                ? 'bg-emerald-400 text-white'
                : 'bg-rose-400 text-white'
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
          <p className={`text-base font-medium ${color === 'green' ? 'text-emerald-700' : 'text-rose-700'}`}>{title}</p>

          <div className="flex items-end gap-3">
            <p className={`text-4xl font-bold ${color === 'green' ? 'text-emerald-800' : 'text-rose-800'}`}>{value.toLocaleString()}</p>

            <span className={`text-lg ${color === 'green' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {color === 'green' ? '/ 1,248' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
