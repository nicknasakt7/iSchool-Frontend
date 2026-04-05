'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { assessmentService } from '../assessment.service';
import { CreateAssessmentGroupDto } from '../assessment.type';

export const useCreateAssessmentGroup = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (body: CreateAssessmentGroupDto) =>
      assessmentService.createAssessmentGroup(
        body,
        session?.user?.accessToken,
      ),
  });
};
