import { useCallback, useLayoutEffect, useRef } from "react";
import "./SovereignCard.css";

const CARD_W = 520;
const CARD_H = 310;

export function SovereignCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const applyScale = (width: number) => {
      const scale = Math.min(1, width / CARD_W);
      scaleRef.current = scale;
      container.style.transform = `scale(${scale})`;
      wrapper.style.height = `${CARD_H * scale}px`;
    };

    applyScale(wrapper.offsetWidth);

    const observer = new ResizeObserver(([entry]) => {
      applyScale(entry.contentRect.width);
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const scale = scaleRef.current;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      const rotateX = -(y - CARD_H / 2) / 14;
      const rotateY = (x - CARD_W / 2) / 14;
      container.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      container.style.setProperty("--mouse-x", `${(x / CARD_W) * 100}%`);
      container.style.setProperty("--mouse-y", `${(y / CARD_H) * 100}%`);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.transform = `scale(${scaleRef.current})`;
    container.style.setProperty("--mouse-x", "30%");
    container.style.setProperty("--mouse-y", "20%");
  }, []);

  return (
    <div ref={wrapperRef} className="card-wrapper">
      <div
        ref={containerRef}
        className="card-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
      <div className="card">
        <div className="card-shield" />

        <div className="glare" />

        <svg
          className="asset-pipeline"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 520 310"
        >
          <defs>
            <filter
              id="glow-effect"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255,255,255,0.02)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          <g
            stroke="#d4af37"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
            filter="url(#glow-effect)"
          >
            <path d="M 40,310 L 120,230 L 220,230 L 250,200" />
            <path d="M 0,140 L 150,140 L 190,100 L 350,100" />
            <path d="M 380,310 L 440,250 L 440,210" />
            <path d="M 520,80 L 460,80 L 420,40 L 300,40" />
          </g>

          <g fill="#ffd700" filter="url(#glow-effect)">
            <circle cx="220" cy="230" r="2.5" />
            <circle cx="190" cy="100" r="2.5" />
            <circle cx="440" cy="210" r="3" />
          </g>
        </svg>

        <div className="card-header">
          <div className="brand-name">前端市界</div>
          <div className="badge">SOVEREIGN OWNER</div>
        </div>

        <div className="card-body">
          <div className="future-title">
            以架构视角沉淀技术战略、工程体系与团队交付方法
          </div>
          <div className="manifesto-capsule">
            <div className="manifesto">
              "用资产对抗周期，用全栈重构商业，用 AI 放大才华。"
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="asset-hubs">
            <a
              href="https://wkylin.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-link"
            >
              <span className="label">OS.</span>wkylin.cn
            </a>
            <a
              href="https://github.com/wkylin"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-link"
            >
              <span className="label">IP.</span>github.com/wkylin
            </a>
            <a href="mailto:wkylin.w@gmail.com" className="hub-link">
              <span className="label">HQ.</span>wkylin.w@gmail.com
            </a>
          </div>
          <div className="ai-core" title="AI-Amplified Core" />
        </div>
      </div>
      </div>
    </div>
  );
}
