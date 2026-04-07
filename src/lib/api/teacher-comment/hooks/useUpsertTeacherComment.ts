'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { teacherCommentService } from '../teacher-comment.service';
import { UpsertCommentBody } from '../teacher-comment.type';

export const useUpsertTeacherComment = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpsertCommentBody) =>
      teacherCommentService.upsertComment(body, session?.user?.accessToken),
    onSuccess: (data, { studentId, subjectId, term, year }) => {
      queryClient.setQueryData(['teacher-comment', studentId, subjectId, term, year], data);
      toast.success('บันทึก comment เรียบร้อย');
    },
    onError: () => {
      toast.error('ไม่สามารถบันทึก comment ได้');
    },
  });
};
