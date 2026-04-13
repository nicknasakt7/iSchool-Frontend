import Image from "next/image";

export default function ContentAcademic() {
  return (
    <div className=" px-2 pt-10">
      <div className="flex flex-col lg:flex-row gap-7">
        <div>
          <h1 className="font-bold text-xl">Academic Calendar</h1>
          <p className="text-muted-foreground text-sm mt-3">
            Key dates and upcoming events at iSchool.
          </p>
          <div className="flex flex-col gap-4 mt-5">
            <div className="bg-card inline-block shadow-md p-3 rounded-4xl border">
              <div className="flex gap-5">
                <div className="flex flex-col items-center bg-[#eff6ff] rounded-full px-3 py-1">
                  <p className="text-[9px] text-[#2d7cbc]">AUG</p>
                  <p className="text-sm font-bold text-[#2d7cbc]">15</p>
                </div>
                <div>
                  <h1 className="font-bold text-sm">Campus Open Day 2024</h1>
                  <p className="text-gray-400 text-sm">
                    Join us for a walkthrough of the Digital Atrium.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card inline-block shadow-md p-3 rounded-4xl border">
              <div className="flex gap-5">
                <div className="flex flex-col items-center bg-[#eff6ff] rounded-full px-3 py-1">
                  <p className="text-[9px] text-[#2d7cbc]">AUG</p>
                  <p className="text-sm font-bold text-[#2d7cbc]">15</p>
                </div>
                <div>
                  <h1 className="font-bold text-sm">Campus Open Day 2024</h1>
                  <p className="text-gray-400 text-sm">
                    Join us for a walkthrough of the Digital Atrium.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card inline-block shadow-md p-3 rounded-4xl border">
              <div className="flex gap-5">
                <div className="flex flex-col items-center bg-[#eff6ff] rounded-full px-3 py-1">
                  <p className="text-[9px] text-[#2d7cbc]">AUG</p>
                  <p className="text-sm font-bold text-[#2d7cbc]">15</p>
                </div>
                <div>
                  <h1 className="font-bold text-sm">Campus Open Day 2024</h1>
                  <p className="text-gray-400 text-sm ">
                    Join us for a walkthrough of the Digital Atrium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="font-bold text-xl">Latest Announcements</h1>
            <p className="text-muted-foreground text-sm mb-5 mt-4">
              Recent news and breakthroughs from our iSchool community.
            </p>
            <div className="flex gap-3 ">
              <div className="bg-muted/50 rounded-3xl overflow-hidden shadow-sm border">
                <div className="relative">
                  <Image
                    src="/content.png"
                    alt="img"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    BREAKING
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Robotics Team Wins National Championship
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Our students utilized AI Insight to optimize their robots
                    pathfinding logic.
                  </p>

                  <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    Read Story →
                  </button>
                </div>
              </div>
              <div className="bg-muted/50 rounded-3xl overflow-hidden shadow-sm border">
                <div className="relative">
                  <Image
                    src="/content.png"
                    alt="img"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    BREAKING
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Robotics Team Wins National Championship
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Our students utilized AI Insight to optimize their robots
                    pathfinding logic.
                  </p>

                  <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    Read Story →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
