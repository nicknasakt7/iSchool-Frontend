'use client';

import { useState } from 'react';
import InputField from './InputField';
import PasswordField from './PasswordField';
import InfoBox from './InfoBox';
import { CheckCircle } from 'lucide-react';

export default function ParentForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    lineId: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5">
      {/* NAME */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="FIRST NAME"
          required
          placeholder="First Name"
          value={form.firstName}
          onChange={(v) => handleChange('firstName', v)}
        />
        <InputField
          label="LAST NAME"
          required
          placeholder="Last Name"
          value={form.lastName}
          onChange={(v) => handleChange('lastName', v)}
        />
      </div>

      {/* EMAIL */}
      <InputField
        label="EMAIL ADDRESS"
        required
        placeholder="example@email.com"
        value={form.email}
        onChange={(v) => handleChange('email', v)}
      />

      {/* PASSWORD */}
      <PasswordField
        label="PASSWORD"
        required
        placeholder="Minimum 8 characters"
        value={form.password}
        onChange={(v) => handleChange('password', v)}
      />

      <PasswordField
        label="CONFIRM PASSWORD"
        required
        placeholder="Re-enter your password"
        value={form.confirmPassword}
        onChange={(v) => handleChange('confirmPassword', v)}
      />

      {/* PHONE */}
      <InputField
        label="PHONE NUMBER"
        required
        placeholder="0xx-xxx-xxxx"
        value={form.phone}
        onChange={(v) => handleChange('phone', v)}
      />

      {/* LINE */}
      <InputField
        label="LINE ID"
        placeholder="@yourlineid"
        hint="Line ID will be used for important notifications and updates"
        value={form.lineId}
        onChange={(v) => handleChange('lineId', v)}
      />

      {/* INFO BOX */}
      <InfoBox
        title="Student Information"
        text="Your account will be automatically linked to your student's record. You will receive access to payment history, academic updates, and school announcements."
      />

      {/* TERMS */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex gap-3">
        {/* ✅ ICON */}
        <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />

        {/* TEXT */}
        <p>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy. We will use your information solely for school-related
          communications and will never share it with third parties without your
          consent.
        </p>
      </div>

      {/* BUTTON */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Create Account
      </button>

      {/* SIGN IN */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <span className="text-blue-600 font-medium cursor-pointer">
          Sign in here
        </span>
      </p>
    </div>
  );
}
