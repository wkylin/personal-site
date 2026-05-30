import { type DependencyList, useEffect } from "react";

function prepareRevealGroups() {
  const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-group]"));

  groups.forEach((group) => {
    const baseDelay = Number(group.dataset.revealBaseDelay ?? 0);
    const stepDelay = Number(group.dataset.revealStepDelay ?? 80);
    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${baseDelay + index * stepDelay}ms`);
      item.style.setProperty("--reveal-y", `${Math.min(28, 18 + index * 2)}px`);
      item.style.setProperty("--reveal-scale", index === 0 ? "0.992" : "0.985");
    });
  });
}

export function useRevealMotion(deps: DependencyList) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    prepareRevealGroups();

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
