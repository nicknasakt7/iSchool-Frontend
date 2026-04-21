import { Info } from 'lucide-react';

type InfoBoxProps = {
  title: string;
  text: string;
};

export default function InfoBox({ title, text }: InfoBoxProps) {
  return (
    <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm flex gap-3">
      {/* 🔥 ICON */}
      <Info className="w-5 h-5 mt-1 shrink-0" />

      {/* 🔥 TEXT */}
      <div>
        <p className="font-medium mb-1">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
