import Link from "next/link";
import { IoSchoolOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-4">
      <div className="flex items-center gap-2 hover:scale-105">
        <div>
          <IoSchoolOutline className="text-blue-500" />
        </div>
        <Link href={'/'}>
          <div>
            <p className="font-bold text-blue-500 text-xl">iSchool</p>
          </div>
        </Link>
      </div>
      <div className="flex gap-4 items-center ">
        <Link href={"/login"}>
          <div className=" hover:bg-gray-50 px-4 py-1 rounded-2xl animate-pulse">
            <button className="font-extralight">Login</button>
          </div>
        </Link>
        <div className="flex items-center bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
          <h1>Enroll Now</h1>
          <MdArrowRightAlt />
        </div>
      </div>
    </nav>
  );
}
