import { ArrowUpRight, Binary } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProfileData } from "../profileData";

type InfluenceSectionProps = {
  contacts: ProfileData["contacts"];
  influence: ProfileData["influence"];
};

export function InfluenceSection({ contacts, influence }: InfluenceSectionProps) {
  return (
    <section className="mt-8 grid gap-3 lg:grid-cols-2">
      <div
        className="reveal rounded-none border border-cyan-200/20 bg-slate-950/75 p-5 font-mono text-cyan-100"
        data-reveal
        style={{ "--reveal-delay": "40ms" } as CSSProperties}
      >
        <div className="mb-3 flex items-center gap-2 text-xs text-cyan-200/80">
          <Binary size={16} />
          <span>open-source-impact.sql</span>
        </div>
        {influence.map((line) => (
          <p key={line} className="text-sm leading-7">
            SELECT "{line}";
          </p>
        ))}
      </div>

      <div
        className="reveal flex flex-col gap-2 rounded-none border border-white/10 bg-slate-900/55 p-5"
        data-reveal
        style={{ "--reveal-delay": "140ms" } as CSSProperties}
      >
        <a
          href={contacts.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
        >
          github.com/wkylin
          <ArrowUpRight size={16} />
        </a>
        <a
          href={contacts.juejin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
        >
          juejin.cn/wkylin
          <ArrowUpRight size={16} />
        </a>
        <a
          href={contacts.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
        >
          pro-react-admin
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

