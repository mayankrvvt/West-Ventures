export const siteConfig = {
  name: "West Ventures",
  fullName: "West Ventures Marketing Incorporation",
  tagline: "Business Services. Superior Services.",
  location: "BC, Canada",
  phone: import.meta.env.VITE_CONTACT_PHONE || "+1 (647) 947-4827",
  email: import.meta.env.VITE_CONTACT_EMAIL || "sales@westventures.ca",
  // Digits only, country code first, no "+" or spaces — used to build wa.me links
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "16479474827",
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
};