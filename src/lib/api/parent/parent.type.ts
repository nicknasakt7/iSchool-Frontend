export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Role = "PARENTS";

export type Parent = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tel: string;
  lineId: string;
  token: string;
  role: Role;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
};

export type ParentAdmin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel?: string | null;
  lineId?: string | null;
  students?: { id: string; firstName: string; lastName: string }[];
};

export type ParentAdminListResponse = {
  data: ParentAdmin[];
  meta: { total: number; page: number; limit: number };
};

export type MyStudent = {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  nickName: string;
  dob: string;
  gender: string;
  profileImageUrl?: string | null;
  gradeId: string;
  classId?: string | null;
  parentsEmail: string;
  parentsFirstName: string;
  parentsLastName: string;
  favorite?: string | null;
  healthNote?: string | null;
  grade?: { id: string; name: string; level: number } | null;
  classroom?: { id: string; name: string } | null;
};
