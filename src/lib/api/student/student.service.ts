import { apiClient } from '../client';
import { ParentMatchResult, Student, StudentDetail, StudentListResponse } from './student.type';

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

const updateStudent = (
  id: string,
  data: Record<string, unknown>,
  token?: string,
) => apiClient.patch<Student>(`/students/${id}`, data, token);

const uploadProfileImage = (id: string, formData: FormData, token?: string) =>
  apiClient.patch<Student>(`/students/${id}/profile-image`, formData, token);

const findParentMatch = (studentId: string, token?: string) =>
  apiClient.get<ParentMatchResult>(`/students/${studentId}/parent-match`, undefined, token);

const confirmParentMatch = (studentId: string, parentId: string, token?: string) =>
  apiClient.patch<Student>(`/students/${studentId}/parent-match`, { parentId }, token);

const assignParent = (studentId: string, parentId: string, token?: string) =>
  apiClient.patch<Student>(`/students/${studentId}/parent`, { parentId }, token);

const removeParent = (studentId: string, token?: string) =>
  apiClient.delete<Student>(`/students/${studentId}/parent`, token);

const deleteStudent = (id: string, token?: string) =>
  apiClient.delete<void>(`/students/${id}`, token);

export const studentService = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  uploadProfileImage,
  findParentMatch,
  confirmParentMatch,
  assignParent,
  removeParent,
  deleteStudent,
};
