import { Users } from 'lucide-react';

type LeftStatCardProps = {
  total: number;
};

export default function LeftStatCard({ total }: LeftStatCardProps) {
  return (
    <div className="bg-linear-to-br from-blue-100 to-indigo-200 rounded-4xl p-6 shadow-lg h-full w-full flex flex-col">
      {/* ================== TOP ================== */}
      <div className="flex items-center justify-between mb-6">
        {/* ICON */}
        <div className="w-12 h-12 rounded-xl bg-blue-300/50 flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-700" />
        </div>
      </div>

      {/* ================== TITLE ================== */}
      <p className="text-blue-500 text-sm mb-2">Total Students</p>

      {/* ================== NUMBER ================== */}
      <div className="flex items-end gap-2 flex-wrap">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
          {total.toLocaleString()}
        </h2>
        <span className="text-blue-500 text-sm mb-1">Enrolled</span>
      </div>

      {/* ================== DIVIDER ================== */}
      <div className="border-t border-blue-300/50 my-6" />

      {/* ================== GRADE TITLE ================== */}
      <p className="text-xs tracking-widest text-blue-500 mb-4">
        GRADE DISTRIBUTION (PRIMARY)
      </p>

      {/* ================== GRID ================== */}
      <div className="grid grid-cols-3 gap-4">
        {/* ITEM */}
        {[
          { label: 'P.1', value: 210 },
          { label: 'P.2', value: 198 },
          { label: 'P.3', value: 215 },
          { label: 'P.4', value: 202 },
          { label: 'P.5', value: 212 },
          { label: 'P.6', value: 211 },
        ].map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center bg-blue-200/60 rounded-full w-full aspect-square"
          >
            <span className="text-base text-blue-500">{item.label}</span>
            <span className="text-2xl font-semibold text-blue-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
