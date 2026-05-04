"use client";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage, ParsedName } from "@/types";

interface Props {
  name: ParsedName;
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (text: string) => void;
}

export default function ConversationPane({ name, messages, isLoading, onSend }: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg flex flex-col relative z-10" style={{ height: "85vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm">
              🌍
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">
                {name.firstName} {name.lastName}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">Heritage analysis in progress</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Live</span>
          </div>
        </div>

        {/* Chat container */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-y-auto shadow-2xl">
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer…"
            disabled={isLoading}
            className="flex-1 bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500/50 text-sm disabled:opacity-40 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap"
          >
            Send →
          </button>
        </form>
      </div>
    </div>
  );
}
