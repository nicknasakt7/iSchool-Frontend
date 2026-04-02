import { ParentFormValues } from "@/components/features/homepage/parents-registration/ParentForm";
import { api } from "../client";
import { Parent } from "./parent.type";

const createParent = (input: ParentFormValues) => {
  const { confirmPassword, ...res } = input;
  return api.post<Parent>("/auth/register-parent", res);
};

export const parentService = { createParent };
