"use client";
import { useState } from "react";
import type { ParsedName } from "@/types";

export default function NameInput({ onSubmit }: { onSubmit: (name: ParsedName) => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      onSubmit({ firstName: firstName.trim(), lastName: lastName.trim() });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌍</div>
          <h1 className="text-3xl font-bold text-white mb-2">Heritage Analyser</h1>
          <p className="text-slate-400 text-sm">
            Discover the cultural and geographic origins hidden in your name
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-4"
        >
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Olisa"
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Zimmermann"
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!firstName.trim() || !lastName.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-colors mt-2"
          >
            Analyse My Heritage
          </button>
        </form>
      </div>
    </div>
  );
}
