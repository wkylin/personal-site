import { LockKeyhole, ShieldCheck, Signal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface VisualSphereProps {
  words: string[];
}

interface RuntimeSignal {
  id: string;
  label: string;
  value: string;
  icon: "compliance" | "availability" | "security";
}

const BADGE_COUNT = 3;
const BADGE_ROTATE_MS = 2000;
const MAX_BADGE_QUEUE = 3;
const TAG_TRANSITION_MS = 360;
const TAG_ENTRY_MS = 300;

interface OrbTag {
  id: string;
  text: string;
  x: number;
  y: number;
  floatDuration: number;
  floatDelay: number;
}

const runtimeSignals: RuntimeSignal[] = [
  { id: "soc2", label: "Compliance", value: "SOC 2 Type II", icon: "compliance" },
  { id: "sla", label: "Availability", value: "99.95% SLA", icon: "availability" },
  { id: "region", label: "Security", value: "Region-bound", icon: "security" },
];

const fallbackBadges = ["Optimized for telephony", "No code required", "Use an existing number"];

function RuntimeIcon({ kind }: { kind: RuntimeSignal["icon"] }) {
  if (kind === "compliance") {
    return <ShieldCheck size={13} className="text-emerald-200" />;
  }

  if (kind === "availability") {
    return <Signal size={13} className="text-cyan-200" />;
  }

  return <LockKeyhole size={13} className="text-amber-200" />;
}

function pickDistinctBadges(words: string[], count: number) {
  const source = [...new Set([...words, ...fallbackBadges])];
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickOne(words: string[]) {
  return words[Math.floor(Math.random() * words.length)] ?? "Optimized for telephony";
}

function createOrbTag(words: string[], existing: OrbTag[]): OrbTag {
  const minRadius = 150;
  const maxRadius = 196;
  const minDistance = 96;

  let x = 0;
  let y = 0;
  let found = false;

  for (let index = 0; index < 16; index += 1) {
    const theta = randomInRange(0, Math.PI * 2);
    const radius = randomInRange(minRadius, maxRadius);
    const candidateX = Math.cos(theta) * radius;
    const candidateY = Math.sin(theta) * radius * 0.72;

    const collides = existing.some((item) => Math.hypot(item.x - candidateX, item.y - candidateY) < minDistance);
    if (!collides) {
      x = candidateX;
      y = candidateY;
      found = true;
      break;
    }
  }

  if (!found) {
    const theta = randomInRange(0, Math.PI * 2);
    const radius = randomInRange(minRadius, maxRadius);
    x = Math.cos(theta) * radius;
    y = Math.sin(theta) * radius * 0.72;
  }

  return {
    id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    text: pickOne(words),
    x,
    y,
    floatDuration: randomInRange(3.2, 3.9),
    floatDelay: randomInRange(0, 0.8),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function fract(value: number) {
  return value - Math.floor(value);
}

export function VisualSphere({ words }: VisualSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const isQueueTransitioningRef = useRef(false);
  const [badges, setBadges] = useState<OrbTag[]>(() =>
    pickDistinctBadges(words, BADGE_COUNT).map((text, index) => {
      const seedAngles = [Math.PI * 1.03, Math.PI * 0.08, Math.PI * 1.56];
      const radius = [168, 176, 162][index] ?? 168;
      const theta = seedAngles[index] ?? Math.PI * 0.7;

      return {
        id: `seed-${index}`,
        text,
        x: Math.cos(theta) * radius,
        y: Math.sin(theta) * radius * 0.7,
        floatDuration: 3.3 + index * 0.3,
        floatDelay: index * 0.12,
      };
    }),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let disposed = false;
    let cssSize = 264;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      cssSize = Math.max(180, Math.round(rect.width || 264));
      canvas.width = Math.round(cssSize * dpr);
      canvas.height = Math.round(cssSize * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
    };

    const draw = (timeMs: number) => {
      if (disposed) {
        return;
      }

      const t = timeMs * 0.001;
      context.clearRect(0, 0, cssSize, cssSize);

      const radius = cssSize * 0.5;
      const center = radius;

      for (let y = 0; y < cssSize; y += 2) {
        const v = (y - center) / radius;

        for (let x = 0; x < cssSize; x += 2) {
          const u = (x - center) / radius;
          const r2 = u * u + v * v;
          if (r2 > 1) {
            continue;
          }

          const sphereMask = 1 - r2;
          const n1 = Math.sin((u * 4.8 + t * 0.72) + Math.sin(v * 3.6 - t * 0.36));
          const n2 = Math.cos((v * 5.4 - t * 0.48) + Math.cos(u * 3.3 + t * 0.52));
          const n3 = Math.sin((u * 8.8 + v * 7.1) - t * 0.64);
          const flow = (n1 * 0.46 + n2 * 0.34 + n3 * 0.2 + 1) * 0.5;

          const rim = Math.pow(1 - sphereMask, 1.8);
          const blue = clamp(22 + flow * 96 + (1 - rim) * 18, 0, 255);
          const purple = clamp(30 + flow * 120 + (1 - rim) * 28, 0, 255);
          const dark = clamp(8 + sphereMask * 28, 0, 255);

          const goldFocus = clamp(1 - Math.hypot(u - 0.18, v - 0.78) * 1.8, 0, 1);
          const gold = goldFocus * 136;

          const starNoise = fract(Math.sin((x + t * 120) * 12.9898 + (y - t * 80) * 78.233) * 43758.5453);
          const sparkle = starNoise > 0.996 ? 140 : 0;

          const r = clamp(dark + purple * 0.33 + gold + sparkle, 0, 255);
          const g = clamp(dark + blue * 0.25 + gold * 0.62 + sparkle, 0, 255);
          const b = clamp(dark + blue * 0.58 + purple * 0.42 + sparkle, 0, 255);

          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${clamp(0.36 + sphereMask * 0.76, 0, 1)})`;
          context.fillRect(x, y, 2, 2);
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    syncCanvasSize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", syncCanvasSize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", syncCanvasSize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setBadges((current) => {
      if (current.length > 0) {
        return current;
      }

      return pickDistinctBadges(words, BADGE_COUNT).map((text, index) => ({
        id: `seed-${index}`,
        text,
        x: [Math.cos(Math.PI * 1.03) * 168, Math.cos(Math.PI * 0.08) * 176, Math.cos(Math.PI * 1.56) * 162][index] ?? 0,
        y: [Math.sin(Math.PI * 1.03) * 168 * 0.7, Math.sin(Math.PI * 0.08) * 176 * 0.7, Math.sin(Math.PI * 1.56) * 162 * 0.7][index] ?? 0,
        floatDuration: 3.3 + index * 0.3,
        floatDelay: index * 0.12,
      }));
    });

    const timer = window.setInterval(() => {
      if (isQueueTransitioningRef.current) {
        return;
      }

      setBadges((current) => {
        if (current.length < MAX_BADGE_QUEUE) {
          return [...current, createOrbTag(words, current)];
        }

        isQueueTransitioningRef.current = true;
        const withoutOldest = current.slice(1);

        if (transitionTimerRef.current !== null) {
          window.clearTimeout(transitionTimerRef.current);
        }

        transitionTimerRef.current = window.setTimeout(() => {
          setBadges((latest) => [...latest, createOrbTag(words, latest)]);
          isQueueTransitioningRef.current = false;
          transitionTimerRef.current = null;
        }, TAG_TRANSITION_MS);

        return withoutOldest;
      });
    }, BADGE_ROTATE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [words]);

  return (
    <div className="orb-stage relative h-full min-h-80 w-full overflow-hidden rounded-3xl border border-white/15 p-4 sm:p-6">
      <div className="relative z-10 rounded-2xl border border-white/12 bg-white/4 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200/90">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(74,222,128,0.85)]" />
            Voice Runtime
          </span>
          <span className="rounded-full border border-amber-200/35 bg-amber-300/12 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
            Enterprise ready
          </span>
        </div>

        <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
          {runtimeSignals.map((signal) => (
            <div key={signal.id} className="rounded-xl border border-white/10 bg-slate-900/42 px-2.5 py-2">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300/90">
                <RuntimeIcon kind={signal.icon} />
                {signal.label}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-slate-100">{signal.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-cyan-200/15 bg-cyan-300/6 px-2.5 py-2">
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
          <p className="text-[11px] font-medium text-cyan-100/90">Runtime guardrails active · request queue stable</p>
          <span className="ml-auto h-1.5 w-16 rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.2),rgba(34,211,238,0.9),rgba(34,211,238,0.2))]" />
        </div>
      </div>

      <div className="relative z-10 mt-3 grid min-h-72 place-items-center sm:min-h-80">
        <AnimatePresence>
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: [0.8, 1.03, 1], y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
              transition={{ duration: 0.3, times: [0, 0.62, 1], ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2"
              style={{ x: badge.x, top: `calc(50% + ${badge.y}px)` }}
            >
              <motion.span
                className="orb-tag inline-flex rounded-2xl border border-slate-200/90 bg-white/88 px-4 py-2 text-sm font-medium text-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.09)] backdrop-blur-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: badge.floatDuration,
                  delay: TAG_ENTRY_MS / 1000 + badge.floatDelay,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                {badge.text}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>

        <svg className="orb-filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="orb-glass-264-l-a" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.024" numOctaves="2" seed="19" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
              <feColorMatrix
                type="matrix"
                values="1.08 0 0 0 0  0 1.02 0 0 0  0 0 1.15 0 0  0 0 0 1.25 -0.08"
              />
            </filter>
          </defs>
        </svg>

        <div className="agent-orb-float">
          <div className="agent-orb-shell">
            <canvas
              ref={canvasRef}
              width={528}
              height={528}
              className="agent-orb-canvas"
              style={{ filter: 'url("#orb-glass-264-l-a")' }}
              aria-hidden="true"
            />
            <div className="agent-orb-glass" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
