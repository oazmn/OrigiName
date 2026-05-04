import ConfidenceBadge from "./ConfidenceBadge";
import type { HeritageAnalysis } from "@/types";

export default function NameBreakdown({ analysis }: { analysis: HeritageAnalysis }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300 text-sm leading-relaxed">{analysis.summary}</p>
      {analysis.components.map((c, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              {c.component} name
            </span>
            <ConfidenceBadge level={c.confidence} />
          </div>
          <p className="text-xl font-bold text-white mb-1">{c.value}</p>
          <p className="text-sm font-semibold text-indigo-400 mb-0.5">{c.culturalOrigin}</p>
          <p className="text-xs text-gray-500 mb-2.5">
            {c.linguisticRoot} · {c.likelyRegion}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">{c.notes}</p>
        </div>
      ))}
      <p className="text-xs text-gray-600 italic leading-relaxed">{analysis.caveats}</p>
    </div>
  );
}
