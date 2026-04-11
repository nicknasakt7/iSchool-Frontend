export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export type CreateAttendanceDto = {
  records: {
    studentId: string;
    status: AttendanceStatus;
  }[];
  date?: string; // YYYY-MM-DD
};

export type AttendanceSummary = {
  total: number;
  present: number;
  absent: number;
};
