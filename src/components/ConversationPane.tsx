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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg flex flex-col" style={{ height: "80vh" }}>
        <div className="text-center mb-4">
          <p className="text-slate-400 text-sm">
            Analysing{" "}
            <span className="text-white font-medium">
              {name.firstName} {name.lastName}
            </span>
          </p>
        </div>
        <div className="flex-1 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 overflow-y-auto">
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSend} className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer…"
            disabled={isLoading}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
