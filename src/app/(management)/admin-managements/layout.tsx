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
      label: 'Enrollment Hub',
      href: '/admin-management',
    },
    {
      label: 'Relations & Outreach',
      href: '/admin-management/relations',
    },
    {
      label: 'Teacher Resource Management',
      href: '/admin-management/teacher-resource',
    },
  ];

  return (
    <div className="space-y-6">
      {/*  Tabs Layout */}
      <div className="flex gap-4 bg-muted p-2 rounded-full w-fit">
        {tabs.map(tab => {
          const isActive = pathname === tab.href;

          return (
            <Link key={tab.href} href={tab.href}>
              <div
                className={`
                  px-5 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'text-muted-foreground hover:text-black'
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
