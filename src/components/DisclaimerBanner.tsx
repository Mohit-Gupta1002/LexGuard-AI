import React from 'react';
import { ShieldAlert, Scale } from 'lucide-react';

interface DisclaimerBannerProps {
  isSample?: boolean;
  variant?: 'compact' | 'full';
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  isSample = false,
  variant = 'compact',
}) => {
  if (isSample) {
    return (
      <div className="bg-amber-950/60 border border-amber-600/40 rounded-lg p-3 sm:p-4 my-4 flex items-start gap-3 text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold tracking-wide uppercase text-amber-300">
            DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT.
          </p>
          <p className="mt-1 text-amber-200/90 text-xs sm:text-sm">
            This report was created using a realistic, fictional Bengaluru residential lease agreement to demonstrate LexGuard AI&apos;s clause-by-clause evaluation and risk categorization. No live contract content was processed.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            <strong className="text-slate-100">Informational Decision Support:</strong> LexGuard AI is not a law firm and does not provide formal legal advice.
          </span>
        </div>
        <span className="text-slate-400 hidden sm:inline">
          Consult an enrolled Indian advocate for binding counsel.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-950/60 border border-blue-800/40 rounded-lg shrink-0">
          <Scale className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-200">
            Legal Disclaimers & Regulatory Boundary
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
            LexGuard AI is an automated informational analysis tool designed to assist Indian citizens, tenants, employees, and founders in reviewing contract clauses and identifying points for negotiation. It is not an advocate, solicitor, or law firm registered with the Bar Council of India, does not solicit legal business, and does not establish an attorney-client relationship.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Legal enforceability depends on specific factual context, state-level stamp duty statutes, and current judicial interpretations. You should always consult a qualified advocate licensed in the relevant Indian jurisdiction before signing binding agreements or making high-stakes decisions.
          </p>
        </div>
      </div>
    </div>
  );
};
