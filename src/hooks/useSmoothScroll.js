import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Replaces native scroll with smooth, inertia-based scrolling site-wide,
 * and makes in-page anchor links (nav, footer, CTA buttons) glide to their
 * target instead of jumping. Skips entirely for reduced-motion users, in
 * which case the browser's normal instant/native scroll behavior applies.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    function handleAnchorClick(event) {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash.length <= 1) return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      // Offset accounts for the sticky navbar height so targets don't land
      // hidden underneath it.
      lenis.scrollTo(target, { offset: -84 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
}