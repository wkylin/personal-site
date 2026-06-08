import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, type Transition } from 'framer-motion';

type MatrixStreamDirection = 'left-to-right' | 'right-to-left';

type MatrixStreamImage = string | {
  src: string;
  alt?: string;
  label?: string;
};

type CssSize = React.CSSProperties['width'];
type CssPosition = React.CSSProperties['left'];

type MatrixStreamPath = {
  x: string[];
  y: string[];
  z: number[];
  scale: number[];
  rotateX: number[];
  rotateY: number[];
  opacity: number[];
  zIndex: number[];
  blur: number[];
  times: number[];
};

type MatrixStreamCardLayout = {
  left?: CssPosition;
  top?: CssPosition;
  width?: CssSize;
};

export type TasteSkillTrueMatrixStreamProps = {
  images?: MatrixStreamImage[];
  direction?: MatrixStreamDirection;
  path?: Partial<MatrixStreamPath>;
  duration?: number;
  stagger?: number;
  minCardSlots?: number;
  maxCardSlots?: number;
  minCardStagger?: number;
  height?: CssSize;
  background?: React.CSSProperties['background'];
  perspective?: CssSize;
  cardLayout?: MatrixStreamCardLayout;
  className?: string;
  cardClassName?: string;
  imageClassName?: string;
  badgeLabel?: string;
  showBadge?: boolean;
  showIntro?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: Array<{ value: string; label: string }>;
  enableHoverTilt?: boolean;
  ariaLabel?: string;
};

// 每张卡都走同一条轨迹：上方进入 -> 下落居中 -> 横向移出 -> 上方重置
const DEFAULT_CARD_PATH: MatrixStreamPath = {
  x: ['-62%', '-62%', '-57%', '-43%', '-26%', '4%', '44%', '102%', '206%', '-62%'],
  y: ['-265%', '-225%', '-162%', '-78%', '-12%', '30%', '42%', '70%', '86%', '-265%'],
  z: [-1020, -860, -430, -160, -10, 120, -180, -520, -920, -1020],
  scale: [0.3, 0.34, 0.44, 0.6, 0.74, 0.84, 0.76, 0.62, 0.4, 0.3],
  rotateX: [4.0, 3.7, 3.1, 2.6, 2.2, 2.0, 2.2, 2.7, 3.5, 4.0],
  rotateY: [-3.0, -2.7, -2.0, -1.2, -0.3, 0.2, 0.8, 1.6, 2.6, -3.0],
  opacity: [0, 0, 0.18, 0.42, 0.66, 0.88, 0.42, 0.16, 0, 0],
  zIndex: [12, 12, 16, 30, 50, 64, 8, 4, 2, 2],
  blur: [10, 8, 5, 2, 0, 0, 2, 6, 10, 10],
  times: [0, 0.09, 0.2, 0.33, 0.46, 0.58, 0.68, 0.79, 0.92, 1],
};

const DEFAULT_IMAGES: MatrixStreamImage[] = [
  { src: "/images/projects/lotdb-vue.svg", alt: "lotdb-vue 库存管理系统效果图", label: "lotdb-vue" },
  { src: "/images/projects/wui-react.svg", alt: "@w.ui/wui-react 组件库效果图", label: "@w.ui/wui-react" },
  { src: "/images/projects/wkylin-site.svg", alt: "wkylin.cn 个人主站效果图", label: "wkylin.cn" },
  { src: "/images/projects/games.svg", alt: "games.wkylin.cn 游戏站效果图", label: "games.wkylin.cn" },
  { src: "/images/projects/visual.svg", alt: "visual.wkylin.cn 可视化站效果图", label: "visual.wkylin.cn" },
  { src: "/images/projects/pro-react-admin.svg", alt: "pro-react-admin 后台模板效果图", label: "pro-react-admin" },
];

const DEFAULT_STATS = [
  { value: "10年+", label: "前端与全栈经验" },
  { value: "多业务线", label: "架构治理落地" },
  { value: "可运行", label: "项目闭环验证" },
];

const DEFAULT_BACKGROUND = [
  'radial-gradient(circle at 8% 12%, rgba(34, 211, 238, 0.18), transparent 32%)',
  'radial-gradient(circle at 86% 18%, rgba(250, 204, 21, 0.13), transparent 30%)',
  'radial-gradient(circle at 70% 88%, rgba(20, 184, 166, 0.14), transparent 34%)',
  'linear-gradient(135deg, rgba(2, 6, 23, 0.92), rgba(9, 13, 18, 0.96) 48%, rgba(15, 23, 42, 0.9))',
].join(', ');

const DEFAULT_DURATION = 14.8;
const DEFAULT_MIN_CARD_SLOTS = 4;
const DEFAULT_MAX_CARD_SLOTS = 6;
const DEFAULT_MIN_CARD_STAGGER = 2.8;
const DEFAULT_CARD_LAYOUT: Required<MatrixStreamCardLayout> = {
  left: '28%',
  top: '30%',
  width: '44%',
};

const reversePercent = (value: string) => {
  const match = value.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (!match) return value;
  return `${Number(match[1]) * -1}%`;
};

const normalizeImage = (image: MatrixStreamImage, index: number) => {
  if (typeof image === 'string') {
    return {
      src: image,
      alt: `Taste Skill Preview ${index + 1}`,
    };
  }

  return {
    src: image.src,
    alt: image.alt ?? `Taste Skill Preview ${index + 1}`,
    label: image.label,
  };
};

const makePath = (direction: MatrixStreamDirection, path?: Partial<MatrixStreamPath>): MatrixStreamPath => {
  const merged = {
    ...DEFAULT_CARD_PATH,
    ...path,
  };

  return {
    ...merged,
    x: direction === 'right-to-left' ? merged.x.map(reversePercent) : merged.x,
  };
};

const clampSlotCount = (imageCount: number, minCardSlots: number, maxCardSlots: number) => {
  if (imageCount <= 0) return 0;
  return Math.min(Math.max(imageCount, minCardSlots), maxCardSlots);
};

const makeCardLoopTransition = (
  cardIdx: number,
  duration: number,
  stagger: number,
  times: number[],
): Transition => ({
  duration,
  ease: 'linear',
  times,
  repeat: Infinity,
  delay: -cardIdx * stagger,
});

type MatrixStreamCardProps = {
  slotIdx: number;
  images: ReturnType<typeof normalizeImage>[];
  path: MatrixStreamPath;
  transition: Transition;
  duration: number;
  slotCount: number;
  cardLayout: Required<MatrixStreamCardLayout>;
  cardClassName: string;
  imageClassName: string;
  badgeLabel: string;
  showBadge: boolean;
};

const MatrixStreamCard: React.FC<MatrixStreamCardProps> = ({
  slotIdx,
  images,
  path,
  transition,
  duration,
  slotCount,
  cardLayout,
  cardClassName,
  imageClassName,
  badgeLabel,
  showBadge,
}) => {
  const [cycle, setCycle] = useState(0);
  const image = images[(slotIdx + cycle * slotCount) % images.length];

  useEffect(() => {
    const phaseOffset = (slotIdx * duration) / slotCount;
    const firstSwap = Math.max(duration - phaseOffset, 0) * 1000;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setCycle((current) => current + 1);
      interval = window.setInterval(() => {
        setCycle((current) => current + 1);
      }, duration * 1000);
    }, firstSwap);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [duration, slotCount, slotIdx]);

  return (
    <motion.figure
      animate={{
        x: path.x,
        y: path.y,
        z: path.z,
        scale: path.scale,
        rotateX: path.rotateX,
        rotateY: path.rotateY,
        opacity: path.opacity,
        zIndex: path.zIndex,
        filter: path.blur.map((v) => `blur(${v}px)`),
      }}
      transition={transition}
      style={{
        transformStyle: "preserve-3d",
        position: 'absolute',
        left: cardLayout.left,
        top: cardLayout.top,
        width: cardLayout.width,
        pointerEvents: 'none',
      }}
      className={`aspect-12/8 overflow-hidden rounded-[18px] border border-white/60 bg-white p-1 shadow-[0_50px_100px_-20px_rgba(40,35,30,0.12),0_30px_60px_-30px_rgba(0,0,0,0.1)] ${cardClassName}`}
    >
      <div className="relative w-full h-full rounded-[14px] overflow-hidden group bg-stone-100">
        <img
          src={image.src}
          alt={image.alt}
          className={`h-full w-full select-none object-cover brightness-[0.98] pointer-events-none ${imageClassName}`}
          draggable={false}
        />

        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
          animate={{ opacity: [0, 0, 0.08, 0.28, 0.5, 0.9, 0.74, 0.42, 0, 0] }}
          transition={transition}
        />

        {showBadge && (
          <motion.div
            className="absolute top-4 left-4 flex items-center space-x-2 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur"
            animate={{
              opacity: [0, 0, 0.1, 0.24, 0.48, 1, 0.72, 0.36, 0, 0],
              y: [-10, -10, -8, -6, -3, 0, -1, -4, -8, -10],
            }}
            transition={transition}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-800">
              {image.label ?? badgeLabel}
            </span>
          </motion.div>
        )}
      </div>
    </motion.figure>
  );
};

export const TasteSkillTrueMatrixStream: React.FC<TasteSkillTrueMatrixStreamProps> = ({
  images = DEFAULT_IMAGES,
  direction = 'left-to-right',
  path,
  duration,
  stagger,
  minCardSlots = DEFAULT_MIN_CARD_SLOTS,
  maxCardSlots = DEFAULT_MAX_CARD_SLOTS,
  minCardStagger = DEFAULT_MIN_CARD_STAGGER,
  height = '',
  background = DEFAULT_BACKGROUND,
  perspective = '3400px',
  cardLayout,
  className = '',
  cardClassName = '',
  imageClassName = '',
  badgeLabel = 'Taste Skill Active',
  showBadge = true,
  showIntro = true,
  eyebrow = 'Selected Systems',
  title = '用可运行项目呈现架构判断与工程交付能力',
  description = '这些作品覆盖库存管理、组件库、个人主站、后台模板、小游戏和数据可视化等场景。它们不是孤立的页面效果，而是用于验证前端架构、工程化体系、全栈协作、权限模型、数据建模和长期维护能力的真实项目沉淀。',
  stats = DEFAULT_STATS,
  enableHoverTilt = true,
  ariaLabel = 'Taste skill image stream',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const streamImages = images.map(normalizeImage);
  const slotCount = clampSlotCount(streamImages.length, minCardSlots, maxCardSlots);
  const resolvedPath = makePath(direction, path);
  const cardStagger = stagger ?? minCardStagger;
  const loopDuration = duration ?? Math.max(DEFAULT_DURATION, slotCount * cardStagger);
  const resolvedCardLayout = {
    ...DEFAULT_CARD_LAYOUT,
    ...cardLayout,
  };

  // 全局鼠标 3D 悬浮形变微调力
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableHoverTilt) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      aria-label={ariaLabel}
      className={`relative w-screen max-w-none overflow-hidden select-none touch-none ${className}`}
      style={{ minHeight: height, background }}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        {showIntro && (
          <div className="relative z-30 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-50 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              {description}
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={`${item.value}-${item.label}`} className="min-w-0 border border-white/10 bg-slate-950/45 px-3 py-4">
                  <p className="break-keep text-base font-bold leading-tight text-amber-200 sm:text-xl">{item.value}</p>
                  <p className="mt-2 break-keep text-xs leading-5 text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 承载整体微倾斜的主 3D 容器 */}
        <motion.div 
          style={{ 
            rotateX: enableHoverTilt ? rotateX : 0,
            rotateY: enableHoverTilt ? rotateY : 0,
            transformStyle: "preserve-3d",
            isolation: 'isolate',
            perspective,
          }}
          className="relative h-100 min-h-100 w-full overflow-visible"
        >
          {Array.from({ length: slotCount }).map((_, cardIdx) => {
            const cardTransition = makeCardLoopTransition(cardIdx, loopDuration, cardStagger, resolvedPath.times);
            return (
              <MatrixStreamCard
                key={cardIdx}
                slotIdx={cardIdx}
                images={streamImages}
                path={resolvedPath}
                transition={cardTransition}
                duration={loopDuration}
                slotCount={slotCount}
                cardLayout={resolvedCardLayout}
                cardClassName={cardClassName}
                imageClassName={imageClassName}
                badgeLabel={badgeLabel}
                showBadge={showBadge}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
