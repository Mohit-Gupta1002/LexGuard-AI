import React from 'react';
import { MissingInformationItem } from '@/types/contract';
import { FileQuestion, AlertCircle } from 'lucide-react';

interface MissingInformationCardProps {
  items: MissingInformationItem[];
}

export const MissingInformationCard: React.FC<MissingInformationCardProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
        <div className="p-2 bg-amber-950/60 border border-amber-800/40 rounded-lg text-amber-400">
          <FileQuestion className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Missing or Ambiguous Terms</h3>
          <p className="text-xs text-slate-400">
            Terms omitted from the text that may create legal vulnerability or practical uncertainty
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <h4 className="text-xs font-semibold text-slate-200">{item.topic}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            <div className="pt-1 text-[11px] text-amber-200/80 bg-amber-950/30 p-2 rounded border border-amber-900/30">
              <strong className="text-amber-300">Why it matters:</strong> {item.whyItMatters}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
