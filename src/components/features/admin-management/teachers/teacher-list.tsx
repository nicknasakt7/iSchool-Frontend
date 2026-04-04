'use client';

import { Button } from '@/components/ui/button';
import { useTeachers } from '@/lib/api/teacher/hooks/useTeachers';

type Props = {
  search: string;
  subjectId?: string;
  classId?: string;
  page: number;
  setPage: (page: number) => void;
  gradeId?: string;
};

export default function TeacherList({
  search,
  subjectId,
  classId,
  page,
  setPage,
  gradeId,
}: Props) {
  const { data, isLoading, isError } = useTeachers({
    page,
    limit: 10,
    search,
    subjectId,
    classId,
    gradeId,
  });

  const total = data?.meta.total ?? 0;
  const limit = data?.meta.limit ?? 10;
  const hasNext = page * limit < total;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error</p>;

  if (!data?.data.length)
    return <p className="text-center mt-10">No teachers found</p>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-chart-2">
        Showing {start}–{end} of {total} teachers
      </p>
      {data.data.map(t => (
        <div
          key={t.id}
          className="flex gap-4 justify-between items-center border p-4 rounded-xl bg-card"
        >
          <div>
            <p className="font-medium ">
              TEACHER: {t.firstName} {t.lastName}
            </p>

            <p className="text-sm text-muted-foreground">
              {t.subjects?.[0]?.className ?? 'NO CLASSES ASSIGNED'} -{' '}
              {t.subjects?.[0]?.subjectName ?? 'NO SUBJECTS ASSIGNED'}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="text-sm">
              Manage
            </Button>
            <Button variant="destructive" className="text-sm">
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button disabled={!hasNext} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
