import { apiClient } from '../client';
import {
  BulkPromotePayload,
  EnrollmentRecord,
  PromoteResult,
  PromotionStudent,
} from './enrollment.type';

type HistoryQuery = {
  studentId?: string;
  gradeId?: string;
  classroomId?: string;
  year?: number;
  term?: number;
};

type StudentsQuery = {
  gradeId?: string;
  classroomId?: string;
  year?: number;
  term?: number;
};

const promote = (payload: BulkPromotePayload, token?: string) =>
  apiClient.post<PromoteResult>('/enrollments/promote', payload, token);

const getHistory = (query: HistoryQuery, token?: string) => {
  const params: Record<string, string | number | boolean> = {};
  if (query.studentId) params.studentId = query.studentId;
  if (query.gradeId) params.gradeId = query.gradeId;
  if (query.classroomId) params.classroomId = query.classroomId;
  if (query.year !== undefined) params.year = query.year;
  if (query.term !== undefined) params.term = query.term;
  return apiClient.get<EnrollmentRecord[]>('/enrollments/history', params, token);
};

const getStudentsForPromotion = (query: StudentsQuery, token?: string) => {
  const params: Record<string, string | number | boolean> = {};
  if (query.gradeId) params.gradeId = query.gradeId;
  if (query.classroomId) params.classroomId = query.classroomId;
  if (query.year !== undefined) params.year = query.year;
  if (query.term !== undefined) params.term = query.term;
  return apiClient.get<PromotionStudent[]>(
    '/enrollments/students',
    params,
    token,
  );
};

export const enrollmentService = {
  promote,
  getHistory,
  getStudentsForPromotion,
};
