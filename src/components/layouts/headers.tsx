import Link from "next/link";
import React from "react";

export default function Headers() {
  return (
    <header className=" flex justify-center items-center gap-3">
      <div>
        <Link href="/parents/student-info">student</Link>
      </div>

      <div>
        <Link href="/parents/payment">payment</Link>
      </div>
    </header>
  );
}
