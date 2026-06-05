"use client";

import { useState } from "react";
import type { CompletedRound } from "@/types/game";
import { TOTAL_ROUNDS } from "@/types/game";
import { scoreColor, scoreBg } from "@/lib/scoreUtils";
import LegalFooter from "@/components/LegalFooter";

interface Props {
  totalScore: number;
  completedRounds: CompletedRound[];
  onPlayAgain: () => void;
  onHome: () => void;
}

function getGrade(pct: number): { letter: string; label: string; gradient: string } {
  if (pct >= 90) return { letter: "S", label: "Legendary",       gradient: "from-amber-400 to-orange-400" };
  if (pct >= 75) return { letter: "A", label: "Excellent",       gradient: "from-emerald-400 to-teal-400" };
  if (pct >= 60) return { letter: "B", label: "Great",           gradient: "from-violet-400 to-purple-400" };
  if (pct >= 45) return { letter: "C", label: "Good",            gradient: "from-sky-400 to-blue-400" };
  return              { letter: "D", label: "Keep Practising",  gradient: "from-gray-400 to-gray-500" };
}

function buildShareText(
  totalScore: number,
  maxScore: number,
  grade: ReturnType<typeof getGrade>,
  rounds: CompletedRound[]
): string {
  const url = typeof window !== "undefined" ? window.location.origin : "https://originame.dev";
  const lines = rounds
    .map((r) => `${r.name} · ${r.cultureName} · +${r.score}`)
    .join("\n");
  return [
    "🌍 OrigiName — Can you beat my score?",
    "",
    lines,
    "",
    `${totalScore.toLocaleString()} / ${maxScore.toLocaleString()} · Grade ${grade.letter} (${grade.label})`,
    "",
    url,
  ].join("\n");
}

function ShareButton({
  totalScore,
  maxScore,
  grade,
  rounds,
}: {
  totalScore: number;
  maxScore: number;
  grade: ReturnType<typeof getGrade>;
  rounds: CompletedRound[];
}) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  async function handleShare() {
    const text = buildShareText(totalScore, maxScore, grade, rounds);
    const url = typeof window !== "undefined" ? window.location.origin : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "OrigiName — Can you beat my score?",
          text,
          url,
        });
      } catch {
        // user cancelled native share — do nothing
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      // clipboard denied — silently ignore
    }
  }

  return (
    <button
      onClick={handleShare}
      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-gray-300 hover:text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
    >
      {state === "copied" ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-emerald-400">Copied to clipboard!</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  );
}

export default function ScoreScreen({ totalScore, completedRounds, onPlayAgain, onHome }: Props) {
  const maxScore = TOTAL_ROUNDS * 1000;
  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = getGrade(pct);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-12%] left-[-8%] w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-12%] right-[-8%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-900/8 blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        <div className="text-center mb-8">
          <img src="/OrigiName/logo.svg" alt="OrigiName" className="w-20 h-20 rounded-3xl shadow-2xl shadow-violet-500/40 mb-5 ring-1 ring-white/10 mx-auto" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Origi<span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Name</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Game complete!</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                Final Score
              </p>
              <p className="text-5xl font-extrabold text-white leading-none">
                {totalScore.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm mt-1">out of {maxScore.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${grade.gradient} flex items-center justify-center shadow-lg ring-1 ring-white/10`}
              >
                <span className="text-4xl font-extrabold text-white">{grade.letter}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{grade.label}</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1.5 text-right">{pct}%</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden mb-4 shadow-2xl">
          {completedRounds.map((r, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-5 py-3.5 ${
                i < completedRounds.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <span className="text-gray-700 text-xs font-bold w-4 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <span className="text-white font-semibold text-sm">{r.name}</span>
                <span className="text-gray-500 text-xs ml-2 hidden sm:inline">·</span>
                <span className="text-gray-500 text-xs ml-1 hidden sm:inline">{r.cultureName}</span>
                <p className="text-gray-700 text-xs mt-0.5 sm:hidden">{r.cultureName}</p>
              </div>
              <span className="text-xs text-gray-600 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full hidden md:inline shrink-0">
                {r.cultureRegion}
              </span>
              <div className={`text-right shrink-0 border rounded-xl px-2.5 py-1 ${scoreBg(r.score)}`}>
                <p className={`font-bold text-sm ${scoreColor(r.score)}`}>+{r.score}</p>
                <p className="text-gray-600 text-xs">{Math.round(r.distanceKm).toLocaleString()} km</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <ShareButton
            totalScore={totalScore}
            maxScore={maxScore}
            grade={grade}
            rounds={completedRounds}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 font-semibold py-4 rounded-2xl transition-all duration-300 text-base"
          >
            ← Home
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-[2] bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 text-base"
          >
            Play Again →
          </button>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
