"use client";

import {
  CreditCard,
  GraduationCap,
  MessageCircle,
  Settings,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminManagementLayoutProps = {
  children: React.ReactNode;
};

type Tab = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function AdminManagementLayout({
  children,
}: AdminManagementLayoutProps) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    {
      label: "Enrollment Hub",
      href: "/admin-managements/enrollments",
      icon: UsersRound,
    },
    {
      label: "Relations & Outreach",
      href: "/admin-managements/relations",
      icon: MessageCircle,
    },
    {
      label: "Teacher Resource Management",
      href: "/admin-managements/teachers/teacher-managements",
      icon: GraduationCap,
    },
    {
      label: "Academic Setup",
      href: "/admin-managements/academic-setup/grade-architecture",
      icon: Settings,
    },
    {
      label: "Finance Management",
      href: "/admin-managements/finance/fee-management",
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-muted-foreground/50 rounded-full">
        {/*  Tabs */}
        <div className="flex flex-wrap gap-3 bg-muted p-2 rounded-2xl w-full justify-between">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);

            return (
              <Link key={tab.href} href={tab.href}>
                <div
                  className={`
        flex items-center gap-2
        px-5 py-4 rounded-full text-sm
        transition-all duration-200 ease-out hover:-translate-y-0.5
        ${
          isActive
            ? "bg-linear-to-r from-[#2F5FD0] to-[#3DB2E8] text-card shadow-md font-semibold"
            : "text-foreground hover:text-primary bg-card hover:bg-white/60"
        }
      `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/*  Content */}
      <div className="">{children}</div>
    </div>
  );
}
