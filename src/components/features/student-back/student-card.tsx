import Image from 'next/image';
import Link from 'next/link';

type StudentCardProps = {
  id: string;
  name: string;
  nickname: string;
  grade: string;
  image?: string;
};

export default function StudentCard({
  id,
  name,
  nickname,
  grade,
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
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {grade}
          </span>
        </div>
      </div>
    </Link>
  );
}
