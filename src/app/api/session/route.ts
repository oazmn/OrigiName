import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { setSession } from "@/lib/sessionStore";
import { getClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { MOCK_QUESTIONS } from "@/lib/mockResponses";
import type { ParsedName, ConversationPhase } from "@/types";

function buildNameString(name: ParsedName): string {
  return [name.firstName, ...(name.middleNames ?? []), name.lastName].join(" ");
}

export async function POST(req: NextRequest) {
  const { name }: { name: ParsedName } = await req.json();
  const sessionId = uuid();

  let firstMessage: string;
  let phase: ConversationPhase = "questioning";

  if (process.env.MOCK_AI === "true") {
    firstMessage = MOCK_QUESTIONS[0];
  } else {
    const raw = await getRawFirstMessage(name);
    if (raw.includes("READY_FOR_ANALYSIS")) {
      firstMessage =
        raw.replace(/READY_FOR_ANALYSIS\s*/g, "").trim() ||
        "Ready to analyse your heritage.";
      phase = "analysing";
    } else {
      firstMessage = raw;
    }
  }

  setSession({
    id: sessionId,
    name,
    messages: [{ role: "assistant", content: firstMessage }],
    turnCount: 0,
    createdAt: Date.now(),
  });

  return NextResponse.json({ sessionId, firstMessage, phase });
}

async function getRawFirstMessage(name: ParsedName): Promise<string> {
  const client = getClient();
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [
      { role: "user", content: `My name is ${buildNameString(name)}.` },
    ],
  });
  return res.content[0].type === "text" ? res.content[0].text : "";
}
