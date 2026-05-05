"use client";
import { useReducer, useCallback } from "react";
import dynamic from "next/dynamic";
import ScoreScreen from "./ScoreScreen";
import type { GamePhase, RoundResult, CompletedRound } from "@/types/game";
import { TOTAL_ROUNDS } from "@/lib/gameConstants";

const GameMap = dynamic(() => import("./GameMap"), { ssr: false });

interface GameState {
  phase: GamePhase;
  gameId: string | null;
  roundNumber: number;
  currentName: string | null;
  guessPin: { lat: number; lng: number } | null;
  roundResult: RoundResult | null;
  totalScore: number;
  completedRounds: CompletedRound[];
  hint: string | null;
  hintLoading: boolean;
  error: string | null;
}

type Action =
  | { type: "START" }
  | { type: "GAME_LOADED"; gameId: string; name: string }
  | { type: "MAP_CLICKED"; lat: number; lng: number }
  | { type: "SUBMIT" }
  | { type: "ROUND_RESULT"; result: RoundResult }
  | { type: "ADVANCE" }
  | { type: "NEXT_ROUND_LOADED"; roundNumber: number; name: string }
  | { type: "GAME_OVER" }
  | { type: "HINT_LOADING" }
  | { type: "HINT_RECEIVED"; hint: string }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

const initial: GameState = {
  phase: "menu",
  gameId: null,
  roundNumber: 1,
  currentName: null,
  guessPin: null,
  roundResult: null,
  totalScore: 0,
  completedRounds: [],
  hint: null,
  hintLoading: false,
  error: null,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      return { ...initial, phase: "loading" };
    case "GAME_LOADED":
      return { ...initial, phase: "guessing", gameId: action.gameId, roundNumber: 1, currentName: action.name };
    case "MAP_CLICKED":
      if (state.phase !== "guessing") return state;
      return { ...state, guessPin: { lat: action.lat, lng: action.lng } };
    case "SUBMIT":
      return { ...state, phase: "submitting" };
    case "ROUND_RESULT":
      return {
        ...state,
        phase: "revealing",
        roundResult: action.result,
        totalScore: action.result.totalScore,
        completedRounds: [
          ...state.completedRounds,
          {
            name: action.result.name,
            cultureName: action.result.cultureName,
            cultureRegion: action.result.cultureRegion,
            score: action.result.score,
            distanceKm: action.result.distanceKm,
          },
        ],
      };
    case "ADVANCE":
      return { ...state, phase: "advancing" };
    case "NEXT_ROUND_LOADED":
      return {
        ...state,
        phase: "guessing",
        roundNumber: action.roundNumber,
        currentName: action.name,
        guessPin: null,
        roundResult: null,
        hint: null,
        hintLoading: false,
      };
    case "HINT_LOADING":
      return { ...state, hintLoading: true };
    case "HINT_RECEIVED":
      return { ...state, hint: action.hint, hintLoading: false };
    case "GAME_OVER":
      return { ...state, phase: "done" };
    case "ERROR":
      return { ...state, phase: "menu", error: action.error };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

function scoreLabel(score: number): string {
  if (score >= 950) return "Perfect!";
  if (score >= 700) return "Excellent!";
  if (score >= 400) return "Close!";
  if (score >= 150) return "Not bad!";
  return "Way off!";
}

function scoreAccent(score: number): string {
  if (score >= 700) return "text-emerald-400";
  if (score >= 400) return "text-amber-400";
  return "text-red-400";
}

export default function GamePage() {
  const [state, dispatch] = useReducer(reducer, initial);

  const startGame = useCallback(async () => {
    dispatch({ type: "START" });
    try {
      const res = await fetch("/api/game/start", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      dispatch({ type: "GAME_LOADED", gameId: data.gameId, name: data.name });
    } catch {
      dispatch({ type: "ERROR", error: "Failed to start game. Please try again." });
    }
  }, []);

  const submitGuess = useCallback(async () => {
    if (!state.guessPin || !state.gameId) return;
    dispatch({ type: "SUBMIT" });
    try {
      const res = await fetch("/api/game/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: state.gameId, lat: state.guessPin.lat, lng: state.guessPin.lng }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      dispatch({ type: "ROUND_RESULT", result: data });
    } catch {
      dispatch({ type: "ERROR", error: "Failed to submit guess. Please try again." });
    }
  }, [state.guessPin, state.gameId]);

  const advance = useCallback(async () => {
    if (!state.gameId || !state.roundResult) return;
    if (state.roundResult.isLastRound) {
      dispatch({ type: "GAME_OVER" });
      return;
    }
    dispatch({ type: "ADVANCE" });
    try {
      const res = await fetch("/api/game/advance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: state.gameId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.done) {
        dispatch({ type: "GAME_OVER" });
      } else {
        dispatch({ type: "NEXT_ROUND_LOADED", roundNumber: data.roundNumber, name: data.name });
      }
    } catch {
      dispatch({ type: "ERROR", error: "Failed to load next round. Please try again." });
    }
  }, [state.gameId, state.roundResult]);

  const getHint = useCallback(async () => {
    if (!state.gameId || state.hint || state.hintLoading) return;
    dispatch({ type: "HINT_LOADING" });
    try {
      const res = await fetch("/api/game/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: state.gameId }),
      });
      const data = await res.json();
      dispatch({ type: "HINT_RECEIVED", hint: res.ok ? data.hint : "" });
    } catch {
      dispatch({ type: "HINT_RECEIVED", hint: "" });
    }
  }, [state.gameId, state.hint, state.hintLoading]);

  // ── Done ──────────────────────────────────────────────────────────────────
  if (state.phase === "done") {
    return (
      <ScoreScreen
        totalScore={state.totalScore}
        completedRounds={state.completedRounds}
        onPlayAgain={() => dispatch({ type: "RESET" })}
      />
    );
  }

  // ── Menu ──────────────────────────────────────────────────────────────────
  if (state.phase === "menu") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-900/10 blur-3xl pointer-events-none" />

        <div className="max-w-sm w-full text-center relative z-10">
          <div className="relative inline-flex mb-7">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/40 flex items-center justify-center text-5xl ring-1 ring-white/10">
              🌍
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center ring-2 ring-gray-950">
              <span className="text-xs">🎮</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-3">
            Name
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Guessr
            </span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 px-2">
            A name appears from somewhere on Earth. Pin where you think it comes from and score points.
          </p>

          <div className="grid grid-cols-3 gap-2.5 mb-8">
            {[
              { icon: "👀", text: "See the name" },
              { icon: "🗺️", text: "Pin its origin" },
              { icon: "🏆", text: "Score points" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="bg-white/5 backdrop-blur-xs border border-white/8 rounded-2xl p-3 text-center"
              >
                <div className="text-2xl mb-1.5">{icon}</div>
                <p className="text-gray-500 text-xs leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mb-7 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {TOTAL_ROUNDS} rounds
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              1,000 pts max each
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Closer = more
            </span>
          </div>

          {state.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-5">
              <p className="text-red-400 text-sm">{state.error}</p>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50"
          >
            Play →
          </button>

          <div className="mt-6">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-400 text-sm transition-colors duration-200"
            >
              ← Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading first round ────────────────────────────────────────────────────
  if (state.phase === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-violet-500/30 ring-1 ring-white/10 animate-pulse">
            🌍
          </div>
          <p className="text-white font-semibold mb-4">Round 1 of {TOTAL_ROUNDS}</p>
          <div className="flex gap-1.5 justify-center mb-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">Generating your name…</p>
        </div>
      </div>
    );
  }

  // ── Guessing / Submitting / Revealing / Advancing ─────────────────────────
  const isGuessing = state.phase === "guessing";
  const isSubmitting = state.phase === "submitting";
  const isRevealing = state.phase === "revealing" || state.phase === "advancing";
  const result = state.roundResult;
  const revealPin = result ? { lat: result.correctLat, lng: result.correctLng } : null;
  const maxScore = TOTAL_ROUNDS * 1000;

  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden">

      {/* ── Header ── */}
      <header className="h-14 shrink-0 flex items-center justify-between px-4 md:px-6 bg-black/50 backdrop-blur-md border-b border-white/5 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm shadow-lg shadow-violet-500/30">
            🌍
          </div>
          <span className="font-bold text-white text-sm tracking-tight">
            Name<span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Guessr</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_ROUNDS }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < state.completedRounds.length
                  ? "w-2 h-2 bg-violet-500 shadow-xs shadow-violet-500/60"
                  : i === state.roundNumber - 1
                  ? "w-3 h-3 bg-white ring-2 ring-white/20"
                  : "w-2 h-2 bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl px-3 py-1.5">
          <span className="text-xs text-gray-500 mr-1">pts</span>
          <span className="text-sm font-bold text-white">{state.totalScore.toLocaleString()}</span>
        </div>
      </header>

      {/* ── Map area ── */}
      <div className="flex-1 relative overflow-hidden">
        <GameMap
          guessPin={state.guessPin}
          revealPin={revealPin}
          onMapClick={
            isGuessing ? (lat, lng) => dispatch({ type: "MAP_CLICKED", lat, lng }) : undefined
          }
        />

        {/* Name overlay */}
        {(isGuessing || isSubmitting) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-xs px-4">
            <div className="bg-gray-950/92 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-center shadow-2xl shadow-black/60 ring-1 ring-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1">
                Round {state.roundNumber} of {TOTAL_ROUNDS}
              </p>
              <p className="text-xs text-gray-500 mb-2.5">Where does this name come from?</p>
              <p className="text-3xl font-extrabold text-white tracking-tight mb-3">
                {state.currentName}
              </p>

              {state.hint ? (
                <div className="flex items-center justify-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                  <span className="text-base">💡</span>
                  <p className="text-amber-400 text-xs font-medium">{state.hint}</p>
                </div>
              ) : (
                <button
                  onClick={getHint}
                  disabled={state.hintLoading || isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 text-gray-600 hover:text-amber-400 disabled:opacity-40 transition-colors duration-200 text-xs py-1"
                >
                  {state.hintLoading ? (
                    <span className="w-3 h-3 border border-gray-500 border-t-amber-400 rounded-full animate-spin" />
                  ) : (
                    <span>💡</span>
                  )}
                  {state.hintLoading ? "Loading hint…" : "Get a hint (caps score at 750)"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Click hint */}
        {isGuessing && !state.guessPin && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
            <p className="text-gray-400 text-xs bg-gray-950/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/8 shadow-lg">
              Click anywhere on the map
            </p>
          </div>
        )}

        {/* Submit button */}
        {(isGuessing || isSubmitting) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
            <button
              onClick={submitGuess}
              disabled={!state.guessPin || isSubmitting}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold px-10 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.04] disabled:scale-100 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 disabled:shadow-none min-w-[170px]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scoring…
                </span>
              ) : state.guessPin ? (
                "Submit Guess →"
              ) : (
                "Pick a location"
              )}
            </button>
          </div>
        )}

        {/* ── Reveal panel ── */}
        {isRevealing && result && (
          <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-gray-950/97 backdrop-blur-xl border-t border-white/8 shadow-2xl">
            <div className="h-0.5 bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-700"
                style={{ width: `${Math.min((result.totalScore / maxScore) * 100, 100)}%` }}
              />
            </div>

            <div className="max-w-lg mx-auto px-5 py-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-extrabold ${scoreAccent(result.score)}`}>
                      +{result.score}
                    </span>
                    <span className={`text-sm font-semibold ${scoreAccent(result.score)}`}>
                      {scoreLabel(result.score)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Total: {result.totalScore.toLocaleString()} / {maxScore.toLocaleString()}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-gray-300 text-sm font-semibold">
                    {Math.round(result.distanceKm).toLocaleString()} km
                  </p>
                  <p className="text-gray-600 text-xs">{result.cultureRegion}</p>
                </div>
              </div>

              <div className="flex gap-5 mb-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  Your guess
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  {result.cultureName}
                </span>
              </div>

              <div className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 mb-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-white font-bold text-sm">&ldquo;{result.name}&rdquo;</span>
                  <span className="text-xs text-violet-400 font-medium bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                    {result.cultureName}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{result.meaning}</p>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{result.notes}</p>
              </div>

              <button
                onClick={advance}
                disabled={state.phase === "advancing"}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 text-sm shadow-lg shadow-violet-500/20"
              >
                {state.phase === "advancing" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading…
                  </span>
                ) : result.isLastRound ? (
                  "See Final Score →"
                ) : (
                  `Next Round (${state.roundNumber + 1}/${TOTAL_ROUNDS}) →`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
