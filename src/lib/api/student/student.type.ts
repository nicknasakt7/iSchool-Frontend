export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SchoolSummary = {
  total: number;
  byGrade: { gradeId: string; gradeName: string; gradeLevel: number; count: number }[];
};

export type AtRiskStudent = {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  gradeName: string;
  classroomName: string;
  subjects: { name: string; grade: number }[];
  avgGrade: number;
};

export type AtRiskSummary = {
  count: number;
  students: AtRiskStudent[];
  term: number;
  year: number;
};

export type GpaDistribution = {
  term: number;
  year: number;
  distribution: { label: string; count: number }[];
};

export type SchoolAttendanceSummary = {
  total: number;
  present: number;
  absent: number;
};

export type ParentInStudent = {
  id: string;
  firstName: string;
  lastName: string;
  tel?: string | null;
};

export type Student = {
  id: string;
  studentCode: string;

  firstName: string;
  lastName: string;
  nickName: string;

  dob: string;
  gender: Gender;

  parentsFirstName: string;
  parentsLastName: string;
  parentsEmail: string;

  gradeId: string;
  classId?: string | null;

  favorite?: string | null;
  healthNote?: string | null;

  profileImageUrl?: string | null;

  parentId?: string | null;
  parent?: ParentInStudent | null;

  createdAt: string;
  updatedAt: string;
};

export type ParentMatchCandidate = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  tel: string | null;
  lineId: string | null;
};

export type ParentMatchResult = {
  studentId: string;
  studentName: string;
  parentsEmail: string;
  alreadyMatched: boolean;
  currentParent: { id: string; firstName: string; lastName: string; email: string | null } | null;
  matchFound: boolean;
  candidate: ParentMatchCandidate | null;
};

export type StudentListResponse = {
  data: Student[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

// ========================
// Student Detail (with scores + comments)
// ========================

export type SubjectInDetail = {
  id: string;
  name: string;
};

export type TeacherInDetail = {
  id: string;
  firstName: string;
  lastName: string;
};

export type ScoreInDetail = {
  id: string;
  subjectId: string;
  totalScore: number;
  subjectGrade: number;
  term: number;
  year: number;
  subject: SubjectInDetail;
};

export type CommentInDetail = {
  id: string;
  content: string;
  subjectId: string;
  teacherId: string;
  term: number;
  year: number;
  createdAt: string;
  subject: SubjectInDetail;
  teacher: TeacherInDetail;
};

export type GradeInDetail = {
  id: string;
  name: string;
};

export type ClassroomInDetail = {
  id: string;
  name: string;
};

export type EnrollmentStatus = 'ACTIVE' | 'PROMOTED' | 'REPEATED' | 'TRANSFERRED';

export type EnrollmentHistoryInDetail = {
  id: string;
  year: number;
  term: number;
  status: EnrollmentStatus;
  startDate: string | null;
  endDate: string | null;
  grade: GradeInDetail;
  classroom: ClassroomInDetail | null;
};

export type StudentDetail = Student & {
  grade?: GradeInDetail | null;
  classroom?: ClassroomInDetail | null;
  scores: ScoreInDetail[];
  comments: CommentInDetail[];
  studentEnrollments: EnrollmentHistoryInDetail[];
};
