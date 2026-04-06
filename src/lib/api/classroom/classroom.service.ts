import { apiClient } from '../client';
import { Classroom, CreateClassroomPayload, UpdateClassroomPayload } from './classroom.type';

const getClassrooms = (gradeId?: string, token?: string) =>
  apiClient.get<Classroom[]>('/classrooms', gradeId ? { gradeId } : undefined, token);

const createClassroom = (payload: CreateClassroomPayload, token?: string) =>
  apiClient.post<Classroom>('/classrooms', payload, token);

const updateClassroom = (id: string, payload: UpdateClassroomPayload, token?: string) =>
  apiClient.patch<Classroom>(`/classrooms/${id}`, payload, token);

export const classroomService = {
  getClassrooms,
  createClassroom,
  updateClassroom,
};
