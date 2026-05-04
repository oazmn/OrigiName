import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessionStore";
import { getClient } from "@/lib/anthropic";
import { SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/prompts";
import { parseAnalysis } from "@/lib/parseAnalysis";
import { MOCK_ANALYSIS } from "@/lib/mockResponses";

export async function POST(req: NextRequest) {
  const { sessionId }: { sessionId: string } = await req.json();
  const session = getSession(sessionId);
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  if (process.env.MOCK_AI === "true") {
    return NextResponse.json({ analysis: MOCK_ANALYSIS });
  }

  const client = getClient();
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: `My name is ${session.name.firstName} ${session.name.lastName}.`,
      },
      ...session.messages,
      { role: "user", content: buildAnalysisPrompt() },
    ],
  });

  const raw = res.content[0].type === "text" ? res.content[0].text : "{}";
  try {
    const analysis = parseAnalysis(raw);
    return NextResponse.json({ analysis });
  } catch {
    return NextResponse.json({ error: "Failed to parse analysis" }, { status: 500 });
  }
}
