"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^[a-zA-Z0-9]+$/, "Use only English letters and numbers"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (input: ResetPasswordInput) => {
    setApiError(null);
    // try {
    //   await requestResetPassword(token, input.password);
    //   await signOut({ redirect: false });
    //   setDone(true);
    // } catch (error) {
    //   setApiError(error instanceof Error ? error.message : "Request failed");
    // }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.20),_transparent_30%),linear-gradient(to_bottom,_#0f172a,_#020617)]" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-2">
          {/* left panel */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-10 text-white lg:flex">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 font-bold">
                  i
                </div>
                iSchool Security
              </div>

              <h1 className="mt-8 text-4xl font-black leading-tight">
                Reset your password
                <br />
                securely
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-blue-50/90">
                Create a new password to regain access to your iSchool account.
                Keep your account secure by choosing a strong password that is
                easy for you to remember.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold">Password tips</p>
              <ul className="mt-3 space-y-2 text-sm text-blue-50/90">
                <li>• Use at least 6 characters</li>
                <li>• Use English letters and numbers only</li>
                <li>• Avoid using easy-to-guess passwords</li>
              </ul>
            </div>
          </div>

          {/* right panel */}
          <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                  iSchool Security
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Set new password
                </p>

                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  Create your new password
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Please enter a new password for your account.
                </p>
              </div>

              {!token ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-semibold text-amber-800">
                    Missing reset token
                  </p>
                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    Please open this page directly from the reset link sent to
                    your email.
                  </p>
                </div>
              ) : done ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-semibold text-emerald-800">
                    Password updated successfully
                  </p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Your password has been changed. You can now sign in with
                    your new password.
                  </p>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Go to sign in
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      New password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      {...register("password")}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 ${
                        errors.password
                          ? "border-rose-300 bg-rose-50 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 bg-slate-50 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      }`}
                    />
                    {errors.password ? (
                      <p className="mt-2 text-sm font-medium text-rose-600">
                        {errors.password.message}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">
                        Must be at least 6 characters and use only letters and
                        numbers.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter your new password"
                      {...register("confirmPassword")}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 ${
                        errors.confirmPassword
                          ? "border-rose-300 bg-rose-50 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 bg-slate-50 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      }`}
                    />
                    {errors.confirmPassword ? (
                      <p className="mt-2 text-sm font-medium text-rose-600">
                        {errors.confirmPassword.message}
                      </p>
                    ) : null}
                  </div>

                  {apiError ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
                      <p className="text-sm font-medium text-rose-700">
                        {apiError}
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Updating..." : "Update password"}
                  </button>
                </form>
              )}

              <div className="mt-8 border-t border-slate-200 pt-6">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-sky-700 transition hover:text-sky-800"
                >
                  ← Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
