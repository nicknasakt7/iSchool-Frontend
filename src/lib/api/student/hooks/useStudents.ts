'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { studentService } from '../student.service';
import { useSession } from 'next-auth/react';

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  gradeId?: string;
  classId?: string;
};

type Options = {
  enabled?: boolean;
  keepPreviousData?: boolean;
};

export const useStudents = (params: Params, options?: Options) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [
      'students',
      params.page,
      params.limit,
      params.search,
      params.gradeId,
      params.classId,
    ],
    queryFn: async () => {
      const res = await studentService.getStudents(
        params,
        session?.user?.accessToken,
      );
      return res;
    },
    enabled: !!session?.user?.accessToken && (options?.enabled ?? true),
    placeholderData: options?.keepPreviousData ? keepPreviousData : undefined,
  });
};
