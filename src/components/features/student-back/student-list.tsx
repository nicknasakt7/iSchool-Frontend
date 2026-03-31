'use client';

import StudentCard from './student-card';

type StudentsListProps = {
  search: string;
  grade: string;
};

export default function StudentsList({ search, grade }: StudentsListProps) {
  const students = [
    {
      id: '1',
      name: 'Benny Hen',
      nickname: 'Ben',
      grade: 'P.1',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '1',
      name: 'Ellie Bones',
      nickname: 'El',
      grade: 'P.1',
      image: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '2',
      name: 'Nick Nasa',
      nickname: 'Nick',
      grade: 'P.2',
      image: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '1',
      name: 'Chun Ki',
      nickname: 'Chun',
      grade: 'P.2',
      image: 'https://i.pravatar.cc/150?img=2',
    },
  ];

  //  filter logic
  const filtered = students.filter(s => {
    const matchSearch = `${s.name} ${s.nickname}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchGrade = grade === 'all' || s.grade === grade;

    return matchSearch && matchGrade;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map((s, i) => (
        <StudentCard key={i} {...s} />
      ))}
    </div>
  );
}
