import { useScrollProgress } from "../hooks/useScrollProgress";
import "./ScrollProgressBar.css";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}