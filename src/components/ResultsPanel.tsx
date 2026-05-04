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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌍</div>
          <h2 className="text-2xl font-bold text-white">
            Heritage of {name.firstName} {name.lastName}
          </h2>
          <p className="text-slate-400 text-sm mt-1">Name origin analysis</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5">
            <NameBreakdown analysis={analysis} />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: "400px" }}>
            <HeritageMap pins={analysis.pins} />
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={onReset}
            className="text-slate-400 hover:text-white text-sm transition-colors underline underline-offset-2"
          >
            Analyse another name
          </button>
        </div>
      </div>
    </div>
  );
}
