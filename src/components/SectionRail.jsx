import { useScrollSpy } from "../hooks/useScrollSpy";
import { classNames } from "../utils/classNames";
import "./SectionRail.css";

const sections = [
  { id: "home", number: "01" },
  { id: "services", number: "02" },
  { id: "approach", number: "03" },
  { id: "about", number: "04" },
  { id: "contact", number: "05" },
];

/**
 * A fixed vertical index on large screens showing which section of the
 * page is currently in view, with click-to-jump. Hidden below 1280px so
 * it never competes for space with real content.
 */
export default function SectionRail() {
  const activeId = useScrollSpy(sections.map((section) => section.id));

  return (
    <nav className="section-rail" aria-label="Page sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={classNames("section-rail-dot", section.id === activeId && "is-active")}
          aria-label={`Go to ${section.id} section`}
          aria-current={section.id === activeId ? "true" : undefined}
        >
          {section.number}
        </a>
      ))}
    </nav>
  );
}