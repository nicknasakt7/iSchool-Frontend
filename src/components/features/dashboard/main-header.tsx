"use client"; // 🔥 ➕ เพิ่ม (เพราะต้องมี interaction)

import { Menu, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

type DashboardHeaderProps = {
  onOpenSidebar?: () => void; //  เพิ่ม (รับ function จาก layout)
};

export default function MainHeader({ onOpenSidebar }: DashboardHeaderProps) {
  const { data } = useSession();

  console.log(data?.user?.email);
  return (
    // <div className="flex flex-col gap-4 mb-6 bg-background shadow-sm rounded-xl p-4">
    <div className="flex flex-col gap-4 px-4 md:px-6 py-4 border-b border-border/80 bg-muted-header">
      {/*  TOP BAR (มือถือเท่านั้น) */}
      <div className="flex items-center justify-between md:hidden ">
        {/* ➕ เพิ่ม: ปุ่ม hamburger */}
        <button onClick={onOpenSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        {/* ➕ เพิ่ม: logo เล็ก */}
        {/*  LOGO (mobile) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>

          <span className="font-bold text-primary">iSchool</span>
        </div>
        <div className="w-6" /> {/* balance layout */}
      </div>

      {/* MAIN HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* RIGHT */}
        <div className="flex items-center justify-between md:justify-end gap-4 flex-wrap order-1 md:order-2 w-full">
          <Button>
            <Sparkles /> AI Insight
          </Button>

          <div className="bg-card border-2 border-card p-2 rounded-xl flex items-center gap-2 md:ml-auto">
            <div className="w-9 h-9 rounded-full bg-muted-foreground" />
            <div className="text-sm">
              <p>Dr.{data?.user?.email}</p>
              <p className="text-muted-foreground text-xs">
                Head Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
