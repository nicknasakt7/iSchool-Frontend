import { apiClient } from '../client';
import { Student, StudentDetail, StudentListResponse } from './student.type';

const createStudent = (input: FormData, token?: string) =>
  apiClient.post<Student>('/students', input, token);

const getStudents = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    gradeId?: string;
    classId?: string;
  },
  token?: string,
) => apiClient.get<StudentListResponse>('/students', params, token);

const getStudentById = (
  id: string,
  params?: { term?: number; year?: number },
  token?: string,
) => apiClient.get<StudentDetail>(`/students/${id}`, params, token);

export const studentService = { createStudent, getStudents, getStudentById };
