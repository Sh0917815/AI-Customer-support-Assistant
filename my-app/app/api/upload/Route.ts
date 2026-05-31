import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Dynamically import pdf-parse (CommonJS module)
    const pdf = (await import("pdf-parse")).default;

    // Get file data from request
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the PDF
    const result = await pdf(buffer);

    // Return extracted text
    return NextResponse.json({
      text: result.text,
    });
  } catch (error) {
    console.error("PDF parsing error:", error);

    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
