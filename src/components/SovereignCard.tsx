import { memo, useCallback, useEffect, useId, useRef } from "react";
import "./SovereignCard.css";

const DEFAULT_POINTER_X = 30;
const DEFAULT_POINTER_Y = 20;

function SovereignCard(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRectReadOnly | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: DEFAULT_POINTER_X, y: DEFAULT_POINTER_Y });
  const glowId = useId();
  const gridId = useId();

  const commitPointer = useCallback(() => {
    frameRef.current = null;

    const container = containerRef.current;
    const bounds = boundsRef.current;
    if (!container || !bounds) return;

    const x = pointerRef.current.x;
    const y = pointerRef.current.y;
    const rotateX = -((y - bounds.height / 2) / 14);
    const rotateY = (x - bounds.width / 2) / 14;

    container.style.setProperty("--fsc-rotate-x", `${rotateX.toFixed(2)}deg`);
    container.style.setProperty("--fsc-rotate-y", `${rotateY.toFixed(2)}deg`);
    container.style.setProperty("--fsc-mouse-x", `${((x / bounds.width) * 100).toFixed(2)}%`);
    container.style.setProperty("--fsc-mouse-y", `${((y / bounds.height) * 100).toFixed(2)}%`);
  }, []);

  const schedulePointer = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(commitPointer);
  }, [commitPointer]);

  const handlePointerEnter = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    boundsRef.current = container.getBoundingClientRect();
    container.style.setProperty("--fsc-hover-scale", "1.035");
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = boundsRef.current;
      if (!bounds) return;

      pointerRef.current.x = event.clientX - bounds.left;
      pointerRef.current.y = event.clientY - bounds.top;
      schedulePointer();
    },
    [schedulePointer],
  );

  const handlePointerLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    boundsRef.current = null;
    pointerRef.current = { x: DEFAULT_POINTER_X, y: DEFAULT_POINTER_Y };
    container.style.setProperty("--fsc-rotate-x", "0deg");
    container.style.setProperty("--fsc-rotate-y", "0deg");
    container.style.setProperty("--fsc-hover-scale", "1");
    container.style.setProperty("--fsc-mouse-x", `${DEFAULT_POINTER_X}%`);
    container.style.setProperty("--fsc-mouse-y", `${DEFAULT_POINTER_Y}%`);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="fsc-card-frame">
      <div
        ref={containerRef}
        className="fsc-card-container"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="fsc-card">
          <div className="fsc-card-shield" />
          <div className="fsc-glare" />

          <svg
            className="fsc-asset-pipeline"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 520 310"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill={`url(#${gridId})`} />

            <g stroke="#d4af37" strokeWidth="1.2" fill="none" opacity="0.5" filter={`url(#${glowId})`}>
              <path d="M 40,310 L 120,230 L 220,230 L 250,200" />
              <path d="M 0,140 L 150,140 L 190,100 L 350,100" />
              <path d="M 380,310 L 440,250 L 440,210" />
              <path d="M 520,80 L 460,80 L 420,40 L 300,40" />
            </g>

            <g fill="#ffd700" filter={`url(#${glowId})`}>
              <circle cx="220" cy="230" r="2.5" />
              <circle cx="190" cy="100" r="2.5" />
              <circle cx="440" cy="210" r="3" />
            </g>
          </svg>

          <div className="fsc-card-header">
            <div className="fsc-brand-name">前端市界</div>
            <div className="fsc-badge">SOVEREIGN OWNER</div>
          </div>

          <div className="fsc-card-body">
            <div className="fsc-future-title">以架构视角沉淀技术战略、工程体系与团队交付方法</div>
            <div className="fsc-manifesto-capsule">
              <div className="fsc-manifesto">“用资产对抗周期，用全栈重构商业，用 AI 放大才华。”</div>
            </div>
          </div>

          <div className="fsc-card-footer">
            <div className="fsc-asset-hubs">
              <a href="https://wkylin.cn/" target="_blank" rel="noopener noreferrer" className="fsc-hub-link">
                <span className="fsc-label">OS.</span>wkylin.cn
              </a>
              <a href="https://github.com/wkylin" target="_blank" rel="noopener noreferrer" className="fsc-hub-link">
                <span className="fsc-label">IP.</span>github.com/wkylin
              </a>
              <a href="mailto:wkylin.w@gmail.com" className="fsc-hub-link">
                <span className="fsc-label">HQ.</span>wkylin.w@gmail.com
              </a>
            </div>
            <div className="fsc-ai-core" title="AI-Amplified Core" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SovereignCard);
