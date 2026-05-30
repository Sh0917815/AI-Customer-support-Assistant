import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);

    return NextResponse.json({
      text: data.text,
    });
  } catch {
    return NextResponse.json(
      { error: "PDF parsing failed" },
      { status: 500 }
    );
  }
}