import { NextRequest, NextResponse } from "next/server";
import { getGame, setGame } from "@/lib/gameStore";
import { haversineKm, calculateScore, HINT_SCORE_CAP } from "@/lib/scoreUtils";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { isValidGameId } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`submit:${ip}`, 10, 60_000))
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  try {
    const body = await req.json();
    const { gameId, lat, lng } = body;

    if (!isValidGameId(gameId))
      return NextResponse.json({ error: "Invalid game ID." }, { status: 400 });

    if (
      typeof lat !== "number" || typeof lng !== "number" ||
      !isFinite(lat) || !isFinite(lng) ||
      lat < -90 || lat > 90 || lng < -180 || lng > 180
    )
      return NextResponse.json({ error: "Invalid coordinates." }, { status: 400 });

    const game = getGame(gameId);
    if (!game) return NextResponse.json({ error: "Game not found." }, { status: 404 });

    const round = game.rounds[game.currentRound];
    if (!round) return NextResponse.json({ error: "Round not found." }, { status: 400 });

    if (round.score !== undefined)
      return NextResponse.json({ error: "Round already submitted." }, { status: 409 });

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
