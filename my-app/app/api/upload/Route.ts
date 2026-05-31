import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Dynamically import pdf-parse safely
    const pdf = await import("pdf-parse").then(m => m.default ?? m);

    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await pdf(buffer);

    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("PDF ERROR:", error);
    return NextResponse.json({ error: "PDF parsing failed" }, { status: 500 });
  }
}
