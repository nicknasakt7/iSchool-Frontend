'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { PATH } from '@/constants/path.constant';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';

const MANAGEMENT_ROLES = ['TEACHER', 'ADMIN', 'SUPER_ADMIN'];

export default function Navbar() {
  const [, setSidsbaropen] = useState(false);
  const path = usePathname();
  const isLoginPath = path === PATH.LOGIN || path === PATH.CONTENT;
  const { data: session } = useSession();
  const role = session?.user?.role;

  const authButton = role
    ? MANAGEMENT_ROLES.includes(role)
      ? { label: 'Back to dashboard', href: '/dashboard' }
      : { label: 'Back to my student', href: '/parents/student-info' }
    : null;

  return (
    <nav className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-lg font-medium bg-white/50 dark:bg-gray-900/70 ">
      <div className="flex items-center gap-2 hover:scale-105">
        <Logo />
        <Link href={PATH.HOME}>
          <div>
            <p className="text-2xl font-bold bg-linear-to-br from-blue-700 to-blue-400 leading-none bg-clip-text text-transparent">
              iSchool
            </p>
          </div>
        </Link>
      </div>
      <div className="flex gap-4 items-center ">
        {!isLoginPath && (
          authButton ? (
            <Link href={authButton.href}>
              <Button className="font-semibold">
                {authButton.label} <ArrowRight size={16} />
              </Button>
            </Link>
          ) : (
            <>
              <Link href={PATH.LOGIN}>
                <div className=" hover:bg-gray-50 px-4 py-1 rounded-2xl animate-pulse">
                  <Button className="font-semibold">Login</Button>
                </div>
              </Link>
              <Button variant="outline">
                <a
                  onClick={() => setSidsbaropen(false)}
                  href="#contect"
                  className=" hover:scale-105"
                >
                  Form Regiter
                </a>
                <ArrowRight size={16} />
              </Button>
            </>
          )
        )}
      </div>
    </nav>
  );
}
