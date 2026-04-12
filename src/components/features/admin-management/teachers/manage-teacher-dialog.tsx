'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { TeacherResponse } from '@/lib/api/teacher/teacher.type';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useSubjects } from '@/lib/api/subjects/hooks/useSubjects';
import { useUpdateTeacher } from '@/lib/api/teacher/hooks/useUpdateTeacher';
import { useAssignSubject } from '@/lib/api/teacher/hooks/useAssignSubject';
import { useDeleteSubjectAssignment } from '@/lib/api/teacher/hooks/useDeleteSubjectAssignment';

type Props = {
  teacher: TeacherResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ManageTeacherDialog({ teacher, open, onOpenChange }: Props) {
  /* ── Homeroom state ── */
  const [homeroomRole, setHomeroomRole] = useState<'none' | 'homeroom'>('none');
  const [homeroomGradeId, setHomeroomGradeId] = useState('');
  const [homeroomClassId, setHomeroomClassId] = useState('');

  /* ── Add-subject form state ── */
  const [addSubjectId, setAddSubjectId] = useState('');
  const [addGradeId, setAddGradeId] = useState('');
  const [addClassId, setAddClassId] = useState('');

  /* ── Data ── */
  const { data: grades } = useGrades();
  const { data: homeroomClassrooms } = useClassrooms(
    homeroomGradeId ? { gradeId: homeroomGradeId } : undefined,
  );
  const { data: addClassrooms } = useClassrooms(
    addGradeId ? { gradeId: addGradeId } : undefined,
  );
  const { data: subjects } = useSubjects();

  /* ── Mutations ── */
  const { mutate: updateTeacher, isPending: isSavingHomeroom } = useUpdateTeacher();
  const { mutate: assignSubject, isPending: isAssigning } = useAssignSubject();
  const { mutate: deleteAssignment, isPending: isDeleting } = useDeleteSubjectAssignment();

  /* ── Pre-populate homeroom from teacher data ── */
  useEffect(() => {
    if (!teacher) return;
    if (teacher.homeroomClass) {
      setHomeroomRole('homeroom');
      setHomeroomGradeId(teacher.homeroomClass.gradeId);
      setHomeroomClassId(teacher.homeroomClass.id);
    } else {
      setHomeroomRole('none');
      setHomeroomGradeId('');
      setHomeroomClassId('');
    }
    setAddSubjectId('');
    setAddGradeId('');
    setAddClassId('');
  }, [teacher]);

  if (!teacher) return null;

  /* ── Handlers ── */
  const handleSaveHomeroom = () => {
    const homeroomClassIdValue =
      homeroomRole === 'homeroom' && homeroomClassId ? homeroomClassId : null;

    updateTeacher(
      { id: teacher.id, data: { homeroomClassId: homeroomClassIdValue } },
      {
        onSuccess: () => toast.success('Homeroom updated'),
        onError: (e) => toast.error(e.message ?? 'Failed to update homeroom'),
      },
    );
  };

  const handleAddSubject = () => {
    if (!addSubjectId || !addClassId) {
      toast.error('Please select a subject and classroom');
      return;
    }
    assignSubject(
      { teacherId: teacher.id, subjectId: addSubjectId, classId: addClassId },
      {
        onSuccess: () => {
          toast.success('Subject assigned');
          setAddSubjectId('');
          setAddGradeId('');
          setAddClassId('');
        },
        onError: (e) => toast.error(e.message ?? 'Failed to assign subject'),
      },
    );
  };

  const handleRemoveSubject = (assignmentId: string) => {
    if (!window.confirm('Remove this subject assignment?')) return;
    deleteAssignment(assignmentId, {
      onSuccess: () => toast.success('Assignment removed'),
      onError: (e) => toast.error(e.message ?? 'Failed to remove assignment'),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Manage: {teacher.firstName} {teacher.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* ─────────────── HOMEROOM SECTION ─────────────── */}
          <section className="space-y-3">
            <p className="font-semibold text-sm">Homeroom Assignment</p>

            <Select
              value={homeroomRole}
              onValueChange={(v) => {
                setHomeroomRole(v as 'none' | 'homeroom');
                if (v === 'none') {
                  setHomeroomGradeId('');
                  setHomeroomClassId('');
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="homeroom">Homeroom Teacher</SelectItem>
              </SelectContent>
            </Select>

            {homeroomRole === 'homeroom' && (
              <div className="flex gap-2">
                <Select
                  value={homeroomGradeId}
                  onValueChange={(v) => {
                    setHomeroomGradeId(v);
                    setHomeroomClassId('');
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {(grades ?? []).map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={homeroomClassId}
                  onValueChange={setHomeroomClassId}
                  disabled={!homeroomGradeId}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {(homeroomClassrooms ?? []).map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              size="sm"
              onClick={handleSaveHomeroom}
              disabled={
                isSavingHomeroom ||
                (homeroomRole === 'homeroom' && !homeroomClassId)
              }
            >
              {isSavingHomeroom ? 'Saving...' : 'Save Homeroom'}
            </Button>
          </section>

          {/* ─────────────── SUBJECT ASSIGNMENTS ─────────────── */}
          <section className="space-y-3">
            <p className="font-semibold text-sm">Subject Assignments</p>

            {/* Current assignments */}
            <div className="space-y-2">
              {(teacher.subjects ?? []).length === 0 && (
                <p className="text-sm text-muted-foreground">No subjects assigned</p>
              )}
              {(teacher.subjects ?? []).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                >
                  <span>
                    <span className="font-medium">{s.subjectName ?? '—'}</span>
                    <span className="text-muted-foreground"> · {s.className ?? '—'}</span>
                  </span>
                  <button
                    onClick={() => handleRemoveSubject(s.id)}
                    disabled={isDeleting}
                    className="text-destructive hover:text-destructive/80 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new assignment */}
            <div className="rounded-lg border p-3 space-y-2 bg-muted/30">
              <p className="text-xs text-muted-foreground font-medium">Add new assignment</p>

              <Select value={addSubjectId} onValueChange={setAddSubjectId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {(subjects ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Select
                  value={addGradeId}
                  onValueChange={(v) => {
                    setAddGradeId(v);
                    setAddClassId('');
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {(grades ?? []).map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={addClassId}
                  onValueChange={setAddClassId}
                  disabled={!addGradeId}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {(addClassrooms ?? []).map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={handleAddSubject}
                disabled={isAssigning || !addSubjectId || !addClassId}
                className="w-full"
              >
                {isAssigning ? 'Adding...' : '+ Add Assignment'}
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
