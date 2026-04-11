import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { enrollmentService } from '../enrollment.service';

type Params = {
  gradeId?: string;
  classroomId?: string;
  year?: number;
  term?: number;
  enabled?: boolean;
};

export const useEnrollmentStudents = (params: Params) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: [
      'enrollment-students',
      params.gradeId,
      params.classroomId,
      params.year,
      params.term,
    ],
    queryFn: () =>
      enrollmentService.getStudentsForPromotion(
        {
          gradeId: params.gradeId,
          classroomId: params.classroomId,
          year: params.year,
          term: params.term,
        },
        token,
      ),
    enabled: (params.enabled ?? true) && !!token && !!params.gradeId,
  });
};
