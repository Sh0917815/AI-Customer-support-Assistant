import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const pdfParse = (await import("pdf-parse")).default;

    const buffer = Buffer.from(await req.arrayBuffer());

    const data = await pdfParse(buffer);

    return NextResponse.json({ text: data.text });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
