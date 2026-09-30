const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5050"
).replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong. Please try again."
    );
  }

  return data;
}

export const leadApi = {
  async createLead(lead) {
    return request("/api/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    });
  },

  async getAllLeads(token) {
    return request("/api/leads/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async updateLead(id, updates, token) {
    return request(`/api/leads/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  },

  async deleteLead(id, token) {
    return request(`/api/leads/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};