'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { studentService } from '../student.service';

export const useAtRiskStudents = (params?: { term?: number; year?: number }) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['at-risk-students', params?.term, params?.year],
    queryFn: () => studentService.getAtRiskStudents(params, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
