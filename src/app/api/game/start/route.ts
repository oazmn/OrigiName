import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { setGame, storeFull } from "@/lib/gameStore";
import { generateName } from "@/lib/gameUtils";
import { TOTAL_ROUNDS } from "@/lib/gameConstants";
import { getRandomCultures } from "@/lib/cultures";
import { rateLimit, getIp } from "@/lib/rateLimit";
import type { GameRound } from "@/types/game";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`start:${ip}`, 5, 60_000))
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  if (storeFull())
    return NextResponse.json({ error: "Server busy. Please try again shortly." }, { status: 503 });

  try {
    const cultures = getRandomCultures(TOTAL_ROUNDS);
    const { name, pronunciation, meaning, notes } = await generateName(cultures[0]);

    const firstRound: GameRound = { culture: cultures[0], name, pronunciation, meaning, notes };
    const gameId = uuid();

    setGame({
      id: gameId,
      cultures,
      rounds: [firstRound],
      currentRound: 0,
      createdAt: Date.now(),
    });

    return NextResponse.json({ gameId, name, pronunciation, meaning });
  } catch (err) {
    console.error("[game/start]", err);
    return NextResponse.json({ error: "Failed to start game." }, { status: 500 });
  }
}
