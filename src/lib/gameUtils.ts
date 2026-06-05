import { getClient } from "@/lib/anthropic";
import { buildNameGenerationPrompt } from "@/lib/gamePrompts";
import { getNameFromPool } from "@/lib/namePool";
import type { Culture } from "@/types/game";

// Strip HTML tags to prevent stored XSS from AI-generated content.
const strip = (s: string) => s.replace(/<[^>]*>/g, "").trim();

// Hard caps on AI-returned field lengths. These bound the amount of untrusted text
// stored in the in-memory session store and later echoed to clients.
const FIELD_LIMITS = {
  name: 80,
  pronunciation: 120,
  meaning: 400,
  notes: 600,
} as const;

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) : s;
}

function sanitiseField(raw: unknown, field: keyof typeof FIELD_LIMITS, fallback: string): string {
  const s = typeof raw === "string" ? strip(raw) : fallback;
  return truncate(s || fallback, FIELD_LIMITS[field]);
}

export async function generateName(
  culture: Culture
): Promise<{ name: string; pronunciation: string; meaning: string; notes: string }> {
  const poolEntry = getNameFromPool(culture);
  if (poolEntry) return poolEntry;

  const client = getClient();
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    messages: [{ role: "user", content: buildNameGenerationPrompt(culture) }],
  });
  const raw = res.content[0].type === "text" ? res.content[0].text.trim() : "{}";
  const json = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  try {
    const parsed = JSON.parse(json);
    return {
      name: sanitiseField(parsed.name, "name", "Unknown"),
      pronunciation: sanitiseField(parsed.pronunciation, "pronunciation", ""),
      meaning: sanitiseField(parsed.meaning, "meaning", ""),
      notes: sanitiseField(parsed.notes, "notes", ""),
    };
  } catch {
    return { name: "Unknown", pronunciation: "", meaning: "", notes: "" };
  }
}
