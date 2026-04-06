"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import InfoBox from "./InfoBox";
import { createParent } from "@/lib/actions/parent.action";
// import { createParent } from "@/lib/actions/parent.action";

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

  console.log("errors", errors);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ParentFormValues) => {
    startTransition(async () => {
      try {
        console.log("submit data:", data);
        await createParent(data);
        reset();
      } catch (error) {
        console.error("Submit failed:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* NAME */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <InputField
              label="FIRST NAME"
              required
              placeholder="First Name"
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
              label="LAST NAME"
              required
              placeholder="Last Name"
              value={field.value}
              onChange={field.onChange}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>

      {/* EMAIL */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputField
            label="EMAIL ADDRESS"
            required
            placeholder="example@email.com"
            value={field.value}
            onChange={field.onChange}
            error={errors.email?.message}
          />
        )}
      />

      {/* PASSWORD */}
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordField
            label="PASSWORD"
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
            label="CONFIRM PASSWORD"
            required
            placeholder="Re-enter your password"
            value={field.value}
            onChange={field.onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      {/* PHONE */}
      <Controller
        control={control}
        name="tel"
        render={({ field }) => (
          <InputField
            label="PHONE NUMBER"
            required
            placeholder="0xx-xxx-xxxx"
            value={field.value}
            onChange={field.onChange}
            error={errors.tel?.message}
          />
        )}
      />

      {/* LINE */}
      <Controller
        control={control}
        name="lineId"
        render={({ field }) => (
          <InputField
            label="LINE ID"
            placeholder="@yourlineid"
            hint="Line ID will be used for important notifications and updates"
            value={field.value}
            onChange={field.onChange}
            error={errors.lineId?.message}
          />
        )}
      />

      {/* INFO BOX */}
      <InfoBox
        title="Student Information"
        text="Your account will be automatically linked to your student's record. You will receive access to payment history, academic updates, and school announcements."
      />

      {/* TERMS */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
        <p>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy. We will use your information solely for school-related
          communications and will never share it with third parties without your
          consent.
        </p>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Account"}
      </button>

      {/* SIGN IN */}
      <p className="text-center text-sm">
        Already have an account?{" "}
        <span className="text-blue-600 font-medium cursor-pointer">
          Sign in here
        </span>
      </p>
    </form>
  );
}
