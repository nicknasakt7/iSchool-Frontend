// 'use client';

// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useTransition } from 'react';
// import { Loader } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from '@/components/ui/field';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import { z } from 'zod';
// import ProfileUpload from '../ProfileUpload';

// const schema = z.object({
//   firstName: z.string().min(1, 'First name is required'),
//   lastName: z.string().min(1, 'Last name is required'),
//   role: z.string().min(1, 'Role is required'),
// });

// type FormValues = z.infer<typeof schema>;

// export default function NewAdminForm() {
//   const { handleSubmit, control } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       role: '',
//     },
//   });

//   const [isPending, startTransition] = useTransition();

//   const onSubmit = (data: FormValues) => {
//     startTransition(async () => {
//       console.log(data);
//     });
//   };

//   return (
//     <div className="bg-card p-10 rounded-[30px] shadow-sm w-full max-w-3xl border">
//       <h1 className="text-3xl font-bold text-center mb-2">New Admin</h1>
//       <p className="text-center text-muted-foreground mb-8">
//         Onboard a new faculty member to the iSchool ecosystem.
//       </p>
//       {/* Profile Upload */}
//       <ProfileUpload />

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <FieldGroup className="gap-5">
//           <div className="grid grid-cols-2 gap-5">
//             {/* First Name */}
//             <Controller
//               control={control}
//               name="firstName"
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>First Name</FieldLabel>
//                   <Input {...field} placeholder="e.g. Julianne" />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Last Name */}
//             <Controller
//               control={control}
//               name="lastName"
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Last Name</FieldLabel>
//                   <Input {...field} placeholder="e.g. Moore" />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Role (full width) */}
//             <Controller
//               control={control}
//               name="role"
//               render={({ field, fieldState }) => (
//                 <Field className="col-span-2" data-invalid={fieldState.invalid}>
//                   <FieldLabel>Role</FieldLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select position..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="admin">Admin</SelectItem>
//                       <SelectItem value="super_admin">Super Admin</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </div>

//           {/* Submit */}
//           <Field>
//             <div className="flex justify-center mt-4">
//               <Button
//                 className="rounded-full px-8 py-6 text-base"
//                 disabled={isPending}
//               >
//                 {isPending ? (
//                   <>
//                     <Loader className="animate-spin" /> Adding...
//                   </>
//                 ) : (
//                   'Add New Admin →'
//                 )}
//               </Button>
//             </div>
//           </Field>
//         </FieldGroup>
//       </form>
//     </div>
//   );
// }

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createAdmin } from '@/lib/actions/admin.action';
import { z } from 'zod';
import ProfileUpload from '../ProfileUpload';

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  role: z.literal('ADMIN'), //  fix ให้เป็น admin เท่านั้น
});

export type AdminFormValues = z.infer<typeof schema>;

export default function NewAdminForm() {
  const { handleSubmit, control, reset } = useForm<AdminFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      role: 'ADMIN',
      gender: 'OTHER',
    },
  });

  const [preview, setPreview] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: AdminFormValues) => {
    startTransition(async () => {
      const formdata = new FormData();

      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("role", data.role);
      formdata.append("gender", data.gender);

      if (preview) {
        formdata.append("profileImage", preview);
      }

      await createAdmin(formdata);
      reset();
    });
  };

  return (
    <div className="bg-card p-10 rounded-[30px] shadow-sm w-full max-w-3xl border">
      <ProfileUpload preview={preview} setPreview={setPreview} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-2 gap-5">
            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="admin@email.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/*  Role (Dropdown: Admin only) */}
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Field className="col-span-2">
                  <FieldLabel>Role</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>

          {/* Submit */}
          <Field>
            <div className="flex justify-center mt-4">
              <Button className="rounded-full px-8 py-6" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="animate-spin" /> Adding...
                  </>
                ) : (
                  'Add New Admin'
                )}
                <ArrowRight />
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
