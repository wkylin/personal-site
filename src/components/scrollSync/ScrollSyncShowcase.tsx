import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { ScrollSection } from "./ScrollSection";
import { syncTopics, techBubblePool, type MediaType, type SyncTopic } from "./mockData";
import { VisualDocs } from "./VisualDocs";
import { VisualPlaybook } from "./VisualPlaybook";
import { VisualSphere } from "./VisualSphere";
import { VoiceFluidOrb } from "../VoiceFluidOrb";

function MediaView({ mediaType }: { mediaType: MediaType }) {
  if (mediaType === "sphere") {
    return <VisualSphere words={techBubblePool} />;
  }

  if (mediaType === "playbook") {
    return <VisualPlaybook />;
  }

  if (mediaType === "voice-lab") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-xl">
          <VoiceFluidOrb />
        </div>
      </div>
    );
  }

  return <VisualDocs />;
}

function MobileStackItem({ topic }: { topic: SyncTopic }) {
  return (
    <article className="space-y-4 rounded-2xl border border-white/12 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/85">Sync Narrative</p>
        <h3 className="mt-2 text-2xl font-black leading-tight text-slate-50">{topic.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{topic.description}</p>
      </div>
      <ul className="space-y-2.5">
        {topic.bullets.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm text-slate-200">
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="min-h-84">
        <MediaView mediaType={topic.mediaType} />
      </div>
    </article>
  );
}

export function ScrollSyncShowcase() {
  const [activeId, setActiveId] = useState(syncTopics[0]?.id ?? "");

  const activeTopic = useMemo(
    () => syncTopics.find((topic) => topic.id === activeId) ?? syncTopics[0],
    [activeId],
  );

  const handleSectionEnter = useCallback((id: string) => {
    setActiveId((current) => (current === id ? current : id));
  }, []);

  return (
    <section id="sync" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
      <header className="mb-7 max-w-3xl lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Scroll-Synced Experience</p>
        <h2 className="mt-3 text-[clamp(1.7rem,4.4vw,3rem)] font-black leading-tight text-slate-50">左侧叙事滚动，右侧视觉同步切换</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
          模块化结构将文案、观察器和媒体视图解耦。滚动命中触发区后，右侧通过 Framer Motion 平滑过渡，避免快速滚动时的视觉重叠。
        </p>
      </header>

      <div className="hidden gap-8 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div className="space-y-[40vh] pb-[10vh]">
          {syncTopics.map((topic) => (
            <ScrollSection
              key={topic.id}
              id={topic.id}
              title={topic.title}
              description={topic.description}
              bullets={topic.bullets}
              isActive={topic.id === activeId}
              onEnter={handleSectionEnter}
            />
          ))}
        </div>

        <div className="relative h-full">
          <div className="sticky top-0 flex min-h-screen items-center py-10">
            <div className="h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.id}
                  initial={{ opacity: 0, scale: 0.96, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -18 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <MediaView mediaType={activeTopic.mediaType} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 lg:hidden">
        {syncTopics.map((topic) => (
          <MobileStackItem key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
