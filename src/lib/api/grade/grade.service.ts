import { apiClient } from '../client';
import { Grade } from './grade.type';

const getGrades = (token?: string) =>
  apiClient.get<Grade[]>('/grades', undefined, token);

export const gradeService = { getGrades };
