import StudentCard from "@/components/students/StudentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "parent/studentinfo",
};

export default function Student() {
  const mockStudent = {
    firstName: "peter",
    lastName: "park",
    nickName: "joey",
    gpa: 3.5,
    grade: 5,
  };
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6">
        <StudentCard student={mockStudent} />
      </div>
    </div>
  );
}
//เทส

// export default function Student() {
//   return <div>student</div>;
// }
