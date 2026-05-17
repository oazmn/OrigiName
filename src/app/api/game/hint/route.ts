import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame } from "@/lib/gameStore";
import { rateLimit, getIp } from "@/lib/rateLimit";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function broadContinent(region: string): string {
  if (region.includes("Africa")) return "Africa";
  if (["Mesoamerica", "South America"].includes(region)) return "the Americas";
  if (region === "Pacific") return "Oceania & the Pacific";
  if (["Western Europe", "Northern Europe", "Eastern Europe", "Southern Europe", "British Isles", "Central Europe"].includes(region)) return "Europe";
  return "Asia";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`hint:${ip}`, 5, 60_000))
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  try {
    const { gameId } = await req.json();

    if (typeof gameId !== "string" || !UUID.test(gameId))
      return NextResponse.json({ error: "Invalid game ID." }, { status: 400 });

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    const round = game.rounds[game.currentRound];
    if (!round) return NextResponse.json({ error: "Round not found." }, { status: 400 });

    if (round.score !== undefined)
      return NextResponse.json({ error: "Hint cannot be used after submitting." }, { status: 409 });

    round.hintUsed = true;
    setGame(game);

    return NextResponse.json({ hint: `This name originates from ${broadContinent(round.culture.region)}.` });
  } catch (err) {
    console.error("[game/hint]", err);
    return NextResponse.json({ error: "Failed to get hint." }, { status: 500 });
  }
}
