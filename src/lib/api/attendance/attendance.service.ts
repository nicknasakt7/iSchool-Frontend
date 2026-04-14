import { apiClient } from '../client';
import { AttendanceSummary, CreateAttendanceDto } from './attendance.type';

export const takeAttendance = (body: CreateAttendanceDto, token?: string) =>
  apiClient.post('/attendance', body, token);

export const getAttendanceSummary = (classId: string, date?: string, token?: string) =>
  apiClient.get<AttendanceSummary>(
    '/attendance/summary',
    { classId, ...(date ? { date } : {}) },
    token,
  );

export const getSchoolAttendanceSummary = (date?: string, token?: string) =>
  apiClient.get<AttendanceSummary>(
    '/attendance/school-summary',
    date ? { date } : undefined,
    token,
  );
