"use client";
import dynamic from "next/dynamic";
import NameBreakdown from "./NameBreakdown";
import type { HeritageAnalysis, ParsedName } from "@/types";

const HeritageMap = dynamic(() => import("./HeritageMap"), { ssr: false });

interface Props {
  name: ParsedName;
  analysis: HeritageAnalysis;
  onReset: () => void;
}

export default function ResultsPanel({ name, analysis, onReset }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-5 text-3xl">
            🌍
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
            Heritage of{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {name.firstName} {name.lastName}
            </span>
          </h2>
          <p className="text-gray-500 text-sm">AI-powered name origin analysis</p>
        </div>

        {/* Results grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Breakdown card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 inline-block" />
              Name Breakdown
            </h3>
            <NameBreakdown analysis={analysis} />
          </div>

          {/* Map card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: "420px" }}>
            <div className="px-6 pt-5 pb-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500 inline-block" />
                Origin Map
              </h3>
            </div>
            <div className="flex-1 h-[360px]">
              <HeritageMap pins={analysis.pins} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-200 hover:scale-105 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            Analyse another name
          </button>
        </div>
      </div>
    </div>
  );
}
