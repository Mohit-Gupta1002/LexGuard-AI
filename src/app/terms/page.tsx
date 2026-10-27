import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Scale, AlertTriangle, ShieldCheck, CheckSquare } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-900/40 px-2.5 py-1 rounded-md">
            <Scale className="w-3.5 h-3.5" />
            <span>Product Terms & Legal Disclaimers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Use & Limitations
          </h1>
          <p className="text-sm text-slate-400">
            Please read these terms carefully before using LexGuard AI.
          </p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              1. Not Legal Advice & No Attorney-Client Relationship
            </h2>
            <p>
              LexGuard AI is an automated, software-based decision-support and educational tool designed to assist Indian consumers, tenants, employees, and small businesses in understanding contract terminology.
            </p>
            <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs font-medium">
              CRITICAL NOTICE: LexGuard AI is NOT a law firm, does NOT practice law, does NOT solicit legal business, and does NOT provide formal legal advice. Using LexGuard AI does NOT create an advocate-client relationship or any fiduciary duty.
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              2. Nature of Risk Categories & AI Evaluations
            </h2>
            <p>
              The labels &quot;High Attention&quot;, &quot;Medium Attention&quot;, and &quot;Low Attention&quot; generated in our reports represent preliminary review priorities designed to assist users in identifying clauses that may deserve closer inspection or counterparty negotiation.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
              <li>They are not formal legal opinions or predictions of litigation outcomes.</li>
              <li>A clause flagged as high attention is not guaranteed to be legally void or unlawful.</li>
              <li>An absence of a risk flag does not guarantee that a contract is safe, fair, or enforceable.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              3. Independent Verification with an Advocate
            </h2>
            <p>
              Under the Advocates Act 1961 and the Bar Council of India regulations, only duly qualified and enrolled legal practitioners are authorized to tender legal opinions and represent clients. You are strongly advised to seek independent legal advice from a practicing Indian advocate licensed in your specific state jurisdiction before signing any binding document.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              4. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted under applicable Indian law, LexGuard AI, its developers, operators, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your reliance on automated contract summaries, clause categorizations, or checklist questions.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and your use of LexGuard AI shall be governed by and construed in accordance with the laws of the Republic of India.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
