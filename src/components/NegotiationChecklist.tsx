'use client';

import React, { useState } from 'react';
import { NegotiationChecklistItem } from '@/types/contract';
import { MessageSquare, Copy, Check } from 'lucide-react';

interface NegotiationChecklistProps {
  items: NegotiationChecklistItem[];
}

export const NegotiationChecklist: React.FC<NegotiationChecklistProps> = ({ items }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (question: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(question);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
        <div className="p-2 bg-emerald-950/60 border border-emerald-800/40 rounded-lg text-emerald-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Negotiation Checklist</h3>
          <p className="text-xs text-slate-400">
            Practical, assertive questions to clarify or propose amending with the other party
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4 space-y-2.5 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] flex items-center justify-center text-emerald-300">
                  {idx + 1}
                </span>
                {item.item}
              </span>
              <button
                onClick={() => handleCopy(item.suggestedQuestionToCounterparty, idx)}
                className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1"
                title="Copy suggested question"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Question</span>
                  </>
                )}
              </button>
            </div>

            {/* Suggested script */}
            <div className="bg-slate-950/70 border border-slate-800/60 rounded p-2.5 text-xs text-slate-200 font-sans leading-relaxed">
              &ldquo;{item.suggestedQuestionToCounterparty}&rdquo;
            </div>

            {/* Rationale */}
            <p className="text-[11px] text-slate-400">
              <strong className="text-slate-300">Why ask this:</strong> {item.rationale}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
