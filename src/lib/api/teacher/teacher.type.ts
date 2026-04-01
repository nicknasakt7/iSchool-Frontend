export type Teacher = {
  id: string;
  email: string;
  password: string;
  gender: string;
  firstName: string;
  lastName: string;
  homeroomClassId?: string | null;
  profileImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
