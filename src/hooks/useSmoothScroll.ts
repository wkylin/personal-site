import Lenis from "lenis";
import { useEffect, useLayoutEffect } from "react";

function getAnchorOffset() {
  const navHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 76;

  return -(navHeight + 8);
}

function resetHeroScroll() {
  if (!window.location.hash || window.location.hash === "#hero") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}

export function useSmoothScroll() {
  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    resetHeroScroll();

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anchorOffset = getAnchorOffset();

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

    const correctInitialHash = () => {
      if (!window.location.hash || window.location.hash === "#hero") {
        lenis.scrollTo(0, { immediate: true, force: true });
        notifyScroll();
        return;
      }

      lenis.scrollTo(window.location.hash, {
        immediate: true,
        offset: getAnchorOffset(),
        force: true,
      });
      notifyScroll();
    };

    const frameId = window.requestAnimationFrame(correctInitialHash);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.off("scroll", notifyScroll);
      lenis.destroy();
    };
  }, []);
}
