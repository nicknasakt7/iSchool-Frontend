'use client';

import AudiencePanel from '@/components/features/admin-management/finance/create-transaction/AudiencePanel';
import CreateTransactionHeader from '@/components/features/admin-management/finance/create-transaction/CreateTransactionHeader';
import SubmitBar from '@/components/features/admin-management/finance/create-transaction/SubmitBar';
import TransactionForm from '@/components/features/admin-management/finance/create-transaction/TransactionForm';
import { useState } from 'react';

export default function CreateTransactionPage() {
  const [form, setForm] = useState({
    term: 'Term 1',
    year: '2024',
    amount: '',
    ref: '',
    qr: '',
  });

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const handleSubmit = () => {
    const payload = {
      ...form,
      students: selectedStudents,
    };

    console.log('🔥 SUBMIT:', payload);
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <CreateTransactionHeader />

      <div className="grid grid-cols-2 gap-6">
        <TransactionForm form={form} setForm={setForm} />
        <AudiencePanel
          selected={selectedStudents}
          setSelected={setSelectedStudents}
        />
      </div>

      <SubmitBar onSubmit={handleSubmit} />
    </div>
  );
}
