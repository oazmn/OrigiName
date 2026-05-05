"use client";
import { useState } from "react";
import type { ParsedName } from "@/types";

export default function NameInput({ onSubmit }: { onSubmit: (name: ParsedName) => void }) {
  const [firstName, setFirstName] = useState("");
  const [middleNames, setMiddleNames] = useState<string[]>([""]);
  const [lastName, setLastName] = useState("");

  function updateMiddleName(index: number, value: string) {
    const updated = [...middleNames];
    updated[index] = value;
    if (index === updated.length - 1 && value.trim()) {
      updated.push("");
    }
    setMiddleNames(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    const filtered = middleNames.map((n) => n.trim()).filter(Boolean);
    onSubmit({
      firstName: firstName.trim(),
      middleNames: filtered.length > 0 ? filtered : undefined,
      lastName: lastName.trim(),
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-6 text-4xl">
            🌍
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Heritage{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Analyser
            </span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
            Uncover the cultural and geographic origins hidden within your name
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-5 shadow-2xl"
        >
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Olisa"
              required
              className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 text-sm transition-all duration-200"
            />
          </div>

          <div className="space-y-3">
            {middleNames.map((value, i) => (
              <div key={i}>
                <label className="block text-gray-500 text-sm font-medium mb-2">
                  Middle Name {middleNames.filter((n) => n.trim()).length > 0 && i < middleNames.length - 1 ? i + 1 : ""}
                  <span className="ml-1.5 text-gray-700 text-xs font-normal">optional</span>
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateMiddleName(i, e.target.value)}
                  placeholder={i === 0 ? "e.g. James" : "e.g. Alexander"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 text-sm transition-all duration-200"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Zimmermann"
              required
              className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 text-sm transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={!firstName.trim() || !lastName.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-violet-600 text-white font-semibold rounded-xl py-3 text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30 mt-1"
          >
            Analyse My Heritage →
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Powered by AI · No data stored
        </p>
        <div className="text-center mt-3">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200"
          >
            ← Home
          </a>
        </div>
      </div>
    </div>
  );
}
