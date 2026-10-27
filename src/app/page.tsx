'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { RiskBadge } from '@/components/RiskBadge';
import {
  Shield,
  ArrowRight,
  FileText,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ExternalLink,
  Clock,
} from 'lucide-react';

export default function LandingPage() {
  const [activeDemoTab, setActiveDemoTab] = useState<'rental' | 'employment'>('rental');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1">
        {/* Top Disclaimer Notification */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <DisclaimerBanner variant="compact" />
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-600/40 text-blue-300 text-xs font-medium">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Next-Gen Indian LegalTech Contract Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                Know what you&apos;re <span className="text-blue-400">signing</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
                Turn complex contracts into clear explanations, potential risk flags, and actionable next steps before you commit.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/analyze"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Analyze a Contract</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/report/sample-rental-agreement"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-medium text-sm bg-slate-900/60 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Explore a Sample Report</span>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Mandatory Login
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ephemeral Processing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Indian Legal Context Default
                </span>
              </div>
            </div>

            {/* INTERACTIVE DEMONSTRATION PREVIEW */}
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Demo Header */}
                <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      Live Analysis Preview
                    </span>
                  </div>

                  {/* Switch between demo tabs */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setActiveDemoTab('rental')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeDemoTab === 'rental'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Rental Lease (Bengaluru)
                    </button>
                    <button
                      onClick={() => setActiveDemoTab('employment')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeDemoTab === 'employment'
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Employment & Bond
                    </button>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Fictional demo notice tag */}
                  <div className="flex items-center justify-between text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-lg">
                    <span className="font-mono uppercase font-semibold text-[11px]">
                      DEMONSTRATION PREVIEW — FICTIONAL CLAUSE EXTRACT
                    </span>
                    <Link
                      href="/report/sample-rental-agreement"
                      className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      View Full Report <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  {activeDemoTab === 'rental' ? (
                    <div className="space-y-4">
                      {/* Flagged Clause Card */}
                      <div className="bg-slate-900/90 border border-rose-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <RiskBadge category="high" size="sm" />
                            <span className="text-xs font-mono text-slate-400">Clause 3 (Security Deposit)</span>
                          </div>
                          <span className="text-xs text-rose-400 font-semibold">
                            Deposit Retention Risk
                          </span>
                        </div>

                        <div className="bg-slate-950/80 p-3 rounded border border-slate-800 text-xs font-mono text-slate-300 italic border-l-2 border-l-rose-500">
                          &ldquo;...Lessor shall automatically deduct one full month&apos;s rent (INR 35,000/-) from the security deposit towards professional deep cleaning and painting charges, irrespective of the actual condition of the walls or duration of stay...&rdquo;
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                            <strong className="text-slate-200 block mb-0.5">Plain-English Impact:</strong>
                            <span className="text-slate-400">
                              You will lose ₹35,000 upon vacating even if you leave the walls flawless and clean.
                            </span>
                          </div>
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                            <strong className="text-blue-300 block mb-0.5">Suggested Action:</strong>
                            <span className="text-slate-400">
                              Propose deductions only for verified damage beyond normal wear and tear with actual vendor quotes.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Second preview item */}
                      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <RiskBadge category="medium" size="sm" />
                          <span className="text-slate-300 font-medium">
                            Asymmetric 3 Months Notice vs 15 Days Landlord Eviction
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono hidden sm:inline">Clause 5</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Flagged Employment Clause Card */}
                      <div className="bg-slate-900/90 border border-rose-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <RiskBadge category="high" size="sm" />
                            <span className="text-xs font-mono text-slate-400">Clause 5 (Restraint of Trade)</span>
                          </div>
                          <span className="text-xs text-rose-400 font-semibold">
                            Section 27 Indian Contract Act Risk
                          </span>
                        </div>

                        <div className="bg-slate-950/80 p-3 rounded border border-slate-800 text-xs font-mono text-slate-300 italic border-l-2 border-l-rose-500">
                          &ldquo;...The Employee agrees that for 2 years following termination, the Employee shall not work for or engage directly or indirectly with any competitor or software firm anywhere in India...&rdquo;
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                            <strong className="text-slate-200 block mb-0.5">Indian Legal Standing:</strong>
                            <span className="text-slate-400">
                              Under Section 27 of the Indian Contract Act 1872, post-employment non-compete agreements are void in India as unlawful restraints of trade.
                            </span>
                          </div>
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                            <strong className="text-blue-300 block mb-0.5">Practical Consequence:</strong>
                            <span className="text-slate-400">
                              While legally void, employers often use this clause to withhold experience letters or threaten legal notices.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Second preview item */}
                      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <RiskBadge category="high" size="sm" />
                          <span className="text-slate-300 font-medium">
                            Mandatory ₹3,00,000 Training Bond & Certificate Retention
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono hidden sm:inline">Clause 3</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM & SOLUTION SECTION */}
        <section className="py-16 md:py-24 border-t border-slate-800/80 bg-[#070A10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold font-mono">
                The Reality of Signing Legal Documents
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Dense legalese hides clauses that cost you money and peace of mind
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Unilateral Termination & Lock-ins</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Agreements often lock you into 3-month notice periods while letting the counterparty terminate in 15 days, or impose severe double-penalty forfeitures during early exits.
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Arbitrary Deductions & Bonds</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  From mandatory 1-month rental painting deductions to multi-year employment training bonds and certificate withholding, one-sided clauses penalize individuals.
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Ambiguous Omissions</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Contracts frequently omit critical terms like signed move-in inventories, utility reconciliation timelines, or force majeure rent suspensions during urban floods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section id="features" className="py-16 md:py-24 border-t border-slate-800/80 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold font-mono">
                Engineered for Legal Clarity
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Comprehensive Contract Intelligence
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Grounded strictly in your document text without fabricated citations or fake scores.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-950/60 border border-blue-800/40 rounded-lg text-blue-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Executive Summarization</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extracts identified parties, apparent purpose, and primary obligations in concise, accessible English.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-rose-950/60 border border-rose-800/40 rounded-lg text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Clause-by-Clause Audit</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluates provisions with exact verbatim excerpts, real-world practical consequences, and confidence ratings.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-950/60 border border-amber-800/40 rounded-lg text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Key Terms Extraction</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pinpoints security deposit figures, rent schedules, lock-in duration, notice windows, and renewal terms.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-950/60 border border-emerald-800/40 rounded-lg text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Negotiation Scripts</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generates practical, polite questions to propose amendments or clarify ambiguities with counterparties.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-950/60 border border-indigo-800/40 rounded-lg text-indigo-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Questions for an Advocate</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curates specific high-stakes questions to bring to a qualified Indian lawyer to optimize consultation time.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-violet-950/60 border border-violet-800/40 rounded-lg text-violet-400">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Exportable Reports</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Print-ready, clean PDF export formatting with complete clause breakdowns and disclaimers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-16 md:py-24 border-t border-slate-800/80 bg-[#070A10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold font-mono">
                Streamlined Workflow
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                How LexGuard AI Works
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Upload or Paste',
                  desc: 'Provide a PDF, Word document (.docx), or paste raw contract text directly.',
                },
                {
                  step: '02',
                  title: 'Review Text',
                  desc: 'Verify the extracted text in the workspace before starting analysis.',
                },
                {
                  step: '03',
                  title: 'Server-Side Evaluation',
                  desc: 'Contract text is analyzed against established Indian legal benchmarks.',
                },
                {
                  step: '04',
                  title: 'Explore Findings',
                  desc: 'Filter by risk, read plain-English interpretations, and examine exact excerpts.',
                },
                {
                  step: '05',
                  title: 'Export & Consult',
                  desc: 'Print a clean report and use prepared questions with a qualified advocate.',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2 relative"
                >
                  <span className="text-2xl font-extrabold text-blue-500/40 font-mono">
                    {s.step}
                  </span>
                  <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPORTED DOCUMENT CATEGORIES */}
        <section className="py-16 md:py-24 border-t border-slate-800/80 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold font-mono">
                Contract Types
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Supported Document Categories
              </p>
              <p className="text-xs text-slate-400">
                Extraction quality and legal nuances vary by format. Text-based documents yield the highest fidelity.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'Residential Rental Agreements',
                  badge: 'India Specific',
                  desc: '11-month lease norms, security deposit refund terms, painting deductions, lock-in period damages, and quiet enjoyment.',
                },
                {
                  title: 'Employment & Internship Deeds',
                  badge: 'Section 27 Contract Act',
                  desc: 'Training bond clawbacks, non-compete restraint of trade covenants, 90-day notice periods, and certificate withholding.',
                },
                {
                  title: 'Non-Disclosure Agreements (NDAs)',
                  badge: 'Commercial',
                  desc: 'Definition of confidential information, carve-outs for public knowledge, duration of secrecy, and return of materials.',
                },
                {
                  title: 'Freelance & Service Contracts',
                  badge: 'Gig Economy',
                  desc: 'Payment schedules, delayed interest, TDS tax deductions, IP ownership transfer timing, and liability limits.',
                },
                {
                  title: 'Vendor & Procurement Agreements',
                  badge: 'B2B Contracts',
                  desc: 'Delivery SLAs, liquidated damages clauses, termination for breach, and exclusive dispute resolution venues.',
                },
                {
                  title: 'General Commercial Contracts',
                  badge: 'Standard',
                  desc: 'Arbitration clauses, force majeure provisions, unilateral indemnity obligations, and governing law clauses.',
                },
              ].map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">{cat.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800/40 text-blue-300">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVACY & TRUST SECTION */}
        <section className="py-16 md:py-24 border-t border-slate-800/80 bg-[#070A10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-950/60 border border-blue-800/40 rounded-xl text-blue-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Privacy & Data Handling</h3>
                  <p className="text-xs text-slate-400">
                    Transparent privacy practices matching our actual technical implementation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <strong className="text-white block">Ephemeral File Processing:</strong>
                  <span>Uploaded PDF/DOCX files are processed in memory and never written permanently to server disks.</span>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <strong className="text-white block">Local Session Storage:</strong>
                  <span>Generated reports are saved locally in your own browser, under your sole control.</span>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <strong className="text-white block">AI Processing Disclosure:</strong>
                  <span>Contract text is sent over encrypted HTTPS to the configured server-side LLM provider for analysis only.</span>
                </div>
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <strong className="text-white block">One-Click Deletion:</strong>
                  <span>You can delete any report from your history or clear all local session records with a single click.</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  Read full Privacy Architecture <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-slate-200"
                >
                  Terms & Limitations
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-20 border-t border-slate-800/80 bg-[#0B0F19] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to review your contract?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Get an instant executive summary, highlighted risk clauses, and practical negotiation questions in plain English.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/analyze"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Analyze a Contract Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/report/sample-rental-agreement"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                Explore Sample Report
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
