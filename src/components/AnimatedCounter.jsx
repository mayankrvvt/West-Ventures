import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  end,
  duration = 1800,
}) {
  const [count, setCount] = useState(0);

  const elementRef = useRef(null);

  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting ||
          hasAnimated.current
        ) {
          return;
        }

        hasAnimated.current = true;

        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed =
            currentTime - startTime;

          const progress = Math.min(
            elapsed / duration,
            1
          );

          /*
            Ease-out cubic.
            Starts quickly and slows down
            naturally near the final number.
          */
          const easedProgress =
            1 - Math.pow(1 - progress, 3);

          const currentValue = Math.floor(
            easedProgress * end
          );

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };

        requestAnimationFrame(animate);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      {count}
    </span>
  );
}