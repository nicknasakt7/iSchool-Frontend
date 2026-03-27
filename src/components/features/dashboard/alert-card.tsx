import { ArrowRightIcon } from 'lucide-react';

type AlertCardProps = Record<string, never>;

export default function AlertCard({}: AlertCardProps) {
  return (
    <div className="w-full h-full rounded-4xl p-6 text-white bg-linear-to-r from-orange-400 to-orange-700/90 shadow-lg flex flex-col md:flex-row gap-6">
      {/* LEFT */}
      <div className="flex-1 min-w-0">
        {' '}
        {/* 🔥 สำคัญมาก */}
        <p className="text-sm opacity-80 mb-2">⚠️ ACADEMIC ALERT</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 wrap-break-word">
          3 students need attention
        </h2>
        <p className="text-sm opacity-90 mb-4 wrap-break-word">
          Predictive analysis indicates a high risk of academic decline in
          Mathematics.
        </p>
        <button className=" flex gap-2 rounded-full bg-white text-red-500 font-bold px-4 py-2 text-sm hover:bg-gray-100">
          Review Student Profiles <ArrowRightIcon />
        </button>
      </div>

      {/* RIGHT */}
      <div className="shrink-0 flex items-center justify-center md:justify-end">
        <div className="bg-white/10 backdrop-blur rounded-3xl px-6 py-8 text-center">
          <p className="text-4xl md:text-5xl font-bold whitespace-nowrap">
            84%
          </p>
          <p className="text-xs opacity-80 mt-1">ACCURACY SCORE</p>
        </div>
      </div>
    </div>
  );
}
