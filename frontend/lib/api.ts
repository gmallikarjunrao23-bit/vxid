import { getApiUrl } from "./utils";

/** Generic fetch wrapper with JSON handling and error normalization. */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${getApiUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      (errorBody as { error?: string }).error ||
        `Request failed with status ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

/* ---------------- CONTACT ---------------- */

export interface ContactPayload {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export function submitContact(data: ContactPayload): Promise<ContactResponse> {
  return request<ContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ---------------- AUTH ---------------- */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: { id: string; email: string };
}

export function login(data: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ---------------- ADMIN ---------------- */

export interface Submission {
  id: string;
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  total: number;
  unread: number;
  thisMonth: number;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vxid_admin_token");
}

export async function fetchSubmissions(
  params: { page?: number; limit?: number; search?: string } = {}
): Promise<{ data: Submission[]; total: number; page: number; totalPages: number }> {
  const { page = 1, limit = 10, search = "" } = params;
  const token = getAuthToken();
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) query.set("search", search);

  const res = await fetch(`${getApiUrl()}/api/admin/submissions?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load submissions (${res.status})`);
  }
  return res.json();
}

export async function fetchStats(): Promise<AdminStats> {
  const token = getAuthToken();
  const res = await fetch(`${getApiUrl()}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to load stats (${res.status})`);
  return res.json();
}

export async function markRead(id: string): Promise<Submission> {
  const token = getAuthToken();
  const res = await fetch(`${getApiUrl()}/api/admin/submissions/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
}

export async function deleteSubmission(id: string): Promise<void> {
  const token = getAuthToken();
  const res = await fetch(`${getApiUrl()}/api/admin/submissions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete submission");
}

export function storeToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("vxid_admin_token", token);
  }
}

export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vxid_admin_token");
  }
}

export function hasToken(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("vxid_admin_token");
}
