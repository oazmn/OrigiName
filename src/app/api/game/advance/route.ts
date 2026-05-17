import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame } from "@/lib/gameStore";
import { generateName } from "@/lib/gameUtils";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { isValidGameId } from "@/lib/validation";
import type { GameRound } from "@/types/game";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`advance:${ip}`, 15, 60_000))
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  try {
    const { gameId } = await req.json();

    if (!isValidGameId(gameId))
      return NextResponse.json({ error: "Invalid game ID." }, { status: 400 });

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    const currentRound = game.rounds[game.currentRound];
    if (!currentRound || currentRound.score === undefined)
      return NextResponse.json({ error: "Current round not yet submitted." }, { status: 409 });

    game.currentRound += 1;

    if (game.currentRound >= game.cultures.length) {
      setGame(game);
      return NextResponse.json({ done: true });
    }

    const culture = game.cultures[game.currentRound];
    const { name, pronunciation, meaning, notes } = await generateName(culture);

    const nextRound: GameRound = { culture, name, pronunciation, meaning, notes };
    game.rounds.push(nextRound);
    setGame(game);

    return NextResponse.json({ roundNumber: game.currentRound + 1, name, pronunciation, meaning });
  } catch (err) {
    console.error("[game/advance]", err);
    return NextResponse.json({ error: "Failed to load next round." }, { status: 500 });
  }
}
