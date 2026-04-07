import { StudentFormValues } from '@/lib/schemas/student.schema';
import { apiClient } from '../client';
import { Student, StudentListResponse } from './student.type';

const createStudent = (input: FormData, token?: string) =>
  apiClient.post<Student>("/students", input, token);

const getStudents = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    gradeId?: string;
    classId?: string;
  },
  token?: string,
) => apiClient.get<StudentListResponse>("/students", params, token);

export const studentService = { createStudent, getStudents };
