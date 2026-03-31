import { GraduationCap } from 'lucide-react';

type RelationStudentCardProps = {
  name: string;
  grade: string;
  room: string;
  parentsName: string;
  email: string;
};

export default function RelationStudentCard({
  name,
  parentsName,
  email,
  grade,
  room,
}: RelationStudentCardProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
      {/* AVATAR */}
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />

      {/* INFO */}
      <div className="flex-1">
        <p className="font-semibold text-md">{name}</p>
        <p className="font-semibold text-sm text-foreground/70">
          parents: {parentsName}
        </p>
        <p className="font-semibold text-sm text-primary/60">
          parents email: {email}
        </p>
        <p className="flex gap-2 text-sm text-muted-foreground mt-2">
          <span className="text-primary/60">
            <GraduationCap />
          </span>
          {grade} / {room}
        </p>
      </div>

      {/* ID */}
      <div className="flex items-center bg-muted ">STD-5488</div>
    </div>
  );
}
