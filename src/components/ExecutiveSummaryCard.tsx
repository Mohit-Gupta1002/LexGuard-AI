import React from 'react';
import { ExecutiveSummary } from '@/types/contract';
import { FileText, Users, Target, CheckSquare, AlertCircle } from 'lucide-react';

interface ExecutiveSummaryCardProps {
  summary: ExecutiveSummary;
  wordCount?: number;
  documentType?: string;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  summary,
  wordCount,
  documentType,
}) => {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-950/60 border border-blue-800/40 rounded-lg text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Executive Summary</h3>
            <p className="text-xs text-slate-400">
              High-level overview of document purpose and primary obligations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {documentType && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">
              {documentType}
            </span>
          )}
          {wordCount ? (
            <span className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
              {wordCount.toLocaleString()} words
            </span>
          ) : null}
        </div>
      </div>

      {/* Main Overview Text */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4">
        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {summary.overview}
        </p>
      </div>

      {/* Parties & Apparent Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Parties */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Identified Parties</span>
          </div>
          {summary.partiesIdentified && summary.partiesIdentified.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-slate-300">
              {summary.partiesIdentified.map((party, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{party}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No specific parties explicitly isolated.</p>
          )}
        </div>

        {/* Apparent Purpose */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Document Scope & Purpose</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {summary.apparentPurpose || 'Standard bilateral contractual arrangement.'}
          </p>
        </div>
      </div>

      {/* Primary Obligations */}
      {summary.primaryObligations && summary.primaryObligations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            Primary Obligations & Milestones
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {summary.primaryObligations.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limitations or Missing Info in Summary */}
      {summary.keyLimitationsOrMissingInfo && summary.keyLimitationsOrMissingInfo.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            Notable Omissions or Ambiguities
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            {summary.keyLimitationsOrMissingInfo.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
