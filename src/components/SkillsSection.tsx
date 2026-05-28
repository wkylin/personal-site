import type { CSSProperties } from "react";
import type { ProfileData } from "../profileData";

type SkillsSectionProps = {
  skills: ProfileData["skills"];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="mt-8">
      <div className="reveal" data-reveal style={{ "--reveal-delay": "20ms" } as CSSProperties}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Capability Matrix</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">从前端架构到 AI 工程化</h2>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {skills.map((skill, index) => (
          <article
            key={skill.title}
            className="reveal rounded-none border border-white/10 bg-slate-900/55 p-5"
            data-reveal
            style={{ "--reveal-delay": `${90 + index * 90}ms` } as CSSProperties}
          >
            <h3 className="text-lg font-semibold">{skill.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{skill.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span key={item} className="rounded-none border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 sm:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

