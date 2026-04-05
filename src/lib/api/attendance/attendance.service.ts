import { apiClient } from '../client';
import { AttendanceSummary, CreateAttendanceDto } from './attendance.type';

export const takeAttendance = (body: CreateAttendanceDto, token?: string) =>
  apiClient.post('/attendance', body, token);

export const getAttendanceSummary = (classId: string, token?: string) =>
  apiClient.get<AttendanceSummary>('/attendance/summary', { classId }, token);
