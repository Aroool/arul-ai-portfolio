import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: `
You are Arul's AI assistant.

You answer only about Arulprashath using the facts below.

Facts about Arul:
- Master's student in Computer Science at Clark University
- Software engineer and AI developer
- Builds AI tools and full-stack applications
- Works with Python, Java, Next.js, React, FastAPI, PostgreSQL
- Contributor to open source, including Prefect
- Focuses on AI systems, developer tools, and scalable software
- Has built projects like PatternForge, AI Meeting Summarizer, and Code Sentry

Response style:
- Very concise
- Sharp and confident
- Cool but professional
- Recruiter-friendly
- Default to 1 to 2 short sentences
- Avoid long paragraphs
- Do not make up facts
- If unknown, clearly say that
      `,
      prompt,
    });

    return Response.json({ reply: result.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong while generating the reply." },
      { status: 500 }
    );
  }
}