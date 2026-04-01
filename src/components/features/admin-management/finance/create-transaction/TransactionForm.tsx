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
  return (
    <div className="space-y-6">
      {/* 🔥 TERM + YEAR */}
      <div className="grid grid-cols-2 gap-4">
        {/* TERM */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            ACADEMIC TERM
          </p>

          <Select
            value={form.term}
            onValueChange={(value) => setForm({ ...form, term: value })}
          >
            <SelectTrigger className="border p-6 w-full rounded-lg bg-white">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Term 1">Term 1</SelectItem>
              <SelectItem value="Term 2">Term 2</SelectItem>
              <SelectItem value="Term 3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* YEAR */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 tracking-wide">
            ACADEMIC YEAR
          </p>

          <Select
            value={form.year}
            onValueChange={(value) => setForm({ ...form, year: value })}
          >
            <SelectTrigger className="border p-6 w-full rounded-lg bg-white">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 🔥 AMOUNT */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          AMOUNT
        </p>

        <input
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="฿ 0.00"
          className="border p-3 rounded-lg w-full bg-white"
        />
      </div>

      {/* 🔥 REF */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          TRANSACTION REF <span className="text-gray-400">(OPTIONAL)</span>
        </p>

        <input
          value={form.ref}
          onChange={(e) => setForm({ ...form, ref: e.target.value })}
          placeholder="TXN-0000"
          className="border p-3 rounded-lg w-full bg-white"
        />
      </div>

      {/* 🔥 QR */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          QR CODE URL
        </p>

        <input
          value={form.qr}
          onChange={(e) => setForm({ ...form, qr: e.target.value })}
          placeholder="https://payment.gateway/qr/..."
          className="border p-3 rounded-lg w-full bg-white"
        />
      </div>

      {/* 🔥 INFO */}
      <div className="bg-blue-50 text-blue-600 p-4 rounded-lg text-sm">
        This payment will be applied to the selected students below. An
        automated receipt will be sent to their primary registered email address
        upon finalization.
      </div>
    </div>
  );
}
