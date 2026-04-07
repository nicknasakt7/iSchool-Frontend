"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AdminFormValues } from "@/components/features/create/form/NewAdminForm";
import { adminService } from "../api/admin/admin.service";

export const createAdmin = async (input: FormData) => {
  try {
    await adminService.createAdmin(input);
    revalidatePath("/create/new-admin");
  } catch (error) {
    console.log("error", error);
  }
  redirect("/create/new-admin");
};
