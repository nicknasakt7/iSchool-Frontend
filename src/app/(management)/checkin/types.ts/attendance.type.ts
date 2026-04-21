import { AttendanceStatus } from '@/lib/api/attendance/attendance.type';

export type AttendanceState = {
  [studentId: string]: AttendanceStatus;
};
