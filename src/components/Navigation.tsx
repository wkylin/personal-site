import { useEffect, useState } from "react";
import type { ProfileData } from "../profileData";

type NavigationProps = {
  contacts: ProfileData["contacts"];
};

const navItems = [
  { label: "项目", href: "#projects", id: "projects" },
  { label: "能力", href: "#skills", id: "skills" },
  { label: "联系", href: "#contact", id: "contact" },
];

function getActiveSectionId() {
  const sections = navItems
    .map((item) => document.getElementById(item.id))
    .filter((section): section is HTMLElement => Boolean(section));

  if (!sections.length) {
    return "";
  }

  const navHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
  const referenceY = navHeight + Math.min(180, window.innerHeight * 0.22);
  const bottomDistance = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

  if (sections[0].getBoundingClientRect().top > referenceY) {
    return "";
  }

  if (bottomDistance < 96) {
    return sections[sections.length - 1].id;
  }

  let activeId = sections[0].id;
  let closestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - referenceY);
    const crossesReference = rect.top <= referenceY && rect.bottom > navHeight + 24;

    if (crossesReference) {
      activeId = section.id;
      closestDistance = 0;
      return;
    }

    if (rect.top > referenceY && distance < closestDistance) {
      activeId = section.id;
      closestDistance = distance;
    }
  });

  return activeId;
}

export function Navigation({ contacts }: NavigationProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frameId = 0;

    const updateActiveId = () => {
      setActiveId(getActiveSectionId());
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveId);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("lenis-scroll", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("lenis-scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl" aria-label="主导航">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-2.5 sm:flex-nowrap sm:justify-between sm:px-6 sm:py-3 lg:px-8">
        <a href="#hero" aria-label="WKylin 主页" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-wide text-slate-100">
          <img className="h-8 w-8 border border-cyan-300/50 bg-cyan-200/10" src="/site-icon.svg" alt="" aria-hidden="true" />
          <span>{contacts.domain}</span>
        </a>
        <div className="grid min-w-0 flex-1 basis-48 grid-cols-3 p-1 text-sm text-slate-300 sm:flex sm:w-auto sm:flex-none sm:basis-auto sm:items-center sm:gap-4 sm:border-0 sm:bg-transparent sm:p-0">
          {navItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 items-center justify-center border px-2 font-medium transition sm:h-auto sm:px-2.5 sm:py-1.5 ${
                  isActive
                    ? "border-cyan-300/45 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.16)]"
                    : "border-transparent text-slate-300 hover:text-cyan-200"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
