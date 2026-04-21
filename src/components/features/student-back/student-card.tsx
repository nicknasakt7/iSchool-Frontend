import Image from 'next/image';
import Link from 'next/link';

type StudentCardProps = {
  id: string;
  name: string;
  nickname: string;

  studentCode: string;
  image?: string;
};

export default function StudentCard({
  id,
  name,
  nickname,

  studentCode,
  image,
}: StudentCardProps) {
  return (
    <Link href={`/students/${id}`}>
      <div
        className="
          flex items-center justify-between p-4 rounded-xl border bg-card
          hover:shadow-md hover:scale-[1.01]
          transition-all duration-200 cursor-pointer
        "
      >
        <div className="flex items-center gap-4">
          <Image
            src={image || '/default-avatar.png'}
            alt={name}
            width={80}
            height={80}
            className="rounded-full"
          />

          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{nickname}</p>
            <p className="text-xs text-gray-400">Student code: {studentCode}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
