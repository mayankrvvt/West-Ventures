import { useEffect, useState } from "react";

/**
 * Tracks the vertical scroll position of the window.
 * Returns the current scrollY and whether the user has scrolled
 * past `threshold` px, useful for shrinking/darkening a sticky navbar.
 */
export function useScrollPosition(threshold = 24) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = null;

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, isScrolled: scrollY > threshold };
}
