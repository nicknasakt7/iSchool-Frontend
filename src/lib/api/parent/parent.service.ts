import { ParentFormValues } from "@/components/features/homepage/parents-registration/ParentForm";
import { Parent, ParentAdminListResponse } from "./parent.type";
import { api } from "../api-server";
import { apiClient } from "../client";

const createParent = (input: ParentFormValues) => {
  const { token, confirmPassword, ...body } = input;
  return api.post<Parent>(`/invites/register-parent?token=${token}`, body);
};

const getParents = (
  params?: { search?: string; page?: number; limit?: number },
  token?: string,
) => apiClient.get<ParentAdminListResponse>("/parents", params, token);

export const parentService = { createParent, getParents };
