import { Boxes, BrainCircuit, Network, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProfileData } from "../profileData";

const iconMap = [Boxes, BrainCircuit, Zap, Network];

type AdvantagesSectionProps = {
  advantages: ProfileData["advantages"];
};

export function AdvantagesSection({ advantages }: AdvantagesSectionProps) {
  return (
    <section className="mt-8">
      <div className="reveal" data-reveal style={{ "--reveal-delay": "20ms" } as CSSProperties}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Architecture Capabilities</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">以架构治理驱动业务演进、研发效能与技术资产沉淀</h2>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {advantages.map((item, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <article
              key={item.title}
              className="reveal rounded-none border border-white/10 bg-slate-900/60 p-5"
              data-reveal
              style={{ "--reveal-delay": `${80 + index * 80}ms` } as CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={20} className="shrink-0 text-cyan-200" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

