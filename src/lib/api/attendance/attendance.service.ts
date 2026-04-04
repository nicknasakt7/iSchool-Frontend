import { apiClient } from '../client';

export type TakeAttendanceBody = {
  records: {
    studentId: string;
    status: 'PRESENT' | 'ABSENT';
  }[];
};

export const takeAttendance = (body: TakeAttendanceBody) =>
  apiClient.post('/attendance', body);

export const getAttendanceSummary = (classId: string) =>
  apiClient.get('/attendance/summary', { classId });
