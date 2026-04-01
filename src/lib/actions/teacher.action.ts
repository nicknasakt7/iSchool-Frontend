"use server";

import { FormValues } from "@/components/features/create/form/NewTeacherForm";
import { teacherService } from "../api/teacher/teacher.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTeacher = async (input: FormValues) => {
  try {
    await teacherService.createTeacher(input);
    revalidatePath("/admin-managements/teachers/teacher-managements");
  } catch (error) {
    console.log("error", error);
  }
  redirect("/admin-managements/teachers/teacher-managements");
};
