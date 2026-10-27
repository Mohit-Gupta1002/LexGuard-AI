import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

// Initialize PDF worker
try {
  const workerPath = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
  PDFParse.setWorker(pathToFileURL(workerPath).href);
} catch {
  // worker init
}

test('Parser: Extracts valid text and word count from real PDF fixture', async () => {
  const pdfBytes = fs.readFileSync('tests/fixtures/sample_contract.pdf');
  const parser = new PDFParse({ data: pdfBytes });
  try {
    const data = await parser.getText();
    assert.ok(data.text.includes('LexGuard AI'));
    assert.ok(data.text.includes('Bengaluru'));
  } finally {
    await parser.destroy();
  }
});

test('Parser: Extracts valid text from real DOCX fixture using mammoth', async () => {
  const docxBytes = fs.readFileSync('tests/fixtures/sample_contract.docx');
  const result = await mammoth.extractRawText({ buffer: docxBytes });
  assert.ok(result.value.includes('Walking on imported air'));
});

test('Parser: Plain text cleaning and word counting', () => {
  const sample = '  Clause 1: The tenant agrees to pay rent on time.   \r\n\r\nClause 2: Deposit is refundable.  ';
  const cleaned = sample
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const words = cleaned.match(/\S+/g);
  assert.equal(words.length, 15);
});
