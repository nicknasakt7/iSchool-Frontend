'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { aiInsightService } from '../ai-insight.service';

export const useGetStudentInsight = (studentId: string, term: number, year: number) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['student-insight', studentId, term, year],
    queryFn: () =>
      aiInsightService.getStudentInsight(studentId, term, year, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken && !!studentId,
  });
};
