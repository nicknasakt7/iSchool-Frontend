import { apiClient } from '@/lib/api/client';
import { api } from '@/lib/api/api-server';
import { Lead, CreateLeadPayload } from './lead.type';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Public — ไม่ต้อง auth (ใช้ fetch ตรงเพราะ apiClient ต้องการ token)
export async function submitLead(payload: CreateLeadPayload): Promise<Lead> {
  const res = await fetch(`${BACKEND_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? 'ส่งข้อมูลไม่สำเร็จ');
  }
  const json = await res.json();
  return json.data ?? json;
}

// Server-side (Server Component / Server Action)
export const leadServerService = {
  getLeads: (status?: string) =>
    api.get<Lead[]>('/leads', status ? { status } : undefined),
};

// Client-side (เรียกจาก Server Action)
export const leadClientService = {
  updateStatus: (id: string, status: string, token: string) =>
    apiClient.patch<Lead>(`/leads/${id}/status`, { status }, token),

  deleteLead: (id: string, token: string) =>
    apiClient.delete<void>(`/leads/${id}`, token),
};
