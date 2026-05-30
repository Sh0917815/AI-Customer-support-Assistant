export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, pdfText } = await req.json();

    const systemPrompt = pdfText
      ? `You are a helpful SaaS customer support assistant. Use this document as context:\n\n${pdfText}`
      : "You are a helpful SaaS customer support assistant. Be clear, professional, and helpful.";

    const userMessage = messages[messages.length - 1]?.content || "";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "Sorry, I couldn't generate a response.";

    // Simulated streaming (Hugging Face does NOT stream natively)
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        const words = text.split(" ");

        let i = 0;

        const interval = setInterval(() => {
          if (i < words.length) {
            controller.enqueue(
              encoder.encode(
                JSON.stringify({ response: words[i] + " " }) + "\n"
              )
            );
            i++;
          } else {
            clearInterval(interval);
            controller.close();
          }
        }, 30); // typing speed
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
