import { api } from "../api-server";

export const inviteService = {
  inviteParent: (email: string) => {
    return api.post("/invite/parent", { email });
  },
};
