import { z } from 'zod';

export const documentTypeSchema = z.enum([
  'rental',
  'employment',
  'nda',
  'freelance',
  'vendor',
  'partnership',
  'general',
]);

export const findingRiskCategorySchema = z.enum(['high', 'medium', 'low', 'informational']);
export const confidenceLevelSchema = z.enum(['high', 'medium', 'low']);

export const findingSchema = z.object({
  id: z.string().default(() => `fnd-${Math.random().toString(36).substring(2, 9)}`),
  clauseTitle: z.string().min(1, 'Clause title is required'),
  riskCategory: findingRiskCategorySchema,
  exactExcerpt: z.string().min(1, 'Exact excerpt from the contract is required'),
  location: z.string().optional().default('General Clause'),
  plainEnglishExplanation: z.string().min(1, 'Plain-English explanation is required'),
  whyItMatters: z.string().min(1, 'Reason clause matters is required'),
  potentialPracticalConsequence: z.string().min(1, 'Potential consequence is required'),
  suggestedActionOrQuestion: z.string().min(1, 'Suggested action or question is required'),
  confidenceLevel: confidenceLevelSchema.default('high'),
  suggestedAlternativeWording: z.string().optional(),
  alternativeWordingTradeOff: z.string().optional(),
});

export const keyTermsSchema = z.object({
  financialTerms: z.object({
    rentOrCompensation: z.string().optional(),
    securityDeposit: z.string().optional(),
    paymentSchedule: z.string().optional(),
    lateFeesOrPenalties: z.string().optional(),
  }).default({}),
  durationAndDates: z.object({
    termDuration: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    lockInPeriod: z.string().optional(),
  }).default({}),
  terminationAndRenewal: z.object({
    noticePeriod: z.string().optional(),
    renewalProvisions: z.string().optional(),
    earlyTerminationTerms: z.string().optional(),
  }).default({}),
  covenantsAndLiability: z.object({
    confidentialityObligations: z.string().optional(),
    ipOwnership: z.string().optional(),
    liabilityAndIndemnification: z.string().optional(),
    disputeResolutionAndJurisdiction: z.string().optional(),
  }).default({}),
});

export const executiveSummarySchema = z.object({
  overview: z.string().min(1, 'Document overview is required'),
  partiesIdentified: z.array(z.string()).default([]),
  apparentPurpose: z.string().default('General legal agreement'),
  primaryObligations: z.array(z.string()).default([]),
  keyLimitationsOrMissingInfo: z.array(z.string()).default([]),
});

export const missingInformationItemSchema = z.object({
  topic: z.string(),
  description: z.string(),
  whyItMatters: z.string(),
});

export const negotiationChecklistItemSchema = z.object({
  item: z.string(),
  suggestedQuestionToCounterparty: z.string(),
  rationale: z.string(),
});

export const sourceNotesAndLimitationsSchema = z.object({
  disclaimer: z.string().default('LexGuard AI is an informational decision-support tool, not a law firm or a substitute for professional legal counsel.'),
  indianLegalContextNotes: z.array(z.string()).default([]),
  unverifiedCitationsWarning: z.string().default('Interpretations are derived solely from document text and general Indian legal principles. Consult a qualified Indian advocate for formal advice.'),
});

export const contractAnalysisSchema = z.object({
  id: z.string(),
  title: z.string().default('Contract Analysis Report'),
  documentType: documentTypeSchema.default('general'),
  jurisdiction: z.string().default('India'),
  analyzedAt: z.string(),
  isSample: z.boolean().default(false),
  wordCount: z.number().default(0),
  executiveSummary: executiveSummarySchema,
  keyTerms: keyTermsSchema,
  findings: z.array(findingSchema).default([]),
  missingInformation: z.array(missingInformationItemSchema).default([]),
  negotiationChecklist: z.array(negotiationChecklistItemSchema).default([]),
  questionsForLawyer: z.array(z.string()).default([]),
  sourceNotesAndLimitations: sourceNotesAndLimitationsSchema,
});

export const analyzeRequestSchema = z.object({
  contractText: z
    .string()
    .min(50, 'Contract text must be at least 50 characters long for meaningful analysis')
    .max(150000, 'Contract text exceeds the maximum character limit (150,000 characters)'),
  documentType: documentTypeSchema.optional().default('general'),
  documentTitle: z.string().max(200).optional(),
  jurisdiction: z.string().max(100).optional().default('India'),
});
