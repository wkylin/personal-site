import type { CSSProperties } from "react";
import type { ProfileData } from "../profileData";

type MetricsSectionProps = {
  metrics: ProfileData["metrics"];
};

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="核心指标">
      {metrics.map((metric, index) => (
        <article
          key={metric.label}
          className="reveal rounded-none border border-white/10 bg-white/4 p-4 backdrop-blur"
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
        >
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{metric.label}</p>
          <p className="mt-2 text-3xl font-bold text-cyan-100">{metric.value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{metric.detail}</p>
        </article>
      ))}
    </section>
  );
}

