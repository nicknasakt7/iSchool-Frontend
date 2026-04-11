import { apiClient } from '../client';
import {
  Subject,
  CreateSubjectPayload,
  CreateManySubjectsPayload,
  UpdateSubjectPayload,
} from './subject.type';

const getSubjects = (token?: string) =>
  apiClient.get<Subject[]>('/subjects', undefined, token);

const createSubject = (payload: CreateSubjectPayload, token?: string) =>
  apiClient.post<Subject>('/subjects', payload, token);

const createManySubjects = (
  payload: CreateManySubjectsPayload,
  token?: string,
) => apiClient.post<Subject[]>('/subjects/many', payload, token);

const updateSubject = (
  id: string,
  payload: UpdateSubjectPayload,
  token?: string,
) => apiClient.patch<Subject>(`/subjects/${id}`, payload, token);

const deleteSubject = (id: string, token?: string) =>
  apiClient.delete<void>(`/subjects/${id}`, token);

export const subjectService = {
  getSubjects,
  createSubject,
  createManySubjects,
  updateSubject,
  deleteSubject,
};
