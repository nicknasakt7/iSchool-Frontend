'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { ArrowRight, ChevronDown, Loader } from 'lucide-react';

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

const createSchema = z.object({
  gradeId: z.string().min(1, 'Grade is required'),
  roomNumber: z
    .number()
    .int('Room number must be a whole number')
    .positive('Room number must be positive'),
});

const updateSchema = z.object({
  roomNumber: z
    .number()
    .int('Room number must be a whole number')
    .positive('Room number must be positive'),
  isActive: z.boolean(),
});

type CreateClassroomFormValues = z.infer<typeof createSchema>;
type UpdateClassroomFormValues = z.infer<typeof updateSchema>;

export type ClassroomWithGrade = Classroom & { gradeId: string };

type ClassroomFormProps = {
  classroom?: ClassroomWithGrade;
  grades: Grade[];
  onSuccess?: () => void;
};

function buildClassroomName(gradeLevel: number, roomNumber: number): string {
  return `${gradeLevel}/${roomNumber}`;
}

function parseRoomNumber(name: string): number | undefined {
  const parts = name.split('/');
  if (parts.length === 2) {
    const n = parseInt(parts[1], 10);
    return isNaN(n) ? undefined : n;
  }
  return undefined;
}

function ClassroomCreateForm({
  grades,
  onSuccess,
}: {
  grades: Grade[];
  onSuccess?: () => void;
}) {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setError,
  } = useForm<CreateClassroomFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { gradeId: '', roomNumber: undefined },
  });

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const watchedGradeId = watch('gradeId');
  const watchedRoomNumber = watch('roomNumber');
  const selectedGrade = grades.find((g) => g.id === watchedGradeId);

  const onSubmit = (data: CreateClassroomFormValues) => {
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
        gradeId: data.gradeId,
        name: buildClassroomName(grade.level, data.roomNumber),
      });
      if (result.error) {
        setServerError(result.error);
        return;
      }
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
        </div>

        {selectedGrade && watchedRoomNumber > 0 ? (
          <p className="text-sm text-muted-foreground">
            Classroom name:{' '}
            <span className="font-medium text-foreground">
              {buildClassroomName(selectedGrade.level, watchedRoomNumber)}
            </span>
          </p>
        ) : null}

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

function ClassroomUpdateForm({
  classroom,
  grades,
  onSuccess,
}: {
  classroom: ClassroomWithGrade;
  grades: Grade[];
  onSuccess?: () => void;
}) {
  const parentGrade = grades.find((g) => g.id === classroom.gradeId);
  const currentRoomNumber = parseRoomNumber(classroom.name);

  const existingRooms = (parentGrade?.classrooms ?? [])
    .filter((c) => c.id !== classroom.id)
    .map((c) => parseRoomNumber(c.name))
    .filter((n): n is number => n !== undefined);

  const {
    handleSubmit,
    control,
    watch,
    setError,
  } = useForm<UpdateClassroomFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      roomNumber: currentRoomNumber ?? 0,
      isActive: classroom.isActive ?? true,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();
  const [deactivatePending, startDeactivateTransition] = useTransition();
  const [deactivateError, setDeactivateError] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);

  const watchedRoomNumber = watch('roomNumber');

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
        roomNumber: data.roomNumber !== currentRoomNumber
          ? data.roomNumber
          : undefined,
        isActive: data.isActive,
      });
      if (result.error) {
        setServerError(result.error);
        return;
      }
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
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
              {parentGrade && watchedRoomNumber > 0 && watchedRoomNumber !== currentRoomNumber && (
                <p className="text-xs text-muted-foreground mt-1">
                  New name:{' '}
                  <span className="font-medium text-foreground">
                    {buildClassroomName(parentGrade.level, watchedRoomNumber)}
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
              <FieldLabel htmlFor="classroom-isActive-update">Active</FieldLabel>
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
