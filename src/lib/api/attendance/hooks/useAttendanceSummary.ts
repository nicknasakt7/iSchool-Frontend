'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getAttendanceSummary } from '../attendance.service';

type Options = {
  enabled?: boolean;
};

export const useAttendanceSummary = (classId: string, date?: string, options?: Options) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['attendance-summary', classId, date],
    queryFn: () => getAttendanceSummary(classId, date, session?.user?.accessToken),
    enabled:
      !!session?.user?.accessToken && !!classId && (options?.enabled ?? true),
  });
};
