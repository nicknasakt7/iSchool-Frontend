'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type Props = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export default function SidebarItem({ name, href, icon: Icon }: Props) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 text-md transition-all duration-200 rounded-full',
        'text-foreground hover:bg-card hover:text-primary',

        isActive &&
          'bg-card text-primary font-semibold relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:rounded-r',
      )}
    >
      <Icon className="w-5 h-5" />
      {name}
    </Link>
  );
}
