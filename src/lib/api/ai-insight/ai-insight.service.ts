import { apiClient } from '../client';
import { ClassInsightData } from './ai-insight.type';

// API calls are abstracted in service layer — consumed by TanStack Query hooks
export const aiInsightService = {
  // GET /ai-insight/class/:classroomId — fetch existing insight (null if not yet generated)
  getClassInsight: (classroomId: string, term: number, year: number, token?: string) =>
    apiClient.get<ClassInsightData | null>(`/ai-insight/class/${classroomId}`, { term, year }, token),

  // POST /ai-insight/class/:classroomId — generates AI class performance insight
  generateClassInsight: (classroomId: string, term: number, year: number, token?: string) =>
    apiClient.post<ClassInsightData>(`/ai-insight/class/${classroomId}?term=${term}&year=${year}`, undefined, token),
};
