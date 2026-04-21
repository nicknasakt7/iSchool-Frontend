'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lead } from '@/lib/api/lead/lead.type';
import { updateLeadStatusAction, deleteLeadAction } from '@/lib/actions/lead.action';

type Props = { lead: Lead };

function initials(first: string, last: string) {
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}

export default function ActivityRow({ lead }: Props) {
  const [statusPending, startStatusTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  const handleStatusChange = (status: string) => {
    startStatusTransition(async () => {
      await updateLeadStatusAction(lead.id, status);
    });
  };

  const handleDelete = () => {
    if (!confirm(`ลบข้อมูลของ ${lead.parentFirstName} ${lead.parentLastName}?`)) return;
    startDeleteTransition(async () => {
      await deleteLeadAction(lead.id);
    });
  };

  const date = new Date(lead.createdAt).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="grid grid-cols-5 items-center px-4 py-4 border-t text-base hover:bg-muted/40 transition">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold shrink-0">
          {initials(lead.parentFirstName, lead.parentLastName)}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">
            {lead.parentFirstName} {lead.parentLastName}
          </p>
          <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
        </div>
      </div>

      {/* Grade */}
      <div>{lead.grade.name}</div>

      {/* Date */}
      <div>{date}</div>

      {/* Status */}
      <div>
        <Select
          defaultValue={lead.status}
          onValueChange={handleStatusChange}
          disabled={statusPending}
        >
          <SelectTrigger className="w-32 h-8 rounded-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WAITING">Waiting</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          disabled={deletePending}
          className="p-1 rounded hover:bg-destructive/10 transition disabled:opacity-50"
        >
          <Trash2 size={16} className="text-destructive" />
        </button>
      </div>
    </div>
  );
}
