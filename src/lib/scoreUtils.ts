export const HINT_SCORE_CAP = 750;

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateScore(distanceKm: number): number {
  return Math.round(1000 * Math.exp(-distanceKm / 4000));
}

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
