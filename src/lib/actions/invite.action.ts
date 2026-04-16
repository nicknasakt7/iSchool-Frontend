"use server";

import { inviteService } from "../api/invite/invite.service";

export const inviteParent = async (email: string) => {
  try {
    await inviteService.inviteParent(email);
  } catch (error) {
    console.error("Invite failed:", error);
    throw error;
  }
};
