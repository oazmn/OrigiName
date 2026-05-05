import type { Culture } from "@/types/game";

export function buildNameGenerationPrompt(culture: Culture): string {
  return `Generate ONE authentic given name (first name) from ${culture.name} culture (${culture.region}).

Return ONLY a valid JSON object — no markdown, no code fences, no explanation:
{
  "name": "the name",
  "meaning": "one sentence explaining its etymology or meaning",
  "notes": "one to two sentences of cultural context about this name"
}

Rules:
- The name must be a real, authentic name used in ${culture.name} culture
- Avoid internationally famous names (no celebrity names, heads of state, etc.)
- Use a common given name that a typical person from this culture might have
- Keep "meaning" and "notes" factual and educational
- Do NOT reveal the cultural origin in any field`;
}
