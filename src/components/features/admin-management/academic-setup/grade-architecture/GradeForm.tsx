'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { ArrowRight, Loader } from 'lucide-react';
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

import { Grade } from '@/lib/api/grade/grade.type';
import {
  createGradeAction,
  updateGradeAction,
} from '@/lib/actions/grade.action';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const levelSchema = z.coerce
  .number({ error: 'ระดับต้องเป็นตัวเลข' })
  .int('ระดับต้องเป็นจำนวนเต็ม')
  .positive('ระดับต้องมากกว่า 0');

const createSchema = z.object({
  name: z.string().min(1, 'กรุณาใส่ชื่อระดับชั้น'),
  level: levelSchema,
  isActive: z.boolean(),
});

const updateSchema = z.object({
  name: z.string().min(1, 'กรุณาใส่ชื่อระดับชั้น'),
  level: levelSchema,
  isActive: z.boolean(),
});

type CreateGradeInput = z.input<typeof createSchema>;
type CreateGradeFormValues = z.output<typeof createSchema>;
type UpdateGradeInput = z.input<typeof updateSchema>;
type UpdateGradeFormValues = z.output<typeof updateSchema>;

type GradeFormProps = {
  grade?: Grade;
  onSuccess?: () => void;
};

// ─── Create form ──────────────────────────────────────────────────────────────

function GradeCreateForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<CreateGradeInput, unknown, CreateGradeFormValues>({
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
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
      reset();
      onSuccess?.();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ชื่อระดับชั้น</FieldLabel>
                <Input {...field} placeholder="เช่น P.1, Grade 1, ม.1" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Level */}
          <Controller
            control={control}
            name="level"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  ระดับ{' '}
                  <span className="font-normal text-muted-foreground text-xs">
                    (ใช้เรียงลำดับ)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={1}
                  placeholder="เช่น 1"
                  onChange={e => field.onChange(parseInt(e.target.value, 10))}
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
              <FieldLabel htmlFor="grade-isActive">เปิดใช้งาน</FieldLabel>
            </Field>
          )}
        />

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
            ) : (
              <>
                เพิ่มระดับชั้น <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

// ─── Update form ──────────────────────────────────────────────────────────────

function GradeUpdateForm({
  grade,
  onSuccess,
}: {
  grade: Grade;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<UpdateGradeInput, unknown, UpdateGradeFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: grade.name,
      level: grade.level,
      isActive: grade.isActive,
    },
  });

  useEffect(() => {
    reset({ name: grade.name, level: grade.level, isActive: grade.isActive });
  }, [grade.id, grade.name, grade.level, grade.isActive, reset]);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | undefined>();

  const onSubmit = (data: UpdateGradeFormValues) => {
    setServerError(undefined);
    startTransition(async () => {
      const result = await updateGradeAction(grade.id, {
        name: data.name !== grade.name ? data.name : undefined,
        level: data.level !== grade.level ? data.level : undefined,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Name — now editable */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ชื่อระดับชั้น</FieldLabel>
                <Input {...field} placeholder="เช่น P.1, Grade 1, ม.1" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Level — editable */}
          <Controller
            control={control}
            name="level"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  ระดับ{' '}
                  <span className="font-normal text-muted-foreground text-xs">
                    (ใช้เรียงลำดับ)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={1}
                  placeholder="เช่น 1"
                  onChange={e => field.onChange(parseInt(e.target.value, 10))}
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
                id="grade-isActive-update"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="grade-isActive-update">
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

export default function GradeForm({ grade, onSuccess }: GradeFormProps) {
  if (grade?.id) {
    return <GradeUpdateForm grade={grade} onSuccess={onSuccess} />;
  }
  return <GradeCreateForm onSuccess={onSuccess} />;
}
