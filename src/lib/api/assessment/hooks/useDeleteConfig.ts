'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { assessmentService } from '../assessment.service';

export const useDeleteConfig = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (configId: string) =>
      assessmentService.deleteAssessmentConfig(configId, session?.user?.accessToken),
    onSuccess: () => {
      toast.success('Score item removed');
    },
    onError: () => {
      toast.error('Failed to delete assessment config');
    },
  });
};
