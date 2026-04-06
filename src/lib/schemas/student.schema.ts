import z from 'zod';

export const createStudentschema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  nickName: z.string().optional(),

  dob: z.string().min(1, 'Date of birth is required'),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    error: 'Gender is required',
  }),

  parentsFirstName: z.string().min(1, 'Parent first name is required'),
  parentsLastName: z.string().min(1, 'Parent last name is required'),

  parentsEmail: z
    .email('Invalid email format')
    .min(1, 'Parent email is required'),
  gradeId: z.string().min(1, 'Grade is required'),
  classId: z.string().optional(),

  favorite: z.string().optional(),
  healthNote: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof createStudentschema>;
