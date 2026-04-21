"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/dashboard/sidebar";
import MainHeader from "@/components/features/dashboard/main-header";
import { AcademicProvider } from "@/lib/context/academic-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => setOpenSidebar(true);
  const handleCloseSidebar = () => setOpenSidebar(false);

  return (
    <AcademicProvider>
    <div className="flex min-h-screen">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden md:block w-64 border-r">
        <Sidebar />
      </div>

      {/* ===== MOBILE SIDEBAR ===== */}
      {openSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={handleCloseSidebar}
          />

          <div className="relative w-64 bg-primary-foreground h-full shadow-lg animate-in slide-in-from-left duration-200">
            <Sidebar />
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 min-w-0">
        <div>
          <MainHeader onOpenSidebar={handleOpenSidebar} />
        </div>
        <main className="px-4 md:px-6 py-4">{children}</main>
      </div>
    </div>
    </AcademicProvider>
  );
}
