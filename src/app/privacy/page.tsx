import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Server, Trash2, EyeOff, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-900/40 px-2.5 py-1 rounded-md">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: October 2024. Transparent disclosure of how LexGuard AI processes, transmits, and manages your documents.
          </p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-400" />
              1. Ephemeral Document Processing
            </h2>
            <p>
              When you upload a PDF or DOCX file to LexGuard AI, the file is handled ephemerally in memory by the server-side text extraction engine. The document bytes are converted to clean text for clause analysis and are immediately dropped from active memory. We do not write uploaded files to permanent server disks, S3 buckets, or persistent cloud storage databases.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-400" />
              2. Third-Party AI Engine Transmission
            </h2>
            <p>
              To perform clause categorization, risk detection, and summarization, the extracted contract text is transmitted via an encrypted HTTPS connection to our configured server-side AI provider (such as Google Gemini or OpenAI API).
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
              <li>API requests are executed under enterprise zero-data-retention / privacy API terms where available.</li>
              <li>Your documents are not used by LexGuard AI to train public foundation models.</li>
              <li>We strictly isolate contract text as untrusted data using explicit boundary delimiters to prevent prompt injection.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              3. Client-Side Report Storage
            </h2>
            <p>
              In our guest MVP implementation, generated reports and summaries are saved directly to your browser&apos;s local storage (<code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-xs">localStorage</code>). This means:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
              <li>Your previous reports remain on your current device and browser profile only.</li>
              <li>Other users or external sessions cannot browse or inspect your analyzed reports.</li>
              <li>Clearing your browser cache or using Incognito/Private mode will clear your stored history.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              4. Complete User Deletion Controls
            </h2>
            <p>
              You maintain unilateral control over your analyzed data. You can delete individual reports from the Report Dashboard or delete all stored reports simultaneously from the <Link href="/history" className="text-blue-400 hover:underline">Report History</Link> page. Once deleted, the local record is wiped permanently from your device.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              5. Recommended User Precaution
            </h2>
            <p>
              While document handling is ephemeral, contracts frequently contain sensitive personally identifiable information (PII). We advise users to redact personal bank account numbers, Aadhaar numbers, or passport numbers before pasting or uploading contract drafts.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
