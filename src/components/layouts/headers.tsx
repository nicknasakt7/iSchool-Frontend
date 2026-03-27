"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSchoolOutline } from "react-icons/io5";

export default function Headers() {
  const pathName = usePathname();

  return (
    // logo
    <nav className="flex justify-between items-center mt-5 px-4 py-23">
      <div className="flex justify-center items-center gap-2 hover:scale-105">
        <div>
          <IoSchoolOutline className="text-blue-500" />
        </div>
        <Link href={"/"}>
          <div>
            <p className="font-bold text-blue-500 text-xl">iSchool</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/parents/student-info"
          className={`pd-2 ${pathName === "/parents/student-info" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          student
        </Link>
        <Link
          href="/parents/payment"
          className={`pd-2 ${pathName === "/parents/payment" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          payment
        </Link>
      </div>
      {/* ระฆัง profile */}
      <div>feeee</div>
    </nav>
  );
}
