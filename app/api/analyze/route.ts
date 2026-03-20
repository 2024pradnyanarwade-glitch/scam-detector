import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: string = body.message;

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a scam detection expert. Analyze this message and respond ONLY with a JSON object — no extra text, no markdown, no code blocks. Use exactly this format:
{"level":"High","reason":"one sentence","advice":"one sentence"}

level must be exactly one of: High, Medium, Low

Message: "${message}"`,
        },
      ],
    });

    const text = (response.content[0] as { type: string; text: string }).text;
    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
