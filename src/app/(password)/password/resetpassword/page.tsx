"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password ไม่ตรงกัน");
      return;
    }

    console.log("New Password:", password);
    // TODO: call API reset password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 mb-3">
            🔒
          </div>
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">
            Please enter and confirm your new password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="text-xs text-gray-500">NEW PASSWORD</label>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mt-1">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-gray-500">RE-ENTER PASSWORD</label>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mt-1">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Hint */}
          <p className="text-xs text-gray-400">
            Your password must contain at least 8 characters
          </p>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
