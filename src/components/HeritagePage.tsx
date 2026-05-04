"use client";
import { useReducer, useCallback } from "react";
import NameInput from "./NameInput";
import ConversationPane from "./ConversationPane";
import ResultsPanel from "./ResultsPanel";
import type {
  ConversationPhase,
  ParsedName,
  ChatMessage,
  HeritageAnalysis,
} from "@/types";

interface State {
  phase: ConversationPhase;
  name: ParsedName | null;
  sessionId: string | null;
  messages: ChatMessage[];
  analysis: HeritageAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: "SUBMIT_NAME"; name: ParsedName }
  | { type: "SESSION_CREATED"; sessionId: string; firstMessage: string }
  | { type: "USER_SENT"; content: string }
  | { type: "AI_REPLIED"; content: string; phase: ConversationPhase }
  | { type: "ANALYSIS_DONE"; analysis: HeritageAnalysis }
  | { type: "ERROR"; error: string }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET" };

const initial: State = {
  phase: "idle",
  name: null,
  sessionId: null,
  messages: [],
  analysis: null,
  isLoading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBMIT_NAME":
      return { ...state, name: action.name, isLoading: true, error: null };
    case "SESSION_CREATED":
      return {
        ...state,
        phase: "questioning",
        sessionId: action.sessionId,
        messages: [{ role: "assistant", content: action.firstMessage }],
        isLoading: false,
      };
    case "USER_SENT":
      return {
        ...state,
        messages: [...state.messages, { role: "user", content: action.content }],
        isLoading: true,
      };
    case "AI_REPLIED":
      return {
        ...state,
        phase: action.phase,
        messages: [...state.messages, { role: "assistant", content: action.content }],
        isLoading: action.phase === "analysing",
      };
    case "ANALYSIS_DONE":
      return { ...state, phase: "done", analysis: action.analysis, isLoading: false };
    case "ERROR":
      return { ...state, isLoading: false, error: action.error };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

export default function HeritagePage() {
  const [state, dispatch] = useReducer(reducer, initial);

  const submitName = useCallback(async (name: ParsedName) => {
    dispatch({ type: "SUBMIT_NAME", name });
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      dispatch({ type: "SESSION_CREATED", sessionId: data.sessionId, firstMessage: data.firstMessage });
    } catch {
      dispatch({ type: "ERROR", error: "Failed to start session." });
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      dispatch({ type: "USER_SENT", content: text });
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: state.sessionId, userMessage: text }),
        });
        const data = await res.json();
        if (!res.ok || !data.assistantMessage) {
          dispatch({ type: "ERROR", error: data.error ?? "Something went wrong. Please try again." });
          return;
        }
        dispatch({ type: "AI_REPLIED", content: data.assistantMessage, phase: data.phase });
        if (data.phase === "analysing") {
          await runAnalysis(state.sessionId!);
        }
      } catch {
        dispatch({ type: "ERROR", error: "Failed to send message." });
      }
    },
    [state.sessionId]
  );

  async function runAnalysis(sessionId: string) {
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      dispatch({ type: "ANALYSIS_DONE", analysis: data.analysis });
    } catch {
      dispatch({ type: "ERROR", error: "Failed to produce analysis." });
    }
  }

  if (state.error) {
    const canRetry = state.phase === "questioning" && state.sessionId !== null;
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl">
          <div className="text-3xl mb-4">⚠️</div>
          <p className="text-red-400 mb-6 text-sm leading-relaxed">{state.error}</p>
          <div className="flex gap-3 justify-center">
            {canRetry && (
              <button
                onClick={() => dispatch({ type: "CLEAR_ERROR" })}
                className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
              >
                Try again
              </button>
            )}
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.phase === "idle") {
    return <NameInput onSubmit={submitName} />;
  }

  if (state.phase === "done" && state.analysis && state.name) {
    return (
      <ResultsPanel
        name={state.name}
        analysis={state.analysis}
        onReset={() => dispatch({ type: "RESET" })}
      />
    );
  }

  return (
    <ConversationPane
      name={state.name!}
      messages={state.messages}
      isLoading={state.isLoading}
      onSend={sendMessage}
    />
  );
}
