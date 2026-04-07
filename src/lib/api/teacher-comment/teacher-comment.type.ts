export type TeacherComment = {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  term: number;
  year: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type UpsertCommentBody = {
  studentId: string;
  subjectId: string;
  term: number;
  year: number;
  content: string;
};
