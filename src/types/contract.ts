export type FindingRiskCategory = 'high' | 'medium' | 'low' | 'informational';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type DocumentType =
  | 'rental'
  | 'employment'
  | 'nda'
  | 'freelance'
  | 'vendor'
  | 'partnership'
  | 'general';

export interface Finding {
  id: string;
  clauseTitle: string;
  riskCategory: FindingRiskCategory;
  exactExcerpt: string;
  location?: string;
  plainEnglishExplanation: string;
  whyItMatters: string;
  potentialPracticalConsequence: string;
  suggestedActionOrQuestion: string;
  confidenceLevel: ConfidenceLevel;
  suggestedAlternativeWording?: string;
  alternativeWordingTradeOff?: string;
}

export interface KeyTerms {
  financialTerms: {
    rentOrCompensation?: string;
    securityDeposit?: string;
    paymentSchedule?: string;
    lateFeesOrPenalties?: string;
  };
  durationAndDates: {
    termDuration?: string;
    startDate?: string;
    endDate?: string;
    lockInPeriod?: string;
  };
  terminationAndRenewal: {
    noticePeriod?: string;
    renewalProvisions?: string;
    earlyTerminationTerms?: string;
  };
  covenantsAndLiability: {
    confidentialityObligations?: string;
    ipOwnership?: string;
    liabilityAndIndemnification?: string;
    disputeResolutionAndJurisdiction?: string;
  };
}

export interface ExecutiveSummary {
  overview: string;
  partiesIdentified: string[];
  apparentPurpose: string;
  primaryObligations: string[];
  keyLimitationsOrMissingInfo: string[];
}

export interface MissingInformationItem {
  topic: string;
  description: string;
  whyItMatters: string;
}

export interface NegotiationChecklistItem {
  item: string;
  suggestedQuestionToCounterparty: string;
  rationale: string;
}

export interface SourceNotesAndLimitations {
  disclaimer: string;
  indianLegalContextNotes: string[];
  unverifiedCitationsWarning: string;
}

export interface ContractAnalysis {
  id: string;
  title: string;
  documentType: DocumentType;
  jurisdiction: string;
  analyzedAt: string;
  isSample: boolean;
  wordCount: number;
  executiveSummary: ExecutiveSummary;
  keyTerms: KeyTerms;
  findings: Finding[];
  missingInformation: MissingInformationItem[];
  negotiationChecklist: NegotiationChecklistItem[];
  questionsForLawyer: string[];
  sourceNotesAndLimitations: SourceNotesAndLimitations;
}

export interface ContractAnalysisRequest {
  contractText: string;
  documentType?: DocumentType;
  documentTitle?: string;
  jurisdiction?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  documentType: DocumentType;
  analyzedAt: string;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  isSample: boolean;
  summaryPreview: string;
}
