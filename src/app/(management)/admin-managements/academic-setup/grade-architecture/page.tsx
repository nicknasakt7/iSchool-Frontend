'use client';

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pen, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import GradeForm from '@/components/features/admin-management/academic-setup/grade-architecture/GradeForm';
import ClassroomForm, {
  ClassroomWithGrade,
} from '@/components/features/admin-management/academic-setup/grade-architecture/ClassroomForm';

import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { Grade } from '@/lib/api/grade/grade.type';
import { Classroom } from '@/lib/api/classroom/classroom.type';

const filterSchema = z.object({
  year: z
    .string()
    .optional()
    .transform(val => (val && val !== '' ? Number(val) : null)),
  term: z
    .string()
    .optional()
    .transform(val => (val && val !== '' ? Number(val) : null)),
});

type FilterInput = z.input<typeof filterSchema>;
type FilterOutput = z.output<typeof filterSchema>;

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

function getTermLabel(year: string, term: '1' | '2'): string {
  const y = Number(year);
  if (!y) return term === '1' ? 'Term 1' : 'Term 2';
  if (term === '1') return `Term 1 (${y})`;
  return `Term 2 (${y + 1})`;
}

export default function GradeArchitecturePage() {
  const [activeFilter, setActiveFilter] = useState<FilterOutput>({
    year: null,
    term: null,
  });

  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | undefined>();

  const [classroomDialogOpen, setClassroomDialogOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<
    ClassroomWithGrade | undefined
  >();

  const { handleSubmit, control } = useForm<FilterInput, unknown, FilterOutput>(
    {
      resolver: zodResolver(filterSchema),
      defaultValues: { year: '', term: '' },
    },
  );

  const watchedYear = useWatch({ control, name: 'year' });

  const { data: grades, isLoading } = useGrades({
    year: activeFilter.year ?? null,
    term: activeFilter.term ?? null,
  });
  console.log('gradessssssssssssมามั้ยนะะะะ', grades);

  const onFilterSubmit = (data: FilterOutput) => {
    setActiveFilter({ year: data.year ?? null, term: data.term ?? null });
  };

  const openCreateGrade = () => {
    setEditingGrade(undefined);
    setGradeDialogOpen(true);
  };

  const openEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setGradeDialogOpen(true);
  };

  const openCreateClassroom = () => {
    setEditingClassroom(undefined);
    setClassroomDialogOpen(true);
  };

  const openEditClassroom = (classroom: Classroom, gradeId: string) => {
    setEditingClassroom({ ...classroom, gradeId });
    setClassroomDialogOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Grade Architecture</h2>
        <p className="text-sm text-muted-foreground">
          Define grade levels and map classrooms for each level.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFilterSubmit)}>
        <div className="grid grid-cols-2 gap-6 items-end">
          <Controller
            control={control}
            name="year"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm text-gray-500">
                  Academic Year
                  <span className="ml-1 text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={v =>
                    field.onChange(v === '__clear__' ? '' : v)
                  }
                >
                  <SelectTrigger className="w-full rounded-xl bg-white">
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__">All years</SelectItem>
                    {YEAR_OPTIONS.map(y => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="term"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm text-gray-500">
                  Academic Term
                  <span className="ml-1 text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={v =>
                    field.onChange(v === '__clear__' ? '' : v)
                  }
                >
                  <SelectTrigger className="w-full rounded-xl bg-white">
                    <SelectValue placeholder="All terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__">All terms</SelectItem>
                    <SelectItem value="1">
                      {getTermLabel(watchedYear ?? '', '1')}
                    </SelectItem>
                    <SelectItem value="2">
                      {getTermLabel(watchedYear ?? '', '2')}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Button type="submit" variant="outline" size="sm">
            Apply Filter
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Grade Levels</h3>
            <Button size="sm" onClick={openCreateGrade}>
              <Plus size={16} /> Add Grade
            </Button>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {(grades ?? []).map(grade => (
                <div
                  key={grade.id}
                  className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{grade.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Level {grade.level}
                    </span>
                    {!grade.isActive && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                        In active
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditGrade(grade)}
                  >
                    <Pen size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Classrooms</h3>
            <Button size="sm" onClick={openCreateClassroom}>
              <Plus size={16} /> Add Classroom
            </Button>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {(grades ?? []).flatMap(grade =>
                (grade.classrooms ?? []).map(classroom => (
                  <div
                    key={classroom.id}
                    className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{classroom.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {grade.name}
                      </span>
                      {classroom.isActive === false && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                          Inactive
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditClassroom(classroom, grade.id)}
                    >
                      <Pen size={14} />
                    </Button>
                  </div>
                )),
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGrade ? 'Edit Grade' : 'Add Grade'}
            </DialogTitle>
          </DialogHeader>
          <GradeForm
            grade={editingGrade}
            onSuccess={() => setGradeDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={classroomDialogOpen} onOpenChange={setClassroomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClassroom ? 'Edit Classroom' : 'Add Classroom'}
            </DialogTitle>
          </DialogHeader>
          <ClassroomForm
            classroom={editingClassroom}
            grades={grades ?? []}
            onSuccess={() => setClassroomDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
