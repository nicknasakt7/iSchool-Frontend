// import { clientEnv } from '@/config/client-env.validation';
import { ApiError } from "@/lib/api/api.error";
// import { error } from 'console';
import { redirect } from "next/navigation";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  token?: string;
};

//เพิ่มมา
const buildQuery = (params?: Record<string, string | number | boolean>) => {
  if (!params) return "";

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
};
//ไปดูหน่อย
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const BACKEND_URL = clientEnv.NEXT_PUBLIC_BACKEND_URL;

const UNAUTHORIZED_CODE = ["INVALID_TOKEN", "TOKEN_EXPIRED"] as const;

const apiFetch = async <T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  // const { method = 'GET', body } = options; เก่า
  const { method = "GET", body, params } = options;
  const query = buildQuery(params);

  const fullUrl = query ? `${url}?${query}` : url;

  // const session = await auth();
  // console.log('session  apiFetch', session);

  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData))
    headers["Content-type"] = "application/json";

  if (options.token) headers["Authorization"] = `Bearer ${options.token}`;

  const config: RequestInit = {
    method,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    headers,
  };
  const res = await fetch(`${BACKEND_URL}${fullUrl}`, config);

  if (!res.ok) {
    const error = await res.json();
    if (res.status === 401 && UNAUTHORIZED_CODE.includes(error.code)) {
      redirect("/api/proxy/clear-session");
    }

    throw new ApiError(error.message, error.code, error.details);
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T;
  }

  return (await res.json()).data;
};
const get = <T>(
  url: string,
  params?: Record<string, string | number | boolean>,
  token?: string,
) => apiFetch<T>(url, { params, token });
// const get = <T>(url: string) => apiFetch<T>(url);
const post = <T>(url: string, body?: unknown, token?: string) =>
  apiFetch<T>(url, { method: "POST", body, token });
const put = <T>(url: string, body?: unknown, token?: string) =>
  apiFetch<T>(url, { method: "PUT", body, token });
const patch = <T>(url: string, body?: unknown, token?: string) =>
  apiFetch<T>(url, { method: "PATCH", body, token });
const del = <T>(url: string, token?: string) =>
  apiFetch<T>(url, { method: "DELETE", token });

export const apiClient = { get, post, put, patch, delete: del };
