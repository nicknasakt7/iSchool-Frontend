export type Gender = "MALE" | "FEMALE" | "OTHER";

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
