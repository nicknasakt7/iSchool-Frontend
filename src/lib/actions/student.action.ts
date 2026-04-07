'use server';

import { studentService } from '../api/student/student.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { StudentFormValues } from '../schemas/student.schema';

export const createStudent = async (input: FormData) => {
  try {
    await studentService.createStudent(input);
    revalidatePath('/create/new-entry');
  } catch (error) {
    console.log('error', error);
  }
  redirect('/create/new-entry');
};
