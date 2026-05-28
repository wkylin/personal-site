export function SiteFooter() {
  return (
    <footer className="site-reveal-footer fixed bottom-0 left-0 z-0 w-full px-4 py-6 sm:px-6 lg:px-8" aria-label="页脚信息">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Frontend Architecture Journal</p>
        <h3 className="mt-2 text-2xl font-bold">WKylin.cn</h3>
        <p className="mt-2 text-sm leading-7 text-slate-300">
          持续沉淀前端架构、工程治理、AI 辅助研发与技术团队管理经验，把复杂系统建设、研发效能提升和关键技术决策转化为可复用的方法论。
        </p>
        <div className="mt-5 flex items-center justify-center gap-1 pt-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} WKylin. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

