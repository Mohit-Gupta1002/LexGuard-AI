import { ContractAnalysis } from '@/types/contract';

export function triggerPrintReport(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

export function downloadReportAsJson(analysis: ContractAnalysis): void {
  if (typeof window === 'undefined') return;

  const jsonString = JSON.stringify(analysis, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const sanitizedTitle = analysis.title.replace(/[^a-zA-Z0-9_-]/g, '_');

  const a = document.createElement('a');
  a.href = url;
  a.download = `LexGuard_${sanitizedTitle}_Report.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadStandaloneReportHtml(analysis: ContractAnalysis): void {
  if (typeof window === 'undefined') return;

  const highPriority = analysis.findings.filter((f) => f.riskCategory === 'high');
  const mediumPriority = analysis.findings.filter((f) => f.riskCategory === 'medium');
  const otherPriority = analysis.findings.filter(
    (f) => f.riskCategory !== 'high' && f.riskCategory !== 'medium'
  );

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LexGuard AI Report — ${escapeHtml(analysis.title)}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 20px;
      margin-bottom: 25px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
    }
    .logo span { color: #2563eb; }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge-sample { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-high { background: #fee2e2; color: #991b1b; }
    .badge-medium { background: #fef3c7; color: #92400e; }
    .badge-low { background: #dbeafe; color: #1e40af; }
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    h2 {
      font-size: 18px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 25px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 15px;
    }
    .excerpt {
      background: #f1f5f9;
      border-left: 3px solid #3b82f6;
      padding: 10px 14px;
      font-family: monospace;
      font-size: 12px;
      font-style: italic;
      margin: 10px 0;
    }
    .alternative {
      background: #ecfdf5;
      border-left: 3px solid #10b981;
      padding: 10px 14px;
      font-size: 12px;
      margin: 10px 0;
    }
    .disclaimer {
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 14px;
      border-radius: 6px;
      font-size: 12px;
      color: #991b1b;
      margin-top: 40px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="padding: 8px 16px; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
      Print to PDF / Paper
    </button>
  </div>

  <div class="header">
    <div class="logo">LexGuard <span>AI</span> — Legal Decision Support</div>
    <div style="font-size: 13px; color: #64748b; margin-top: 4px;">
      Document: <strong>${escapeHtml(analysis.title)}</strong> | Date: ${new Date(analysis.analyzedAt).toLocaleDateString('en-IN')} | Jurisdiction: ${escapeHtml(analysis.jurisdiction)}
    </div>
    ${
      analysis.isSample
        ? '<div style="margin-top: 8px;"><span class="badge badge-sample">DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT</span></div>'
        : ''
    }
  </div>

  <div class="section">
    <h2>1. Executive Summary</h2>
    <div class="card">
      <p>${escapeHtml(analysis.executiveSummary.overview)}</p>
      <div style="margin-top: 10px; font-size: 13px;">
        <strong>Parties Identified:</strong> ${analysis.executiveSummary.partiesIdentified.map(escapeHtml).join('; ') || 'Not explicitly stated'}
      </div>
      <div style="margin-top: 6px; font-size: 13px;">
        <strong>Primary Purpose:</strong> ${escapeHtml(analysis.executiveSummary.apparentPurpose)}
      </div>
      <div style="margin-top: 10px;">
        <strong>Key Obligations:</strong>
        <ul>
          ${analysis.executiveSummary.primaryObligations.map((o) => `<li>${escapeHtml(o)}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>2. Key Contract Terms</h2>
    <div class="card">
      <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        <tr><td style="padding: 4px 0; width: 35%;"><strong>Rent / Compensation:</strong></td><td>${escapeHtml(analysis.keyTerms.financialTerms.rentOrCompensation || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Security Deposit:</strong></td><td>${escapeHtml(analysis.keyTerms.financialTerms.securityDeposit || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Term Duration:</strong></td><td>${escapeHtml(analysis.keyTerms.durationAndDates.termDuration || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Notice Period:</strong></td><td>${escapeHtml(analysis.keyTerms.terminationAndRenewal.noticePeriod || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Lock-in Period:</strong></td><td>${escapeHtml(analysis.keyTerms.durationAndDates.lockInPeriod || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Renewal Terms:</strong></td><td>${escapeHtml(analysis.keyTerms.terminationAndRenewal.renewalProvisions || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Liability & Indemnity:</strong></td><td>${escapeHtml(analysis.keyTerms.covenantsAndLiability.liabilityAndIndemnification || 'Not specified')}</td></tr>
        <tr><td style="padding: 4px 0;"><strong>Dispute Resolution:</strong></td><td>${escapeHtml(analysis.keyTerms.covenantsAndLiability.disputeResolutionAndJurisdiction || 'Not specified')}</td></tr>
      </table>
    </div>
  </div>

  <div class="section">
    <h2>3. Prioritized Clause Findings (${analysis.findings.length} Total)</h2>
    ${[...highPriority, ...mediumPriority, ...otherPriority]
      .map(
        (f) => `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3 style="margin: 0; font-size: 14px; color: #0f172a;">${escapeHtml(f.clauseTitle)}</h3>
          <span class="badge badge-${f.riskCategory}">${escapeHtml(f.riskCategory.toUpperCase())} ATTENTION</span>
        </div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Location: ${escapeHtml(f.location || 'Contract Body')}</div>
        <div class="excerpt">&ldquo;${escapeHtml(f.exactExcerpt)}&rdquo;</div>
        <div style="font-size: 13px; margin-top: 6px;"><strong>Plain-English Explanation:</strong> ${escapeHtml(f.plainEnglishExplanation)}</div>
        <div style="font-size: 13px; margin-top: 4px;"><strong>Potential Impact:</strong> ${escapeHtml(f.potentialPracticalConsequence)}</div>
        <div style="font-size: 13px; margin-top: 4px;"><strong>Suggested Action:</strong> ${escapeHtml(f.suggestedActionOrQuestion)}</div>
        ${
          f.suggestedAlternativeWording
            ? `<div class="alternative">
                <strong>Suggested Alternative Wording:</strong><br>
                &ldquo;${escapeHtml(f.suggestedAlternativeWording)}&rdquo;
                ${f.alternativeWordingTradeOff ? `<br><small><strong>Trade-off:</strong> ${escapeHtml(f.alternativeWordingTradeOff)}</small>` : ''}
              </div>`
            : ''
        }
      </div>
    `
      )
      .join('')}
  </div>

  ${
    analysis.negotiationChecklist && analysis.negotiationChecklist.length > 0
      ? `
  <div class="section">
    <h2>4. Negotiation Checklist</h2>
    ${analysis.negotiationChecklist
      .map(
        (item, idx) => `
      <div class="card" style="margin-bottom: 10px;">
        <strong>${idx + 1}. ${escapeHtml(item.item)}</strong><br>
        <span style="font-style: italic; color: #334155;">&ldquo;${escapeHtml(item.suggestedQuestionToCounterparty)}&rdquo;</span><br>
        <small style="color: #64748b;">Why ask: ${escapeHtml(item.rationale)}</small>
      </div>
    `
      )
      .join('')}
  </div>
  `
      : ''
  }

  ${
    analysis.questionsForLawyer && analysis.questionsForLawyer.length > 0
      ? `
  <div class="section">
    <h2>5. Questions to Discuss with an Indian Advocate</h2>
    <div class="card">
      <ol style="margin: 0; padding-left: 20px;">
        ${analysis.questionsForLawyer.map((q) => `<li>${escapeHtml(q)}</li>`).join('')}
      </ol>
    </div>
  </div>
  `
      : ''
  }

  <div class="disclaimer">
    <strong>LEGAL NOTICE & LIMITATIONS:</strong><br>
    ${escapeHtml(analysis.sourceNotesAndLimitations?.disclaimer || 'LexGuard AI is an informational decision-support tool, not a law firm or a substitute for professional legal counsel.')}
    <p style="margin-top: 6px; font-size: 11px;">
      LexGuard AI does not provide formal legal advice, guarantee legal enforceability in court, or create an attorney-client relationship. For binding advice, always consult a qualified advocate licensed in the relevant Indian jurisdiction.
    </p>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const sanitizedTitle = analysis.title.replace(/[^a-zA-Z0-9_-]/g, '_');

  const a = document.createElement('a');
  a.href = url;
  a.download = `LexGuard_${sanitizedTitle}_Report.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
