'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { studentService } from '../student.service';

export const useGpaDistribution = (params?: { term?: number; year?: number }) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['gpa-distribution', params?.term, params?.year],
    queryFn: () => studentService.getGpaDistribution(params, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
