import { apiClient } from '../client';
import { Subject } from './subject.type';

const getSubjects = (token?: string) =>
  apiClient.get<Subject[]>('/subjects', undefined, token);

export const subjectService = {
  getSubjects,
};
