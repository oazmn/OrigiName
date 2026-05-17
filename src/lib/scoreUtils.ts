export function scoreColor(score: number): string {
  if (score >= 700) return "text-emerald-400";
  if (score >= 400) return "text-amber-400";
  return "text-red-400";
}

export function scoreBg(score: number): string {
  if (score >= 700) return "bg-emerald-500/10 border-emerald-500/20";
  if (score >= 400) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

export function scoreLabel(score: number): string {
  if (score >= 950) return "Perfect!";
  if (score >= 700) return "Excellent!";
  if (score >= 400) return "Close!";
  if (score >= 150) return "Not bad!";
  return "Way off!";
}
