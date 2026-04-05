import { ParentFormValues } from "@/components/features/homepage/parents-registration/ParentForm";
import { Parent } from "./parent.type";
import { api } from "../api-server";

const createParent = (input: ParentFormValues) => {
  const { confirmPassword, ...res } = input;
  return api.post<Parent>("/auth/register-parent", res);
};

export const parentService = { createParent };
