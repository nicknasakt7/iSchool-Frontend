'use client';

import { TransactionFormData } from './types/type';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type TransactionProps = {
  form: TransactionFormData;
  setForm: React.Dispatch<React.SetStateAction<TransactionFormData>>;
};

export default function TransactionForm({ form, setForm }: TransactionProps) {
  const set = (key: keyof TransactionFormData) =>
    (value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          BILL TITLE <span className="text-red-400">*</span>
        </p>
        <input
          value={form.title}
          onChange={e => set('title')(e.target.value)}
          placeholder="e.g. Tuition Fee, Extra Math Class"
          className="border p-3 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          DESCRIPTION <span className="text-gray-400">(OPTIONAL)</span>
        </p>
        <textarea
          value={form.description}
          onChange={e => set('description')(e.target.value)}
          placeholder="Additional details about this charge..."
          rows={3}
          className="border p-3 rounded-lg w-full bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* TERM + YEAR */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            ACADEMIC TERM
          </p>
          <Select value={form.term} onValueChange={set('term')}>
            <SelectTrigger className="border p-6 w-full rounded-lg bg-white">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Term 1</SelectItem>
              <SelectItem value="2">Term 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            ACADEMIC YEAR
          </p>
          <Select value={form.year} onValueChange={set('year')}>
            <SelectTrigger className="border p-6 w-full rounded-lg bg-white">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AMOUNT */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          AMOUNT (฿) <span className="text-red-400">*</span>
        </p>
        <input
          type="number"
          min="1"
          value={form.amount}
          onChange={e => set('amount')(e.target.value)}
          placeholder="0.00"
          className="border p-3 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* DUE DATE */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          DUE DATE <span className="text-gray-400">(OPTIONAL)</span>
        </p>
        <input
          type="date"
          value={form.dueDate}
          onChange={e => set('dueDate')(e.target.value)}
          className="border p-3 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="bg-blue-50 text-blue-600 p-4 rounded-lg text-sm">
        A bill will be created for each selected student and sent to their
        registered parent. Parents can pay via Stripe through their portal.
      </div>
    </div>
  );
}
