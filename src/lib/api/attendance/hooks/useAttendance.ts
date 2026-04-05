'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { takeAttendance } from '../attendance.service';
import { CreateAttendanceDto } from '../attendance.type';

export const useAttendance = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (body: CreateAttendanceDto) =>
      takeAttendance(body, session?.user?.accessToken),
  });
};
