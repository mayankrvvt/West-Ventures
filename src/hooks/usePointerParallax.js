import { useEffect, useRef, useState } from "react";

/**
 * Tracks pointer position relative to the center of the referenced
 * element, returned as normalized values from -1 to 1. Used to give
 * the hero illustration a subtle, direct-manipulation feel. Skips
 * entirely on touch devices and when the user prefers reduced motion.
 */
export function usePointerParallax(strength = 12) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: relX * 2 * strength, y: relY * 2 * strength });
    };

    const handleLeave = () => setOffset({ x: 0, y: 0 });

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return [ref, offset];
}
