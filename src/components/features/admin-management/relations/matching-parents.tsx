'use client';

import { useState } from 'react';
import {
  Parent,
  Student,
} from '@/app/(management)/admin-managements/relations/page';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link, Pen } from 'lucide-react';

type Props = {
  student: Student | null;
  parent: Parent | null;
  onFind: (parent: Parent | null) => void;
};

export default function MatchingParents({ student, parent, onFind }: Props) {
  const [isMatched, setIsMatched] = useState(false);

  const parentsDB: Parent[] = [
    {
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '012-3456',
    },
  ];

  const handleFind = () => {
    if (!student) return;

    const found = parentsDB.find(p => p.email === student.email) || null;

    onFind(found);
    setIsMatched(false); // reset ถ้าเลือกใหม่
  };

  const handleMatch = () => {
    console.log('MATCH SUCCESS', { student, parent });
    setIsMatched(true);
  };

  return (
    <div className="h-full rounded-2xl border bg-muted flex flex-col items-center justify-center text-center p-6">
      {/* 🟡 ยังไม่เลือก student */}
      {!student && (
        <p className="text-muted-foreground">Select a student to begin</p>
      )}

      {/* 🟢 เลือกแล้ว แต่ยังไม่ find */}
      {student && !parent && (
        <>
          <p className="text-muted-foreground mb-2">
            Ready to find matching parent for
          </p>

          <p className="font-semibold mb-6">{student.name}</p>

          <button
            onClick={handleFind}
            className="px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:opacity-90 transition"
          >
            ✨ Find Parents
          </button>
        </>
      )}

      {/* 🔵 เจอ parent แล้ว */}
      {student && parent && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Parent Identity Resolved
          </h2>

          {/* CARD */}
          <div
            className={`
              w-full max-w-sm bg-white rounded-2xl p-6 border space-y-4
              transition
              ${isMatched ? 'opacity-80' : ''}
            `}
          >
            {/* STATUS */}
            <div className="flex justify-center">
              <span
                className={`
                  text-xs px-3 py-1 rounded-full font-medium
                  ${
                    isMatched
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }
                `}
              >
                {isMatched ? '✔ MATCHED SUCCESSFULLY' : 'HIGHLY LIKELY MATCH'}
              </span>
            </div>

            {/* AVATAR */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                👨
              </div>

              <h3 className="mt-3 text-lg font-semibold">{parent.name}</h3>

              <p className="text-xs text-muted-foreground tracking-wide">
                GUARDIAN
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm">
              <p className="text-xs text-blue-500 font-medium mb-1">
                MATCHED BY EMAIL
              </p>

              <div className="flex items-center justify-between">
                <span className="font-medium">{parent.email}</span>
                <span className="text-blue-500">@</span>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Phone</span>
              <span className="font-medium text-foreground">
                {parent.phone}
              </span>
            </div>
          </div>

          {/* 🔥 BUTTON STATE */}
          {!isMatched ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex gap-2 mt-6 px-6 py-3 rounded-full bg-linear-to-r from-blue-500 to-blue-300 text-white font-semibold hover:opacity-90 transition">
                  <Link /> Match this relation
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Matching</AlertDialogTitle>

                  <AlertDialogDescription>
                    Match <span className="font-semibold">{parent.name}</span>{' '}
                    with <span className="font-semibold">{student.name}</span>?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction onClick={handleMatch}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <button
              onClick={() => setIsMatched(false)}
              className="flex gap-2 mt-6 px-6 py-3 rounded-full bg-card border border-blue-500 text-blue-500 font-semibold hover:bg-blue-50 transition"
            >
              <Pen /> Edit Relation
            </button>
          )}
        </>
      )}
    </div>
  );
}
