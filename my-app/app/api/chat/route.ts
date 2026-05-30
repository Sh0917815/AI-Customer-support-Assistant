export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages, pdfText } = await req.json();

    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1",
        stream: true,
        messages: [
          {
            role: "system",
            content: pdfText
              ? `You are a helpful SaaS customer support assistant. Use this document:\n\n${pdfText}`
              : "You are a helpful SaaS customer support assistant. Be clear and professional.",
          },
          ...messages,
        ],
      }),
    });

    if (!res.body) return new Response("No stream", { status: 500 });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            try {
              const json = JSON.parse(line);
              const content = json.message?.content;

              if (content) {
                controller.enqueue(
                  new TextEncoder().encode(
                    JSON.stringify({ response: content }) + "\n"
                  )
                );
              }
            } catch {}
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}