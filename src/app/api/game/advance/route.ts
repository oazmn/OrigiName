import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame } from "@/lib/gameStore";
import { generateName } from "@/lib/gameUtils";
import type { GameRound } from "@/types/game";

export async function POST(req: NextRequest) {
  try {
    const { gameId }: { gameId: string } = await req.json();

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    game.currentRound += 1;

    if (game.currentRound >= game.cultures.length) {
      setGame(game);
      return NextResponse.json({ done: true });
    }

    const culture = game.cultures[game.currentRound];
    const { name, meaning, notes } = await generateName(culture);

    const nextRound: GameRound = { culture, name, meaning, notes };
    game.rounds.push(nextRound);
    setGame(game);

    return NextResponse.json({ roundNumber: game.currentRound + 1, name });
  } catch (err) {
    console.error("[game/advance]", err);
    return NextResponse.json({ error: "Failed to load next round." }, { status: 500 });
  }
}
