import { UUID } from "crypto";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Student = {
  id: string;
  studentCode: UUID;
  firstName: string;
  lastName: string;
  nickname: string;
  dob: string;
  gender: Gender;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  grade: string;
  classroom?: string | null;
  favorite?: string | null;
  health?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
