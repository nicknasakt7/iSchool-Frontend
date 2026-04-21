'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';
import { Camera, Loader2, User } from 'lucide-react';

type Props = {
  teacherId: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  canUpload?: boolean;
  size?: number;
};

export default function TeacherAvatar({
  teacherId,
  firstName,
  lastName,
  profileImageUrl,
  canUpload = false,
  size = 44,
}: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(profileImageUrl ?? null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const token = session?.user?.accessToken;
    if (!file || !token) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers/${teacherId}/profile-image`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: formData },
      );
      if (!res.ok) throw new Error();
      toast.success(`${firstName} ${lastName} — photo updated`);
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    } catch {
      toast.error('Failed to upload photo');
      setPreview(profileImageUrl ?? null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative shrink-0 group" style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center"
      >
        {preview ? (
          <Image
            src={preview}
            alt={`${firstName} ${lastName}`}
            width={size}
            height={size}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-muted-foreground" style={{ width: size * 0.45, height: size * 0.45 }} />
        )}
      </div>

      {uploading && (
        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
          <Loader2 className="animate-spin text-white" style={{ width: size * 0.35, height: size * 0.35 }} />
        </div>
      )}

      {canUpload && !uploading && (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <Camera
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ width: size * 0.35, height: size * 0.35 }}
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
