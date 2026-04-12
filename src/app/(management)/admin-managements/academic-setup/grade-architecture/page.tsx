'use client';

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Pen,
  Plus,
  School,
  BookOpen,
  CalendarDays,
  Layers,
  Filter,
} from 'lucide-react';

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

// ─── Filter schema ────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function termLabel(year: number | null, term: number | null): string {
  if (!year && !term) return 'ทุกปีการศึกษา';
  if (year && term) return `ปี ${year} เทอม ${term}`;
  if (year) return `ปี ${year}`;
  return `เทอม ${term}`;
}

function classroomTermBadge(
  year: number | null | undefined,
  term: number | null | undefined,
) {
  if (!year && !term) return null;
  const parts: string[] = [];
  if (year) parts.push(`${year}`);
  if (term) parts.push(`เทอม ${term}`);
  return parts.join(' ');
}

// ─── Grade Card ───────────────────────────────────────────────────────────────

function GradeCard({
  grade,
  onEditGrade,
  onAddClassroom,
  onEditClassroom,
}: {
  grade: Grade;
  onEditGrade: (g: Grade) => void;
  onAddClassroom: (g: Grade) => void;
  onEditClassroom: (c: Classroom, gradeId: string) => void;
}) {
  const classrooms = grade.classrooms ?? [];

  return (
    <div className="border rounded-2xl overflow-hidden bg-card">
      {/* Grade header */}
      <div className="flex items-center justify-between px-5 py-4 bg-muted/40 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
            <School className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">{grade.name}</p>
            <p className="text-xs text-muted-foreground">
              ระดับ {grade.level} · {classrooms.length} ห้อง
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onEditGrade(grade)}
          >
            <Pen className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1 text-xs"
            onClick={() => onAddClassroom(grade)}
          >
            <Plus className="w-3.5 h-3.5" />
            เพิ่มห้อง
          </Button>
        </div>
      </div>

      {/* Classroom list */}
      <div className="p-4">
        {classrooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
            <BookOpen className="w-7 h-7 mb-2 opacity-30" />
            <p className="text-xs">ไม่มีห้องเรียนในช่วงเวลานี้</p>
            <button
              type="button"
              className="mt-2 text-xs text-blue-500 hover:underline"
              onClick={() => onAddClassroom(grade)}
            >
              + เพิ่มห้องเรียน
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {classrooms.map(classroom => {
              const badge = classroomTermBadge(classroom.year, classroom.term);
              return (
                <button
                  key={classroom.id}
                  type="button"
                  onClick={() => onEditClassroom(classroom, grade.id)}
                  className="group relative flex flex-col items-center justify-center gap-1 rounded-xl border bg-muted/30 hover:bg-blue-50 hover:border-blue-300 transition-colors py-4 px-3 text-center"
                >
                  <span className="font-semibold text-base">
                    {classroom.name}
                  </span>
                  {badge && (
                    <span className="text-[10px] text-muted-foreground">
                      {badge}
                    </span>
                  )}
                  <span className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pen className="w-3 h-3 text-muted-foreground" />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GradeArchitecturePage() {
  // Default filter to current year, no term filter (show all terms of that year)
  const [activeFilter, setActiveFilter] = useState<FilterOutput>({
    year: CURRENT_YEAR,
    term: null,
  });

  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | undefined>();

  const [classroomDialogOpen, setClassroomDialogOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<
    ClassroomWithGrade | undefined
  >();
  // grade pre-selected for new classroom
  const [preselectedGradeId, setPreselectedGradeId] = useState<
    string | undefined
  >();

  const { handleSubmit, control, setValue } = useForm<
    FilterInput,
    unknown,
    FilterOutput
  >({
    resolver: zodResolver(filterSchema),
    defaultValues: { year: String(CURRENT_YEAR), term: '' },
  });

  const watchedYear = useWatch({ control, name: 'year' });

  const { data: grades = [], isLoading } = useGrades({
    year: activeFilter.year,
    term: activeFilter.term,
  });

  const onFilterSubmit = (data: FilterOutput) => {
    setActiveFilter({ year: data.year ?? null, term: data.term ?? null });
  };

  // ── Grade dialog handlers ───────────────────────────────────────────────────

  const openCreateGrade = () => {
    setEditingGrade(undefined);
    setGradeDialogOpen(true);
  };

  const openEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setGradeDialogOpen(true);
  };

  // ── Classroom dialog handlers ───────────────────────────────────────────────

  const openCreateClassroom = (grade?: Grade) => {
    setEditingClassroom(undefined);
    setPreselectedGradeId(grade?.id);
    setClassroomDialogOpen(true);
  };

  const openEditClassroom = (classroom: Classroom, gradeId: string) => {
    setEditingClassroom({ ...classroom, gradeId });
    setPreselectedGradeId(undefined);
    setClassroomDialogOpen(true);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  const hasFilter = activeFilter.year !== null || activeFilter.term !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-1">Grade Architecture</h2>
          <p className="text-sm text-muted-foreground">
            จัดการระดับชั้นและห้องเรียน ·
            ห้องเรียนสามารถมีหลายปีการศึกษาเพื่อเก็บประวัติ
          </p>
        </div>
        <Button onClick={openCreateGrade} size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          เพิ่มระดับชั้น
        </Button>
      </div>

      {/* Filter bar */}
      <form
        onSubmit={handleSubmit(onFilterSubmit)}
        className="flex flex-wrap items-end gap-4 p-4 rounded-2xl border bg-card"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1">
          <Filter className="w-4 h-4" />
          กรองปีการศึกษา
        </div>

        <Controller
          control={control}
          name="year"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-36">
              <FieldLabel className="text-xs text-muted-foreground">
                ปีการศึกษา
              </FieldLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={v => field.onChange(v === '__clear__' ? '' : v)}
              >
                <SelectTrigger className="rounded-xl bg-muted/40">
                  <SelectValue placeholder="ทุกปี" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__">ทุกปี</SelectItem>
                  {YEAR_OPTIONS.map(y => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="term"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-32">
              <FieldLabel className="text-xs text-muted-foreground">
                เทอม
              </FieldLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={v => field.onChange(v === '__clear__' ? '' : v)}
              >
                <SelectTrigger className="rounded-xl bg-muted/40">
                  <SelectValue placeholder="ทุกเทอม" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__">ทุกเทอม</SelectItem>
                  <SelectItem value="1">เทอม 1</SelectItem>
                  <SelectItem value="2">เทอม 2</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-2 items-end">
          <Button type="submit" size="sm" variant="outline">
            ค้นหา
          </Button>
          {hasFilter && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => {
                setValue('year', '');
                setValue('term', '');
                setActiveFilter({ year: null, term: null });
              }}
            >
              ล้างตัวกรอง
            </Button>
          )}
        </div>

        {/* Active filter pill */}
        {hasFilter && (
          <div className="ml-auto flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
            <CalendarDays className="w-3.5 h-3.5" />
            {termLabel(activeFilter.year, activeFilter.term)}
          </div>
        )}
      </form>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-xl px-5 py-4 bg-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{grades.length}</p>
            <p className="text-xs text-muted-foreground">ระดับชั้น</p>
          </div>
        </div>
        <div className="border rounded-xl px-5 py-4 bg-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {grades.reduce((sum, g) => sum + (g.classrooms?.length ?? 0), 0)}
            </p>
            <p className="text-xs text-muted-foreground">ห้องเรียน</p>
          </div>
        </div>
        <div className="border rounded-xl px-5 py-4 bg-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {hasFilter
                ? termLabel(activeFilter.year, activeFilter.term)
                : 'ทุกช่วงเวลา'}
            </p>
            <p className="text-xs text-muted-foreground">ช่วงที่กรอง</p>
          </div>
        </div>
      </div>

      {/* Grade cards grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="border rounded-2xl h-48 bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : grades.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border rounded-2xl bg-card">
          <School className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-base font-medium">ยังไม่มีระดับชั้น</p>
          <p className="text-sm mt-1">เริ่มต้นด้วยการเพิ่มระดับชั้นเรียนแรก</p>
          <Button className="mt-4 gap-1.5" size="sm" onClick={openCreateGrade}>
            <Plus className="w-4 h-4" />
            เพิ่มระดับชั้น
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {grades.map(grade => (
            <GradeCard
              key={grade.id}
              grade={grade}
              onEditGrade={openEditGrade}
              onAddClassroom={g => openCreateClassroom(g)}
              onEditClassroom={openEditClassroom}
            />
          ))}
        </div>
      )}

      {/* Add classroom FAB — bottom right shortcut */}
      <div className="flex justify-end">
        <Button
          onClick={() => openCreateClassroom()}
          variant="outline"
          size="sm"
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          เพิ่มห้องเรียน
        </Button>
      </div>

      {/* ── Grade dialog ──────────────────────────────────────────────────── */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGrade ? 'แก้ไขระดับชั้น' : 'เพิ่มระดับชั้นใหม่'}
            </DialogTitle>
          </DialogHeader>
          <GradeForm
            grade={editingGrade}
            onSuccess={() => setGradeDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* ── Classroom dialog ──────────────────────────────────────────────── */}
      <Dialog open={classroomDialogOpen} onOpenChange={setClassroomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClassroom ? 'แก้ไขห้องเรียน' : 'เพิ่มห้องเรียนใหม่'}
            </DialogTitle>
          </DialogHeader>
          <ClassroomForm
            classroom={editingClassroom}
            grades={grades}
            preselectedGradeId={preselectedGradeId}
            defaultYear={activeFilter.year ?? CURRENT_YEAR}
            defaultTerm={activeFilter.term}
            onSuccess={() => setClassroomDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
