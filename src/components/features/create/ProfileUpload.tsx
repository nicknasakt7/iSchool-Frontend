"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function ProfileUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div
        onClick={handleClick}
        className="w-28 h-28 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer relative overflow-hidden hover:bg-muted/70 transition "
      >
        {preview ? (
          <Image
            src={preview}
            alt="profile"
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            <Upload size={20} />
            <span className="text-xs mt-1">Upload</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
