const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

/**
 * Submits the contact form. Replace VITE_CONTACT_ENDPOINT in .env with
 * your real form handler (e.g. a serverless function or CRM webhook).
 */
export async function submitContactRequest(payload) {
  if (!ENDPOINT) {
    console.warn("VITE_CONTACT_ENDPOINT is not set — form submission skipped.");
    return { ok: false, reason: "not-configured" };
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact request failed with status ${response.status}`);
  }

  return { ok: true };
}
