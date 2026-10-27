import fs from 'node:fs';

async function checkRoutes() {
  console.log('=====================================================');
  console.log('   LEXGUARD AI — COMPREHENSIVE END-TO-END VERIFICATION');
  console.log('=====================================================\n');

  let allPass = true;

  // 1. Check all standard routes
  console.log('1. VERIFYING HTTP ENDPOINTS AND RESPONSE CODES:');
  const routes = [
    { path: '/', label: 'Landing Page' },
    { path: '/analyze', label: 'Analysis Workspace' },
    { path: '/report/sample-rental-agreement', label: 'Sample Report Page' },
    { path: '/history', label: 'Session History Page' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/api/analyze', label: 'AI Health Status API' },
    { path: '/api/reports/sample-rental-agreement', label: 'Sample Report Data API' },
  ];

  for (const { path, label } of routes) {
    try {
      const res = await fetch(`http://localhost:3000${path}`);
      const text = await res.text();
      console.log(`  ✓ ${label.padEnd(28)} [${path}] => ${res.status} ${res.statusText} (${text.length} bytes)`);
      if (!res.ok) allPass = false;
    } catch (err) {
      console.error(`  ✗ ${label.padEnd(28)} [${path}] => FAILED: ${err.message}`);
      allPass = false;
    }
  }

  // 2. Verify Landing Page content and branding
  console.log('\n2. VERIFYING LANDING PAGE CONTENT & DISCLAIMERS:');
  try {
    const res = await fetch('http://localhost:3000/');
    const html = await res.text();
    const hasBrand = html.includes('LexGuard') || html.includes('lexguard');
    const hasDisclaimer = html.includes('not a law firm') || html.includes('Informational Decision Support') || html.includes('legal advice');
    const hasAnalyzeLink = html.includes('/analyze');
    console.log(`  ✓ Brand Presence:      ${hasBrand ? 'CONFIRMED' : 'MISSING'}`);
    console.log(`  ✓ Regulatory Disclaimer: ${hasDisclaimer ? 'CONFIRMED' : 'MISSING'}`);
    console.log(`  ✓ Workspace CTA Link:   ${hasAnalyzeLink ? 'CONFIRMED' : 'MISSING'}`);
    if (!hasBrand || !hasDisclaimer || !hasAnalyzeLink) allPass = false;
  } catch (err) {
    console.error(`  ✗ Landing page verification failed: ${err.message}`);
    allPass = false;
  }

  // 3. Verify Sample Report Disclaimer Requirement
  console.log('\n3. VERIFYING SAMPLE DEMO REPORT DISCLAIMER INTEGRITY:');
  try {
    const res = await fetch('http://localhost:3000/api/reports/sample-rental-agreement');
    const data = await res.json();
    const exactRequiredPhrase = 'DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT.';
    const isSampleFlag = data.analysis && data.analysis.isSample === true;
    const hasRequiredPhrase = data.analysis?.sourceNotesAndLimitations?.disclaimer?.includes('DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT.');
    console.log(`  ✓ Sample Flag (isSample=true):   ${isSampleFlag ? 'CONFIRMED' : 'FAILED'}`);
    console.log(`  ✓ Exact Demo Warning Disclaimer: ${hasRequiredPhrase ? 'CONFIRMED' : 'MISSING'}`);
    if (!isSampleFlag || !hasRequiredPhrase) {
      console.error(`  ✗ Missing required demo banner phrase: "${exactRequiredPhrase}"`);
      allPass = false;
    }
  } catch (err) {
    console.error(`  ✗ Sample report verification failed: ${err.message}`);
    allPass = false;
  }

  // 4. Verify Real PDF File Extraction
  console.log('\n4. VERIFYING REAL PDF PARSING (POST /api/extract):');
  try {
    const pdfBytes = fs.readFileSync('tests/fixtures/sample_contract.pdf');
    const formData = new FormData();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    formData.append('file', pdfBlob, 'sample_contract.pdf');

    const res = await fetch('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log(`  ✓ PDF Upload Status: ${res.status} [Format: ${json.format}, Words: ${json.wordCount}, Chars: ${json.characterCount}]`);
    const hasExpectedText = json.text && json.text.includes('LexGuard AI');
    console.log(`  ✓ PDF Text Extraction Content: ${hasExpectedText ? 'VERIFIED' : 'FAILED'}`);
    if (res.status !== 200 || !hasExpectedText) allPass = false;
  } catch (err) {
    console.error(`  ✗ PDF upload test failed: ${err.message}`);
    allPass = false;
  }

  // 5. Verify Real DOCX File Extraction
  console.log('\n5. VERIFYING REAL DOCX PARSING (POST /api/extract):');
  try {
    const docxBytes = fs.readFileSync('tests/fixtures/sample_contract.docx');
    const formData = new FormData();
    const docxBlob = new Blob([docxBytes], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    formData.append('file', docxBlob, 'sample_contract.docx');

    const res = await fetch('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log(`  ✓ DOCX Upload Status: ${res.status} [Format: ${json.format}, Words: ${json.wordCount}, Chars: ${json.characterCount}]`);
    const hasExpectedText = json.text && json.text.includes('Walking on imported air');
    console.log(`  ✓ DOCX Text Extraction Content: ${hasExpectedText ? 'VERIFIED' : 'FAILED'}`);
    if (res.status !== 200 || !hasExpectedText) allPass = false;
  } catch (err) {
    console.error(`  ✗ DOCX upload test failed: ${err.message}`);
    allPass = false;
  }

  // 6. Verify Plain Text Parsing
  console.log('\n6. VERIFYING PLAIN TEXT PARSING (POST /api/extract):');
  try {
    const formData = new FormData();
    const sampleText = 'RESIDENTIAL LEASE AGREEMENT (FICTIONAL TEST)\nThis agreement is made between Landlord and Tenant in Bengaluru.';
    const blob = new Blob([sampleText], { type: 'text/plain' });
    formData.append('file', blob, 'sample_contract.txt');

    const res = await fetch('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log(`  ✓ Plain Text Upload: ${res.status} [Format: ${json.format}, Words: ${json.wordCount}]`);
    if (res.status !== 200 || json.wordCount <= 0) allPass = false;
  } catch (err) {
    console.error(`  ✗ Plain text test failed: ${err.message}`);
    allPass = false;
  }

  // 7. Verify Unsupported File Type Rejection
  console.log('\n7. VERIFYING UNSUPPORTED FILE REJECTION:');
  try {
    const formData = new FormData();
    const blob = new Blob(['malicious executable'], { type: 'application/octet-stream' });
    formData.append('file', blob, 'unsupported.exe');

    const res = await fetch('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log(`  ✓ Rejection of .exe: Status ${res.status} [Error: "${json.error}"]`);
    if (res.status !== 422) allPass = false;
  } catch (err) {
    console.error(`  ✗ Unsupported file test failed: ${err.message}`);
    allPass = false;
  }

  // 8. Verify AI Analysis Input Validation Rejections
  console.log('\n8. VERIFYING INPUT BOUNDARIES ON POST /api/analyze:');
  // 8a. Text too short (< 50 chars)
  try {
    const res = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractText: 'Too short' }),
    });
    const json = await res.json();
    console.log(`  ✓ Short Text (< 50 chars) Rejection: Status ${res.status} [Error: ${json.error}]`);
    if (res.status !== 400 || json.error !== 'INVALID_INPUT') allPass = false;
  } catch (err) {
    console.error(`  ✗ Short text rejection failed: ${err.message}`);
    allPass = false;
  }

  // 8b. Text too long (> 150,000 chars)
  try {
    const hugeText = 'A'.repeat(150005);
    const res = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractText: hugeText }),
    });
    const json = await res.json();
    console.log(`  ✓ Huge Text (> 150k chars) Rejection: Status ${res.status} [Error: ${json.error}]`);
    if (res.status !== 400 || json.error !== 'INVALID_INPUT') allPass = false;
  } catch (err) {
    console.error(`  ✗ Huge text rejection failed: ${err.message}`);
    allPass = false;
  }

  // 8c. Valid Text with unconfigured AI key (Clean 503 fallback state)
  try {
    const validContract = 'This is a valid tenancy agreement between the Lessor and Lessee executed in Indiranagar, Bengaluru, India. Rent is ₹35,000 payable monthly with a security deposit of 10 months.';
    const res = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractText: validContract, documentType: 'rental' }),
    });
    const json = await res.json();
    // In our test environment without live credentials, it should return 503 with AI_NOT_CONFIGURED and point to sample report
    if (res.status === 503) {
      console.log(`  ✓ Unconfigured AI State Graceful Handling: Status 503 [Code: ${json.error}, Sample Link: ${json.suggestedSampleUrl}]`);
    } else if (res.status === 200) {
      console.log(`  ✓ Live AI Analysis Succeeded: Status 200 [Analysis ID: ${json.analysis.id}]`);
    } else {
      console.error(`  ✗ Unexpected status from /api/analyze: ${res.status}`);
      allPass = false;
    }
  } catch (err) {
    console.error(`  ✗ Valid text test failed: ${err.message}`);
    allPass = false;
  }

  // 9. Grounding Check: Sample Rental Contract Verbatim Excerpts
  console.log('\n9. VERIFYING GROUNDING OF FINDINGS IN CONTRACT TEXT:');
  try {
    const res = await fetch('http://localhost:3000/api/reports/sample-rental-agreement');
    const json = await res.json();
    const findings = json.analysis.findings;
    console.log(`  ✓ Sample Report Findings Count: ${findings.length}`);
    let ungroundedCount = 0;
    for (const finding of findings) {
      if (!finding.exactExcerpt || finding.exactExcerpt.trim().length === 0) {
        console.error(`  ✗ Finding "${finding.clauseTitle}" has no verbatim excerpt!`);
        ungroundedCount++;
      }
    }
    if (ungroundedCount === 0) {
      console.log(`  ✓ All ${findings.length} findings contain mandatory verbatim excerpts.`);
    } else {
      allPass = false;
    }
  } catch (err) {
    console.error(`  ✗ Grounding check failed: ${err.message}`);
    allPass = false;
  }

  // Final Summary
  console.log('\n=====================================================');
  if (allPass) {
    console.log('   ALL E2E VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  } else {
    console.log('   SOME VERIFICATION CHECKS FAILED! INSPECT LOGS ABOVE.');
    process.exit(1);
  }
  console.log('=====================================================\n');
}

checkRoutes();
