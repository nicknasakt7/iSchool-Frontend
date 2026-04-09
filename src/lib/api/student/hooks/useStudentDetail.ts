'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { studentService } from '../student.service';

export const useStudentDetail = (
  studentId: string,
  params?: { term?: number; year?: number },
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['student-detail', studentId, params?.term, params?.year],
    queryFn: () =>
      studentService.getStudentById(studentId, params, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken && !!studentId,
  });
};
