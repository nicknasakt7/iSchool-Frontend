'use client';

import { useState } from 'react';
import Sidebar from './sidebar';

type sidebarWrapperProps = {
  children: React.ReactNode;
};

export default function SidebarWrapper({ children }: sidebarWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR (DRAWER) */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="relative w-64 bg-background h-full shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* CONTENT */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
