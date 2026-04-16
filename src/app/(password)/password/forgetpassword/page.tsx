"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 text-sm">
        <div className="font-semibold text-blue-600">
          iSchool <span className="text-gray-400"></span>
        </div>

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
              No worries, it happens. Enter your institutional email to receive
              a password reset link.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-xs text-blue-600">EMAIL</Label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Mail size={16} className="text-gray-400 mr-2" />
                <Input
                  type="email"
                  placeholder="name@university.edu"
                  className="border-0 bg-transparent focus-visible:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Send Reset Link
              <Send size={16} />
            </Button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Log In
            </a>
          </p>

          {/* BOTTOM INFO */}
          <div className="flex justify-between mt-8 text-xs text-muted-foreground">
            <div>
              <p className="font-medium text-gray-700">Secure Recovery</p>
              <p>Multi-factor verification is required for reset.</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Need help?</p>
              <p>Contact the campus IT helpdesk for immediate aid.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="text-center text-xs text-gray-400 pb-6">
        <div className="space-x-4">
          <span>PRIVACY POLICY</span>
          <span>•</span>
          <span>TERMS OF SERVICE</span>
          <span>•</span>
          <span>HELP CENTER</span>
        </div>

        <p className="mt-2">iSchool</p>
        <p>© 2024 iSchool AI INSIGHT LAYER</p>
      </div>
    </div>
  );
}
