import { apiClient } from '../client';
import { ClassInsightData, StudentInsightData } from './ai-insight.type';

// API calls are abstracted in service layer — consumed by TanStack Query hooks
export const aiInsightService = {
  // GET /ai-insight/class/:classroomId — fetch existing insight (null if not yet generated)
  getClassInsight: (classroomId: string, term: number, year: number, token?: string) =>
    apiClient.get<ClassInsightData | null>(`/ai-insight/class/${classroomId}`, { term, year }, token),

  // POST /ai-insight/class/:classroomId — generates AI class performance insight
  generateClassInsight: (classroomId: string, term: number, year: number, token?: string) =>
    apiClient.post<ClassInsightData>(`/ai-insight/class/${classroomId}?term=${term}&year=${year}`, undefined, token),

  // GET /ai-insight/student/:studentId — fetch existing student insight
  getStudentInsight: (studentId: string, term: number, year: number, token?: string) =>
    apiClient.get<StudentInsightData | null>(`/ai-insight/student/${studentId}`, { term, year }, token),

  // POST /ai-insight/student/:studentId — generate student insight
  generateStudentInsight: (studentId: string, term: number, year: number, token?: string) =>
    apiClient.post<StudentInsightData>(`/ai-insight/student/${studentId}?term=${term}&year=${year}`, undefined, token),
};
