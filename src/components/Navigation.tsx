import type { ProfileData } from "../profileData";

type NavigationProps = {
  contacts: ProfileData["contacts"];
};

export function Navigation({ contacts }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl" aria-label="主导航">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" aria-label="WKylin 主页" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100">
          <img className="h-8 w-8 border border-cyan-300/50 bg-cyan-200/10" src="/site-icon.svg" alt="" aria-hidden="true" />
          <span>{contacts.domain}</span>
        </a>
        <div className="flex items-center gap-3 text-xs text-slate-300 sm:gap-4 sm:text-sm">
          <a href="#projects" className="transition hover:text-cyan-200">项目</a>
          <a href="#skills" className="transition hover:text-cyan-200">能力</a>
          <a href="#contact" className="transition hover:text-cyan-200">联系</a>
        </div>
      </div>
    </nav>
  );
}
