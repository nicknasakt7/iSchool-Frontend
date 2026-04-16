import { FormValues } from "@/components/features/create/form/NewTeacherForm";

import { Teacher, TeacherListResponse, TeacherResponse, TeacherSummary } from "./teacher.type";
import { api } from "../api-server";
import { apiClient } from "../client";

const createTeacher = (input: FormData) =>
  api.post<Teacher>("/teachers", input);

const getTeachers = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    subjectId?: string;
    classId?: string;
    gradeId?: string;
  },
  token?: string,
) => apiClient.get<TeacherListResponse>("/teachers", params, token);

const updateTeacher = (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: string;
    homeroomClassId?: string | null;
  },
  token?: string,
) => apiClient.patch<TeacherResponse>(`/teachers/${id}`, data, token);

const assignSubject = (
  data: { teacherId: string; subjectId: string; classId: string },
  token?: string,
) =>
  apiClient.post<{ id: string; subjectName?: string; className?: string }>(
    '/teachers/assign-subject',
    data,
    token,
  );

const deleteSubjectAssignment = (id: string, token?: string) =>
  apiClient.delete<void>(`/subject-assignments/${id}`, token);

const deleteTeacher = (id: string, token?: string) =>
  apiClient.delete<void>(`/teachers/${id}`, token);

const getTeacherById = (id: string, token?: string) =>
  apiClient.get<TeacherResponse>(`/teachers/${id}`, undefined, token);

const getTeacherSummary = (token?: string) =>
  apiClient.get<TeacherSummary>('/teachers/summary', undefined, token);

export const teacherService = {
  getTeacherSummary,
  createTeacher,
  getTeachers,
  updateTeacher,
  assignSubject,
  deleteSubjectAssignment,
  deleteTeacher,
  getTeacherById,
};
