import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // SAFE import for Cloudflare + Next.js
    const pdfParseModule = await import("pdf-parse");
    const pdf = pdfParseModule.default || pdfParseModule;

    const buffer = Buffer.from(await req.arrayBuffer());

    const result = await pdf(buffer);

    return NextResponse.json({
      text: result.text,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "PDF parsing failed" },
      { status: 500 }
    );
  }
}
