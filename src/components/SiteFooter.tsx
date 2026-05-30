export function SiteFooter() {
  return (
    <footer className="site-reveal-footer fixed bottom-0 left-0 z-0 w-full px-4 py-6 sm:px-6 lg:px-8" aria-label="页脚信息">
      <div className="footer-flight-scene" aria-hidden="true">
        <span className="footer-flight-wordmark">WKYLIN</span>
        <span className="footer-star-field" />
        <span className="footer-flight-trail footer-flight-trail-one" />
        <span className="footer-flight-trail footer-flight-trail-two" />
        {/* <svg className="footer-paper-plane" viewBox="0 0 16 16" role="img" focusable="false">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
        </svg> */}
        <svg className="footer-paper-plane" viewBox="0 0 462 158" role="img" focusable="false">
          <polygon className="footer-plane-fold" points="460.677 154.774 112.387 37.856 118.587 144.11" />
          <polygon className="footer-plane-top" points="112.387 37.856 182.935 0 460.677 154.774" />
          <polygon className="footer-plane-wing" points="78.019 56.255 460.677 154.774 0 97.997" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
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
