# OrigiName
A GeoGuessr-style guessing game for given names. Claude generates an authentic first name from a culture somewhere in the world, gives you a short meaning hint, and you drop a pin on a world map to guess where the name comes from. The closer your pin, the higher your score.

## Aim of the project

Two goals, equally weighted:

1. **Learn AI fluency in practice** My Aim is to learn about AI fluency through practical experience, shipping a real app that depends on an LLM for its core gameplay loop. That means writing prompts that produce reliable structured output round after round, designing around model failure modes (parse errors, hallucinated meanings, leaked geographic clues), keeping API costs and latency sane, and figuring out where a model belongs in a stack versus where plain code does the job better.
2. **Build something with cultural value.** A lot of AI demos are throwaway. This one tries to be the opposite: a small, replayable game that gets people to encounter names - and the cultures behind them, that they probably haven't met before. The pool deliberately spans 61 cultures across 20 regions, weighted away from celebrity names and toward what an ordinary person from that culture might actually be called, so each round teaches you something true about a place.

## The game

**Heritage Analyser** is a three-round name geography game. Each round, Claude invents an authentic given name from a randomly chosen culture and writes you two things: a short *meaning* hint (shown before you guess) and a longer *cultural note* (revealed after you guess).

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
