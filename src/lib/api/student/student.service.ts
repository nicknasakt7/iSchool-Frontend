import { StudentFormValues } from '@/components/features/create/form/NewEntryForm';
import { apiClient } from '../client';
import { Student, StudentListResponse } from './student.type';

const createStudent = (input: StudentFormValues, token?: string) =>
  apiClient.post<Student>('/students', input, token);

const getStudents = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
  },
  token?: string,
) => apiClient.get<StudentListResponse>('/students', params, token);

export const studentService = { createStudent, getStudents };
