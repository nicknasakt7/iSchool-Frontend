'use server';

import { studentService } from '../api/student/student.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../auth/auth';

export const createStudent = async (input: FormData) => {
  const session = await auth();
  const token = session?.user?.accessToken;

  try {
    await studentService.createStudent(input, token);
    revalidatePath('/create/new-entry');
  } catch (error) {
    console.log('error', error);
  }
  redirect('/create/new-entry');
};
