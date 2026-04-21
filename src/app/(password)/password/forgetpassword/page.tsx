"use client";

import { useState, useTransition } from "react";
import { Mail, Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestForgotPassword } from "@/lib/actions/auth.action";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await requestForgotPassword(email);
      if (!res.success) {
        setErrorMsg(res.message ?? "Failed to send reset link");
        return;
      }
      setDone(true);
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 text-sm">
        <div className="font-semibold text-blue-600">iSchool</div>
        <a href="/login" className="text-blue-600">
          ← Back to Login
        </a>
      </div>

      {/* CENTER CARD */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] p-8 shadow-md">
          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="text-blue-600" size={20} />
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Forgot Password?</h1>
            <p className="text-sm text-muted-foreground mt-1">
              No worries, it happens. Enter your email to receive a password
              reset link.
            </p>
          </div>

          {done ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <p className="text-sm font-semibold text-emerald-800">
                Reset link sent!
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-700">
                If that email exists in our system, you'll receive a password
                reset link shortly. Please check your inbox.
              </p>
              <a
                href="/login"
                className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Back to Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs text-blue-600">EMAIL</Label>
                <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                  <Mail size={16} className="text-gray-400 mr-2 shrink-0" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
                  <p className="text-sm font-medium text-rose-700">{errorMsg}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <Send size={16} />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 pb-6">
        <p className="mt-2">iSchool</p>
        <p>© 2024 iSchool AI INSIGHT LAYER</p>
      </div>
    </div>
  );
}
