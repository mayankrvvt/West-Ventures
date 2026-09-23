import { chatFaq, chatFallback } from "../constants/chatbot";

const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT;

/**
 * Matches a message against the local FAQ list by keyword. This is the
 * default behavior — no backend required.
 */
function matchFaq(message) {
  const normalized = message.toLowerCase();
  const match = chatFaq.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  return match ? match.response : chatFallback;
}

/**
 * Small artificial delay so the typing indicator is actually visible.
 * The FAQ lookup itself is instant, which otherwise makes the "typing"
 * animation flash for a few milliseconds and never register.
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function thinkingDelay() {
  return wait(650 + Math.random() * 450); // ~0.65s–1.1s
}

/**
 * Gets a bot reply for the given message.
 *
 * If VITE_CHAT_ENDPOINT is set, this calls that endpoint first — point it at
 * your own backend (e.g. a serverless function proxying the Anthropic API)
 * that accepts POST { message, history } and returns JSON { reply }.
 * If the endpoint is unset, unreachable, or errors, it falls back to the
 * local FAQ matcher so the widget always has something useful to say.
 */
export async function getBotReply(message, history = [], intentId) {
  if (ENDPOINT) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      if (!response.ok) throw new Error(`Chat endpoint returned ${response.status}`);

      const data = await response.json();
      if (data?.reply) {
        return { reply: data.reply, source: "ai" };
      }
      throw new Error("Chat endpoint response missing 'reply'");
    } catch (err) {
      console.warn("Chat endpoint failed, falling back to FAQ bot:", err);
    }
  }

  // Quick-reply chips already know exactly which FAQ entry they mean —
  // answer directly instead of re-guessing from the label text.
  if (intentId) {
    const direct = chatFaq.find((entry) => entry.id === intentId);
    if (direct) {
      await thinkingDelay();
      return { reply: direct.response, source: "faq" };
    }
  }

  await thinkingDelay();
  return { reply: matchFaq(message), source: "faq" };
}