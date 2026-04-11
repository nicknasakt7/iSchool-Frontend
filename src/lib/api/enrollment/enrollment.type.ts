export type EnrollmentStatus =
  | 'ACTIVE'
  | 'PROMOTED'
  | 'REPEATED'
  | 'TRANSFERRED';

export type EnrollmentStudent = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  nickName: string;
  profileImageUrl?: string | null;
};

export type EnrollmentGrade = {
  id: string;
  name: string;
  level: number;
};

export type EnrollmentClassroom = {
  id: string;
  name: string;
  year?: number | null;
  term?: number | null;
};

export type EnrollmentRecord = {
  id: string;
  studentId: string;
  gradeId: string;
  classroomId: string | null;
  year: number;
  term: number;
  status: EnrollmentStatus;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  student: EnrollmentStudent;
  grade: EnrollmentGrade;
  classroom: EnrollmentClassroom | null;
};

// นักเรียนที่ดึงมาสำหรับหน้า Promotion
// อาจเป็น EnrollmentRecord (มี year/term) หรือ Student ตรงๆ
export type PromotionStudent = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  nickName: string;
  profileImageUrl?: string | null;
  gradeId: string;
  classId?: string | null;
  grade?: EnrollmentGrade | null;
  classroom?: EnrollmentClassroom | null;
};

export type StudentPromotionItem = {
  studentId: string;
  outcome: EnrollmentStatus;
  targetGradeId?: string;
  targetClassroomId?: string;
};

export type BulkPromotePayload = {
  sourceYear: number;
  sourceTerm: number;
  targetYear: number;
  targetTerm: number;
  students: StudentPromotionItem[];
};

export type PromoteResult = {
  promoted: number;
  skipped: number;
  results: EnrollmentRecord[];
  skippedStudentIds: string[];
};
