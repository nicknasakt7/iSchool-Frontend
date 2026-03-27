"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string>();

  const handleSubmit = async () => {
    setError("");

    if (!email) {
      setError("Enter Your Email");
      return;
    }

    // ❗ เช็ค email format
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      setError("email  email address was entered incorrectly");
      return;
    }

    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        {/* ICON */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
          🔐
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password?
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          No worries, it happens. Enter your email to reset password.
        </p>

        {/* INPUT */}
        <div className="text-left mb-8">
          <label className="text-xs text-gray-500 font-medium">EMAIL</label>

          <div className="mt-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <span className="text-gray-400 mr-2">@</span>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          {/*  error show ตรงนี้ */}
          {error && <p className="text-red-500 text-sm mt-2">❌ {error}</p>}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className=" flex justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium transition disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Reset Link "}{" "}
          <ArrowRight />
        </button>

        {/* BACK TO LOGIN */}
        <p className="text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
