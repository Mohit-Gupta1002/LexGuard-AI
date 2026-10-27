import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/parsers/extract';

// 10MB maximum file size limit
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No valid file uploaded. Please upload a PDF, DOCX, or TXT document.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds the 10 MB limit. Please upload a smaller document.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = (file as File).name || 'document.pdf';
    const mimeType = file.type || 'application/pdf';

    const result = await extractTextFromFile(buffer, fileName, mimeType);

    return NextResponse.json({
      success: true,
      text: result.text,
      wordCount: result.wordCount,
      characterCount: result.characterCount,
      pageCount: result.pageCount,
      format: result.format,
      fileName,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to extract text from document';
    console.error('Document extraction error:', message);
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
