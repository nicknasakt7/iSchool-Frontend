"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { createTeacher } from "@/lib/actions/teacher.action";
import { z } from "zod";
import ProfileUpload from "../ProfileUpload";

/* =========================
   SCHEMA
========================= */
const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  role: z.enum(["PARENTS", "TEACHER"]),

  homeroomClassId: z.string().optional(),

  grade: z.array(z.string()).min(1).optional(),
  classroom: z.array(z.string()).min(1).optional(),
});

export type FormValues = z.infer<typeof schema>;

export default function NewTeacherForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "MALE",
      role: "TEACHER",
    },
  });

  const [isPending, startTransition] = useTransition();

  const [preview, setPreview] = useState<File | null>(null);

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const formdata = new FormData();
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("gender", data.gender);
      formdata.append("firstName", data.firstName);
      formdata.append("lastName", data.lastName);

      // Check if preview is not null before appending it
      if (preview) {
        formdata.append("profileImage", preview);
      }

      await createTeacher(formdata);
      reset();
    });
  };

  /* =========================
     checkbox helper
  ========================= */
  // const renderCheckboxGroup = (
  //   field: ControllerRenderProps<FormValues, "role" | "grade" | "classroom">,
  //   options: string[],
  // ) => {
  //   const current = field.value || [];

  //   const toggle = (val: string) => {
  //     if (current.includes(val)) {
  //       field.onChange(current.filter((v) => v !== val));
  //     } else {
  //       field.onChange([...current, val]);
  //     }
  //   };

  //   return (
  //     <div className="flex gap-6 flex-wrap">
  //       {options.map((opt) => (
  //         <label key={opt} className="flex items-center gap-2 cursor-pointer">
  //           <input
  //             type="checkbox"
  //             className="w-4 h-4 accent-blue-600"
  //             checked={current.includes(opt)}
  //             onChange={() => toggle(opt)}
  //           />
  //           {opt}
  //         </label>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="bg-white p-10 rounded-[30px] shadow-sm w-full max-w-3xl space-y-6">
      <ProfileUpload preview={preview} setPreview={setPreview} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-6">
          {/* NAME */}
          <div className="grid grid-cols-2 gap-5">
            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...field} placeholder="e.g. John" />
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
                  <Input {...field} placeholder="e.g. Doe" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* EMAIL + PASSWORD */}
          <div className="grid grid-cols-2 gap-5">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    placeholder="example@mail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...field} placeholder="••••••" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* GENDER */}
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Field>
                <FieldLabel>Gender</FieldLabel>
                <div className="flex gap-6">
                  {(["MALE", "FEMALE", "OTHER"] as const).map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 cursor-pointer capitalize"
                    >
                      <input
                        type="radio"
                        value={g}
                        checked={field.value === g}
                        onChange={() => field.onChange(g)}
                      />
                      {g.charAt(0) + g.slice(1).toLowerCase()}
                    </label>
                  ))}
                </div>
              </Field>
            )}
          />

          {/* HOMEROOM */}
          {/* <Controller
            control={control}
            name="homeroomClassId"
            render={({ field }) => (
              <Field>
                <FieldLabel>Homeroom (optional)</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="p1">ป.1</SelectItem>
                    <SelectItem value="p2">ป.2</SelectItem>
                    <SelectItem value="p3">ป.3</SelectItem>
                    <SelectItem value="p4">ป.4</SelectItem>
                    <SelectItem value="p5">ป.5</SelectItem>
                    <SelectItem value="p6">ป.6</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          /> */}

          {/* SUBMIT */}
          <div className="flex justify-center pt-4">
            <Button
              className="rounded-full px-10 py-6 text-base"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  Create Teacher <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
