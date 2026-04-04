export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Teacher = {
  id: string;
  email: string;
  password: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  homeroomClassId?: string | null;
  profileImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TeacherResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  homeroomClassId?: string | null;
  profileImageUrl?: string | null;

  subjects?: {
    subjectName?: string;
    className?: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
};

export type TeacherListResponse = {
  data: TeacherResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
