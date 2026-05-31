import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const pdfParse = (await import("pdf-parse")) as any;

    const buffer = Buffer.from(await req.arrayBuffer());

    const result = await pdfParse(buffer);

    return NextResponse.json({
      text: result.text,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "PDF parsing failed" },
      { status: 500 }
    );
  }
}
