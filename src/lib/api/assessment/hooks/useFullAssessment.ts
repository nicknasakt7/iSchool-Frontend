'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { assessmentService } from '../assessment.service';
import { GetAssessmentConfigParams } from '../assessment.type';

export const useFullAssessment = (params: GetAssessmentConfigParams | null) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [
      'full-assessment',
      params?.classroomId,
      params?.subjectId,
      params?.term,
      params?.year,
    ],
    queryFn: () =>
      assessmentService.getFullAssessment(params!, session?.user?.accessToken),
    enabled: !!params && !!session?.user?.accessToken,
  });
};
