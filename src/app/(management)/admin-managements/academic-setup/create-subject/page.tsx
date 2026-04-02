'use client';

import AssignTeacher from '@/components/features/subject/assign-teacher';
import SubjectCardSection from '@/components/features/subject/subject-select';
import { Button } from '@/components/ui/button';
// import { api } from '@/lib/api/client';
import { useState } from 'react';

type AssignedTeacher = {
  id: number;
  firstName: string;
  lastName: string;
  role: 'primary' | 'assistant';
};

type Subject = {
  id: number;
  name: string;
};

export default function CreateSubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([{ id: 1, name: '' }]);

  const [assigned, setAssigned] = useState<AssignedTeacher[]>([]);

  // 🔥 เปลี่ยนค่า input (ใช้ id)
  const handleChange = (id: number, value: string) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, name: value } : s)),
    );
  };

  // 🔥 เพิ่ม subject
  const handleAdd = () => {
    setSubjects(prev => [...prev, { id: Date.now(), name: '' }]);
  };

  // 🔥 ลบ subject
  const handleRemove = (id: number) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  // 🔥 ยิง API
  const handleSubmit = async () => {
    try {
      for (const subject of subjects) {
        if (!subject.name) continue;

        // await api.post('/subjects', {
        //   name: subject.name,
        // });
      }

      alert('สร้างสำเร็จแล้ว');
    } catch (error) {
      console.error(error);
      alert('error');
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

      {/* RIGHT */}
      <AssignTeacher
        subjects={subjects}
        assigned={assigned}
        setAssigned={setAssigned}
      />

      <Button onClick={handleSubmit}>Save</Button>
      {/* RIGHT */}

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
