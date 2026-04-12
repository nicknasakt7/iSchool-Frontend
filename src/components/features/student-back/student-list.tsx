'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { useDeleteStudent } from '@/lib/api/student/hooks/useDeleteStudent';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
  const { data: session } = useSession();
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

  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const role = session?.user?.role;
  const canDelete = role === 'ADMIN' || role === 'SUPER_ADMIN';

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
          <div key={s.id} className="relative group">
            <Link href={`/students/${s.id}`}>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer pr-14">
                <div className="flex items-center gap-4">
                  <Image
                    src={s.profileImageUrl || '/user.png'}
                    alt={`${s.firstName} ${s.lastName}`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-20 h-20"
                  />
                  <div>
                    <p className="font-medium">{s.firstName} {s.lastName}</p>
                    <p className="text-sm text-gray-500">{s.nickName}</p>
                    <p className="text-xs text-gray-400">Student code: {s.studentCode}</p>
                  </div>
                </div>
              </div>
            </Link>

            {canDelete && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      disabled={isDeleting}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
                      title="Delete student"
                    >
                      <Trash2 size={16} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Student</AlertDialogTitle>
                      <AlertDialogDescription>
                        Permanently delete <strong>{s.firstName} {s.lastName}</strong>? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteStudent(s.id, {
                            onSuccess: () => toast.success(`${s.firstName} ${s.lastName} deleted`),
                            onError: (e) => toast.error(e.message ?? 'Failed to delete'),
                          })
                        }
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
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
