import { IoSchoolOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbBellSchool } from "react-icons/tb";



export default function BookPillars() {
  return (
    <div className="pt-5 px-2  max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        <div className="p-5 bg-muted/50 rounded-2xl">
          <IoSchoolOutline className="p-1 bg-card text-2xl rounded-lg shadow text-blue-400" />
          <h1 className="text-xl font-bold pt-5">Academic Excellence</h1>
          <p className="text-[12px] pt-4">
            Consistently ranked in the top 1% nationally, iSchool provides a
            rigorous yet supportive environment where intellect flourishes.
          </p>
          <p className="text-muted-foreground text-[10px] pt-5">Established 1998</p>
        </div>
        <div className="p-5 bg-muted/50 rounded-2xl">
          <FaUsers className="p-1 bg-card text-2xl rounded-lg shadow text-blue-400" />
          <h1 className="text-xl font-bold pt-5">Holistic Growth</h1>
          <p className="text-[12px] pt-4">
            Beyond textbooks—we prioritize emotional intelligence, physical
            health, and social br responsibility  across all grades.
          </p>
          <p className="text-muted-foreground text-[10px] pt-5">Character Building</p>
        </div>
        <div className="p-5 bg-muted/50 rounded-2xl">
          <TbBellSchool className="p-1 bg-card text-2xl rounded-lg shadow text-blue-400" />
          <h1 className="text-xl font-bold pt-5">Innovation Labs</h1>
          <p className="text-[12px] pt-4">
            Consistently ranked in the top 1% nationally, iSchool provides a
            rigorous yet supportive environment where intellect flourishes.
          </p>
          <p className="text-muted-foreground text-[10px] pt-5">Future Ready</p>
        </div>
      </div>
    </div>
  );
}
