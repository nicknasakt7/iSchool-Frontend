import { apiClient } from '../client';
import { ClassInsightData } from './ai-insight.type';

// API calls are abstracted in service layer — consumed by TanStack Query hooks
export const aiInsightService = {
  // POST /ai-insight/class/:classroomId — generates AI class performance insight
  generateClassInsight: (classroomId: string, token?: string) =>
    apiClient.post<ClassInsightData>(`/ai-insight/class/${classroomId}`, undefined, token),
};
