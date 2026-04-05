import { FormValues } from '@/components/features/create/form/NewTeacherForm';

import { Teacher, TeacherListResponse } from './teacher.type';
import { api } from '../api-server';
import { apiClient } from '../client';

const createTeacher = (input: FormValues) =>
  api.post<Teacher>('/teachers', input);

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
) => apiClient.get<TeacherListResponse>('/teachers', params, token);

export const teacherService = { createTeacher, getTeachers };
