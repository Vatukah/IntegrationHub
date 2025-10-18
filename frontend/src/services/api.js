// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "API request failed");
  }

  return res.json();
}
