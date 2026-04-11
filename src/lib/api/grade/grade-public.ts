export type PublicGrade = {
  id: string;
  name: string;
  level: number;
};

export async function fetchPublicGrades(): Promise<PublicGrade[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/classrooms/grades/public`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const json = await res.json();
  // backend wraps responses in { success, data }
  return json.data ?? json;
}
