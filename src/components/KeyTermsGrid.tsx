import React from 'react';
import { KeyTerms } from '@/types/contract';
import { IndianRupee, Calendar, Clock, Scale, AlertCircle } from 'lucide-react';

interface KeyTermsGridProps {
  keyTerms: KeyTerms;
}

export const KeyTermsGrid: React.FC<KeyTermsGridProps> = ({ keyTerms }) => {
  const isSpecified = (val?: string) =>
    Boolean(val && val.trim().length > 0 && !val.toLowerCase().includes('not specified') && !val.toLowerCase().includes('not applicable'));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Extracted Key Terms</h3>
          <p className="text-xs text-slate-400">
            Distinguishing explicitly documented commitments from missing or ambiguous terms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Financial Terms */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-1.5 bg-emerald-950/60 border border-emerald-800/40 rounded-md text-emerald-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">Financial Terms & Deposits</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <TermRow
              label="Rent / Compensation"
              value={keyTerms.financialTerms?.rentOrCompensation}
              specified={isSpecified(keyTerms.financialTerms?.rentOrCompensation)}
            />
            <TermRow
              label="Security Deposit"
              value={keyTerms.financialTerms?.securityDeposit}
              specified={isSpecified(keyTerms.financialTerms?.securityDeposit)}
            />
            <TermRow
              label="Payment Schedule"
              value={keyTerms.financialTerms?.paymentSchedule}
              specified={isSpecified(keyTerms.financialTerms?.paymentSchedule)}
            />
            <TermRow
              label="Late Fees / Penalties"
              value={keyTerms.financialTerms?.lateFeesOrPenalties}
              specified={isSpecified(keyTerms.financialTerms?.lateFeesOrPenalties)}
            />
          </div>
        </div>

        {/* 2. Duration & Dates */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-1.5 bg-blue-950/60 border border-blue-800/40 rounded-md text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">Duration & Key Dates</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <TermRow
              label="Contract Term"
              value={keyTerms.durationAndDates?.termDuration}
              specified={isSpecified(keyTerms.durationAndDates?.termDuration)}
            />
            <TermRow
              label="Commencement Date"
              value={keyTerms.durationAndDates?.startDate}
              specified={isSpecified(keyTerms.durationAndDates?.startDate)}
            />
            <TermRow
              label="Expiration Date"
              value={keyTerms.durationAndDates?.endDate}
              specified={isSpecified(keyTerms.durationAndDates?.endDate)}
            />
            <TermRow
              label="Lock-in Period"
              value={keyTerms.durationAndDates?.lockInPeriod}
              specified={isSpecified(keyTerms.durationAndDates?.lockInPeriod)}
            />
          </div>
        </div>

        {/* 3. Termination & Renewal */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-1.5 bg-amber-950/60 border border-amber-800/40 rounded-md text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">Termination & Renewal</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <TermRow
              label="Notice Period"
              value={keyTerms.terminationAndRenewal?.noticePeriod}
              specified={isSpecified(keyTerms.terminationAndRenewal?.noticePeriod)}
            />
            <TermRow
              label="Renewal Terms"
              value={keyTerms.terminationAndRenewal?.renewalProvisions}
              specified={isSpecified(keyTerms.terminationAndRenewal?.renewalProvisions)}
            />
            <TermRow
              label="Early Termination Terms"
              value={keyTerms.terminationAndRenewal?.earlyTerminationTerms}
              specified={isSpecified(keyTerms.terminationAndRenewal?.earlyTerminationTerms)}
            />
          </div>
        </div>

        {/* 4. Covenants & Liability */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-1.5 bg-violet-950/60 border border-violet-800/40 rounded-md text-violet-400">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">Liability & Jurisdiction</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            <TermRow
              label="Confidentiality"
              value={keyTerms.covenantsAndLiability?.confidentialityObligations}
              specified={isSpecified(keyTerms.covenantsAndLiability?.confidentialityObligations)}
            />
            <TermRow
              label="IP Ownership"
              value={keyTerms.covenantsAndLiability?.ipOwnership}
              specified={isSpecified(keyTerms.covenantsAndLiability?.ipOwnership)}
            />
            <TermRow
              label="Indemnity & Liability"
              value={keyTerms.covenantsAndLiability?.liabilityAndIndemnification}
              specified={isSpecified(keyTerms.covenantsAndLiability?.liabilityAndIndemnification)}
            />
            <TermRow
              label="Dispute & Jurisdiction"
              value={keyTerms.covenantsAndLiability?.disputeResolutionAndJurisdiction}
              specified={isSpecified(keyTerms.covenantsAndLiability?.disputeResolutionAndJurisdiction)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TermRowProps {
  label: string;
  value?: string;
  specified: boolean;
}

const TermRow: React.FC<TermRowProps> = ({ label, value, specified }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 p-2 rounded bg-slate-900/60 border border-slate-800/60">
      <span className="text-slate-400 shrink-0 font-medium">{label}:</span>
      <span className="text-right sm:max-w-[65%] text-slate-200 break-words">
        {specified ? (
          value
        ) : (
          <span className="text-slate-500 italic flex items-center justify-end gap-1">
            <AlertCircle className="w-3 h-3 text-slate-600 inline" />
            {value || 'Not explicitly stated'}
          </span>
        )}
      </span>
    </div>
  );
};
