import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { setSession } from "@/lib/sessionStore";
import { getClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { MOCK_QUESTIONS } from "@/lib/mockResponses";
import type { ParsedName } from "@/types";

export async function POST(req: NextRequest) {
  const { name }: { name: ParsedName } = await req.json();
  const sessionId = uuid();

  const firstMessage =
    process.env.MOCK_AI === "true"
      ? MOCK_QUESTIONS[0]
      : await getRealFirstMessage(name);

  setSession({
    id: sessionId,
    name,
    messages: [{ role: "assistant", content: firstMessage }],
    turnCount: 0,
    createdAt: Date.now(),
  });

  return NextResponse.json({ sessionId, firstMessage });
}

async function getRealFirstMessage(name: ParsedName): Promise<string> {
  const client = getClient();
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [
      { role: "user", content: `My name is ${name.firstName} ${name.lastName}.` },
    ],
  });
  return res.content[0].type === "text" ? res.content[0].text : "";
}
