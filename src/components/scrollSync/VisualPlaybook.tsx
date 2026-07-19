import { Check, ChevronRight, Mic } from "lucide-react";

export function VisualPlaybook() {
  const rows = [
    { id: "01", title: "Capture", detail: "Voice intent is segmented and normalized." },
    { id: "02", title: "Plan", detail: "Agent maps intent to executable playbook nodes." },
    { id: "03", title: "Execute", detail: "Tools run with progressive status and rollback rails." },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 p-4 sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(14,116,144,0.16),transparent_42%,rgba(251,191,36,0.12))]" />
      <div className="relative flex h-full flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Mic size={16} className="text-cyan-300" />
            Live Instruction Flow
          </span>
          <span className="rounded-full border border-cyan-200/35 bg-cyan-300/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-100">
            Synchronized
          </span>
        </div>

        <div className="grid gap-2.5 sm:gap-3">
          {rows.map((row) => (
            <div key={row.id} className="group rounded-xl border border-white/12 bg-white/4 p-3 sm:p-4 transition duration-300 hover:scale-[1.01] hover:border-cyan-200/35">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs font-bold tracking-[0.12em] text-amber-200/90">{row.id}</span>
                  <h4 className="text-sm font-semibold text-slate-100">{row.title}</h4>
                </div>
                <ChevronRight size={16} className="text-slate-400 transition group-hover:text-cyan-300" />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{row.detail}</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 text-[11px] font-semibold text-emerald-100">
                <Check size={12} />
                Traceable
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
