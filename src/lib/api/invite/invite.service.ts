import { api } from "../api-server";

export const inviteService = {
  inviteParent: (email: string) => {
    return api.post("/invites/parent", { email });
  },
};
