import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { teacherService } from '../teacher.service';

export const useUpdateTeacher = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        gender?: string;
        homeroomClassId?: string | null;
      };
    }) =>
      teacherService.updateTeacher(id, data, session?.user?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });
};
