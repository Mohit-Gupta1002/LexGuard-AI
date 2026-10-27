'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { DocumentType } from '@/types/contract';
import { saveReportToStorage } from '@/lib/storage';
import {
  SAMPLE_RENTAL_CONTRACT_TEXT,
  SAMPLE_EMPLOYMENT_CONTRACT_TEXT,
} from '@/data/sample-contract';
import {
  Upload,
  FileText,
  Type,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trash2,
  Sparkles,
  ArrowRight,
  FileUp,
  Scale,
} from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();

  // Active input tab: 'upload' | 'paste'
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('paste');

  // Form State
  const [contractText, setContractText] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('rental');
  const [documentTitle, setDocumentTitle] = useState('');
  const [jurisdiction, setJurisdiction] = useState('India (General & State Laws)');

  // File Upload State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<{
    code?: string;
    message: string;
    suggestedSampleUrl?: string;
  } | null>(null);

  const charCount = contractText.length;
  const wordCount = contractText.trim() ? contractText.trim().split(/\s+/).length : 0;
  const isValidLength = charCount >= 50;

  // Handle File Upload & Server-Side Text Extraction
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadProgress(true);
    setUploadedFileName(file.name);

    // Auto-populate title if empty
    if (!documentTitle) {
      setDocumentTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract text from document');
      }

      setContractText(data.text);
      setActiveTab('paste'); // Switch to review view so user can inspect extracted text
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error extracting text';
      setUploadError(msg);
      setUploadedFileName(null);
    } finally {
      setUploadProgress(false);
    }
  };

  // Load sample contract for rapid testing
  const handleLoadSample = (type: 'rental' | 'employment') => {
    setUploadError(null);
    setAnalysisError(null);
    if (type === 'rental') {
      setContractText(SAMPLE_RENTAL_CONTRACT_TEXT);
      setDocumentType('rental');
      setDocumentTitle('Residential Lease Agreement — Bengaluru (Sample)');
      setJurisdiction('Bengaluru, Karnataka (India)');
    } else {
      setContractText(SAMPLE_EMPLOYMENT_CONTRACT_TEXT);
      setDocumentType('employment');
      setDocumentTitle('Employment & Training Bond Agreement (Sample)');
      setJurisdiction('Gurugram, Haryana (India)');
    }
    setActiveTab('paste');
  };

  const handleClear = () => {
    setContractText('');
    setUploadedFileName(null);
    setUploadError(null);
    setAnalysisError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit for real AI Analysis
  const handleAnalyze = async () => {
    if (!isValidLength || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    // Multi-step progressive status updates
    setAnalysisStep('Sanitizing and parsing contract text...');

    const timer1 = setTimeout(() => {
      setAnalysisStep('Evaluating clauses against Indian legal benchmarks...');
    }, 1500);

    const timer2 = setTimeout(() => {
      setAnalysisStep('Identifying high-risk provisions & missing terms...');
    }, 3500);

    const timer3 = setTimeout(() => {
      setAnalysisStep('Generating plain-English explanations & negotiation questions...');
    }, 6000);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractText,
          documentType,
          documentTitle: documentTitle || `${documentType.toUpperCase()} Contract Review`,
          jurisdiction,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'AI_NOT_CONFIGURED') {
          setAnalysisError({
            code: 'AI_NOT_CONFIGURED',
            message:
              'No AI API key is configured on the server. To run live AI contract analyses, please set GEMINI_API_KEY or AI_API_KEY in your local environment (.env.local). In the meantime, you can explore the fully functional Sample Report with real fictional data.',
            suggestedSampleUrl: '/report/sample-rental-agreement',
          });
        } else {
          setAnalysisError({
            message: result.message || 'Analysis request failed. Please verify your contract text and try again.',
          });
        }
        setIsAnalyzing(false);
        return;
      }

      // Persist to local session history
      saveReportToStorage(result.analysis);

      // Navigate to generated report
      router.push(`/report/${result.analysis.id}`);
    } catch (err: unknown) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      const msg = err instanceof Error ? err.message : 'Network error occurred during analysis.';
      setAnalysisError({ message: msg });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-900/40 px-2.5 py-1 rounded-md">
            <Scale className="w-3.5 h-3.5" />
            <span>Document Analysis Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Analyze a Contract
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Upload your PDF/DOCX agreement or paste the text directly. We will extract the clauses, explain obligations in plain English, and surface potential legal risks.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <DisclaimerBanner variant="compact" />

        {/* Sensitive Information Warning */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs text-slate-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Privacy Notice:</strong> For privacy, feel free to redact or replace personal identifiable details (such as Aadhaar, PAN, bank account numbers) before submitting. Your document text is processed ephemerally for analysis.
          </span>
        </div>

        {/* Input Container */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Method Tabs & Sample Loader Buttons */}
          <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            {/* Input method selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('paste')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'paste'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Paste Text / Review</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileUp className="w-3.5 h-3.5" />
                <span>Upload PDF / DOCX</span>
              </button>
            </div>

            {/* Quick Sample Contract Loaders */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">Quick Test:</span>
              <button
                onClick={() => handleLoadSample('rental')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Load fictional Bengaluru rental agreement"
              >
                Sample Lease
              </button>
              <button
                onClick={() => handleLoadSample('employment')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Load fictional employment bond agreement"
              >
                Sample Employment
              </button>
            </div>
          </div>

          {/* Tab 1: Upload File */}
          {activeTab === 'upload' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors bg-slate-900/40 hover:bg-slate-900/80 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="max-w-xs mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-950/70 border border-blue-800/40 text-blue-400 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                    {uploadProgress ? (
                      <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      {uploadProgress ? 'Extracting contract text...' : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PDF, DOCX, or TXT documents up to 10 MB
                    </p>
                  </div>

                  {uploadedFileName && !uploadProgress && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>{uploadedFileName}</span>
                    </div>
                  )}
                </div>
              </div>

              {uploadError && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800/40 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Paste / Review Text */}
          {activeTab === 'paste' && (
            <div className="p-5 sm:p-6 space-y-4">
              <div className="relative">
                <textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Paste your contract text here (e.g. lease clauses, employment contract, service agreement, or NDA)..."
                  rows={13}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
                />

                {contractText.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-rose-400 bg-slate-900/90 rounded border border-slate-800 transition-colors"
                    title="Clear text"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Text Counters & Clear Action */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span>
                    Characters: <strong className="text-slate-200">{charCount.toLocaleString()}</strong>
                  </span>
                  <span>
                    Words: <strong className="text-slate-200">{wordCount.toLocaleString()}</strong>
                  </span>
                </div>

                {!isValidLength && charCount > 0 && (
                  <span className="text-amber-400 text-[11px]">
                    Minimum 50 characters required for analysis ({50 - charCount} more needed)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Metadata Selector Section */}
          <div className="bg-[#0f172a] p-5 sm:p-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Document Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Document Category
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="rental">Residential Rental / Lease</option>
                <option value="employment">Employment / Internship Deed</option>
                <option value="nda">Non-Disclosure Agreement (NDA)</option>
                <option value="freelance">Freelance / Service Agreement</option>
                <option value="vendor">Vendor / Procurement Agreement</option>
                <option value="partnership">Partnership / Joint Venture</option>
                <option value="general">General Commercial Agreement</option>
              </select>
            </div>

            {/* Document Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Document Title (Optional)
              </label>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g. Indiranagar Lease Agreement"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Jurisdiction */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Governing Jurisdiction
              </label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                placeholder="India (General & State Laws)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Bar & Submission */}
          <div className="p-5 sm:p-6 bg-[#0B0F19] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {isValidLength ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Ready for clause evaluation
                </span>
              ) : (
                <span>Please paste contract text or upload a document to proceed</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isAnalyzing && (
                <button
                  type="button"
                  onClick={() => setIsAnalyzing(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!isValidLength || isAnalyzing}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  !isValidLength || isAnalyzing
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Contract...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Contract</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Live Progress Card when analyzing */}
        {isAnalyzing && (
          <div className="bg-[#111827] border border-blue-900/60 rounded-xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-blue-950 border border-blue-600/40 flex items-center justify-center text-blue-400 mx-auto">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Analyzing Contract with AI</h3>
              <p className="text-xs text-blue-300 font-mono mt-1">{analysisStep}</p>
            </div>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Please wait while the document is parsed, key financial terms are extracted, and clauses are tested against Indian legal principles.
            </p>
          </div>
        )}

        {/* AI Key Configuration or General Error Modal */}
        {analysisError && (
          <div className="bg-[#111827] border border-amber-800/60 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-950 border border-amber-800/40 rounded-lg text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-100">
                  {analysisError.code === 'AI_NOT_CONFIGURED'
                    ? 'AI Provider Setup Required for Live Analysis'
                    : 'Analysis Notice'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {analysisError.message}
                </p>

                {analysisError.code === 'AI_NOT_CONFIGURED' && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <p className="text-slate-400"># In your .env.local file, configure:</p>
                    <p className="text-emerald-400">GEMINI_API_KEY=&quot;your_google_gemini_api_key&quot;</p>
                    <p className="text-slate-500"># Or: AI_API_KEY / OPENAI_API_KEY</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {analysisError.suggestedSampleUrl && (
                <Link
                  href={analysisError.suggestedSampleUrl}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Explore Built-in Sample Report</span>
                </Link>
              )}

              <button
                onClick={() => setAnalysisError(null)}
                className="px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
