'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { assessmentService } from '../assessment.service';
import { ApplyConfigDto } from '../assessment.type';

export const useApplyAssessment = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (input: ApplyConfigDto) =>
      assessmentService.applyAssessment(input, session?.user?.accessToken),
    onSuccess: () => {
      toast.success('Assessment applied to class');
    },
    onError: () => {
      toast.error('Failed to apply assessment to class');
    },
  });
};
