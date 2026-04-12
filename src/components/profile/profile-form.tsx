'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Camera, Loader2, ArrowLeft } from 'lucide-react';

import { studentService } from '@/lib/api/student/student.service';
import { updateStudentSchema, UpdateStudentFormValues } from '@/lib/schemas/student.schema';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';

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

type ProfileFormProps = { studentId: string };

const GENDER_LABELS: Record<string, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

export default function ProfileForm({ studentId }: ProfileFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.accessToken;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentService.getStudentById(studentId, {}, token),
    enabled: !!token && !!studentId,
  });

  const { data: grades } = useGrades();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateStudentFormValues>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nickName: '',
      dob: '',
      gender: 'MALE',
      parentsFirstName: '',
      parentsLastName: '',
      parentsEmail: '',
      gradeId: '',
      classId: '',
      favorite: '',
      healthNote: '',
    },
  });

  const gradeId = watch('gradeId');
  const { data: classrooms } = useClassrooms({ gradeId: gradeId || undefined });

  useEffect(() => {
    if (student) {
      reset({
        firstName: student.firstName,
        lastName: student.lastName,
        nickName: student.nickName ?? '',
        dob: student.dob ? student.dob.split('T')[0] : '',
        gender: student.gender,
        parentsFirstName: student.parentsFirstName,
        parentsLastName: student.parentsLastName,
        parentsEmail: student.parentsEmail,
        gradeId: student.gradeId,
        classId: student.classId ?? '',
        favorite: student.favorite ?? '',
        healthNote: student.healthNote ?? '',
      });
      setPreviewUrl(student.profileImageUrl ?? null);
    }
  }, [student, reset]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await studentService.uploadProfileImage(studentId, formData, token);
      toast.success('Profile photo updated');
    } catch {
      toast.error('Failed to upload photo');
      setPreviewUrl(student?.profileImageUrl ?? null);
    } finally {
      setUploadingImage(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (data: UpdateStudentFormValues) => {
      const payload: Record<string, unknown> = { ...data };
      if (!payload.classId) delete payload.classId;
      return studentService.updateStudent(studentId, payload, token);
    },
    onSuccess: () => {
      toast.success('Student profile saved');
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
            <p className="font-medium text-sm">{student?.firstName} {student?.lastName}</p>
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
          <div className="space-y-1.5">
            <Label>Nickname</Label>
            <Input {...register('nickName')} placeholder="Nickname" />
          </div>
          <div className="space-y-1.5">
            <Label>Date of Birth <span className="text-destructive">*</span></Label>
            <Input type="date" {...register('dob')} />
            {errors.dob && (
              <p className="text-xs text-destructive">{errors.dob.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Gender <span className="text-destructive">*</span></Label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {(['MALE', 'FEMALE', 'OTHER'] as const).map(g => (
                      <SelectItem key={g} value={g}>{GENDER_LABELS[g]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-xs text-destructive">{errors.gender.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Parent / Guardian */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Parent / Guardian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Parent First Name <span className="text-destructive">*</span></Label>
            <Input {...register('parentsFirstName')} placeholder="Parent first name" />
            {errors.parentsFirstName && (
              <p className="text-xs text-destructive">{errors.parentsFirstName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Parent Last Name <span className="text-destructive">*</span></Label>
            <Input {...register('parentsLastName')} placeholder="Parent last name" />
            {errors.parentsLastName && (
              <p className="text-xs text-destructive">{errors.parentsLastName.message}</p>
            )}
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Parent Email <span className="text-destructive">*</span></Label>
            <Input type="email" {...register('parentsEmail')} placeholder="parent@example.com" />
            {errors.parentsEmail && (
              <p className="text-xs text-destructive">{errors.parentsEmail.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Academic */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Academic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Grade <span className="text-destructive">*</span></Label>
            <Controller
              control={control}
              name="gradeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {(grades ?? []).map(g => (
                      <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gradeId && (
              <p className="text-xs text-destructive">{errors.gradeId.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Classroom</Label>
            <Controller
              control={control}
              name="classId"
              render={({ field }) => (
                <Select
                  value={field.value || '__none__'}
                  onValueChange={v => field.onChange(v === '__none__' ? '' : v)}
                  disabled={!gradeId || !classrooms?.length}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={gradeId ? 'Select classroom' : 'Select grade first'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— None —</SelectItem>
                    {(classrooms ?? []).map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Additional Notes
        </h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Favorite Subject / Interest</Label>
            <Input {...register('favorite')} placeholder="e.g. Mathematics, Art, Football" />
          </div>
          <div className="space-y-1.5">
            <Label>Health Note</Label>
            <textarea
              {...register('healthNote')}
              placeholder="Any health conditions, allergies, or special requirements..."
              className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-ring resize-none"
            />
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
          <Button
            type="submit"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
