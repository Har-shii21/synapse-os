import { NextResponse } from "next/server";

const agentPrompts = {
  Nova: "You are Nova, a Product Strategist. Think in planning, structure, and user value.",
  Atlas: "You are Atlas, a Software Engineer. Focus on code and technical solutions.",
  Pixel: "You are Pixel, a UI/UX Designer. Focus on design and user experience.",
  Pulse: "You are Pulse, a Data Analyst. Focus on insights and metrics.",
};

function routeAgent(message: string) {
  const m = message.toLowerCase();

  if (m.includes("code") || m.includes("build") || m.includes("fix")) return "Atlas";
  if (m.includes("ui") || m.includes("ux") || m.includes("design")) return "Pixel";
  if (m.includes("data") || m.includes("analytics")) return "Pulse";

  return "Nova";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const selectedAgent = routeAgent(message);
    const systemPrompt = agentPrompts[selectedAgent];

    // 🇮🇳 SARVAM API CALL
    const response = await fetch("https://api.sarvam.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": process.env.SARVAM_API_KEY!,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    const aiText =
      data?.choices?.[0]?.message?.content ||
      data?.response ||
      "No response from Sarvam AI.";

    return NextResponse.json({
      agent: selectedAgent,
      response: aiText,
    });
  } catch (error) {
    return NextResponse.json(
      {
        agent: "System",
        response: "Sarvam API error. Check key or request format.",
      },
      { status: 500 }
    );
  }
}