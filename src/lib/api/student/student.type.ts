import { UUID } from "crypto";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Student = {
  id: string;
  studentCode: UUID;
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
  createdAt: Date;
  updatedAt: Date;
};
