import { type DependencyList, useEffect } from "react";

export function useRevealMotion(deps: DependencyList) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealNodes.length) {
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, deps);
}

