'use client';

import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path.constant';
import { logout } from '@/lib/actions/auth.action';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Headers() {
  const pathName = usePathname();
  const { data } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      {/* LEFT: LOGO */}
      <Link href="/" className="flex items-center gap-3 group">
        <Logo />
        <div>
          <span className="text-xl font-bold text-primary group-hover:opacity-80 transition">
            iSchool
          </span>
          <p>AI INSIGHT</p>
        </div>
      </Link>

      {/* CENTER: MENU */}
      <div className="flex items-center gap-6">
        <Link
          href="/parents/student-info"
          className={`text-lg font-semibold transition ${
            pathName === '/parents/student-info'
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1 '
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Student
        </Link>

        <Link
          href="/parents/payment"
          className={`text-lg font-semibold transition ${
            pathName === '/parents/payment'
              ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
              : 'text-muted-foreground hover:text-foreground '
          }`}
        >
          Payment
        </Link>
      </div>

      {/* RIGHT: USER */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center text-right bg-card px-4 py-2 rounded-xl">
          <p className="text-xs text-muted-foreground">Welcome</p>
          <p className="font-semibold text-sm text-primary">
            {data?.user?.parent?.firstName} {data?.user?.parent?.lastName}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase">
            {data?.user?.role}
          </p>
        </div>

        <Button
          variant="destructive"
          size="sm"
          className="rounded-lg font-semibold border-2"
          onClick={() => signOut({ callbackUrl: PATH.HOME })}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
