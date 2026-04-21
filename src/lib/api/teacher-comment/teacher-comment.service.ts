import { apiClient } from '../client';
import { TeacherComment, UpsertCommentBody } from './teacher-comment.type';

export const teacherCommentService = {
  // GET /teacher-comments?studentId=&subjectId=&term=&year=
  getComment: (
    studentId: string,
    subjectId: string,
    term: number,
    year: number,
    token?: string,
  ) =>
    apiClient.get<TeacherComment | null>(
      '/teacher-comments',
      { studentId, subjectId, term, year },
      token,
    ),

  // POST /teacher-comments
  upsertComment: (body: UpsertCommentBody, token?: string) =>
    apiClient.post<TeacherComment>('/teacher-comments', body, token),
};
