import { useEffect, useState } from "react";

export function PageIntro() {
  const [isVisible, setIsVisible] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(false), 2600);

    return () => window.clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="page-intro" aria-hidden="true">
      <div className="page-intro-grid" />
      <div className="page-intro-glow" />
      <div className="page-intro-mark">
        <span className="page-intro-word">WK</span>
        <span className="page-intro-line" />
        <span className="page-intro-label">Frontend Architecture OS</span>
      </div>
    </div>
  );
}
