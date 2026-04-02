import { AdminFormValues } from "@/components/features/create/form/NewAdminForm";
import { api } from "../client";
import { Admin } from "./admin.type";

const createAdmin = (input: AdminFormValues) =>
  api.post<Admin>("/users", input);

export const adminService = { createAdmin };
