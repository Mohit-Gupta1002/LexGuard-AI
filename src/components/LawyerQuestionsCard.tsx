'use client';

import React, { useState } from 'react';
import { Scale, Copy, Check } from 'lucide-react';

interface LawyerQuestionsCardProps {
  questions: string[];
}

export const LawyerQuestionsCard: React.FC<LawyerQuestionsCardProps> = ({ questions }) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = () => {
    if (navigator.clipboard && questions.length > 0) {
      const formatted = questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n');
      navigator.clipboard.writeText(
        `LEXGUARD AI — QUESTIONS FOR ADVOCATE:\n\n${formatted}\n\n(Generated for informational legal consultation)`
      );
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-950/60 border border-indigo-800/40 rounded-lg text-indigo-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Questions for an Indian Advocate</h3>
            <p className="text-xs text-slate-400">
              High-priority legal uncertainties to bring up when consulting a qualified lawyer
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied All</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Questions</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2.5">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3.5 flex items-start gap-3 text-xs sm:text-sm text-slate-200"
          >
            <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center text-xs shrink-0 mt-0.5 font-medium">
              {idx + 1}
            </span>
            <p className="leading-relaxed">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
