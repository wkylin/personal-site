import Lenis from "lenis";
import { useEffect } from "react";

const anchorOffset = -76;

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      anchors: {
        offset: anchorOffset,
        duration: 1.05,
      },
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
    });

    const notifyScroll = () => {
      window.dispatchEvent(new Event("lenis-scroll"));
    };

    lenis.on("scroll", notifyScroll);
    notifyScroll();

    return () => {
      lenis.off("scroll", notifyScroll);
      lenis.destroy();
    };
  }, []);
}
