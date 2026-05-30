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

export function Navigation({ contacts }: NavigationProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frameId = 0;

    const updateActiveId = () => {
      const triggerLine = window.innerHeight * 0.36;
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => Boolean(section));

      const nextActiveId = sections.reduce((currentId, section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= triggerLine && rect.bottom > 80) {
          return section.id;
        }

        return currentId;
      }, "");

      setActiveId(nextActiveId);
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" aria-label="WKylin 主页" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100">
          <img className="h-8 w-8 border border-cyan-300/50 bg-cyan-200/10" src="/site-icon.svg" alt="" aria-hidden="true" />
          <span>{contacts.domain}</span>
        </a>
        <div className="flex items-center gap-3 text-xs text-slate-300 sm:gap-4 sm:text-sm">
          {navItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`border px-2 py-1.5 font-medium transition sm:px-2.5 ${
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
