import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { enrollmentService } from '../enrollment.service';

type Params = {
  studentId?: string;
  gradeId?: string;
  classroomId?: string;
  year?: number;
  term?: number;
  enabled?: boolean;
};

export const useEnrollmentHistory = (params: Params) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: [
      'enrollment-history',
      params.studentId,
      params.gradeId,
      params.classroomId,
      params.year,
      params.term,
    ],
    queryFn: () =>
      enrollmentService.getHistory(
        {
          studentId: params.studentId,
          gradeId: params.gradeId,
          classroomId: params.classroomId,
          year: params.year,
          term: params.term,
        },
        token,
      ),
    enabled: (params.enabled ?? true) && !!token,
  });
};
