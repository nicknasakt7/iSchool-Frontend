'use client';

// Using TanStack Query for query lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { assessmentService } from '../assessment.service';
import { GetAssessmentConfigParams } from '../assessment.type';

export const useAssessmentConfig = (
  params: GetAssessmentConfigParams | null,
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [
      'assessment-config',
      params?.classroomId,
      params?.subjectId,
      params?.term,
      params?.year,
    ],
    queryFn: () =>
      assessmentService.getAssessmentConfig(
        params!,
        session?.user?.accessToken,
      ),
    enabled: !!params && !!session?.user?.accessToken,
  });
};
