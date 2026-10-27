import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Ensure PDF worker is resolved explicitly inside Next.js server bundle
try {
  const workerPath = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
  PDFParse.setWorker(pathToFileURL(workerPath).href);
} catch {
  // worker initialization fallback
}

export interface ExtractionResult {
  text: string;
  wordCount: number;
  characterCount: number;
  pageCount?: number;
  format: 'pdf' | 'docx' | 'text';
}

export async function extractTextFromFile(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<ExtractionResult> {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith('.pdf') || mimeType === 'application/pdf') {
    const parser = new PDFParse({ data: fileBuffer });
    try {
      const data = await parser.getText();
      const text = cleanText(data.text);

      if (!text || text.trim().length === 0) {
        throw new Error(
          'The uploaded PDF appears to be empty or contains only scanned images without an embedded text layer (OCR). Please upload a text-based PDF or paste the contract text directly.'
        );
      }

      const wordCount = countWords(text);
      return {
        text,
        wordCount,
        characterCount: text.length,
        pageCount: data.total,
        format: 'pdf',
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('Password') || message.includes('encrypted')) {
        throw new Error('This PDF is password-protected or encrypted. Please remove password protection before uploading.');
      }
      if (message.includes('scanned') || message.includes('empty')) {
        throw err;
      }
      throw new Error(`Failed to extract text from PDF: ${message}`);
    } finally {
      try {
        await parser.destroy();
      } catch {
        // ignore cleanup error
      }
    }
  }

  if (
    lowerName.endsWith('.docx') ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      const text = cleanText(result.value);

      if (!text || text.trim().length === 0) {
        throw new Error(
          'The uploaded Word document (.docx) appears to be empty. Please ensure the document contains text content.'
        );
      }

      const wordCount = countWords(text);
      return {
        text,
        wordCount,
        characterCount: text.length,
        format: 'docx',
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('empty')) throw err;
      throw new Error(`Failed to extract text from Word document (.docx): ${message}`);
    }
  }

  if (lowerName.endsWith('.txt') || mimeType === 'text/plain') {
    const text = cleanText(fileBuffer.toString('utf-8'));
    if (!text || text.trim().length === 0) {
      throw new Error('The text file is empty. Please provide contract content.');
    }
    return {
      text,
      wordCount: countWords(text),
      characterCount: text.length,
      format: 'text',
    };
  }

  throw new Error(
    `Unsupported file type "${fileName}". Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) file.`
  );
}

export function cleanText(rawText: string): string {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function countWords(text: string): number {
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}
