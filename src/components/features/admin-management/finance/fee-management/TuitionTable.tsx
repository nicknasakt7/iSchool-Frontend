'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

type BillRow = {
  id: string;
  billNumber: string;
  title: string;
  studentName: string;
  amount: number;
  term: number;
  year: number;
  dueDate?: string | null;
  isPaid: boolean;
};

// Mock data — teammate replaces with real useAdminBills() hook
const MOCK_BILLS: BillRow[] = [
  {
    id: '1',
    billNumber: 'SCH-0001',
    title: 'Tuition Fee Term 1',
    studentName: 'Somchai Rakdee',
    amount: 1240000,
    term: 1,
    year: 2025,
    dueDate: '2025-06-30',
    isPaid: true,
  },
  {
    id: '2',
    billNumber: 'SCH-0002',
    title: 'Tuition Fee Term 1',
    studentName: 'Kanya Srisai',
    amount: 1240000,
    term: 1,
    year: 2025,
    dueDate: '2025-06-30',
    isPaid: false,
  },
  {
    id: '3',
    billNumber: 'SCH-0003',
    title: 'Extra Math Class',
    studentName: 'Arthit Boon',
    amount: 250000,
    term: 1,
    year: 2025,
    dueDate: null,
    isPaid: false,
  },
];

const PAGE_SIZE = 10;

function formatAmount(satang: number): string {
  return `฿${(satang / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}`;
}

export default function TuitionTable() {
  const [bills] = useState<BillRow[]>(MOCK_BILLS); // Teammate: replace with real data
  const [page, setPage] = useState(1);
  const [filterPaid, setFilterPaid] = useState<'all' | 'paid' | 'unpaid'>('all');

  const filtered = bills.filter(b => {
    if (filterPaid === 'paid') return b.isPaid;
    if (filterPaid === 'unpaid') return !b.isPaid;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Filter row */}
      <div className="flex gap-2">
        {(['all', 'paid', 'unpaid'] as const).map(f => (
          <button
            key={f}
            onClick={() => { setFilterPaid(f); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              filterPaid === f
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground self-center">
          {filtered.length} bill{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b bg-muted/50">
              <th className="px-4 py-3 font-medium">Bill No.</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Term / Year</th>
              <th className="px-4 py-3 font-medium">Due Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No bills found
                </td>
              </tr>
            ) : (
              paginated.map(bill => (
                <tr key={bill.id} className="hover:bg-muted/40 transition">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{bill.billNumber}</td>
                  <td className="px-4 py-3 font-medium">{bill.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{bill.studentName}</td>
                  <td className="px-4 py-3 font-medium">{formatAmount(bill.amount)}</td>
                  <td className="px-4 py-3 text-muted-foreground">Term {bill.term} / {bill.year}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {bill.dueDate
                      ? new Date(bill.dueDate).toLocaleDateString('th-TH')
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={bill.isPaid ? 'default' : 'destructive'}
                      className={bill.isPaid ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                    >
                      {bill.isPaid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
