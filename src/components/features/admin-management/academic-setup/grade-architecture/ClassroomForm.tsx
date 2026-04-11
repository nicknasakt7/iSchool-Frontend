'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { ArrowRight, ChevronDown, Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Grade } from '@/lib/api/grade/grade.type';
import { Classroom } from '@/lib/api/classroom/classroom.type';
import {
  createClassroomAction,
  createManyClassroomsAction,
  updateClassroomAction,
} from '@/lib/actions/classroom.action';

// ─── Schemas ─────────────────────────────────────────────────────────────────

const createSchema = z.object({
  gradeId: z.string().min(1, 'กรุณาเลือกระดับชั้น'),
  name: z.string().min(1, 'กรุณาใส่ชื่อห้องเรียน'),
  year: z
    .string()
    .optional()
    .transform(val => (val && val !== '' ? Number(val) : null)),
  term: z
    .string()
    .optional()
    .transform(val => (val && val !== '' ? Number(val) : null)),
});

type CreateInput = z.input<typeof createSchema>;
type CreateOutput = z.output<typeof createSchema>;

const updateSchema = z.object({
  name: z.string().min(1, 'กรุณาใส่ชื่อห้องเรียน'),
  isActive: z.boolean(),
});

type UpdateValues = z.infer<typeof updateSchema>;

// ─── Shared types ─────────────────────────────────────────────────────────────

export type ClassroomWithGrade = Classroom & { gradeId: string };

type ClassroomFormProps = {
  classroom?: ClassroomWithGrade;
  grades: Grade[];
  preselectedGradeId?: string;
  defaultYear?: number | null;
  defaultTerm?: number | null;
  onSuccess?: () => void;
};

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

// ─── Create form ──────────────────────────────────────────────────────────────

function ClassroomCreateForm({
  grades,
  preselectedGradeId,
  defaultYear,
  defaultTerm,
  onSuccess,
}: {
  grades: Grade[];
  preselectedGradeId?: string;
  defaultYear?: number | null;
  defaultTerm?: number | null;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm<CreateInput, unknown, CreateOutput>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      gradeId: preselectedGradeId ?? '',
      name: '',
      year: defaultYear ? String(defaultYear) : String(CURRENT_YEAR),
      term: defaultTerm ? String(defaultTerm) : '',
    },
  });

  const [bothTerms, setBothTerms] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const onSubmit = (data: CreateOutput) => {
    setServerError(undefined);
    startTransition(async () => {
      if (bothTerms && data.year) {
        // สร้างทั้ง 2 เทอมพร้อมกัน
        const result = await createManyClassroomsAction({
          classrooms: [
            { gradeId: data.gradeId, name: data.name, year: data.year, term: 1 },
            { gradeId: data.gradeId, name: data.name, year: data.year, term: 2 },
          ],
        });
        if (result.error) { setServerError(result.error); return; }
      } else {
        const result = await createClassroomAction({
          gradeId: data.gradeId,
          name: data.name,
          year: data.year ?? null,
          term: data.term ?? null,
        });
        if (result.error) { setServerError(result.error); return; }
      }
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
      reset();
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Grade */}
          <Controller
            control={control}
            name="gradeId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ระดับชั้น</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="เลือกระดับชั้น" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(g => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
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

          {/* Name — free-form */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ชื่อห้องเรียน</FieldLabel>
                <Input
                  {...field}
                  placeholder="เช่น 1/1, EP-1, ห้องเรียนพิเศษ"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Year */}
          <Controller
            control={control}
            name="year"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  ปีการศึกษา{' '}
                  <span className="font-normal text-muted-foreground text-xs">
                    (แนะนำให้ระบุ)
                  </span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={v =>
                    field.onChange(v === '__clear__' ? '' : v)
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="ไม่ระบุปี" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__">ไม่ระบุปี</SelectItem>
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

          {/* Term — ซ่อนเมื่อ bothTerms */}
          {!bothTerms && (
            <Controller
              control={control}
              name="term"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    เทอม{' '}
                    <span className="font-normal text-muted-foreground text-xs">
                      (ไม่บังคับ)
                    </span>
                  </FieldLabel>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={v =>
                      field.onChange(v === '__clear__' ? '' : v)
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="ทุกเทอม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__clear__">ทุกเทอม</SelectItem>
                      <SelectItem value="1">เทอม 1</SelectItem>
                      <SelectItem value="2">เทอม 2</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          {/* Both terms placeholder — กันไม่ให้ grid เบี้ยว */}
          {bothTerms && (
            <div className="flex items-end pb-1">
              <span className="text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 w-full text-center">
                เทอม 1 + เทอม 2
              </span>
            </div>
          )}
        </div>

        {/* Checkbox สร้างทั้ง 2 เทอม */}
        <Field orientation="horizontal">
          <Checkbox
            id="both-terms"
            checked={bothTerms}
            onCheckedChange={v => setBothTerms(!!v)}
          />
          <FieldLabel htmlFor="both-terms" className="cursor-pointer">
            สร้างทั้ง 2 เทอมพร้อมกัน
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              (ต้องระบุปีการศึกษา)
            </span>
          </FieldLabel>
        </Field>

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-full px-8 py-6"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> กำลังบันทึก...
              </>
            ) : bothTerms ? (
              <>
                เพิ่ม 2 เทอม <ArrowRight />
              </>
            ) : (
              <>
                เพิ่มห้องเรียน <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

// ─── Update form ──────────────────────────────────────────────────────────────

function ClassroomUpdateForm({
  classroom,
  grades,
  onSuccess,
}: {
  classroom: ClassroomWithGrade;
  grades: Grade[];
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const parentGrade = grades.find(g => g.id === classroom.gradeId);

  const { handleSubmit, control, reset } = useForm<UpdateValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: classroom.name,
      isActive: classroom.isActive ?? true,
    },
  });

  useEffect(() => {
    reset({
      name: classroom.name,
      isActive: classroom.isActive ?? true,
    });
  }, [classroom.id, classroom.name, classroom.isActive, reset]);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();
  const [deactivatePending, startDeactivateTransition] = useTransition();
  const [deactivateError, setDeactivateError] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);

  const onSubmit = (data: UpdateValues) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await updateClassroomAction(classroom.id, {
        name: data.name !== classroom.name ? data.name : undefined,
        isActive: data.isActive,
      });
      if (result.error) {
        setServerError(result.error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
      onSuccess?.();
    });
  };

  const handleDeactivate = () => {
    setDeactivateError(undefined);
    setMenuOpen(false);
    startDeactivateTransition(async () => {
      const result = await updateClassroomAction(classroom.id, {
        isActive: false,
      });
      if (result.error) {
        setDeactivateError(result.error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        {/* Info block */}
        <div className="space-y-1.5 rounded-xl bg-muted/50 border p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">ระดับชั้น</span>
            <span className="font-medium">
              {parentGrade?.name ?? classroom.gradeId}
            </span>
          </div>
          {(classroom.year || classroom.term) && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ปีการศึกษา</span>
              <span className="font-medium">
                {[
                  classroom.year,
                  classroom.term ? `เทอม ${classroom.term}` : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </div>
          )}
        </div>

        {/* Name — free-form editable */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>ชื่อห้องเรียน</FieldLabel>
              <Input
                {...field}
                placeholder="เช่น 1/1, EP-1, ห้องเรียนพิเศษ"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="classroom-isActive-update"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="classroom-isActive-update">
                เปิดใช้งาน
              </FieldLabel>
            </Field>
          )}
        />

        {serverError && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}
        {deactivateError && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {deactivateError}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-muted-foreground"
              >
                เพิ่มเติม <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2" align="start">
              <button
                type="button"
                disabled={deactivatePending || classroom.isActive === false}
                onClick={handleDeactivate}
                className="w-full rounded px-3 py-2 text-left text-sm text-destructive hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deactivatePending
                  ? 'กำลังปิดการใช้งาน...'
                  : 'ปิดการใช้งานห้องเรียน'}
              </button>
            </PopoverContent>
          </Popover>

          <Button
            type="submit"
            className="rounded-full px-8 py-6"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> กำลังบันทึก...
              </>
            ) : (
              <>
                บันทึก <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export default function ClassroomForm({
  classroom,
  grades,
  preselectedGradeId,
  defaultYear,
  defaultTerm,
  onSuccess,
}: ClassroomFormProps) {
  if (classroom?.id) {
    return (
      <ClassroomUpdateForm
        classroom={classroom}
        grades={grades}
        onSuccess={onSuccess}
      />
    );
  }
  return (
    <ClassroomCreateForm
      grades={grades}
      preselectedGradeId={preselectedGradeId}
      defaultYear={defaultYear}
      defaultTerm={defaultTerm}
      onSuccess={onSuccess}
    />
  );
}
