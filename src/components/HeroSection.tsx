import {
  BatteryCharging,
  Binary,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  Globe2,
  Mail,
  Network,
  Server,
  Sparkles,
} from "lucide-react";
import { useMemo } from "react";
import type { ProfileData } from "../profileData";

type HeroSectionProps = {
  profile: ProfileData;
};

export function HeroSection({ profile }: HeroSectionProps) {
  const stack = useMemo(
    () => [
      { label: "前端架构治理", icon: Sparkles },
      { label: "跨端交付体系", icon: Globe2 },
      { label: "工程化平台", icon: Boxes },
      { label: "Node.js 服务层", icon: Server },
      { label: "数据与存储设计", icon: Database },
      { label: "可视化工程", icon: Binary },
      { label: "发布与稳定性", icon: Network },
      { label: "AI 工程化", icon: BrainCircuit },
    ],
    [],
  );

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden rounded-none bg-slate-900/55 px-4 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.12),transparent_34%,rgba(250,204,21,0.11))]" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Frontend Architecture OS</p>
          <h1 className="mt-3 flex items-end gap-3 px-4 py-4 text-6xl font-black leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl">
            <span className="hero-wordmark" data-text="WKylin">WKylin</span>
            <BatteryCharging className="hero-charge-icon mb-2 h-[0.46em] w-[0.46em] text-cyan-200 sm:mb-3" strokeWidth={1.8} />
          </h1>
          <p className="mt-4 text-sm leading-7 text-cyan-100/90 sm:text-base">{profile.identity.join(" / ")}</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            多年一线前端与全栈研发经验，长期负责复杂业务系统的架构设计、工程治理和团队技术建设。擅长把大型应用拆成清晰边界、把重复交付沉淀为平台能力、把性能稳定性纳入日常研发流程。关注的不只是页面实现，更是架构演进、质量体系、研发效能和业务长期可维护性。
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-none border border-amber-300/70 bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-px hover:bg-amber-200"
              href={profile.contacts.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={18} />
              GitHub
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              href="#contact"
            >
              <Mail size={18} />
              邮件联系
            </a>
          </div>
        </div>

        <aside className="relative z-10 mt-6 space-y-3 lg:mt-0" aria-label="个人信息摘要">
          <div className="brand-prism-panel rounded-none border border-white/20 bg-slate-900/85 px-4 py-5 text-slate-100 shadow-[0_14px_30px_rgba(15,23,42,0.3)] sm:px-6 sm:py-6">
            <p className="relative z-10 text-center text-[clamp(1.8rem,8vw,2.6rem)] font-black leading-tight tracking-[0.06em]">前端市界</p>
            <p className="relative z-10 mt-2 text-center text-xs font-semibold tracking-[0.22em] text-slate-300">FRONTEND EDITION</p>
            <p className="relative z-10 mx-auto mt-3 max-w-88 text-center text-sm font-medium leading-relaxed text-slate-300">
              以架构视角沉淀技术战略、工程体系与团队交付方法
            </p>
          </div>

          <div className="rounded-none border border-cyan-300/45 bg-slate-800/85 px-4 py-3 text-cyan-50">
            <div className="flex items-center gap-2 text-base font-bold">
              <Globe2 size={18} />
              <span>架构交付矩阵</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-200">面向复杂业务，贯通架构设计、工程治理、跨端实现、数据服务与稳定交付</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-none border border-white/15 bg-white/6 px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <Icon size={14} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
