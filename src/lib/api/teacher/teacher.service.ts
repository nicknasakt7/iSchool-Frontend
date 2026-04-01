import { FormValues } from "@/components/features/create/form/NewTeacherForm";
import { api } from "../client";
import { Teacher } from "./teacher.type";

const createTeacher = (input: FormValues) =>
  api.post<Teacher>("/teachers", input);

export const teacherService = { createTeacher };
