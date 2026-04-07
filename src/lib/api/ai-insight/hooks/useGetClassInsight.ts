'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { aiInsightService } from '../ai-insight.service';

type Params = {
  classroomId: string;
  term: number;
  year: number;
};

export const useGetClassInsight = ({ classroomId, term, year }: Params) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['class-insight', classroomId, term, year],
    queryFn: () =>
      aiInsightService.getClassInsight(classroomId, term, year, session?.user?.accessToken),
    enabled: !!classroomId && !!session?.user?.accessToken,
  });
};
