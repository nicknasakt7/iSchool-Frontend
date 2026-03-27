'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoSchoolOutline } from 'react-icons/io5';
import { MdArrowRightAlt } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { PATH } from '@/constants/path.constant';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [, setSidsbaropen] = useState(false);
  const path = usePathname();
  const isLoginPath = path === PATH.LOGIN || path === PATH.CONTENT;

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
          <Link href={PATH.LOGIN}>
            <div className=" hover:bg-gray-50 px-4 py-1 rounded-2xl animate-pulse">
              <button className="font-extralight">Login</button>
            </div>
          </Link>
        )}
        {!isLoginPath && (
          <div className="flex gap-2 items-center bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
            <a
              onClick={() => setSidsbaropen(false)}
              href="#contect"
              className=" hover:scale-105"
            >
              Form Regiter
            </a>
            <ArrowRight size={16} />
          </div>
        )}
      </div>
    </nav>
  );
}
