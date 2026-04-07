'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { teacherCommentService } from '../teacher-comment.service';

type Params = {
  studentId: string;
  subjectId: string;
  term: number;
  year: number;
};

export const useGetTeacherComment = ({ studentId, subjectId, term, year }: Params) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['teacher-comment', studentId, subjectId, term, year],
    queryFn: () =>
      teacherCommentService.getComment(studentId, subjectId, term, year, session?.user?.accessToken),
    enabled: !!studentId && !!subjectId && !!session?.user?.accessToken,
  });
};
