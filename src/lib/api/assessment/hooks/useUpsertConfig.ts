'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { assessmentService } from '../assessment.service';
import { UpsertAssessmentConfigDto } from '../assessment.type';

export const useUpsertConfig = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (input: UpsertAssessmentConfigDto) =>
      assessmentService.createOrUpdateConfig(input, session?.user?.accessToken),
    onError: () => {
      toast.error('Failed to save assessment config');
    },
  });
};
