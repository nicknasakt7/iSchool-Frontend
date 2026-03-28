'use client';

// Full shadcn + Controller + FieldGroup version (based on your pattern)

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

// OPTIONAL: replace with your schema
import { z } from 'zod';
import ProfileUpload from '../ProfileUpload';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nickname: z.string().optional(),
  dob: z.string().min(1),
  parents: z.string().min(1),
  grade: z.string().min(1),
  classroom: z.string().min(1),
  favorite: z.string().optional(),
  health: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function NewEntryForm() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      dob: '',
      parents: '',
      grade: '',
      classroom: '',
      favorite: '',
      health: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-2">New Entry</h1>
      <p className="text-center text-muted-foreground mb-8">
        Add a new student record
      </p>

      <ProfileUpload />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...field} placeholder="First Name" />
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
                  <Input {...field} placeholder="Last Name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Nickname */}
            <Controller
              control={control}
              name="nickname"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Nickname</FieldLabel>
                  <Input {...field} placeholder="Optional" />
                </Field>
              )}
            />

            {/* DOB */}
            <Controller
              control={control}
              name="dob"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date of Birth</FieldLabel>
                  <Input {...field} placeholder="mm/dd/yyyy" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Parents */}
            <Controller
              control={control}
              name="parents"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel>Parents / Guardians</FieldLabel>
                  <Input {...field} placeholder="Full names" />
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
                      <SelectValue placeholder="Select Grade" />
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

            {/* Classroom */}
            <Controller
              control={control}
              name="classroom"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Classroom</FieldLabel>
                  <Input {...field} placeholder="Room 302" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Favorite */}
            <Controller
              control={control}
              name="favorite"
              render={({ field }) => (
                <Field className="col-span-2">
                  <FieldLabel>Favorite Subject</FieldLabel>
                  <Input {...field} placeholder="Optional" />
                </Field>
              )}
            />

            {/* Health */}
            <Controller
              control={control}
              name="health"
              render={({ field }) => (
                <Field className="col-span-2">
                  <FieldLabel>Health Note</FieldLabel>
                  <Input {...field} placeholder="Allergies / conditions" />
                </Field>
              )}
            />
          </div>

          <Field>
            <Button className="w-full rounded-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Adding...
                </>
              ) : (
                'Add New Entry →'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
