'use client';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* ICON */}
      <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 relative bg-muted-header px-4 py-2">
        <AlertTriangle className="w-20 h-20 text-new-red-600 " />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        Intelligence Layer <span className="text-red-500">Paused</span>
      </h1>

      {/* DESCRIPTION */}
      <p className="text-muted-foreground max-w-xl mb-8 text-sm md:text-base">
        Something went wrong: Our intelligence layer encountered an unexpected
        error while processing your request. Even the sharpest minds need a
        moment to recalibrate.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Button variant="outline" onClick={() => reset()} className="gap-2">
          <RotateCcw className="w-10 h-10" />
          Try Again
        </Button>
      </div>

      {/* ERROR CODE */}
      <div className="text-xs text-muted-foreground">
        ERROR REFERENCE:{' '}
        <span className="bg-muted px-2 py-1 rounded-md">
          {error?.message || 'UNKNOWN_ERROR'}
        </span>
      </div>
    </div>
  );
}
