import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame, haversineKm, calculateScore, HINT_SCORE_CAP } from "@/lib/gameStore";

export async function POST(req: NextRequest) {
  try {
    const { gameId, lat, lng }: { gameId: string; lat: number; lng: number } = await req.json();

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    const round = game.rounds[game.currentRound];
    if (!round) return NextResponse.json({ error: "Round not found." }, { status: 400 });

    const distanceKm = haversineKm(lat, lng, round.culture.lat, round.culture.lng);
    const rawScore = calculateScore(distanceKm);
    const score = round.hintUsed ? Math.min(rawScore, HINT_SCORE_CAP) : rawScore;

    round.guessLat = lat;
    round.guessLng = lng;
    round.score = score;
    round.distanceKm = distanceKm;
    setGame(game);

    const totalScore = game.rounds.reduce((sum, r) => sum + (r.score ?? 0), 0);
    const isLastRound = game.currentRound === game.cultures.length - 1;

    return NextResponse.json({
      score,
      distanceKm,
      correctLat: round.culture.lat,
      correctLng: round.culture.lng,
      cultureName: round.culture.name,
      cultureRegion: round.culture.region,
      name: round.name,
      meaning: round.meaning,
      notes: round.notes,
      isLastRound,
      totalScore,
      hintUsed: !!round.hintUsed,
    });
  } catch (err) {
    console.error("[game/submit]", err);
    return NextResponse.json({ error: "Failed to submit guess." }, { status: 500 });
  }
}
