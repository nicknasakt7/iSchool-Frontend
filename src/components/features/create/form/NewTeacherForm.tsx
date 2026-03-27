'use client';

// =========================
// New Teacher Form (shadcn + Controller + FieldGroup)
// =========================

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

import { z } from 'zod';
import ProfileUpload from '../ProfileUpload';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  grade: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function NewTeacherForm() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
      grade: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return (
    <div className="bg-white p-10 rounded-[30px] shadow-sm w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-2">New Teacher</h1>
      <p className="text-center text-muted-foreground mb-8">
        Onboard a new faculty member
      </p>

      {/* Profile Upload */}
      <ProfileUpload />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-2 gap-5">
            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Julianne" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Moore" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Role */}
            <Controller
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Role</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                      <SelectItem value="head">Head Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Grade */}
            <Controller
              control={control}
              name="grade"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Grade</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Submit */}
          <Field>
            <div className="flex justify-center mt-4">
              <Button
                className="rounded-full px-8 py-6 text-base"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader className="animate-spin" /> Adding...
                  </>
                ) : (
                  'Add New Teacher →'
                )}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
