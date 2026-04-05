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
