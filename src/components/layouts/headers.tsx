"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Headers() {
  const pathName = usePathname();

  return (
    <div className=" flex justify-center items-center gap-3">
      <div>
        <Link
          href="/parents/student-info"
          className={`pd-2 ${pathName === "/parents/student-info" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          student
        </Link>
      </div>

      <div>
        <Link
          href="/parents/payment"
          className={`pd-2 ${pathName === "/parents/payment" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          payment
        </Link>
      </div>
    </div>
  );
}
