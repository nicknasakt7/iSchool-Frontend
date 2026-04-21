'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getSchoolAttendanceSummary } from '../attendance.service';

export const useSchoolAttendanceSummary = () => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['school-attendance-summary'],
    queryFn: () => getSchoolAttendanceSummary(undefined, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
