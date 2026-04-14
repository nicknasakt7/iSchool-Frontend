'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { studentService } from '../student.service';

export const useSchoolSummary = () => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['school-summary'],
    queryFn: () => studentService.getSchoolSummary(session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
