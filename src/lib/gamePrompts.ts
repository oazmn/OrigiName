import type { Culture } from "@/types/game";

export function buildNameGenerationPrompt(culture: Culture): string {
  return `Generate ONE authentic given name (first name) from ${culture.name} culture (${culture.region}).

Return ONLY a valid JSON object — no markdown, no code fences, no explanation:
{
  "name": "the name",
  "pronunciation": "simple phonetic guide using hyphens between syllables, stressed syllable in CAPS — e.g. FAH-tee-mah, hee-ROH-shee, ah-MEE-nah",
  "meaning": "one sentence describing what the name means — concepts, qualities, or imagery only",
  "notes": "one to two sentences of full cultural and geographic context about this name"
}

Rules:
- The name must be a real, authentic name used in ${culture.name} culture
- Avoid internationally famous names (no celebrity names, heads of state, etc.)
- Use a common given name that a typical person from this culture might have
- "pronunciation" must be a plain English phonetic respelling — no IPA symbols, no language names, no geographic hints. Only show how to say it. Examples: "MAH-mood", "lee-AH-nah", "SVEN", "ay-SHA"
- "meaning" must contain ONLY the semantic meaning in plain English — what concept, quality, or imagery the name represents. NEVER include in "meaning": any language name (e.g. Arabic, Sanskrit, Hebrew, Turkish, Japanese), any country or city name, any region or continent name, any ethnic or cultural group name, or directional geographic terms (e.g. Eastern, West African). Bad example: "From Arabic, meaning radiant light." Good example: "Evokes the imagery of radiant, shining light."
- "notes" may include full context — country, region, language origin, cultural tradition — since it is only shown to the player after they have already submitted their guess`;
}
