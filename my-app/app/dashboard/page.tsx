"use client";

import { useState, useEffect, useRef } from "react";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfText, setPdfText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const updated = [...messages, { role: "user", content: input }];

    setMessages(updated);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updated,
        pdfText,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    let botText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const json = JSON.parse(line);

          if (json.response) {
            botText += json.response;

            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = {
                role: "assistant",
                content: botText,
              };
              return copy;
            });
          }
        } catch {}
      }
    }

    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPdfText(data.text);

    alert("PDF uploaded successfully");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100">

      {/* HEADER (CLEANED) */}
      <div className="p-5 text-center bg-white/70 backdrop-blur-xl border-b">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          AI Customer Support Assistant
        </h1>
        <p className="text-sm text-gray-600">
          Smart AI Support System
        </p>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            Start chatting with AI assistant
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm shadow-md ${
                m.role === "user"
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "bg-white/80 border border-gray-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm animate-pulse">
            AI is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 flex gap-2 bg-white/70 backdrop-blur-xl border-t">

        <input
          className="flex-1 p-3 border rounded-xl"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="text-sm"
        />

        <button
          onClick={sendMessage}
          className="px-5 bg-purple-500 text-white rounded-xl"
        >
          Send
        </button>

      </div>
    </div>
  );
}