import type { ConfidenceLevel } from "@/types";

const styles: Record<ConfidenceLevel, string> = {
  high: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-red-100 text-red-800",
};

export default function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[level]}`}>
      {level} confidence
    </span>
  );
}
