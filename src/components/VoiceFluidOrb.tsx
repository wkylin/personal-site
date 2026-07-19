import { RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const VOICE_LINES = [
  "把想法说出来，系统会把它组织成可执行方案。",
  "一句自然语言，贯穿任务拆解、执行和回溯。",
  "像对同伴讲话一样下达需求，细节交给系统。",
  "复杂目标不必写长文档，先开口，再迭代。",
  "让语音成为工程入口，把时间留给判断与设计。",
  "从灵感到落地，只差一次清晰表达。",
] as const;

function pickNextIndex(currentIndex: number, total: number) {
  if (total <= 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * total);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * total);
  }

  return nextIndex;
}

export function VoiceFluidOrb() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const entries = useMemo(() => VOICE_LINES, []);

  const switchLine = () => {
    setActiveIndex((current) => pickNextIndex(current, entries.length));
    setCycleCount((count) => count + 1);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      switchLine();
    }, 3400);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="voice-fluid-panel rounded-none border border-white/18 bg-slate-900/84 px-4 py-4 text-slate-100 shadow-[0_14px_30px_rgba(15,23,42,0.32)] sm:px-5">
      <div className="voice-fluid-head">
        <p className="voice-fluid-kicker">
          <Sparkles size={14} />
          <span>Voice Interaction Lab</span>
        </p>
        <button className="voice-fluid-refresh" type="button" onClick={switchLine} aria-label="切换文案">
          <RefreshCw size={14} />
          <span>换一句</span>
        </button>
      </div>

      <div className="voice-fluid-stage" aria-hidden="true">
        <svg className="voice-fluid-filter" width="0" height="0" focusable="false" role="presentation">
          <defs>
            <filter id="voice-goo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="voice-fluid-orb">
          <span className="voice-fluid-blob voice-fluid-blob-a" />
          <span className="voice-fluid-blob voice-fluid-blob-b" />
          <span className="voice-fluid-blob voice-fluid-blob-c" />
          <span className="voice-fluid-core" />
        </div>
      </div>

      <p key={cycleCount} className="voice-fluid-copy">
        {entries[activeIndex]}
      </p>
    </section>
  );
}
