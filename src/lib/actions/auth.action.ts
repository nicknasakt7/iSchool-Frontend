"use server";

import { ActionResult } from "@/lib/actions/action.type";
import { signIn, signOut } from "@/lib/auth/auth";
import { LoginInput } from "@/lib/schemas/auth.schema";

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn("credentials", { ...input, redirect: false });
  } catch {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }
  return { success: true };
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const requestResetPassword = async (
  token: string,
  password: string,
): Promise<ActionResult> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        code: data?.code || "RESET_PASSWORD_FAILED",
        message: data?.message || "Reset password failed",
      };
    }

    return {
      success: true,
      message: data?.message || "Password reset successfully",
    };
  } catch {
    return {
      success: false,
      code: "NETWORK_ERROR",
      message: "Unable to connect to server",
    };
  }
};
