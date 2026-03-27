// "use client";

// import { useState } from "react";
// import { Lock } from "lucide-react";

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Password is don't match");
//       return;
//     }

//     console.log("New Password:", password);
//     // TODO: call API reset password
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
//         {/* Title */}
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 mb-3">
//             🔒
//           </div>
//           <h1 className="text-2xl font-semibold">Reset Password</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Please enter and confirm your new password
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* New Password */}
//           <div>
//             <label className="text-xs text-gray-500 gap-2 ">NEW PASSWORD</label>
//             <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mt-2">
//               <Lock size={16} className="text-gray-400 mr-2" />
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="bg-transparent outline-none w-full text-sm"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="text-xs text-gray-500 ">RE-ENTER PASSWORD</label>
//             <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mt-2">
//               <Lock size={16} className="text-gray-400 mr-2" />
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="bg-transparent outline-none w-full text-sm"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Hint */}
//           <p className="text-xs text-gray-400">
//             Your password must contain at least 8 characters
//           </p>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
//           >
//             Reset Password
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Remember your password?{" "}
//           <a href="/login" className="text-blue-600 font-medium">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Lock, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    console.log(password);
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

      {/* CARD CENTER */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] p-8 shadow-md">
          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="text-blue-600" size={20} />
            </div>
          </div>

          {/* TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Please enter and confirm your new password below to secure your
              account.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PASSWORD */}
            <div>
              <Label className="text-xs text-blue-600">NEW PASSWORD</Label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Lock size={16} className="text-gray-400 mr-2" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-0 bg-transparent focus-visible:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <Label className="text-xs text-blue-600">RE-ENTER PASSWORD</Label>
              <div className="mt-2 flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Lock size={16} className="text-gray-400 mr-2" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-0 bg-transparent focus-visible:ring-0"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Your password must contain at least 8 characters in length
            </p>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Reset Password
              <CheckCircle size={16} />
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
              <p>Multi-factor verification is required</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Need help?</p>
              <p>Contact the campus IT helpdesk</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-gray-400 pb-6">
        © 2024 iSchool AI INSIGHT LAYER
      </div>
    </div>
  );
}
