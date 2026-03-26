"use client";

import Link from "next/link";
import { useState } from "react";
import { IoSchoolOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { usePathname } from "next/navigation";
import { PATH } from "@/constants/path.constant";

export default function Navbar() {
  const [,setSidsbaropen] = useState(false);
  const path = usePathname();
  const isLoginPath = path === PATH.LOGIN;

  return (
    <nav className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-lg font-medium bg-white/50 dark:bg-gray-900/70 ">
      <div className="flex items-center gap-2 hover:scale-105">
        <div>
          <IoSchoolOutline className="text-blue-500" />
        </div>
        <Link href={PATH.HOME}>
          <div>
            <p className="font-bold text-blue-500 text-xl">iSchool</p>
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
          <div className="flex items-center bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
            <a
              onClick={() => setSidsbaropen(false)}
              href="#contect"
              className=" hover:scale-105"
            >
              Home
            </a>
            <MdArrowRightAlt />
          </div>
        )}
      </div>
    </nav>
  );
}
