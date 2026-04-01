'use client'

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CheckSquare,
  Settings,
  LogOut,
  GraduationCap,
  SquarePlus,
  ShieldPlus,
  Laptop,
} from "lucide-react";
import SidebarSection from "./sidebar-section";
import SidebarItem from "./sidebar-item";
import { logout } from "@/lib/actions/auth.action";

export default  function Sidebar() {

  return (
    <aside className="fixed w-64 md:w-64 h-full md:h-screen border-r bg-primary-foreground backdrop-blur flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="px-6 py-6 flex items-center gap-4">
          {/* ICON */}
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-700 to-blue-400 flex items-center justify-center shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          {/* TEXT */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-linear-to-br from-blue-700 to-blue-400 leading-none bg-clip-text text-transparent">
              iSchool
            </span>
            <span className="text-xs tracking-[0.2em] text-muted-foreground mt-1">
              AI INSIGHT LAYER
            </span>
          </div>
        </div>

        {/* MAIN MENU */}
        <SidebarSection>
          <SidebarItem
            name="Dashboard"
            href="/dashboard"
            icon={LayoutDashboard}
          />
          <SidebarItem name="Students" href="/students" icon={Users} />
          <SidebarItem
            name="Assessments"
            href="/assessments"
            icon={ClipboardList}
          />
          <SidebarItem name="Check-In" href="/checkin" icon={CheckSquare} />
        </SidebarSection>

        {/* ADMIN SECTION */}
        <SidebarSection title="ADMINISTRATION">
          <SidebarItem
            name="New Entry"
            href="/create/new-entry"
            icon={SquarePlus}
          />
          <SidebarItem
            name="New Teacher"
            href="/admin-managements/teachers/new-teacher"
            icon={UserPlus}
          />
          <SidebarItem
            name="New Admin"
            href="/create/new-admin"
            icon={ShieldPlus}
          />
          <SidebarItem
            name="Admin Management"
            href="/admin-managements/enrollments"
            href="/admin-managements/enrollments"
            icon={Laptop}
          />
        </SidebarSection>
      </div>

      {/* BOTTOM */}
      <div className="p-3 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition">
          <Settings className="w-5 h-5" />
          Settings
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-card transition " onClick={logout}>
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
