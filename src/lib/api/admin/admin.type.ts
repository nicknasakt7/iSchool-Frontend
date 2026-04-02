export type role = "ADMIN";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Admin = {
  id: string;
  email: string;
  password: string;
  role: role;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
};
