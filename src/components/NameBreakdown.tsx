import ConfidenceBadge from "./ConfidenceBadge";
import type { HeritageAnalysis } from "@/types";

export default function NameBreakdown({ analysis }: { analysis: HeritageAnalysis }) {
  return (
    <div className="space-y-4">
      <p className="text-slate-700 text-sm leading-relaxed">{analysis.summary}</p>
      {analysis.components.map((c, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {c.component} name
            </span>
            <ConfidenceBadge level={c.confidence} />
          </div>
          <p className="text-xl font-bold text-slate-900 mb-1">{c.value}</p>
          <p className="text-sm font-medium text-indigo-700 mb-0.5">{c.culturalOrigin}</p>
          <p className="text-xs text-slate-500 mb-2">
            {c.linguisticRoot} · {c.likelyRegion}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">{c.notes}</p>
        </div>
      ))}
      <p className="text-xs text-slate-400 italic leading-relaxed">{analysis.caveats}</p>
    </div>
  );
}
