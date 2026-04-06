'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
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
  updateClassroomAction,
} from '@/lib/actions/classroom.action';

// ─── Create schema ────────────────────────────────────────────────────────────
// year / term are strings from the Select, transformed to number | null
const createSchema = z.object({
  gradeId: z.string().min(1, 'Grade is required'),
  roomNumber: z
    .number()
    .int('Room number must be a whole number')
    .positive('Room number must be positive'),
  year: z
    .string()
    .optional()
    .transform((val) => (val && val !== '' ? Number(val) : null)),
  term: z
    .string()
    .optional()
    .transform((val) => (val && val !== '' ? Number(val) : null)),
});

type CreateClassroomFormInput = z.input<typeof createSchema>;
type CreateClassroomFormOutput = z.output<typeof createSchema>;

// ─── Update schema ────────────────────────────────────────────────────────────
const updateSchema = z.object({
  roomNumber: z
    .number()
    .int('Room number must be a whole number')
    .positive('Room number must be positive'),
  isActive: z.boolean(),
});

type UpdateClassroomFormValues = z.infer<typeof updateSchema>;

// ─── Shared types ─────────────────────────────────────────────────────────────
export type ClassroomWithGrade = Classroom & { gradeId: string };

type ClassroomFormProps = {
  classroom?: ClassroomWithGrade;
  grades: Grade[];
  onSuccess?: () => void;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseRoomNumber(name: string): number | undefined {
  const parts = name.split('/');
  if (parts.length === 2) {
    const n = parseInt(parts[1], 10);
    return isNaN(n) ? undefined : n;
  }
  return undefined;
}

function buildPreviewName(gradeLevel: number, roomNumber: number): string {
  return `${gradeLevel}/${roomNumber}`;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

// ─── Create form ──────────────────────────────────────────────────────────────
function ClassroomCreateForm({
  grades,
  onSuccess,
}: {
  grades: Grade[];
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset, setError } =
    useForm<CreateClassroomFormInput, unknown, CreateClassroomFormOutput>({
      resolver: zodResolver(createSchema),
      defaultValues: { gradeId: '', roomNumber: undefined, year: '', term: '' },
    });

  const watchedGradeId = useWatch({ control, name: 'gradeId' });
  const watchedRoomNumber = useWatch({ control, name: 'roomNumber' });
  const selectedGrade = grades.find((g) => g.id === watchedGradeId);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const onSubmit = (data: CreateClassroomFormOutput) => {
    const grade = grades.find((g) => g.id === data.gradeId);
    if (!grade) return;

    const existingRooms = (grade.classrooms ?? [])
      .map((c) => parseRoomNumber(c.name))
      .filter((n): n is number => n !== undefined);

    if (existingRooms.includes(data.roomNumber)) {
      setError('roomNumber', {
        message: 'Room number already exists for this grade',
      });
      return;
    }

    setServerError(undefined);
    startTransition(async () => {
      const result = await createClassroomAction({
        gradeName: grade.name,
        name: String(data.roomNumber),
        year: data.year ?? null,
        term: data.term ?? null,
      });
      console.log('payload:', {
        gradeName: grade.name,
        name: String(data.roomNumber),
        year: data.year ?? null,
        term: data.term ?? null,
      });
      console.log('response:', result);
      if (result.error) {
        setServerError(result.error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
      reset();
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="grid grid-cols-2 gap-5">
          <Controller
            control={control}
            name="gradeId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Grade</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((g) => (
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

          <Controller
            control={control}
            name="roomNumber"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Room Number</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  placeholder="e.g. 101"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="year"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Year{' '}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={(v) =>
                    field.onChange(v === '__clear__' ? '' : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__">All years</SelectItem>
                    {YEAR_OPTIONS.map((y) => (
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
                <FieldLabel>
                  Term{' '}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={(v) =>
                    field.onChange(v === '__clear__' ? '' : v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__">All terms</SelectItem>
                    <SelectItem value="1">Term 1</SelectItem>
                    <SelectItem value="2">Term 2</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {selectedGrade && watchedRoomNumber > 0 && (
          <p className="text-sm text-muted-foreground">
            Classroom name:{' '}
            <span className="font-medium text-foreground">
              {buildPreviewName(selectedGrade.level, watchedRoomNumber)}
            </span>
          </p>
        )}

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded-full px-8 py-6"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                Add Classroom <ArrowRight />
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
  const parentGrade = grades.find((g) => g.id === classroom.gradeId);
  const currentRoomNumber = parseRoomNumber(classroom.name);

  const existingRooms = (parentGrade?.classrooms ?? [])
    .filter((c) => c.id !== classroom.id)
    .map((c) => parseRoomNumber(c.name))
    .filter((n): n is number => n !== undefined);

  const { handleSubmit, control, reset, setError } =
    useForm<UpdateClassroomFormValues>({
      resolver: zodResolver(updateSchema),
      defaultValues: {
        roomNumber: currentRoomNumber ?? 0,
        isActive: classroom.isActive ?? true,
      },
    });

  useEffect(() => {
    reset({
      roomNumber: parseRoomNumber(classroom.name) ?? 0,
      isActive: classroom.isActive ?? true,
    });
  }, [classroom.id, classroom.name, classroom.isActive, reset]);

  const watchedRoomNumber = useWatch({ control, name: 'roomNumber' });

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();
  const [deactivatePending, startDeactivateTransition] = useTransition();
  const [deactivateError, setDeactivateError] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);

  const onSubmit = (data: UpdateClassroomFormValues) => {
    if (
      parentGrade &&
      data.roomNumber !== currentRoomNumber &&
      existingRooms.includes(data.roomNumber)
    ) {
      setError('roomNumber', {
        message: 'Room number already exists for this grade',
      });
      return;
    }

    setServerError(undefined);
    startTransition(async () => {
      const result = await updateClassroomAction(classroom.id, {
        roomNumber:
          data.roomNumber !== currentRoomNumber ? data.roomNumber : undefined,
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
        <div className="space-y-1 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Grade:</span>{' '}
            {parentGrade?.name ?? classroom.gradeId}
          </p>
          <p>
            <span className="font-medium text-foreground">Current name:</span>{' '}
            {classroom.name}
          </p>
        </div>

        <Controller
          control={control}
          name="roomNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Room Number</FieldLabel>
              <Input
                {...field}
                type="number"
                min={1}
                placeholder="e.g. 101"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
              {parentGrade &&
                watchedRoomNumber > 0 &&
                watchedRoomNumber !== currentRoomNumber && (
                  <p className="text-xs text-muted-foreground mt-1">
                    New name:{' '}
                    <span className="font-medium text-foreground">
                      {buildPreviewName(parentGrade.level, watchedRoomNumber)}
                    </span>
                  </p>
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
                Active
              </FieldLabel>
            </Field>
          )}
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}
        {deactivateError && (
          <p className="text-sm text-destructive">{deactivateError}</p>
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
                More <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="start">
              <button
                type="button"
                disabled={deactivatePending || classroom.isActive === false}
                onClick={handleDeactivate}
                className="w-full rounded px-3 py-2 text-left text-sm text-destructive hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deactivatePending ? 'Deactivating...' : 'Deactivate'}
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
                <Loader className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                Save Changes <ArrowRight />
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
  return <ClassroomCreateForm grades={grades} onSuccess={onSuccess} />;
}
