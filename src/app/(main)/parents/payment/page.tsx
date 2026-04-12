'use client';

import { useState } from 'react';
import CheckoutPage from '@/components/features/payments/stripe/checkout';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

type Bill = {
  id: string;
  billNumber: string;
  title: string;
  description?: string | null;
  amount: number; // in satang
  term: number;
  year: number;
  dueDate?: string | null;
  isPaid: boolean;
  studentName: string;
};

// Mock bills — teammate replaces with real useMyBills() hook
const MOCK_BILLS: Bill[] = [
  {
    id: '1',
    billNumber: 'SCH-0001',
    title: 'Tuition Fee Term 1',
    description: 'Semester 1 tuition fee',
    amount: 1240000,
    term: 1,
    year: 2025,
    dueDate: '2025-06-30',
    isPaid: false,
    studentName: 'Somchai Rakdee',
  },
  {
    id: '2',
    billNumber: 'SCH-0003',
    title: 'Extra Math Class',
    description: null,
    amount: 250000,
    term: 1,
    year: 2025,
    dueDate: null,
    isPaid: false,
    studentName: 'Somchai Rakdee',
  },
  {
    id: '3',
    billNumber: 'SCH-0005',
    title: 'Tuition Fee Term 2',
    description: null,
    amount: 1240000,
    term: 2,
    year: 2024,
    dueDate: '2024-12-31',
    isPaid: true,
    studentName: 'Somchai Rakdee',
  },
];

function formatAmount(satang: number): string {
  return `฿${(satang / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}`;
}

export default function PaymentPage() {
  const [bills] = useState<Bill[]>(MOCK_BILLS); // Teammate: replace with useMyBills()
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  // Teammate: clientSecret comes from POST /bills/:id/payment-intent
  const [clientSecret] = useState<string | null>(null);

  const selectedBill = bills.find(b => b.id === selectedBillId) ?? null;
  const unpaidBills = bills.filter(b => !b.isPaid);
  const paidBills = bills.filter(b => b.isPaid);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back */}
        <Link
          href="/parents/student-info"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div>
          <h1 className="text-3xl font-bold">My Bills</h1>
          <p className="text-gray-500 mt-1">
            View and pay outstanding bills for your child.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT — bill list */}
          <div className="space-y-4">
            {unpaidBills.length === 0 && paidBills.length === 0 && (
              <p className="text-center text-gray-400 py-10">No bills found.</p>
            )}

            {/* Unpaid */}
            {unpaidBills.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Outstanding
                </p>
                {unpaidBills.map(bill => (
                  <div
                    key={bill.id}
                    onClick={() => setSelectedBillId(bill.id === selectedBillId ? null : bill.id)}
                    className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all ${
                      selectedBillId === bill.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{bill.billNumber}</span>
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">
                            <Clock size={10} /> Unpaid
                          </span>
                        </div>
                        <p className="font-semibold truncate">{bill.title}</p>
                        <p className="text-sm text-gray-500">{bill.studentName} · Term {bill.term}/{bill.year}</p>
                        {bill.dueDate && (
                          <p className="text-xs text-red-400 mt-1">
                            Due: {new Date(bill.dueDate).toLocaleDateString('th-TH')}
                          </p>
                        )}
                      </div>
                      <p className="font-bold text-lg shrink-0">{formatAmount(bill.amount)}</p>
                    </div>

                    {selectedBillId === bill.id && (
                      <button
                        className="mt-4 w-full py-2 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition"
                        onClick={e => {
                          e.stopPropagation();
                          // Teammate: call POST /bills/:id/payment-intent here
                          console.log('Pay bill:', bill.id);
                        }}
                      >
                        Pay {formatAmount(bill.amount)} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Paid */}
            {paidBills.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-2">
                  Paid
                </p>
                {paidBills.map(bill => (
                  <div
                    key={bill.id}
                    className="bg-white rounded-2xl border p-5 opacity-60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{bill.billNumber}</span>
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
                            <CheckCircle2 size={10} /> Paid
                          </span>
                        </div>
                        <p className="font-semibold truncate">{bill.title}</p>
                        <p className="text-sm text-gray-500">{bill.studentName} · Term {bill.term}/{bill.year}</p>
                      </div>
                      <p className="font-bold text-lg shrink-0 text-gray-400">{formatAmount(bill.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Stripe checkout */}
          <div className="sticky top-6">
            {selectedBill ? (
              <div className="bg-white rounded-2xl border p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Paying for</p>
                  <p className="font-semibold text-lg">{selectedBill.title}</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {formatAmount(selectedBill.amount)}
                  </p>
                </div>
                <hr />
                <CheckoutPage clientSecret={clientSecret} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border p-10 flex flex-col items-center justify-center text-center text-gray-400 min-h-64">
                <p className="text-base font-medium">Select a bill to pay</p>
                <p className="text-sm mt-1">
                  Click on any outstanding bill to proceed to checkout.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
