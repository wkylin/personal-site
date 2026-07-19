const docs = [
  { name: "policy-guardrails.md", hint: "Updated 3m ago" },
  { name: "latency-slo.yaml", hint: "Updated 9m ago" },
  { name: "agent-playbook.v2", hint: "Updated 22m ago" },
];

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-200" fill="none" aria-hidden="true">
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1.5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h6M9 15h6M9 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function VisualDocs() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 p-6">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.92),rgba(3,7,18,0.95))]" />
      <div className="relative flex h-full flex-col gap-4">
        <div className="rounded-2xl border border-dashed border-cyan-200/35 bg-cyan-300/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/85">Knowledge Ingest Zone</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">拖入规范、SOP、会议纪要和历史复盘，系统会自动抽取实体与关系并建立可追溯引用。</p>
        </div>

        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 transition hover:border-cyan-200/35 hover:bg-white/6">
              <span className="inline-flex min-w-0 items-center gap-2 text-sm text-slate-100">
                <DocIcon />
                <span className="truncate">{doc.name}</span>
              </span>
              <span className="text-xs text-slate-400">{doc.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
