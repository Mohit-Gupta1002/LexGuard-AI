import fs from 'node:fs';

function generateValidPdf(text) {
  const chunks = [];
  
  const header = '%PDF-1.4\n';
  chunks.push(header);
  
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';
  
  const streamContent = `BT\n/F1 14 Tf\n50 700 Td\n(${text}) Tj\nET\n`;
  const streamLen = Buffer.byteLength(streamContent, 'utf-8');
  const obj4 = `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}endstream\nendobj\n`;
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';
  
  const objs = [obj1, obj2, obj3, obj4, obj5];
  const offsets = [];
  
  let currentOffset = Buffer.byteLength(header, 'utf-8');
  for (const obj of objs) {
    offsets.push(currentOffset);
    chunks.push(obj);
    currentOffset += Buffer.byteLength(obj, 'utf-8');
  }
  
  const startXref = currentOffset;
  
  let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \r\n`;
  for (const offset of offsets) {
    const padded = String(offset).padStart(10, '0');
    xref += `${padded} 00000 n \r\n`;
  }
  chunks.push(xref);
  
  const trailer = `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  chunks.push(trailer);
  
  return Buffer.from(chunks.join(''), 'binary');
}

const pdfBuf = generateValidPdf('LexGuard AI Residential Lease Agreement Bengaluru Validation PDF');
fs.writeFileSync('tests/fixtures/sample_contract.pdf', pdfBuf);
console.log('Generated tests/fixtures/sample_contract.pdf of size', pdfBuf.length);
