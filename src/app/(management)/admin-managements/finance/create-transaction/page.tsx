'use client';

import AudiencePanel from '@/components/features/admin-management/finance/create-transaction/AudiencePanel';
import CreateTransactionHeader from '@/components/features/admin-management/finance/create-transaction/CreateTransactionHeader';
import SubmitBar from '@/components/features/admin-management/finance/create-transaction/SubmitBar';
import TransactionForm from '@/components/features/admin-management/finance/create-transaction/TransactionForm';
import { AudienceSelection, TransactionFormData } from '@/components/features/admin-management/finance/create-transaction/types/type';
import { useState } from 'react';

export default function CreateTransactionPage() {
  const [form, setForm] = useState<TransactionFormData>({
    title: '',
    description: '',
    amount: '',
    term: '1',
    year: new Date().getFullYear().toString(),
    dueDate: '',
  });

  const [selection, setSelection] = useState<AudienceSelection>({
    gradeIds: [],
    classroomIds: [],
    studentIds: [],
  });

  const handleSubmit = () => {
    // Teammate: call useCreateBills mutation here
    const payload = {
      title: form.title,
      description: form.description || undefined,
      amount: Math.round(parseFloat(form.amount) * 100), // convert ฿ → satang
      term: parseInt(form.term),
      year: parseInt(form.year),
      dueDate: form.dueDate || undefined,
      studentIds: selection.studentIds,
      classroomIds: selection.classroomIds,
      gradeIds: selection.gradeIds,
    };
    // TODO: await createBills(payload)
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <CreateTransactionHeader />

      <div className="grid grid-cols-2 gap-6">
        <TransactionForm form={form} setForm={setForm} />
        <AudiencePanel selection={selection} setSelection={setSelection} />
      </div>

      <SubmitBar onSubmit={handleSubmit} />
    </div>
  );
}
