import { getClient } from "@/lib/anthropic";
import { buildNameGenerationPrompt } from "@/lib/gamePrompts";
import type { Culture } from "@/types/game";

export async function generateName(
  culture: Culture
): Promise<{ name: string; pronunciation: string; meaning: string; notes: string }> {
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
      name: parsed.name ?? "Unknown",
      pronunciation: parsed.pronunciation ?? "",
      meaning: parsed.meaning ?? "",
      notes: parsed.notes ?? "",
    };
  } catch {
    return { name: "Unknown", pronunciation: "", meaning: "", notes: "" };
  }
}
