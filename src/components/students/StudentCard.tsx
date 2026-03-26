import Image from "next/image";

type props = {
  student: {
    firstName: string;
    lastName: string;
    nickName: string;
    grade: number;
    gpa: number;
  };
};
export default function StudentCard({ student }: props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 w[350px] text-center">
      <Image
        src="/images.png"
        alt="images"
        width={50}
        height={50}
        className="w-20 h-20 rounded-full mx-auto"
      />
      <h2 className="text-center font-bold mt-2">
        {student.firstName} {student.lastName}
      </h2>

      <p>{student.nickName}</p>

      <div className=" flex justify-center gap-3">
        <span className="">Grade{student.grade}</span>
        <span>GPA{student.gpa}</span>
      </div>
    </div>
  );
}
// เทส
