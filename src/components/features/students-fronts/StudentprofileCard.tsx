import { Student } from "@/components/mocks/mock-student-types";
import Image from "next/image";

type StudentProfileCardProps = {
  student: Student;
};
export default function StudentProfileCard({
  student,
}: StudentProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Image src="/images.png" alt="images" width={50} height={50} />

        <h2 className="text-xl font-semibold">
          {student.firstName} {student.lastName}
        </h2>

        <p className="text-gray-500 mb-4">{student.nickname}</p>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {student.gradeLevel}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            GPA {student.gpa}
          </span>
        </div>
      </div>
    </div>
  );
}
