import type { HeritageAnalysis } from "@/types";

export function parseAnalysis(raw: string): HeritageAnalysis {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON object found in response");
  const parsed = JSON.parse(match[0]);
  if (!parsed.summary || !Array.isArray(parsed.components) || !Array.isArray(parsed.pins)) {
    throw new Error("Invalid analysis shape");
  }
  return parsed as HeritageAnalysis;
}
