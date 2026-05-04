import { NextRequest, NextResponse } from "next/server";
import { getSession, setSession } from "@/lib/sessionStore";
import { getClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { MOCK_QUESTIONS } from "@/lib/mockResponses";
import type { ConversationPhase } from "@/types";

export async function POST(req: NextRequest) {
  const { sessionId, userMessage }: { sessionId: string; userMessage: string } =
    await req.json();

  const session = getSession(sessionId);
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  session.messages.push({ role: "user", content: userMessage });
  session.turnCount += 1;

  let assistantMessage: string;
  let phase: ConversationPhase = "questioning";

  if (process.env.MOCK_AI === "true") {
    if (session.turnCount < MOCK_QUESTIONS.length) {
      assistantMessage = MOCK_QUESTIONS[session.turnCount];
    } else {
      assistantMessage = "Thank you — I have everything I need to analyse your heritage.";
      phase = "analysing";
    }
  } else {
    const client = getClient();
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `My name is ${session.name.firstName} ${session.name.lastName}.`,
        },
        ...session.messages,
      ],
    });
    const raw = res.content[0].type === "text" ? res.content[0].text : "";
    if (raw.includes("READY_FOR_ANALYSIS")) {
      assistantMessage = raw.replace(/READY_FOR_ANALYSIS\s*/g, "").trim() ||
        "Thank you — I have everything I need to analyse your heritage.";
      phase = "analysing";
    } else {
      assistantMessage = raw;
    }
  }

  session.messages.push({ role: "assistant", content: assistantMessage });
  setSession(session);

  return NextResponse.json({ assistantMessage, phase });
}
