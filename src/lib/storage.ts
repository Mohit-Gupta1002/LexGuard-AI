import { ContractAnalysis, HistoryItem } from '@/types/contract';
import { SAMPLE_CONTRACT_ANALYSIS } from '@/data/sample-contract';

const STORAGE_KEY = 'lexguard_reports_v1';

export function saveReportToStorage(analysis: ContractAnalysis): void {
  if (typeof window === 'undefined') return;

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: ContractAnalysis[] = existingRaw ? JSON.parse(existingRaw) : [];

    // Filter out duplicate if already exists
    const filtered = existing.filter((item) => item.id !== analysis.id);

    // Keep up to 20 recent reports locally
    const updated = [analysis, ...filtered].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Unable to persist report in localStorage:', err);
  }
}

export function getReportFromStorage(id: string): ContractAnalysis | null {
  if (id === 'sample-rental-agreement' || id === 'sample') {
    return SAMPLE_CONTRACT_ANALYSIS;
  }

  if (typeof window === 'undefined') return null;

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    if (!existingRaw) return null;

    const reports: ContractAnalysis[] = JSON.parse(existingRaw);
    return reports.find((r) => r.id === id) || null;
  } catch (err) {
    console.warn('Failed to load report from storage:', err);
    return null;
  }
}

export function getHistoryList(): HistoryItem[] {
  if (typeof window === 'undefined') {
    return [mapToHistoryItem(SAMPLE_CONTRACT_ANALYSIS)];
  }

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const reports: ContractAnalysis[] = existingRaw ? JSON.parse(existingRaw) : [];

    const items = reports.map(mapToHistoryItem);

    // Ensure sample is always accessible in history if not already present
    const hasSample = items.some((item) => item.id === SAMPLE_CONTRACT_ANALYSIS.id);
    if (!hasSample) {
      items.push(mapToHistoryItem(SAMPLE_CONTRACT_ANALYSIS));
    }

    return items;
  } catch (err) {
    console.warn('Failed to read history from storage:', err);
    return [mapToHistoryItem(SAMPLE_CONTRACT_ANALYSIS)];
  }
}

export function deleteReportFromStorage(id: string): boolean {
  if (typeof window === 'undefined') return false;

  if (id === 'sample-rental-agreement') {
    return false; // Don't delete built-in sample
  }

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    if (!existingRaw) return false;

    const reports: ContractAnalysis[] = JSON.parse(existingRaw);
    const filtered = reports.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.warn('Failed to delete report:', err);
    return false;
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear history:', err);
  }
}

function mapToHistoryItem(analysis: ContractAnalysis): HistoryItem {
  const highRiskCount = analysis.findings.filter((f) => f.riskCategory === 'high').length;
  const mediumRiskCount = analysis.findings.filter((f) => f.riskCategory === 'medium').length;
  const lowRiskCount = analysis.findings.filter((f) => f.riskCategory === 'low').length;

  return {
    id: analysis.id,
    title: analysis.title,
    documentType: analysis.documentType,
    analyzedAt: analysis.analyzedAt,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount,
    isSample: Boolean(analysis.isSample),
    summaryPreview:
      analysis.executiveSummary.overview.length > 140
        ? analysis.executiveSummary.overview.substring(0, 140) + '...'
        : analysis.executiveSummary.overview,
  };
}
