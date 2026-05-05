import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { setGame } from "@/lib/gameStore";
import { generateName } from "@/lib/gameUtils";
import { TOTAL_ROUNDS } from "@/lib/gameConstants";
import { getRandomCultures } from "@/lib/cultures";
import type { GameRound } from "@/types/game";

export async function POST() {
  try {
    const cultures = getRandomCultures(TOTAL_ROUNDS);
    const { name, meaning, notes } = await generateName(cultures[0]);

    const firstRound: GameRound = { culture: cultures[0], name, meaning, notes };
    const gameId = uuid();

    setGame({
      id: gameId,
      cultures,
      rounds: [firstRound],
      currentRound: 0,
      createdAt: Date.now(),
    });

    return NextResponse.json({ gameId, name });
  } catch (err) {
    console.error("[game/start]", err);
    return NextResponse.json({ error: "Failed to start game." }, { status: 500 });
  }
}
