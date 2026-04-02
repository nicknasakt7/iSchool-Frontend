"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import ProfileUpload from "../ProfileUpload";
import { createStudent } from "@/lib/actions/student.action";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nickname: z.string().optional(),
  dob: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),

  // NEW: Parent fields
  parentFirstName: z.string().min(1),
  parentLastName: z.string().min(1),
  parentEmail: z.email(),

  grade: z.string().min(1),
  classroom: z.string().min(1).optional(),

  favorite: z.string().optional(),
  health: z.string().optional(),

  studentCode: z.uuid(),
});

export type StudentFormValues = z.infer<typeof schema>;

export default function NewEntryForm() {
  const { handleSubmit, control, reset } = useForm<StudentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      dob: "",
      gender: "MALE",

      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",

      grade: "",
      classroom: "",
      favorite: "",
      health: "",

      studentCode: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: StudentFormValues) => {
    startTransition(async () => {
      await createStudent(data);
      reset();
    });
  };

  return (
    <div className="bg-white p-10 rounded-[30px] shadow-sm w-full max-w-3xl">
      <ProfileUpload />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-2 gap-5">
            {/* Student */}
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Julian" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Sterling" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Nickname</FieldLabel>
                  <Input {...field} placeholder="Optional" />
                </Field>
              )}
            />

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

            {/* 🔥 Parent (NEW) */}
            <Controller
              control={control}
              name="parentFirstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Parent First Name</FieldLabel>
                  <Input {...field} placeholder="e.g. John" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="parentLastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Parent Last Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Doe" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="parentEmail"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel>Parent Email</FieldLabel>
                  <Input {...field} placeholder="parent@email.com" />
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
                      <SelectValue placeholder="Select Level" />
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

            {/* 🔥 Classroom dropdown (UPDATED) */}
            <Controller
              control={control}
              name="classroom"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Classroom</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301">Room 301</SelectItem>
                      <SelectItem value="302">Room 302</SelectItem>
                      <SelectItem value="303">Room 303</SelectItem>
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
              name="favorite"
              render={({ field }) => (
                <Field className="col-span-2">
                  <FieldLabel>Favorite Subject</FieldLabel>
                  <Input {...field} placeholder="Optional" />
                </Field>
              )}
            />

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
            <div className="flex justify-center mt-4">
              <Button className="rounded-full px-8 py-6" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="animate-spin" /> Adding...
                  </>
                ) : (
                  "Add New Entry →"
                )}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
