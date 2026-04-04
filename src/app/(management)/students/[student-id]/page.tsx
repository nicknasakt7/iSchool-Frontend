import Link from "next/link";

export default function PageStudentID({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <div className="p-6 space-y-6 bg-gray-100 ">
        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Alexander Chen</h1>

              <p className="text-gray-500 text-sm">
                ID: 4f9e3c12-82ea-4a21-9d10-38f3a556e102
              </p>

              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  Grade 11
                </span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  Section A
                </span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  Science Stream
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-3 ">
              <Link href={`/students/${id}/edit`}>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700">
                  Edit Profile
                </button>
              </Link>

              <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="text-right space-y-2">
            <p className="text-xs text-gray-400 tracking-widest">
              FINANCIAL STATUS
            </p>
            <h2 className="text-green-600 text-2xl font-bold">Paid In Full</h2>
            <p className="text-sm text-gray-500">Next billing: Sep 15, 2024</p>
            <button className="text-blue-600 text-sm font-medium">
              View Ledger →
            </button>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 shadow-lg">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-2xl font-semibold">AI Neural Insight</h2>

            <p className="text-gray-200">
              Alexander demonstrates{" "}
              <span className="font-semibold text-white">
                exceptional cognitive synthesis
              </span>{" "}
              in STEM subjects. Our predictive model indicates he is on track
              for advanced honors in Mathematics with a projected 98th
              percentile score in the upcoming finals.
            </p>

            <p className="text-sm text-gray-400">
              Recommendation: Accelerate into Linear Algebra elective for next
              semester.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col items-center justify-center min-w200px">
            <p className="text-xs text-gray-300 tracking-widest">
              SUCCESS PROBABILITY
            </p>

            <div className="text-4xl font-bold my-4">92%</div>

            <button className="bg-linear-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-full text-sm font-medium">
              Generate Deep Audit
            </button>
          </div>
        </div>
      </div>

      {/* content Two */}
      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Academic Dossier */}
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <h3 className="font-semibold text-lg">Academic Dossier</h3>

            <div>
              <p className="text-xs text-gray-400">DATE OF BIRTH</p>
              <p className="font-medium">May 14, 2007</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">FAVORITE SUBJECT</p>
              <p className="font-medium">Astrophysics</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">HEALTH NOTES</p>
              <p className="text-sm text-gray-600">
                Mild peanut allergy. Wears corrective lenses for distance. No
                other reported conditions.
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <p className="font-medium">Linda Chen (Mother)</p>
              <p className="text-sm text-gray-500">+1 (555) 012-3456</p>
              <p className="text-sm text-gray-500">l.chen@domain.edu</p>
            </div>
          </div>

          {/* Subjects Performance */}
          <div className="bg-white rounded-2xl p-6 shadow lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Subjects Performance</h3>

              <div className="flex gap-3">
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  18 Present
                </div>
                <div className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                  3 Absent
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 text-xs text-gray-400 pb-2 border-b">
              <p>SUBJECT</p>
              <p className="text-center">SCORE (EARNED / TOTAL)</p>
              <p className="text-right">TREND</p>
            </div>

            {/* Table Rows */}
            {[
              {
                name: "Mathematics",
                sub: "ADVANCED CALCULUS",
                score: 94,
                trend: "+1.1%",
              },
              {
                name: "Science",
                sub: "PHYSICS & BIOLOGY",
                score: 98,
                trend: "+2.4%",
              },
              {
                name: "English",
                sub: "LITERATURE & COMP",
                score: 88,
                trend: "0.0%",
              },
              {
                name: "Thai",
                sub: "LANGUAGE PROFICIENCY",
                score: 92,
                trend: "+1.5%",
              },
              {
                name: "Social Studies",
                sub: "GLOBAL HISTORY",
                score: 95,
                trend: "+5.2%",
              },
            ].map((s) => (
              <div
                key={s.name}
                className="grid grid-cols-3 items-center border-b py-3"
              >
                {/* SUBJECT */}
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>

                {/* SCORE */}
                <p className="text-center font-medium text-blue-600">
                  {s.score} / 100
                </p>

                {/* TREND */}
                <p
                  className={`text-right text-sm ${s.trend.startsWith("+") ? "text-green-500" : s.trend === "0.0%" ? "text-gray-400" : "text-red-500"}`}
                >
                  {s.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Faculty Narrative Feed */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-semibold text-lg">Faculty Narrative Feed</h3>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "Mr. Julian Graves",
                  dept: "MATHEMATICS FACULTY",
                  text: "Performance in Calculus remains steady at A+. Needs more challenging problem sets to maintain engagement levels.",
                },
                {
                  name: "Dr. Sarah Miller",
                  dept: "SCIENCE DEPARTMENT",
                  text: "Alexander's understanding of quantum mechanics fundamentals is ahead of the curriculum. He actively helps peers during lab.",
                },
                {
                  name: "Ms. Elena Rodriguez",
                  dept: "ENGLISH FACULTY",
                  text: "Excellent grasp of literary themes. His recent essay was well-structured and deeply insightful.",
                },
              ].map((f) => (
                <div key={f.name} className="bg-white p-5 rounded-2xl shadow">
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-gray-400">{f.dept}</p>
                  <p className="text-sm text-gray-600 mt-3">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
