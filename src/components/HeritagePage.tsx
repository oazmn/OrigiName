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
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{state.error}</p>
          <button onClick={() => dispatch({ type: "RESET" })} className="text-slate-400 underline text-sm">
            Start over
          </button>
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
