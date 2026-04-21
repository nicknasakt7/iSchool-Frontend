import { apiClient } from '../client';
import { Grade, CreateGradePayload, UpdateGradePayload } from './grade.type';

type GradeQueryParams = {
  year?: number | null;
  term?: number | null;
};

const getGrades = (params?: GradeQueryParams, token?: string) => {
  const query: Record<string, string | number | boolean> = {};
  if (params?.year !== null && params?.year !== undefined) query.year = params.year;
  if (params?.term !== null && params?.term !== undefined) query.term = params.term;
  return apiClient.get<Grade[]>(
    '/classrooms/grades',
    Object.keys(query).length > 0 ? query : undefined,
    token,
  );
};

const createGrade = (payload: CreateGradePayload, token?: string) =>
  apiClient.post<Grade>('/classrooms/grades', payload, token);

const updateGrade = (id: string, payload: UpdateGradePayload, token?: string) =>
  apiClient.patch<Grade>(`/classrooms/grades/${id}`, payload, token);

export const gradeService = { getGrades, createGrade, updateGrade };
