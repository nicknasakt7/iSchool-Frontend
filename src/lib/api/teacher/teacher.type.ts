export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Role = "TEACHER";

export type Teacher = {
  id: string;
  email: string;
  password: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  homeroomClassId?: string | null;
  profileImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type HomeroomClassInTeacher = {
  id: string;
  name: string;
  gradeId: string;
  gradeLevel: number;
  gradeName: string;
};

export type TeacherSubjectAssignment = {
  id: string;
  subjectId: string;
  classId: string;
  subjectName?: string | null;
  className?: string | null;
};

export type TeacherResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  homeroomClassId?: string | null;
  homeroomClass?: HomeroomClassInTeacher | null;
  profileImageUrl?: string | null;
  subjects?: TeacherSubjectAssignment[];
  createdAt: Date;
  updatedAt: Date;
};

export type TeacherSummary = {
  total: number;
  bySubject: { subjectId: string; subjectName: string; count: number }[];
  byClassroom: { classroomId: string; classroomName: string; gradeName: string; gradeLevel: number; count: number }[];
};

export type TeacherListResponse = {
  data: TeacherResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
