export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Student = {
  id: string;
  studentCode: string;

  firstName: string;
  lastName: string;
  nickName: string;

  dob: string;
  gender: Gender;

  parentsFirstName: string;
  parentsLastName: string;
  parentsEmail: string;

  gradeId: string;
  classId?: string | null;

  favorite?: string | null;
  healthNote?: string | null;

  profileImageUrl?: string | null;

  createdAt: string;
  updatedAt: string;
};

export type StudentListResponse = {
  data: Student[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
