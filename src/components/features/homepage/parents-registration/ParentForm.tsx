"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Info } from "lucide-react";
import { z } from "zod";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import { createParent } from "@/lib/actions/parent.action";

const schema = z
  .object({
    token: z.string(),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    tel: z.string(),
    lineId: z.string(),
    confirmPassword: z.string().min(6, "Min 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ParentFormValues = z.infer<typeof schema>;

export default function ParentForm({ token }: { token: string }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      token,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      lineId: "",
      tel: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ParentFormValues) => {
    startTransition(async () => {
      try {
        await createParent(data);
        reset();
      } catch (error) {
        console.error("Submit failed:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <InputField
              label="First Name"
              required
              placeholder="First name"
              value={field.value}
              onChange={field.onChange}
              error={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <InputField
              label="Last Name"
              required
              placeholder="Last name"
              value={field.value}
              onChange={field.onChange}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputField
            label="Email Address"
            required
            placeholder="example@email.com"
            value={field.value}
            onChange={field.onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordField
            label="Password"
            required
            placeholder="Minimum 6 characters"
            value={field.value}
            onChange={field.onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <PasswordField
            label="Confirm Password"
            required
            placeholder="Re-enter your password"
            value={field.value}
            onChange={field.onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="tel"
        render={({ field }) => (
          <InputField
            label="Phone Number"
            required
            placeholder="0xx-xxx-xxxx"
            value={field.value}
            onChange={field.onChange}
            error={errors.tel?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lineId"
        render={({ field }) => (
          <InputField
            label="Line ID"
            placeholder="@yourlineid"
            hint="Line ID will be used for important notifications and updates"
            value={field.value}
            onChange={field.onChange}
            error={errors.lineId?.message}
          />
        )}
      />

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 text-blue-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-blue-700">
              Student Information
            </p>
            <p className="text-sm leading-6 text-blue-700/90">
              Your account will be automatically linked to your student’s
              record. You will receive access to payment history, academic
              updates, and school announcements.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
          <p className="text-sm leading-6 text-slate-700">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy. We will use your information solely for
            school-related communications and will never share it with third
            parties without your consent.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </form>
  );
}
