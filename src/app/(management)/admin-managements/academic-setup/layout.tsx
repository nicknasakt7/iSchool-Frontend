'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const tabs = [
    {
      label: 'Grade Architecture',
      href: '/admin-managements/academic-setup/grade-architecture',
    },
    {
      label: 'Create Subject And Assignment',
      href: '/admin-managements/academic-setup/create-subject',
    },
    {
      label: 'Student Promotion',
      href: '/admin-managements/academic-setup/students-promotion',
    },
  ];

  return (
    <div className="space-y-6">
      {/*  Tabs Layout */}
      <div className="border-t-2 flex gap-4 bg-muted p-2 rounded-full w-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link key={tab.href} href={tab.href}>
              <div
                className={`
                  px-5 py-2 rounded-full text-md
                  transition-all duration-200 border
                  ${
                    isActive
                      ? 'bg-card shadow-md font-bold text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }
                `}
              >
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/*  Page Content */}
      <div>{children}</div>
    </div>
  );
}
