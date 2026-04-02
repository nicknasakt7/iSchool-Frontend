import { StudentFormValues } from '@/components/features/create/form/NewEntryForm';
import { api } from '../client';
import { Student, StudentListResponse } from './student.type';

const createStudent = (input: StudentFormValues) =>
  api.post<Student>('/students', input);

const getStudents = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => api.get<StudentListResponse>('/students', params);

export const studentService = { createStudent, getStudents };
