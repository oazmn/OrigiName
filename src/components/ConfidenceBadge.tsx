import type { ConfidenceLevel } from "@/types";

const styles: Record<ConfidenceLevel, string> = {
  high: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  low: "bg-red-500/15 text-red-400 border border-red-500/30",
};

export default function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[level]}`}>
      {level}
    </span>
  );
}
