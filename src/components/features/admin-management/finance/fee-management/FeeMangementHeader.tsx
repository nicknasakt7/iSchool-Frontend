'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FeeManagementHeader() {
  const pathname = usePathname();

  const isFee = pathname === '/admin-managements/finance/fee-management';
  const isCreate = pathname === '/admin-managements/finance/create-transaction';

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Tuition & Fees Management</h1>
        <p className="text-gray-500">
          Centralized oversight for academic financial transactions.
        </p>
      </div>

      <div className="flex gap-2">
        {/* 🔥 Fee Management */}
        <Link
          href="/admin-managements/finance/fee-management"
          className={`
            px-5 py-2 rounded-full text-md border
            transition-all duration-200
            ${
              isFee
                ? 'bg-card shadow-md font-bold text-primary'
                : 'text-muted-foreground hover:text-primary'
            }
          `}
        >
          Fee Management
        </Link>

        {/* 🔥 Create Transaction */}
        <Link
          href="/admin-managements/finance/create-transaction"
          className={`
            px-5 py-2 rounded-full text-md border
            transition-all duration-200
            ${
              isCreate
                ? 'bg-card shadow-md font-bold text-primary'
                : 'text-muted-foreground hover:text-primary'
            }
          `}
        >
          Create Transaction
        </Link>
      </div>
    </div>
  );
}
