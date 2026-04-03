"use server";

import { ParentFormValues } from "@/components/features/homepage/parents-registration/ParentForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parentService } from "../api/parent/parent.service";

export const createParent = async (input: ParentFormValues) => {
  try {
    await parentService.createParent(input);
    revalidatePath("/parents-registration");
  } catch (error) {
    console.log("error", error);
  }
  redirect("/parents-registration");
};
