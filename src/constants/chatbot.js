// Simple keyword-matched FAQ used when no AI backend (VITE_CHAT_ENDPOINT) is
// configured. Keep responses short — this is a chat bubble, not a page.

export const chatFaq = [
  {
    id: "services",
    keywords: [
      "service",
      "services",
      "offer",
      "what do you do",
    ],
    response:
      "We run four service lines: B2B Staffing Solutions, Campus Connect, Lead Generation, and Custom AI Agents. Want details on one of these?",
  },

  {
    id: "staffing",
    keywords: [
      "staffing",
      "hire",
      "hiring",
      "recruit",
      "recruiting",
    ],
    response:
      "Our B2B Staffing Solutions team sources and vets candidates against roles you've defined tightly — not a resume dump.",
  },

  {
    id: "campus",
    keywords: [
      "campus",
      "graduate",
      "graduates",
      "university",
      "student",
    ],
    response:
      "Campus Connect runs structured pipelines with university programs, so you meet graduates before they hit the open market.",
  },

  {
    id: "leadgen",
    keywords: [
      "lead",
      "leads",
      "sales pipeline",
      "demand generation",
    ],
    response:
      "Our Lead Generation service builds outbound and inbound programs around your ideal customer, so sales gets qualified conversations, not cold lists.",
  },

  {
    id: "custom-ai-agents",
    keywords: [
      "ai",
      "ai agent",
      "ai agents",
      "custom ai",
      "custom ai agent",
      "custom ai agents",
      "artificial intelligence",
      "automation",
      "automate",
      "chatbot",
      "virtual assistant",
    ],
    response:
      "Our Custom AI Agents are designed around your business needs, helping automate workflows, engage with customers, and improve day-to-day operations.",
  },

  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "how much",
      "budget",
      "quote",
    ],
    response:
      "Pricing depends on scope, so the fastest path is a quick call. Want me to take you to our contact form?",
  },

  {
    id: "location",
    keywords: [
      "where",
      "location",
      "based",
      "office",
    ],
    response:
      "We're based in BC, Canada, and work with businesses across the country.",
  },

  {
    id: "contact",
    keywords: [
      "contact",
      "reach",
      "email",
      "phone number",
      "talk to someone",
      "human",
      "get in touch",
      "touch",
    ],
    response:
      "You can reach us directly using the buttons below, or I can scroll you to our contact form.",
  },

  {
    id: "careers",
    keywords: [
      "career",
      "careers",
      "job",
      "jobs",
      "opening",
      "openings",
      "join the team",
      "work with you",
    ],
    response:
      "We're always open to meeting good people. Check the Careers page for open roles, or email us your resume directly.",
  },
];

export const chatFallback =
  "I don't have a canned answer for that one — but our team will. Use the options below to reach us directly.";

export const chatWelcome =
  "Hi — I'm the West Ventures assistant. Ask about our services, or tap a topic below.";

export const chatQuickReplies = [
  {
    id: "services",
    label: "Services",
  },
  {
    id: "staffing",
    label: "Staffing",
  },
  {
    id: "campus",
    label: "Campus Connect",
  },
  {
    id: "leadgen",
    label: "Lead Generation",
  },
  {
    id: "custom-ai-agents",
    label: "Custom AI Agents",
  },
  {
    id: "pricing",
    label: "Pricing",
  },
  {
    id: "careers",
    label: "Careers",
  },
  {
    id: "contact",
    label: "Contact",
  },
];