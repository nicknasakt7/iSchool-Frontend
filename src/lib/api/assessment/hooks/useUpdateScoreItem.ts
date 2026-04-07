'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { assessmentService } from '../assessment.service';
import { UpdateScoreItemDto } from '../assessment.type';

export const useUpdateScoreItem = () => {
  const { data: session } = useSession();

  return useMutation({
    // Backend expects { scoreItemId, value } — one item at a time
    mutationFn: (input: UpdateScoreItemDto) =>
      assessmentService.updateScoreItem(input, session?.user?.accessToken),
    onError: () => {
      toast.error('Failed to save score');
    },
  });
};
