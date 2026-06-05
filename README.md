# OrigiName
A GeoGuessr-style guessing game for given names. Each round draws a real name from a curated database of 4,771 authentic given names spanning 113 cultures — you get a short meaning hint, then drop a pin on a world map to guess where the name comes from. The closer your pin, the higher your score.

## Aim of the project

Two goals, equally weighted:

1. **Learn AI fluency in practice.** My aim is to learn about AI fluency through practical experience, shipping a real app built on LLM output. That meant designing and iterating on a structured generation prompt that could produce consistent, clue-free meaning hints and rich cultural notes at scale — then using Claude to generate the entire name database in one offline session across 15 batches. The interesting engineering questions were about prompt design and data quality, not just real-time API plumbing.
2. **Build something with cultural value.** A lot of AI demos are throwaway. This one tries to be the opposite: a small, replayable game that gets people to encounter names — and the cultures behind them — that they probably haven't met before. The pool deliberately spans 113 cultures across 21 regions, weighted away from celebrity names and toward what an ordinary person from that culture might actually be called, so each round teaches you something true about a place.

## The game

**OrigiName** is a three-round name geography game. Each round, a name is drawn at random from a pre-generated database of 4,771 authentic given names spanning 113 cultures — and you get two things with it: a short *meaning* hint (shown before you guess) and a longer *cultural note* (revealed after you guess). For any culture not yet covered by the database, Claude generates the name and notes on the fly as a fallback.

The meaning hint is deliberately scrubbed of geographic clues. It will tell you the name "evokes radiant, shining light" but never that it comes from Arabic, North Africa, or the Maghreb — that would give the game away. You have to reason from the name's sound and the imagery alone.

You then click anywhere on a world map to place your guess pin and hit submit. The app reveals the correct location on the same map, tells you the culture and region, and shows the longer note explaining where the name actually comes from and what tradition it belongs to. After three rounds you get a score screen.

If you're stuck, you can spend a **hint** to reveal the broad continent (Africa, Europe, Asia, the Americas, or Oceania & the Pacific) — but using it caps that round's score at 750.

### How it plays, step by step

Each game is three rounds. For every round:

1. You are shown a name and a one-sentence meaning hint. The meaning never mentions a language, region, country, or ethnic group — only the concept or imagery the name evokes (for example "evokes radiant, shining light" rather than "from Arabic, meaning radiant").
2. You click anywhere on the world map to place a guess pin.
3. You submit. The correct location is revealed along with the culture, region, and a longer cultural note.
4. After three rounds you get a score screen with per-round results and a total.

### Scoring

Distance is computed between your pin and the culture's reference coordinates. A perfect pin scores 1000, roughly 2,770 km off scores about 500, and a guess on the wrong continent usually lands in the low double digits. Max total across the three rounds: 3,000.

## How the database was built

The 4,771 names were generated offline using Claude, not at game runtime. The process:

1. The 113 cultures were split into 15 batches of roughly 8 cultures each.
2. Each batch was fed to Claude with a strict structured prompt: 44 names per culture, roughly equal male/female split, no internationally famous names, phonetic variety across entries, and hard rules about what the meaning field could and couldn't say (semantic imagery only — no language names, country names, or geographic hints).
3. Each batch returned a single JSON object. All 15 were merged into `src/lib/nameDatabase.json`.
4. At game time, `namePool.ts` picks a name at random from the relevant culture's array. If the culture has no entries, the app falls back to the Claude API to generate one on the fly.

The main prompt engineering challenge was the meaning constraint: every entry had to convey what a name *feels like* without leaking where it comes from. That same constraint is what makes the game work — the player has to reason from sound and imagery, not from a language label.
