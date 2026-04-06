"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
  nickName: z.string().optional(),
  dob: z.string().min(1),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),

  // NEW: Parent fields
  parentsFirstName: z.string().min(1),
  parentsLastName: z.string().min(1),
  parentsEmail: z.email(),

  gradeId: z.string().min(1),
  classId: z.string().min(1).optional(),

  favorite: z.string().optional(),
  healthNote: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof schema>;

export default function NewEntryForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      dob: "",
      gender: "MALE",

      parentsFirstName: "",
      parentsLastName: "",
      parentsEmail: "",

      gradeId: "",
      classId: "",
      favorite: "",
      healthNote: "",
    },
  });

  console.log("errors", errors);

  const [isPending, startTransition] = useTransition();

  const [preview, setPreview] = useState<File | null>(null);

  const onSubmit = (data: StudentFormValues) => {
    startTransition(async () => {
      const formdata = new FormData();

      // Append form data as key-value pairs
      formdata.append("gender", data.gender);
      formdata.append("gradeId", data.gradeId);
      formdata.append("firstName", data.firstName);
      formdata.append("lastName", data.lastName);
      formdata.append("dob", data.dob); // Add date of birth
      formdata.append("parentsEmail", data.parentsEmail); // Add parents' email
      formdata.append("parentsFirstName", data.parentsFirstName); // Add parents' first name
      formdata.append("parentsLastName", data.parentsLastName); // Add parents' last name

      if (data.classId) {
        formdata.append("classId", data.classId); // Add classId
      }

      if (data.favorite) {
        formdata.append("favorite", data.favorite); // Add favorite activity
      }

      if (data.healthNote) {
        formdata.append("healthNote", data.healthNote); // Optional field for health note
      }

      if (data.nickName) {
        formdata.append("nickName", data.nickName); // Optional field for nickname
      }

      if (preview) {
        formdata.append("profileImage", preview);
      }

      // Submit the formdata to createStudent
      await createStudent(formdata);
      reset();
    });
  };

  return (
    <div className="bg-white p-10 rounded-[30px] shadow-sm w-full max-w-3xl">
      <ProfileUpload preview={preview} setPreview={setPreview} />

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
              name="nickName"
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
                  <Input {...field} placeholder="mm-dd-yyyy" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* 🔥 Parent (NEW) */}
            <Controller
              control={control}
              name="parentsFirstName"
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
              name="parentsLastName"
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
              name="parentsEmail"
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

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Gender */}
              <Controller
                control={control}
                name="gender"
                render={({ field, fieldState }) => (
                  <Field
                    className="w-full flex flex-col"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>Gender</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Grade */}
              {/* <Controller
                control={control}
                name="grade"
                render={({ field, fieldState }) => (
                  <Field
                    className="w-full flex flex-col"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>Grade</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
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
              /> */}

              {/* Grade */}
              <Controller
                control={control}
                name="gradeId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Grade</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="47c09bcf-089e-4acb-a16d-520b4647b1cc">
                          Grade 1
                        </SelectItem>
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
              {/* <Controller
                control={control}
                name="classroom"
                render={({ field, fieldState }) => (
                  <Field
                    className="w-full flex flex-col"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>Classroom</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select classroom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">Room 1</SelectItem>
                        <SelectItem value="02">Room 2</SelectItem>
                        <SelectItem value="03">Room 3</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}
            </div>
            {/* 🔥 Classroom dropdown (UPDATED) */}
            <Controller
              control={control}
              name="classId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Classroom</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="33eb243a-cbd0-4ba1-9d8f-210ea693daa4">
                        Room 301
                      </SelectItem>
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
              name="healthNote"
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
                  "Add New Entry"
                )}
                <ArrowRight />
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
