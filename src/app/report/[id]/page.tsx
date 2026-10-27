'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { ExecutiveSummaryCard } from '@/components/ExecutiveSummaryCard';
import { KeyTermsGrid } from '@/components/KeyTermsGrid';
import { FindingCard } from '@/components/FindingCard';
import { MissingInformationCard } from '@/components/MissingInformationCard';
import { NegotiationChecklist } from '@/components/NegotiationChecklist';
import { LawyerQuestionsCard } from '@/components/LawyerQuestionsCard';
import { ReportSidebar } from '@/components/ReportSidebar';
import { ContractAnalysis, FindingRiskCategory } from '@/types/contract';
import { SAMPLE_CONTRACT_ANALYSIS } from '@/data/sample-contract';
import { getReportFromStorage, deleteReportFromStorage } from '@/lib/storage';
import { downloadStandaloneReportHtml, downloadReportAsJson } from '@/lib/export';
import {
  Search,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  AlertTriangle,
  Scale,
  Calendar,
  Loader2,
  Trash2,
  Download,
} from 'lucide-react';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

function ReportPageContent({ params }: ReportPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [activeFilter, setActiveFilter] = useState<FindingRiskCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      setError(null);

      // Check if built-in sample
      if (id === 'sample-rental-agreement' || id === 'sample') {
        setAnalysis(SAMPLE_CONTRACT_ANALYSIS);
        setLoading(false);
        return;
      }

      // Check client-side storage first
      const stored = getReportFromStorage(id);
      if (stored) {
        setAnalysis(stored);
        setLoading(false);
        return;
      }

      // Check server session endpoint
      try {
        const res = await fetch(`/api/reports/${id}`);
        if (res.ok) {
          const data = await res.json();
          setAnalysis(data.analysis);
        } else {
          setError(
            'Report not found. The guest session may have expired or the report was cleared.'
          );
        }
      } catch {
        setError('Failed to retrieve report. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopySummary = () => {
    if (!analysis || !navigator.clipboard) return;
    const text = `LEXGUARD AI REPORT: ${analysis.title}
Analyzed: ${new Date(analysis.analyzedAt).toLocaleDateString()}
Jurisdiction: ${analysis.jurisdiction}

EXECUTIVE SUMMARY:
${analysis.executiveSummary.overview}

PRIMARY OBLIGATIONS:
${analysis.executiveSummary.primaryObligations.map((o, i) => `${i + 1}. ${o}`).join('\n')}

KEY FINDINGS (${analysis.findings.length}):
${analysis.findings.map((f) => `• [${f.riskCategory.toUpperCase()}] ${f.clauseTitle}: ${f.plainEnglishExplanation}`).join('\n')}

DISCLAIMER:
LexGuard AI is an informational decision-support tool, not a law firm or a substitute for professional legal counsel.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDelete = () => {
    if (!analysis || analysis.isSample) return;
    if (confirm('Are you sure you want to delete this report from your device history?')) {
      deleteReportFromStorage(analysis.id);
      router.push('/history');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm text-slate-400 font-mono">Loading contract analysis report...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-800 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Report Unavailable</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {error || 'This report does not exist or has been deleted.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/report/sample-rental-agreement"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Explore Sample Rental Report
            </Link>
            <Link
              href="/analyze"
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-medium"
            >
              Analyze a New Contract
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter and search findings
  const filteredFindings = analysis.findings.filter((f) => {
    const matchesFilter = activeFilter === 'all' || f.riskCategory === activeFilter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.clauseTitle.toLowerCase().includes(q) ||
      f.plainEnglishExplanation.toLowerCase().includes(q) ||
      f.exactExcerpt.toLowerCase().includes(q) ||
      (f.location && f.location.toLowerCase().includes(q))
    );
  });

  const highPriorityCount = analysis.findings.filter((f) => f.riskCategory === 'high').length;
  const mediumPriorityCount = analysis.findings.filter((f) => f.riskCategory === 'medium').length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-6">
        {/* Sample Demo Banner if applicable */}
        <DisclaimerBanner isSample={Boolean(analysis.isSample)} />

        {/* Report Top Header Bar */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2 text-xs">
              <Link
                href="/analyze"
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors no-print"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspace
              </Link>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-400 uppercase text-[11px]">
                ID: {analysis.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-medium flex items-center gap-1.5 transition-colors no-print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>

              <button
                onClick={() => downloadStandaloneReportHtml(analysis)}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors no-print"
                title="Download self-contained offline HTML report"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Report</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors no-print"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              {!analysis.isSample && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors no-print"
                  title="Delete this report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300">
                  {analysis.documentType}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {new Date(analysis.analyzedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-slate-500" />
                  {analysis.jurisdiction}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {analysis.title}
              </h1>
            </div>

            {/* Risk Counts Pill Badges */}
            <div className="flex items-center gap-2.5">
              <div className="bg-rose-950/60 border border-rose-800/40 rounded-xl px-3.5 py-2 text-center">
                <span className="text-lg font-bold text-rose-300 block leading-none">
                  {highPriorityCount}
                </span>
                <span className="text-[10px] text-rose-400/90 font-medium uppercase tracking-wider">
                  High Risk
                </span>
              </div>

              <div className="bg-amber-950/60 border border-amber-800/40 rounded-xl px-3.5 py-2 text-center">
                <span className="text-lg font-bold text-amber-300 block leading-none">
                  {mediumPriorityCount}
                </span>
                <span className="text-[10px] text-amber-400/90 font-medium uppercase tracking-wider">
                  Medium Risk
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-center">
                <span className="text-lg font-bold text-slate-300 block leading-none">
                  {analysis.findings.length}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Total Clauses
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard 2-Column Grid: Sidebar on Left, Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-20 no-print">
            <ReportSidebar
              analysis={analysis}
              activeFilter={activeFilter}
              onFilterChange={(f) => setActiveFilter(f)}
              onPrint={handlePrint}
              onCopySummary={handleCopySummary}
              onDownloadHtml={() => downloadStandaloneReportHtml(analysis)}
              onDownloadJson={() => downloadReportAsJson(analysis)}
              onDelete={handleDelete}
              copiedSummary={copiedSummary}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* 1. Executive Summary */}
            <section id="section-summary">
              <ExecutiveSummaryCard
                summary={analysis.executiveSummary}
                wordCount={analysis.wordCount}
                documentType={analysis.documentType}
              />
            </section>

            {/* 2. Key Terms */}
            <section id="section-key-terms">
              <KeyTermsGrid keyTerms={analysis.keyTerms} />
            </section>

            {/* 3. Clause Findings */}
            <section id="section-findings" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-semibold text-white">Clause-by-Clause Findings</h3>
                  <p className="text-xs text-slate-400">
                    Prioritized legal observations backed by verbatim quotations from the contract
                  </p>
                </div>

                {/* Search within findings */}
                <div className="relative w-full sm:w-64 no-print">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in findings..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Mobile Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 lg:hidden no-print">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  All ({analysis.findings.length})
                </button>
                <button
                  onClick={() => setActiveFilter('high')}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                    activeFilter === 'high'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  High Risk ({highPriorityCount})
                </button>
                <button
                  onClick={() => setActiveFilter('medium')}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                    activeFilter === 'medium'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Medium Risk ({mediumPriorityCount})
                </button>
              </div>

              {/* List of Finding Cards */}
              <div className="space-y-3">
                {filteredFindings.length > 0 ? (
                  filteredFindings.map((finding, idx) => (
                    <FindingCard
                      key={finding.id || idx}
                      finding={finding}
                      defaultExpanded={idx === 0 || finding.riskCategory === 'high'}
                    />
                  ))
                ) : (
                  <div className="bg-[#111827] border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400 space-y-2">
                    <p>No findings matched your current filter or search criteria.</p>
                    <button
                      onClick={() => {
                        setActiveFilter('all');
                        setSearchQuery('');
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 4. Missing Information */}
            <section id="section-missing">
              <MissingInformationCard items={analysis.missingInformation} />
            </section>

            {/* 5. Negotiation Checklist */}
            <section id="section-negotiation">
              <NegotiationChecklist items={analysis.negotiationChecklist} />
            </section>

            {/* 6. Questions for Lawyer */}
            <section id="section-lawyer">
              <LawyerQuestionsCard questions={analysis.questionsForLawyer} />
            </section>

            {/* 7. Limitations & Statutory Reference Notes */}
            <section id="section-limitations" className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Scale className="w-4 h-4 text-blue-400" />
                <span>Statutory Source Notes & Indian Legal Framework</span>
              </div>

              {analysis.sourceNotesAndLimitations?.indianLegalContextNotes &&
                analysis.sourceNotesAndLimitations.indianLegalContextNotes.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-slate-300">
                      Applicable Indian Legal Provisions Referenced:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {analysis.sourceNotesAndLimitations.indianLegalContextNotes.map(
                        (note, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">•</span>
                            <span>{note}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed space-y-2">
                <p>
                  <strong className="text-slate-300">Decision-Support Notice:</strong>{' '}
                  {analysis.sourceNotesAndLimitations?.disclaimer}
                </p>
                <p className="text-[11px] text-slate-500">
                  {analysis.sourceNotesAndLimitations?.unverifiedCitationsWarning}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ReportPage({ params }: ReportPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm text-slate-400 font-mono">Loading contract analysis report...</p>
        </div>
      }
    >
      <ReportPageContent params={params} />
    </Suspense>
  );
}

