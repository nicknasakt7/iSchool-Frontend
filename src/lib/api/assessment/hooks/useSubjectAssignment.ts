'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { assessmentService } from '../assessment.service';
import { FindSubjectAssignmentParams } from '../assessment.type';

export const useSubjectAssignment = (
  params: FindSubjectAssignmentParams | null,
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['subject-assignment', params?.classroomId, params?.subjectId],
    queryFn: () =>
      assessmentService.findSubjectAssignment(
        params!,
        session?.user?.accessToken,
      ),
    enabled: !!params && !!session?.user?.accessToken,
  });
};
