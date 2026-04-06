'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { ArrowRight, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Grade } from '@/lib/api/grade/grade.type';
import {
  createGradeAction,
  updateGradeAction,
} from '@/lib/actions/grade.action';

const createSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  level: z.number().int().positive('Level must be a positive integer'),
  isActive: z.boolean(),
});

const updateSchema = z.object({
  isActive: z.boolean(),
});

type CreateGradeFormValues = z.infer<typeof createSchema>;
type UpdateGradeFormValues = z.infer<typeof updateSchema>;

type GradeFormProps = {
  grade?: Grade;
  onSuccess?: () => void;
};

function GradeCreateForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    handleSubmit,
    control,
    reset,
  } = useForm<CreateGradeFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', level: 1, isActive: true },
  });

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const onSubmit = (data: CreateGradeFormValues) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await createGradeAction(data);
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
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Grade Name</FieldLabel>
                <Input {...field} placeholder="e.g. P.1" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="level"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Level</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  placeholder="e.g. 1"
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="grade-isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="grade-isActive">Active</FieldLabel>
            </Field>
          )}
        />

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
                Add Grade <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

function GradeUpdateForm({
  grade,
  onSuccess,
}: {
  grade: Grade;
  onSuccess?: () => void;
}) {
  const { handleSubmit, control } = useForm<UpdateGradeFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: { isActive: grade.isActive },
  });

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const onSubmit = (data: UpdateGradeFormValues) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await updateGradeAction(grade.id, data);
      if (result.error) {
        setServerError(result.error);
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
            <span className="font-medium text-foreground">Name:</span>{' '}
            {grade.name}
          </p>
          <p>
            <span className="font-medium text-foreground">Level:</span>{' '}
            {grade.level}
          </p>
        </div>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="grade-isActive-update"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="grade-isActive-update">Active</FieldLabel>
            </Field>
          )}
        />

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

export default function GradeForm({ grade, onSuccess }: GradeFormProps) {
  if (grade?.id) {
    return <GradeUpdateForm grade={grade} onSuccess={onSuccess} />;
  }
  return <GradeCreateForm onSuccess={onSuccess} />;
}
