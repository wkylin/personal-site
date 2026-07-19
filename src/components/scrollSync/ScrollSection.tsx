import { useEffect, useRef } from "react";

interface ScrollSectionProps {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  isActive: boolean;
  onEnter: (id: string) => void;
}

export function ScrollSection({ id, title, description, bullets, isActive, onEnter }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter(id);
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-35% 0px -45% 0px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [id, onEnter]);

  return (
    <article
      ref={sectionRef}
      className="relative rounded-2xl border border-white/12 bg-slate-900/60 p-6 backdrop-blur-xl transition duration-300 sm:p-7"
      data-active={isActive ? "true" : "false"}
      aria-current={isActive ? "true" : undefined}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        } bg-[linear-gradient(135deg,rgba(34,211,238,0.14),transparent_40%,rgba(250,204,21,0.12))]`}
      />
      <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/85">Sync Narrative</p>
      <h3 className="relative mt-2 text-[clamp(1.35rem,3vw,2rem)] font-black leading-tight text-slate-50">{title}</h3>
      <p className="relative mt-3 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
      <ul className="relative mt-5 space-y-2.5">
        {bullets.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm text-slate-200">
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
