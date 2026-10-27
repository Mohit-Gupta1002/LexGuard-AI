'use client';

import React, { useState } from 'react';
import { Finding } from '@/types/contract';
import { RiskBadge } from '@/components/RiskBadge';
import {
  ChevronDown,
  ChevronUp,
  Quote,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  MapPin,
  Scale,
} from 'lucide-react';

interface FindingCardProps {
  finding: Finding;
  defaultExpanded?: boolean;
}

export const FindingCard: React.FC<FindingCardProps> = ({
  finding,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const [copiedWording, setCopiedWording] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `[${finding.riskCategory.toUpperCase()} ATTENTION] ${finding.clauseTitle}\nLocation: ${finding.location || 'N/A'}\n\nExact Excerpt:\n"${finding.exactExcerpt}"\n\nPlain-English Explanation:\n${finding.plainEnglishExplanation}\n\nPotential Practical Consequence:\n${finding.potentialPracticalConsequence}\n\nSuggested Next Action / Question:\n${finding.suggestedActionOrQuestion}${
      finding.suggestedAlternativeWording ? `\n\nProposed Alternative Wording:\n"${finding.suggestedAlternativeWording}"` : ''
    }`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyWording = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!finding.suggestedAlternativeWording || !navigator.clipboard) return;
    navigator.clipboard.writeText(finding.suggestedAlternativeWording);
    setCopiedWording(true);
    setTimeout(() => setCopiedWording(false), 2000);
  };

  const getBorderColor = () => {
    switch (finding.riskCategory) {
      case 'high':
        return 'border-rose-900/50 hover:border-rose-700/60';
      case 'medium':
        return 'border-amber-900/50 hover:border-amber-700/60';
      case 'low':
        return 'border-blue-900/50 hover:border-blue-700/60';
      default:
        return 'border-slate-800 hover:border-slate-700';
    }
  };

  return (
    <div
      id={finding.id}
      className={`bg-[#111827] border rounded-xl overflow-hidden transition-all duration-200 ${getBorderColor()}`}
    >
      {/* Header bar - Click to toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none hover:bg-slate-900/50 transition-colors"
      >
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <RiskBadge category={finding.riskCategory} size="sm" />
            {finding.location && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                <MapPin className="w-3 h-3 text-slate-500" />
                {finding.location}
              </span>
            )}
            <span className="text-[11px] text-slate-400 capitalize">
              Confidence: {finding.confidenceLevel || 'High'}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
            {finding.clauseTitle}
          </h4>

          {/* Collapsed preview excerpt */}
          {!isExpanded && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {finding.plainEnglishExplanation}
            </p>
          )}
        </div>

        {/* Action buttons & toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Copy finding details"
            aria-label="Copy finding"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="p-1.5 text-slate-400 hover:text-white rounded">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded detailed breakdown */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-slate-800/80 pt-4 bg-[#0d131f]/70">
          {/* 1. Exact Supporting Excerpt */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Quote className="w-3.5 h-3.5" />
                Exact Supporting Document Excerpt
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Verbatim text</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-200 font-mono italic leading-relaxed border-l-2 border-l-blue-500">
              &ldquo;{finding.exactExcerpt}&rdquo;
            </div>
          </div>

          {/* 2. Plain-English Explanation */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              Plain-English Explanation
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
              {finding.plainEnglishExplanation}
            </p>
          </div>

          {/* 3. Why It Matters & Potential Consequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-3 space-y-1">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Why This Clause Matters
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {finding.whyItMatters}
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-3 space-y-1">
              <span className="text-xs font-semibold text-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Potential Practical Consequence
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {finding.potentialPracticalConsequence}
              </p>
            </div>
          </div>

          {/* 4. Suggested Action or Negotiation Question */}
          <div className="bg-blue-950/30 border border-blue-900/40 rounded-lg p-3.5 space-y-1.5">
            <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              Suggested Action / Question for Counterparty
            </span>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {finding.suggestedActionOrQuestion}
            </p>
          </div>

          {/* 5. Suggested Alternative Clause Wording & Trade-Offs (P1 Requirement) */}
          {finding.suggestedAlternativeWording && (
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  Suggested Alternative Clause Wording (Proposed Redline)
                </span>
                <button
                  onClick={handleCopyWording}
                  className="text-[11px] text-emerald-300 hover:text-white px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60 hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
                  title="Copy alternative clause text"
                >
                  {copiedWording ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Proposed Wording</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950/90 border border-emerald-900/40 rounded p-3 text-xs text-emerald-100/95 font-mono leading-relaxed border-l-2 border-l-emerald-500">
                &ldquo;{finding.suggestedAlternativeWording}&rdquo;
              </div>

              {finding.alternativeWordingTradeOff && (
                <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/60 leading-relaxed">
                  <strong className="text-emerald-400 font-semibold">Negotiation Trade-off & Compromise:</strong>{' '}
                  {finding.alternativeWordingTradeOff}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
