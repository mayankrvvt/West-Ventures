const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5050").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export const jobsApi = {
  getOpenJobs: () => request("/api/jobs"),
  getJob: (id) => request(`/api/jobs/${id}`),
  adminLogin: (email, password) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getAdminJobs: (token) =>
    request("/api/jobs/admin/all", { headers: { Authorization: `Bearer ${token}` } }),
  createJob: (token, job) =>
    request("/api/jobs", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(job),
    }),
  updateJob: (token, id, job) =>
    request(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(job),
    }),
  deleteJob: (token, id) =>
    request(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};
