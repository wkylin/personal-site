import { ArrowUpRight, GitFork } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProfileData } from "../profileData";

type ProjectsSectionProps = {
  projects: ProfileData["projects"];
};

function isGitHubUrl(url: string) {
  return url.startsWith("https://github.com/");
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="mt-8">
      <div className="reveal" data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Selected Systems</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">用可落地项目验证架构判断、工程能力与交付结果</h2>
      </div>

      <div className="mt-4 space-y-4" data-reveal-group data-reveal-base-delay="40" data-reveal-step-delay="90">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="reveal rounded-none border border-white/10 bg-slate-900/65 p-4 sm:p-6"
            data-reveal
            data-reveal-item
            style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
          >
            <div className="flex flex-wrap items-start gap-4">
              <p className="text-xl font-bold text-amber-200/90">{String(index + 1).padStart(2, "0")}</p>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-semibold sm:text-2xl">{project.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <a
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {isGitHubUrl(project.url) ? (
                          <>
                            <GitFork size={16} />
                            GitHub
                          </>
                        ) : (
                          <>
                            {project.githubUrl ? "在线体验" : "访问项目"}
                            <ArrowUpRight size={16} />
                          </>
                        )}
                      </a>
                      {project.githubUrl ? (
                        <a
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 transition hover:text-white"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GitFork size={16} />
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 sm:text-sm">{project.stack}</span>
                </div>

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
  );
}
