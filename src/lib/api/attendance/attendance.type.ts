export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export type CreateAttendanceDto = {
  records: {
    studentId: string;
    status: AttendanceStatus;
  }[];
};

export type AttendanceSummary = {
  total: number;
  present: number;
  absent: number;
};
