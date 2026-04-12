'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AcademicContextType = {
  year: number;
  term: 1 | 2;
  setYear: (y: number) => void;
  setTerm: (t: 1 | 2) => void;
};

const AcademicContext = createContext<AcademicContextType | null>(null);

const STORAGE_KEY = 'academic_context';

function detectCurrentTerm(): 1 | 2 {
  const month = new Date().getMonth() + 1; // 1-12
  // เทอม 1: พ.ค.–ต.ค. (5–10), เทอม 2: พ.ย.–เม.ย. (11–4)
  return month >= 5 && month <= 10 ? 1 : 2;
}

export function AcademicProvider({ children }: { children: ReactNode }) {
  const [year, setYearState] = useState<number>(new Date().getFullYear());
  const [term, setTermState] = useState<1 | 2>(detectCurrentTerm);

  // โหลดจาก localStorage ครั้งแรก
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { year: y, term: t } = JSON.parse(saved);
        if (y) setYearState(y);
        if (t === 1 || t === 2) setTermState(t);
      }
    } catch {}
  }, []);

  const setYear = (y: number) => {
    setYearState(y);
    persist(y, term);
  };

  const setTerm = (t: 1 | 2) => {
    setTermState(t);
    persist(year, t);
  };

  function persist(y: number, t: 1 | 2) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ year: y, term: t }));
    } catch {}
  }

  return (
    <AcademicContext.Provider value={{ year, term, setYear, setTerm }}>
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const ctx = useContext(AcademicContext);
  if (!ctx) throw new Error('useAcademic must be used inside AcademicProvider');
  return ctx;
}
