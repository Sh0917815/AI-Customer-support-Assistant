import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // FIX: import CommonJS module correctly
    const pdfParse = (await import("pdf-parse")).default || await import("pdf-parse");

    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await pdfParse(buffer);

    return NextResponse.json({
      text: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
