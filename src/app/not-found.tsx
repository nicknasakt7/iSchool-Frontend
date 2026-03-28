'use client';

import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* ICON + 404 BG */}
      <div className="relative mb-6">
        {/* 404 background */}
        <h1 className="absolute inset-0 flex items-center justify-center text-[120px] md:text-[160px] font-bold text-muted opacity-20 select-none">
          404
        </h1>

        {/* icon */}
        <div className="relative w-24 h-24 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl md:text-4xl font-bold mb-3">
        404 — Page Not Found
      </h2>

      {/* DESCRIPTION */}
      <p className="text-muted-foreground max-w-md mb-8 text-sm md:text-base">
        The page you &apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* primary */}
        <Button
          className="gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-md"
          onClick={() => router.push('/dashboard')}
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </Button>

        {/* secondary */}
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>

      {/* FOOTER */}
      <div className="mt-12 text-xs text-muted-foreground">
        © 2026 iSchool AI • The Intelligence Layer for Modern Learning
      </div>
    </div>
  );
}
