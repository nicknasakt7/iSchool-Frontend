import { apiClient } from '../client';
import { Classroom } from './classroom.type';

const getClassrooms = (gradeId?: string) =>
  apiClient.get<Classroom[]>(`/classrooms`, gradeId ? { gradeId } : undefined);

export const classroomService = {
  getClassrooms,
};
