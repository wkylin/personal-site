import { useEffect, useRef, type RefObject } from "react";

type MagicTrailProps = {
  className?: string;
  colors?: string[];
  particleCount?: number;
  particlesPerPoint?: number;
  particleGravity?: number;
  particleLifeDecay?: number;
  particleOpacity?: [number, number];
  particleSize?: [number, number];
  particleSpeed?: [number, number];
  shadowBlur?: number;
  sparkleLineWidth?: number;
  trailLength?: number;
  trailMaxWidth?: number;
  trailOpacity?: number;
  trailPrevOpacity?: number;
  decay?: number;
  smoothing?: number;
  containerRef?: RefObject<HTMLElement | null>;
};

type TrailPoint = {
  x: number;
  y: number;
  age: number;
  color: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

const defaultColors = ["#22d3ee", "#67e8f9", "#cbd5e1", "#818cf8"];

function createParticle(x: number, y: number, color: string, speedRange: [number, number], sizeRange: [number, number]): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    color,
    size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
  };
}

function colorWithOpacity(color: string, opacity: number) {
  return `${color}${Math.floor(Math.max(0, Math.min(opacity, 1)) * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

export function MagicTrail({
  className,
  colors = defaultColors,
  particleCount = 30,
  particlesPerPoint = 1,
  particleGravity = 0.04,
  particleLifeDecay = 0.018,
  particleOpacity = [0.24, 0.48],
  particleSize = [0.7, 2.2],
  particleSpeed = [0.5, 1.6],
  shadowBlur = 8,
  sparkleLineWidth = 0.34,
  trailLength = 18,
  trailMaxWidth = 2.35,
  trailOpacity = 0.42,
  trailPrevOpacity = 0.3,
  decay = 0.055,
  smoothing = 0.5,
  containerRef,
}: MagicTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<TrailPoint[]>([]);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const colorIndex = useRef(0);
  const lastAddTime = useRef(0);
  const isPointerInBounds = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current || canvas?.parentElement;
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPrecisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canvas || !container || shouldReduceMotion || !hasPrecisePointer) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      return;
    }

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      isPointerInBounds.current = inBounds;

      if (inBounds) {
        targetPos.current = { x, y };

        if (points.current.length === 0) {
          mousePos.current = { x, y };
        }
      }
    };

    const handlePointerLeave = () => {
      isPointerInBounds.current = false;
    };

    const addPoint = () => {
      if (!isPointerInBounds.current || colors.length === 0) {
        return;
      }

      const now = performance.now();
      const timeDiff = now - lastAddTime.current;

      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * smoothing;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * smoothing;

      const lastPoint = points.current[points.current.length - 1];
      const distance = lastPoint ? Math.hypot(mousePos.current.x - lastPoint.x, mousePos.current.y - lastPoint.y) : Infinity;

      if (distance > 2 || timeDiff > 16) {
        const currentColor = colors[colorIndex.current % colors.length];

        points.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          age: 0,
          color: currentColor,
        });

        for (let i = 0; i < particlesPerPoint; i += 1) {
          particles.current.push(createParticle(mousePos.current.x, mousePos.current.y, currentColor, particleSpeed, particleSize));
        }

        if (distance > 10) {
          colorIndex.current = (colorIndex.current + 1) % colors.length;
        }

        lastAddTime.current = now;

        if (points.current.length > trailLength) {
          points.current.shift();
        }

        if (particles.current.length > particleCount) {
          particles.current = particles.current.slice(-particleCount);
        }
      }
    };

    const drawSparkle = (x: number, y: number, size: number, color: string) => {
      const opacity = Math.random() * (particleOpacity[1] - particleOpacity[0]) + particleOpacity[0];

      ctx.strokeStyle = colorWithOpacity(color, opacity);
      ctx.lineWidth = size * sparkleLineWidth;

      for (let i = 0; i < 4; i += 1) {
        const angle = (Math.PI / 2) * i;

        ctx.beginPath();
        ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size);
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.stroke();
      }
    };

    const animate = () => {
      const rect = container.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalCompositeOperation = "lighter";

      addPoint();

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = shadowBlur;

      for (let i = 1; i < points.current.length; i += 1) {
        const point = points.current[i];
        const prevPoint = points.current[i - 1];
        const opacity = Math.max(1 - point.age, 0) * trailOpacity;
        const size = Math.max(trailMaxWidth * (1 - point.age), 0);
        const prevOpacity = Math.max(1 - prevPoint.age, 0) * trailPrevOpacity;
        const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y);

        ctx.shadowColor = point.color;
        gradient.addColorStop(0, colorWithOpacity(prevPoint.color, prevOpacity));
        gradient.addColorStop(1, colorWithOpacity(point.color, opacity));

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particleGravity;
        particle.life -= particleLifeDecay;

        if (particle.life > 0) {
          drawSparkle(particle.x, particle.y, particle.size * particle.life, particle.color);
        }
      });

      particles.current = particles.current.filter((particle) => particle.life > 0);

      points.current.forEach((point) => {
        point.age += decay;
      });
      points.current = points.current.filter((point) => point.age < 1);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    if (containerRef?.current) {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);
    } else {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);

      if (containerRef?.current) {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      } else {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [
    colors,
    containerRef,
    decay,
    particleCount,
    particleGravity,
    particleLifeDecay,
    particleOpacity,
    particlesPerPoint,
    particleSize,
    particleSpeed,
    shadowBlur,
    smoothing,
    sparkleLineWidth,
    trailLength,
    trailMaxWidth,
    trailOpacity,
    trailPrevOpacity,
  ]);

  return (
    <div className={["magic-trail-layer", className].filter(Boolean).join(" ")} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
