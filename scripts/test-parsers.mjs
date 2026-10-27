import fs from 'node:fs';
import { extractTextFromFile } from '../src/lib/parsers/extract.ts';

async function runTests() {
  console.log('--- TESTING FILE PARSERS DIRECTLY ---');

  // 1. Test PDF
  const pdfBuffer = fs.readFileSync('tests/fixtures/sample_contract.pdf');
  const pdfResult = await extractTextFromFile(pdfBuffer, 'contract.pdf', 'application/pdf');
  console.log('PDF Result:', {
    format: pdfResult.format,
    wordCount: pdfResult.wordCount,
    textPreview: pdfResult.text.substring(0, 60),
  });
  if (!pdfResult.text.includes('LexGuard AI')) {
    throw new Error('PDF extraction failed to retrieve text content');
  }
  console.log('✓ PDF extraction passed');

  // 2. Test DOCX
  const docxBuffer = fs.readFileSync('tests/fixtures/sample_contract.docx');
  const docxResult = await extractTextFromFile(
    docxBuffer,
    'contract.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  console.log('DOCX Result:', {
    format: docxResult.format,
    wordCount: docxResult.wordCount,
    textPreview: docxResult.text.substring(0, 60),
  });
  if (!docxResult.text.includes('Walking on imported air')) {
    throw new Error('DOCX extraction failed to retrieve text content');
  }
  console.log('✓ DOCX extraction passed');

  // 3. Test TXT
  const txtBuffer = Buffer.from('LexGuard AI Plain Text Contract Agreement For Testing Purposes Only');
  const txtResult = await extractTextFromFile(txtBuffer, 'contract.txt', 'text/plain');
  console.log('TXT Result:', {
    format: txtResult.format,
    wordCount: txtResult.wordCount,
    textPreview: txtResult.text.substring(0, 60),
  });
  if (!txtResult.text.includes('LexGuard AI')) {
    throw new Error('TXT extraction failed to retrieve text content');
  }
  console.log('✓ TXT extraction passed');

  console.log('\nAll 3 file parsers (PDF, DOCX, TXT) function correctly!');
}

runTests().catch((err) => {
  console.error('Extraction test error:', err);
  process.exit(1);
});
