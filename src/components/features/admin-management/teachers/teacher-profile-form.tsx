'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { z } from 'zod';
import { Camera, Loader2, ArrowLeft } from 'lucide-react';

import { teacherService } from '@/lib/api/teacher/teacher.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
});

type FormValues = z.infer<typeof schema>;

const GENDER_LABELS: Record<string, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

type Props = { teacherId: string };

export default function TeacherProfileForm({ teacherId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.accessToken;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: teacher, isLoading } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => teacherService.getTeacherById(teacherId, token),
    enabled: !!token && !!teacherId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'MALE',
    },
  });

  useEffect(() => {
    if (teacher) {
      reset({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        gender: (teacher.gender as 'MALE' | 'FEMALE' | 'OTHER') ?? 'MALE',
      });
      setPreviewUrl(teacher.profileImageUrl ?? null);
    }
  }, [teacher, reset]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${teacherId}/profile-image`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );
      if (!res.ok) throw new Error();
      toast.success('Profile photo updated');
    } catch {
      toast.error('Failed to upload photo');
      setPreviewUrl(teacher?.profileImageUrl ?? null);
    } finally {
      setUploadingImage(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (data: FormValues) =>
      teacherService.updateTeacher(teacherId, data, token),
    onSuccess: () => {
      toast.success('Teacher profile saved');
      router.back();
    },
    onError: () => toast.error('Failed to save changes'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const gender = watch('gender');

  return (
    <form onSubmit={handleSubmit(data => updateMutation.mutate(data))} className="space-y-6">
      {/* Profile Photo */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Profile Photo
        </h2>
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted">
              <Image
                src={previewUrl ?? '/user.png'}
                alt="profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            {uploadingImage && (
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{teacher?.firstName} {teacher?.lastName}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Upload a clear photo — JPG or PNG, max 5 MB
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
            >
              <Camera className="w-3.5 h-3.5" />
              Change photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>First Name <span className="text-destructive">*</span></Label>
            <Input {...register('firstName')} placeholder="First name" />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Last Name <span className="text-destructive">*</span></Label>
            <Input {...register('lastName')} placeholder="Last name" />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label>Email <span className="text-destructive">*</span></Label>
            <Input type="email" {...register('email')} placeholder="teacher@example.com" />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Gender <span className="text-destructive">*</span></Label>
            <Select
              value={gender}
              onValueChange={v => setValue('gender', v as 'MALE' | 'FEMALE' | 'OTHER', { shouldDirty: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {(['MALE', 'FEMALE', 'OTHER'] as const).map(g => (
                  <SelectItem key={g} value={g}>{GENDER_LABELS[g]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-xs text-destructive">{errors.gender.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={!isDirty}
          >
            Reset
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
