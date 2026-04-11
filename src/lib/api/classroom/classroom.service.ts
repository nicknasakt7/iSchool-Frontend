import { apiClient } from '../client';
import {
  Classroom,
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from './classroom.type';

type GetClassroomsParams = {
  gradeId?: string;
  year?: number | null;
  term?: number | null;
};

const getClassrooms = (params?: GetClassroomsParams, token?: string) => {
  const query: Record<string, string | number | boolean> = {};
  if (params?.gradeId) query.gradeId = params.gradeId;
  if (params?.year !== null && params?.year !== undefined)
    query.year = params.year;
  if (params?.term !== null && params?.term !== undefined)
    query.term = params.term;
  return apiClient.get<Classroom[]>(
    '/classrooms',
    Object.keys(query).length > 0 ? query : undefined,
    token,
  );
};

const createClassroom = (payload: CreateClassroomPayload, token?: string) =>
  apiClient.post<Classroom>('/classrooms', payload, token);

const updateClassroom = (
  id: string,
  payload: UpdateClassroomPayload,
  token?: string,
) => apiClient.patch<Classroom>(`/classrooms/${id}`, payload, token);

export const classroomService = {
  getClassrooms,
  createClassroom,
  updateClassroom,
};
