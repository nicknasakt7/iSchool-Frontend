export type Subject = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateSubjectPayload = {
  name: string;
};

export type CreateManySubjectsPayload = {
  subjects: { name: string }[];
};

export type UpdateSubjectPayload = {
  name?: string;
};
