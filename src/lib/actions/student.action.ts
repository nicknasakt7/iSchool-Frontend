"use server";

import { StudentFormValues } from "@/components/features/create/form/NewEntryForm";
import { studentService } from "../api/student/student.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createStudent = async (input: StudentFormValues) => {
  try {
    await studentService.createStudent(input);
    revalidatePath("/create/new-entry");
  } catch (error) {
    console.log("error", error);
  }
  redirect("/create/new-entry");
};
