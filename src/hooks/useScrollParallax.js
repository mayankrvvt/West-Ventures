import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a pixel offset that drifts as the referenced element
 * moves through the viewport, for a subtle parallax effect on images.
 * The offset is clamped to `maxOffset` so callers can safely oversize
 * the image (e.g. height: 120%) without ever revealing an edge.
 */
export function useScrollParallax(speed = 0.1, maxOffset = 36) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frame = null;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) * speed * -1;
      setOffset(Math.min(maxOffset, Math.max(-maxOffset, distance)));
      frame = null;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, maxOffset]);

  return [ref, offset];
}