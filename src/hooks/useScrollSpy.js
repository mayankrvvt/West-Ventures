import { useEffect, useState } from "react";

/**
 * Watches a list of section ids and reports which one is currently
 * most in view, so a nav bar can highlight the active link as the
 * person scrolls instead of only on click.
 */
export function useScrollSpy(ids, options = { rootMargin: "-45% 0px -45% 0px" }) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options]);

  return activeId;
}
