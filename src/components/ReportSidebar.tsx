'use client';

import React from 'react';
import Link from 'next/link';
import { ContractAnalysis, FindingRiskCategory } from '@/types/contract';
import {
  FileText,
  Key,
  AlertTriangle,
  FileQuestion,
  MessageSquare,
  Scale,
  Printer,
  Copy,
  PlusCircle,
  Trash2,
  Download,
} from 'lucide-react';

interface ReportSidebarProps {
  analysis: ContractAnalysis;
  activeFilter: FindingRiskCategory | 'all';
  onFilterChange: (filter: FindingRiskCategory | 'all') => void;
  onPrint: () => void;
  onCopySummary: () => void;
  onDownloadHtml?: () => void;
  onDownloadJson?: () => void;
  onDelete?: () => void;
  copiedSummary: boolean;
}

export const ReportSidebar: React.FC<ReportSidebarProps> = ({
  analysis,
  activeFilter,
  onFilterChange,
  onPrint,
  onCopySummary,
  onDownloadHtml,
  onDownloadJson,
  onDelete,
  copiedSummary,
}) => {
  const highCount = analysis.findings.filter((f) => f.riskCategory === 'high').length;
  const mediumCount = analysis.findings.filter((f) => f.riskCategory === 'medium').length;
  const lowCount = analysis.findings.filter((f) => f.riskCategory === 'low').length;
  const infoCount = analysis.findings.filter((f) => f.riskCategory === 'informational').length;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="space-y-6">
      {/* Navigation Quick Links */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Table of Contents
        </h4>
        <nav className="space-y-1 text-xs">
          <button
            onClick={() => scrollTo('section-summary')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Executive Summary</span>
          </button>

          <button
            onClick={() => scrollTo('section-key-terms')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>Key Contract Terms</span>
          </button>

          <button
            onClick={() => scrollTo('section-findings')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Clause Findings</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {analysis.findings.length}
            </span>
          </button>

          <button
            onClick={() => scrollTo('section-missing')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
            <span>Missing Information</span>
          </button>

          <button
            onClick={() => scrollTo('section-negotiation')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Negotiation Checklist</span>
          </button>

          <button
            onClick={() => scrollTo('section-lawyer')}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Questions for Lawyer</span>
          </button>
        </nav>
      </div>

      {/* Findings Filter Panel */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Filter By Priority
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => {
              onFilterChange('all');
              scrollTo('section-findings');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white font-medium'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>All Findings</span>
            <span className="text-[11px] font-mono">{analysis.findings.length}</span>
          </button>

          <button
            onClick={() => {
              onFilterChange('high');
              scrollTo('section-findings');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'high'
                ? 'bg-rose-950/80 text-rose-200 border border-rose-700/60 font-medium'
                : 'text-rose-300/80 hover:bg-rose-950/40'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              High Attention
            </span>
            <span className="text-[11px] font-mono">{highCount}</span>
          </button>

          <button
            onClick={() => {
              onFilterChange('medium');
              scrollTo('section-findings');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'medium'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700/60 font-medium'
                : 'text-amber-300/80 hover:bg-amber-950/40'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Medium Attention
            </span>
            <span className="text-[11px] font-mono">{mediumCount}</span>
          </button>

          <button
            onClick={() => {
              onFilterChange('low');
              scrollTo('section-findings');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeFilter === 'low'
                ? 'bg-blue-950/80 text-blue-200 border border-blue-700/60 font-medium'
                : 'text-blue-300/80 hover:bg-blue-950/40'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Low Attention
            </span>
            <span className="text-[11px] font-mono">{lowCount}</span>
          </button>

          {infoCount > 0 && (
            <button
              onClick={() => {
                onFilterChange('informational');
                scrollTo('section-findings');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activeFilter === 'informational'
                  ? 'bg-slate-800 text-slate-200 font-medium'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Informational
              </span>
              <span className="text-[11px] font-mono">{infoCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Report Actions & Export
        </h4>

        <button
          onClick={onPrint}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>

        {onDownloadHtml && (
          <button
            onClick={onDownloadHtml}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Standalone Report</span>
          </button>
        )}

        <button
          onClick={onCopySummary}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>{copiedSummary ? 'Summary Copied!' : 'Copy Summary'}</span>
        </button>

        {onDownloadJson && (
          <button
            onClick={onDownloadJson}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-[11px] font-mono transition-colors"
            title="Download raw structured JSON analysis"
          >
            <span>[Download Analysis JSON]</span>
          </button>
        )}

        <div className="pt-2 border-t border-slate-800">
          <Link
            href="/analyze"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-800/80 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Analyze Another Contract</span>
          </Link>
        </div>

        {onDelete && !analysis.isSample && (
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-950/40 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Report</span>
          </button>
        )}
      </div>
    </aside>
  );
};
