import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the referenced element is currently in the viewport.
 * `once` keeps the value true after the first time it becomes visible,
 * which is what most reveal/counter animations want.
 */
export function useOnScreen({ threshold = 0.3, rootMargin = "0px", once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
