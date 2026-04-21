import { IoSchoolOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbBellSchool } from "react-icons/tb";

export default function BookPillars() {
  return (
    <div className="pt-5 px-2 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-card shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow duration-300 p-10">
          <IoSchoolOutline className="p-2 bg-muted text-5xl rounded-xl text-blue-400" />
          <h1 className="text-4xl font-bold pt-6">Academic Excellence</h1>
          <p className="text-sm pt-4 text-muted-foreground leading-relaxed">
            Consistently ranked in the top 1% nationally, iSchool provides a
            rigorous yet supportive environment where intellect flourishes.
          </p>
          <p className="text-muted-foreground text-xs pt-6">Established 1998</p>
        </div>
        <div className="rounded-xl bg-card shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow duration-300 p-10">
          <FaUsers className="p-2 bg-muted text-5xl rounded-xl text-blue-400" />
          <h1 className="text-4xl font-bold pt-6">Holistic Growth</h1>
          <p className="text-sm pt-4 text-muted-foreground leading-relaxed">
            Beyond textbooks—we prioritize emotional intelligence, physical
            health, and social responsibility across all grades.
          </p>
          <p className="text-muted-foreground text-xs pt-6">Character Building</p>
        </div>
        <div className="rounded-xl bg-card shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-shadow duration-300 p-10">
          <TbBellSchool className="p-2 bg-muted text-5xl rounded-xl text-blue-400" />
          <h1 className="text-4xl font-bold pt-6">Innovation Labs</h1>
          <p className="text-sm pt-4 text-muted-foreground leading-relaxed">
            Consistently ranked in the top 1% nationally, iSchool provides a
            rigorous yet supportive environment where intellect flourishes.
          </p>
          <p className="text-muted-foreground text-xs pt-6">Future Ready</p>
        </div>
      </div>
    </div>
  );
}
