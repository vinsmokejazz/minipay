import { getAccessToken, clearAccessToken } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends RequestInit {
  method?: HttpMethod;
  rawResponse?: boolean;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}) {
  const token = getAccessToken();
  const headers = new Headers(options.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: options.credentials ?? "include",
  });

  if (response.status === 401) {
    clearAccessToken();
  }

  if (options.rawResponse) {
    return response as T;
  }

  const data = (await response.json()) as T;
  if (!response.ok) {
    const message = (data as { message?: string }).message ?? "Request failed";
    throw new Error(message);
  }

  return data;
}
