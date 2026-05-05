import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame } from "@/lib/gameStore";

export async function POST(req: NextRequest) {
  try {
    const { gameId }: { gameId: string } = await req.json();

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    const round = game.rounds[game.currentRound];
    if (!round) return NextResponse.json({ error: "Round not found." }, { status: 400 });

    round.hintUsed = true;
    setGame(game);

    return NextResponse.json({ hint: `This name comes from ${round.culture.region}` });
  } catch (err) {
    console.error("[game/hint]", err);
    return NextResponse.json({ error: "Failed to get hint." }, { status: 500 });
  }
}
