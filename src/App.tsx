import {
  ArrowUpRight,
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
  Zap,
} from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { profileData, type ProfileData } from "./profileData";

const iconMap = [Boxes, BrainCircuit, Zap, Network];
const shouldFetchProfile = import.meta.env.VITE_USE_PROFILE_API === "true";

function App() {
  const [profile, setProfile] = useState<ProfileData>(profileData);

  useEffect(() => {
    if (!shouldFetchProfile) {
      return;
    }

    fetch("/api/profile")
      .then((response) => (response.ok ? response.json() : profileData))
      .then((data) => setProfile(data))
      .catch(() => setProfile(profileData));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealNodes.length) {
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [profile.projects]);

  const stack = useMemo(
    () => [
      { label: "React 19", icon: Sparkles },
      { label: "Vue 3", icon: Globe2 },
      { label: "Python", icon: Binary },
      { label: "PyQt6", icon: Boxes },
      { label: "MySQL", icon: Database },
      { label: "MongoDB", icon: Database },
      { label: "Nginx", icon: Server },
      { label: "AIGC", icon: BrainCircuit },
    ],
    [],
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(250,204,21,0.16),transparent_32%),#090d12] text-slate-100">
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl" aria-label="主导航">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#hero" aria-label="WKylin 主页" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100">
            <span className="grid h-8 w-8 place-items-center rounded-none border border-cyan-300/50 bg-cyan-200/10 text-cyan-100">WK</span>
            <span>{profile.contacts.domain}</span>
          </a>
          <div className="flex items-center gap-3 text-xs text-slate-300 sm:gap-4 sm:text-sm">
            <a href="#projects" className="transition hover:text-cyan-200">项目</a>
            <a href="#skills" className="transition hover:text-cyan-200">能力</a>
            <a href="#contact" className="transition hover:text-cyan-200">联系</a>
          </div>
        </div>
      </nav>

      <section
        id="hero"
        className="relative w-full overflow-hidden rounded-none bg-slate-900/55 px-4 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="mx-auto grid w-full max-w-6xl lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.12),transparent_34%,rgba(250,204,21,0.11))]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Frontend Architecture OS</p>
            <h1 className="mt-3 font-black leading-[0.9] tracking-[-0.03em] text-[clamp(2.35rem,12vw,5.6rem)]">WKylin</h1>
            <p className="mt-4 text-sm leading-7 text-cyan-100/90 sm:text-base">{profile.identity.join(" / ")}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              10年+一线研发与架构经验，擅长把复杂系统拆成可维护的模块、把混乱流程梳成可复用的工程体系。日常和微前端、AIGC、低代码平台打交道，顺手也把性能、质量和交付节奏一起管住。说直白点，既写代码，也修系统；既搭架构，也尽量不让团队靠“玄学”推进项目。
            </p>

            <div id="contact" className="mt-7 flex flex-wrap gap-3">
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
                href={`mailto:${profile.contacts.email}`}
              >
                <Mail size={18} />
                邮件联系
              </a>
            </div>
          </div>

          <aside className="relative z-10 mt-6 space-y-3 lg:mt-0" aria-label="个人信息摘要">
            <div className="rounded-none border border-white/20 bg-slate-900/85 px-4 py-5 text-slate-100 shadow-[0_14px_30px_rgba(15,23,42,0.3)] sm:px-6 sm:py-6">
              <p className="text-center text-[clamp(1.8rem,8vw,2.6rem)] font-black leading-tight tracking-[0.06em]">前端市界</p>
              <p className="mt-2 text-center text-xs font-semibold tracking-[0.22em] text-slate-300">FRONTEND EDITION</p>
              <p className="mx-auto mt-3 max-w-88 text-center text-[11px] leading-relaxed text-slate-300">
                Independent Notes on Architecture, Interface and Engineering
              </p>
            </div>

            <div className="rounded-none border border-cyan-300/45 bg-slate-800/85 px-4 py-3 text-cyan-50">
              <div className="flex items-center gap-2 text-base font-bold">
                <Globe2 size={18} />
                <span>项目交付矩阵</span>
              </div>
              <p className="mt-1 text-sm text-slate-200">覆盖 Web / Python 桌面端 / 可视化 / 开源工程</p>
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

      <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 sm:px-6 lg:px-8">

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="核心指标">
          {profile.metrics.map((metric, index) => (
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

        <section className="mt-8">
          <div className="reveal" data-reveal style={{ "--reveal-delay": "20ms" } as CSSProperties}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Personal Advantages</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">把复杂系统变成可治理资产</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {profile.advantages.map((item, index) => {
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

        <section id="projects" className="mt-8">
          <div className="reveal" data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Selected Systems</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">重点项目像产品一样呈现</h2>
          </div>

          <div className="mt-4 space-y-4">
            {profile.projects.map((project, index) => (
              <article
                key={project.name}
                className="reveal rounded-none border border-white/10 bg-slate-900/65 p-4 sm:p-6"
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <p className="text-xl font-bold text-amber-200/90">{String(index + 1).padStart(2, "0")}</p>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold sm:text-2xl">{project.name}</h3>
                      <span className="text-xs text-slate-400 sm:text-sm">{project.stack}</span>
                    </div>

                    <a
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      访问项目
                      <ArrowUpRight size={16} />
                    </a>

                    <p className="mt-3 text-sm leading-7 text-slate-300">{project.background}</p>
                    <ul className="mt-3 space-y-1.5 text-sm leading-7 text-slate-200">
                      {project.contributions.map((item) => (
                        <li key={item} className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-none before:bg-cyan-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 rounded-none border border-cyan-200/20 bg-cyan-200/8 px-3 py-2 text-sm leading-6 text-cyan-100">
                      {project.result}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-8">
          <div className="reveal" data-reveal style={{ "--reveal-delay": "20ms" } as CSSProperties}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Capability Matrix</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">从前端架构到 AI 工程化</h2>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {profile.skills.map((skill, index) => (
              <article
                key={skill.title}
                className="reveal rounded-none border border-white/10 bg-slate-900/55 p-5"
                data-reveal
                style={{ "--reveal-delay": `${90 + index * 90}ms` } as CSSProperties}
              >
                <h3 className="text-lg font-semibold">{skill.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
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
            {profile.influence.map((line) => (
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
              href={profile.contacts.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              github.com/wkylin
              <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.contacts.juejin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              juejin.cn/wkylin
              <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.contacts.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              pro-react-admin
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

      </div>

      <footer className="mt-5 w-full bg-slate-950/70 px-4 py-6 sm:px-6 lg:px-8" aria-label="页脚信息">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Frontend Architecture Journal</p>
          <h3 className="mt-2 text-2xl font-bold">WKylin.cn</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">持续记录架构实践、工程化方法与可交付的技术决策。</p>
          <div className="mt-5 flex items-center justify-center gap-1 pt-4 text-xs text-slate-400px">
            <span>© {new Date().getFullYear()} WKylin. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
