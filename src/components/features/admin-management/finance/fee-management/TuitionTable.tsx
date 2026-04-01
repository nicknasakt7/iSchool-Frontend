'use client';

import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type Student = {
  name: string;
  nickname: string;
  id: string;
  code: string;
  status: 'Paid' | 'Unpaid';
};

export default function TuitionTable() {
  const [students, setStudents] = useState<Student[]>([
    {
      name: 'Somchai Rakdee',
      nickname: 'Som',
      id: '650124',
      code: 'ST-2024-08932',
      status: 'Paid',
    },
    {
      name: 'Kanya Wattana',
      nickname: 'Nan',
      id: '650025',
      code: 'ST-2024-8415',
      status: 'Unpaid',
    },
    {
      name: 'Anan Siri',
      nickname: 'Panu',
      id: '650029',
      code: 'ST-2024-1182',
      status: 'Paid',
    },
    {
      name: 'Malee Boon',
      nickname: 'May',
      id: '650032',
      code: 'ST-2024-6557',
      status: 'Unpaid',
    },

    // 🔥 เพิ่มอีก 4 คน → รวม 8 คน (ได้ 4 หน้า ถ้า page ละ 2)
    {
      name: 'Niran Chaiyo',
      nickname: 'Ran',
      id: '650041',
      code: 'ST-2024-2231',
      status: 'Paid',
    },
    {
      name: 'Suda Meechai',
      nickname: 'Da',
      id: '650052',
      code: 'ST-2024-9981',
      status: 'Unpaid',
    },
    {
      name: 'Prasit Wong',
      nickname: 'Sit',
      id: '650063',
      code: 'ST-2024-4412',
      status: 'Paid',
    },
    {
      name: 'Chalida Nook',
      nickname: 'Lin',
      id: '650074',
      code: 'ST-2024-7712',
      status: 'Unpaid',
    },
  ]);

  // 🔥 Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  // 🔥 Update Status
  const handleStatusChange = (index: number, value: 'Paid' | 'Unpaid') => {
    const updated = [...students];
    updated[index].status = value;
    setStudents(updated);
  };

  const getStatusStyle = (status: 'Paid' | 'Unpaid') => {
    return status === 'Paid'
      ? 'bg-green-100 text-green-600'
      : 'bg-yellow-100 text-yellow-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        {/* HEADER */}
        <thead className="text-gray-500 text-sm border-b">
          <tr>
            <th className="text-left p-4">FULL NAME</th>
            <th className="text-left p-4">STUDENT ID</th>
            <th className="text-left p-4">TUITION FEE</th>
            <th className="text-left p-4">STATUS</th>
            <th className="text-left p-4">ACTIONS</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {currentStudents.map((s, i) => (
            <tr key={i} className="border-b">
              {/* NAME */}
              <td className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-xl font-semibold">
                  {s.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-gray-400 text-sm">{s.nickname}</p>
                </div>
              </td>

              {/* ID */}
              <td className="p-4">
                <p>{s.id}</p>
                <p className="text-gray-400 text-sm">{s.code}</p>
              </td>

              {/* FEE */}
              <td className="p-4">
                <p className="text-blue-600 font-medium">฿45,000.00</p>
                <p className="text-gray-400 text-xs">TUITION FEE</p>
              </td>

              {/* STATUS */}
              <td className="p-4">
                <Select
                  value={s.status}
                  onValueChange={(value: 'Paid' | 'Unpaid') =>
                    handleStatusChange(startIndex + i, value)
                  }
                >
                  <SelectTrigger
                    className={`
                      w-120px h-9 rounded-full text-sm border-none
                      ${getStatusStyle(s.status)}
                    `}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </td>

              {/* ACTION */}
              <td className="p-4">
                <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                  View Ledger
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-500">
        <p>
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, students.length)} of{' '}
          {students.length} students
        </p>

        <div className="flex gap-2 items-center">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 ${
                  currentPage === page ? 'font-bold text-black' : ''
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
