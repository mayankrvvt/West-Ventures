import { useOnScreen } from "../hooks/useOnScreen";
import { classNames } from "../utils/classNames";
import "./Reveal.css";

/**
 * Fades and lifts its children into place the first time they scroll
 * into view. `delay` (ms) lets a group of Reveals stagger slightly.
 */
export default function Reveal({ children, delay = 0, className, as: Tag = "div" }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <Tag
      ref={ref}
      className={classNames("reveal", isVisible && "reveal-visible", className)}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
