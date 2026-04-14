'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { teacherService } from '../teacher.service';

export const useTeacherSummary = () => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['teacher-summary'],
    queryFn: () => teacherService.getTeacherSummary(session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
