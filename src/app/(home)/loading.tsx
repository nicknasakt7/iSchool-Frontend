'use client';

import { GraduationCap, BrainCog } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-new-blue-500 flex items-center justify-center shadow-md">
          <GraduationCap className="w-6 h-6 text-card" />
        </div>

        <div className="text-left">
          <p className="text-xl font-bold">iSchool</p>
          <p className="text-xs tracking-[0.2em] text-muted-foreground">
            AI INSIGHT ENGINE
          </p>
        </div>
      </div>

      {/* BADGE */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-muted text-xs tracking-widest text-muted-foreground flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        NEURAL_SYNC
      </div>

      {/* CIRCLE ANIMATION */}
      <div className="relative mb-10">
        {/* outer rings */}
        <div className="absolute inset-0 w-64 h-64 border border-blue-200 rounded-full animate-ping opacity-30" />
        <div className="absolute inset-0 w-52 h-52 border border-blue-300 rounded-full animate-ping opacity-40" />
        <div className="absolute inset-0 w-40 h-40 border border-blue-400 rounded-full animate-ping opacity-50" />

        {/* center circle */}
        <div className="relative w-32 h-32 rounded-full border-4 border-blue-600 flex items-center justify-center bg-background shadow-lg">
          <BrainCog className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-3">
        Initializing Intelligence Layer...
      </h1>

      {/* DESCRIPTION */}
      <p className="text-muted-foreground max-w-md text-sm md:text-base">
        Architecting your personalized curriculum and synchronizing cognitive
        insights for a smarter learning experience.
      </p>

      {/* FOOTER */}
      <p className="mt-10 text-xs text-muted-foreground opacity-60 tracking-wider">
        SYSTEM CORE V4.2.0 • ADVANCED INTELLIGENCE PROTOCOL ENABLED
      </p>
    </div>
  );
}
