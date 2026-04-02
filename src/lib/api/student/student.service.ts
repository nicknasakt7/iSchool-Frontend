import { StudentFormValues } from "@/components/features/create/form/NewEntryForm";
import { api } from "../client";
import { Student } from "./student.type";

const createStudent = (input: StudentFormValues) =>
  api.post<Student>("/students", input);

export const studentService = { createStudent };
