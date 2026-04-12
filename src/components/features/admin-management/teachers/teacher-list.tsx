'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useTeachers } from '@/lib/api/teacher/hooks/useTeachers';
import { useDeleteTeacher } from '@/lib/api/teacher/hooks/useDeleteTeacher';
import { TeacherResponse } from '@/lib/api/teacher/teacher.type';
import ManageTeacherDialog from './manage-teacher-dialog';
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
  const { data: session } = useSession();
  const { data, isLoading, isError } = useTeachers({
    page,
    limit: 10,
    search,
    subjectId,
    classId,
    gradeId,
  });

  const [managingTeacher, setManagingTeacher] = useState<TeacherResponse | null>(null);
  const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher();

  const role = session?.user?.role;
  const canDelete = role === 'ADMIN' || role === 'SUPER_ADMIN';

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
    <>
      <div className="space-y-4">
        <p className="text-sm text-chart-2">
          Showing {start}–{end} of {total} teachers
        </p>

        {data.data.map(t => {
          const homeroom = t.homeroomClass
            ? `${t.homeroomClass.gradeName} / ${t.homeroomClass.name}`
            : 'No Homeroom';

          const subjectList =
            (t.subjects ?? []).length > 0
              ? t.subjects!.map(s => `${s.subjectName ?? '—'} (${s.className ?? '—'})`).join(', ')
              : 'No subjects assigned';

          return (
            <div
              key={t.id}
              className="flex gap-4 justify-between items-center border p-4 rounded-xl bg-card"
            >
              <div>
                <p className="font-medium">
                  {t.firstName} {t.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Homeroom: {homeroom}
                </p>
                <p className="text-sm text-muted-foreground">
                  Subjects: {subjectList}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-sm"
                  asChild
                >
                  <Link href={`/admin-managements/teachers/${t.id}/edit`}>
                    Edit
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => setManagingTeacher(t)}
                >
                  Manage
                </Button>

                {canDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="text-sm" disabled={isDeleting}>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                        <AlertDialogDescription>
                          Permanently delete <strong>{t.firstName} {t.lastName}</strong>?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteTeacher(t.id, {
                              onSuccess: () =>
                                toast.success(`${t.firstName} ${t.lastName} deleted`),
                              onError: (e) =>
                                toast.error(e.message ?? 'Failed to delete'),
                            })
                          }
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          );
        })}

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

      <ManageTeacherDialog
        teacher={managingTeacher}
        open={!!managingTeacher}
        onOpenChange={(o) => { if (!o) setManagingTeacher(null); }}
      />
    </>
  );
}
