'use client';

import { useStudents } from '@/lib/api/student/hooks/useStudents';
import StudentCard from './student-card';

type StudentsListProps = {
  search: string;
  grade: string;
  page: number;
  setPage: (page: number) => void;
  classId: string;
  shouldFetch: boolean;
};

export default function StudentsList({
  search,
  grade,
  page,
  setPage,
  classId,
  shouldFetch,
}: StudentsListProps) {
  const { data, isLoading, isError } = useStudents(
    {
      page,
      limit: 10,
      search,
      gradeId: grade === 'all' ? undefined : grade,
      classId: classId === 'all' ? undefined : classId,
    },
    { enabled: shouldFetch },
  );

  if (!shouldFetch)
    return (
      <p className="text-center text-muted-foreground py-10">
        Please select a classroom to view students
      </p>
    );

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError)
    return <p className="text-center text-destructive">Something went wrong</p>;

  if (!data?.data.length)
    return <p className="text-center text-gray-500 mt-10">No students found</p>;

  const total = data.meta.total;
  const limit = data.meta.limit;
  const hasNext = page * limit < total;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.data.map(s => (
          <StudentCard
            key={s.id}
            id={s.id}
            name={`${s.firstName} ${s.lastName}`}
            nickname={s.nickName}
            studentCode={s.studentCode}
            image={s.profileImageUrl ?? '/user.png'}
          />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium">Page {page}</span>

        <button
          disabled={!hasNext}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
