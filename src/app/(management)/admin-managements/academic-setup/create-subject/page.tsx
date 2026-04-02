"use client";
"use client";

import AssignedTeacher from "@/components/features/subject/assign-teacher";
import AssignedTeacher from "@/components/features/subject/assign-teacher";
import SubjectCardSection from "@/components/features/subject/subject-select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/client";
import { useState } from "react";

// import { useState } from "react";
// import AssignTeacher from "@/components/features/subject/assign-teacher";
// import { Button } from "@/components/ui/button";
// import { Field, FieldLabel } from "@/components/ui/field";
// import SubjectCardSection from "@/components/features/subject/subject-select";

// const SUBJECTS = ["Science", "Math", "English", "History"];

// export default function CreateSubjectPage() {
//   const [subject, setSubject] = useState("");

//   return (
//     <div className="grid grid-cols-2 gap-6 p-6 bg-muted/30">
//       {/* LEFT */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
//         {/* SUBJECT SELECT */}
//         <Field>
//           <FieldLabel className="text-xs font-semibold text-muted-foreground uppercase">
//             Subject Name
//           </FieldLabel>

//           {/* ❌ ไม่มี Input แล้ว */}

//           {/* ✅ ใช้ปุ่มแทน */}
//           <div className="flex gap-4 flex-wrap">
//             {SUBJECTS.map((sub) => {
//               const active = subject === sub;

//               return (
//                 <button
//                   key={sub}
//                   onClick={() => setSubject(sub)}
//                   className={`
//                     px-6 py-3 rounded-xl border text-sm font-medium transition shadow-sm
//                     ${
//                       active
//                         ? "bg-blue-600 text-white border-blue-600 shadow-md"
//                         : "bg-white hover:bg-muted"
//                     }
//                   `}
//                 >
//                   {sub}
//                 </button>
//               );
//             })}
//           </div>
//         </Field>

//         {/* BUTTON */}
//         <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90">
//           Create Subject
//         </Button>

//         <p className="text-xs text-center text-muted-foreground">
//           SUBJECT ID WILL BE AUTO-GENERATED
//         </p>
//       </div>

//       {/* RIGHT */}
//       <AssignTeacher />
//       <SubjectCardSection />
//     </div>
//   );
// }

type AssignedTeacher = {
  id: number;
  firstName: string;
  lastName: string;
  role: "primary" | "assistant";
};

type Subject = {
  id: number;
  name: string;
};

type AssignedTeacher = {
  id: number;
  firstName: string;
  lastName: string;
  role: "primary" | "assistant";
};

type Subject = {
  id: number;
  name: string;
};

export default function CreateSubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([{ id: 1, name: "" }]);

  const [assigned, setAssigned] = useState<AssignedTeacher[]>([]);

  // 🔥 เปลี่ยนค่า input (ใช้ id)
  const handleChange = (id: number, value: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: value } : s)),
    );
  };

  // 🔥 เพิ่ม subject
  const handleAdd = () => {
    setSubjects((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  // 🔥 ลบ subject
  const handleRemove = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // 🔥 ยิง API
  const handleSubmit = async () => {
    try {
      for (const subject of subjects) {
        if (!subject.name) continue;

        await api.post("/subjects", {
          name: subject.name,
        });
      }

      alert("สร้างสำเร็จแล้ว");
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };

  return (
    <div>
      {/* LEFT */}
      <SubjectCardSection
        subjects={subjects}
        onChange={handleChange}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onSave={handleSubmit}
      />
      {/* LEFT */}
      <SubjectCardSection
        subjects={subjects}
        onChange={handleChange}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onSave={handleSubmit}
      />

      {/* RIGHT */}
      <AssignedTeacher
        subjects={subjects}
        assigned={assigned}
        setAssigned={setAssigned}
      />

      <Button onClick={handleSubmit}>Save</Button>
      {/* RIGHT */}
      <AssignedTeacher
        subjects={subjects}
        assigned={assigned}
        setAssigned={setAssigned}
      />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );

  // return (
  //   <div>
  //     <Input
  //       value={subjectName}
  //       onChange={(e) => setSubjectName(e.target.value)}
  //       placeholder="Enter Subject name"
  //     />

  //     <button onClick={handleSubmit}>Save</button>
  //   </div>
  // );

  // return (
  //   <div>
  //     <Input
  //       value={subjectName}
  //       onChange={(e) => setSubjectName(e.target.value)}
  //       placeholder="Enter Subject name"
  //     />

  //     <button onClick={handleSubmit}>Save</button>
  //   </div>
  // );
}
