import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_CONTRACT_ANALYSIS } from '@/data/sample-contract';
import { ContractAnalysis } from '@/types/contract';

// Server-side ephemeral cache for recently generated reports in the current session
const inMemoryReports = new Map<string, ContractAnalysis>();

// Seed with sample report
inMemoryReports.set(SAMPLE_CONTRACT_ANALYSIS.id, SAMPLE_CONTRACT_ANALYSIS);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === 'sample-rental-agreement' || id === 'sample') {
    return NextResponse.json({
      success: true,
      analysis: SAMPLE_CONTRACT_ANALYSIS,
    });
  }

  const report = inMemoryReports.get(id);
  if (report) {
    return NextResponse.json({
      success: true,
      analysis: report,
    });
  }

  return NextResponse.json(
    {
      error: 'REPORT_NOT_FOUND',
      message: 'Report not found or your guest session has expired. Check your locally saved reports in History.',
    },
    { status: 404 }
  );
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === 'sample-rental-agreement' || id === 'sample') {
    return NextResponse.json(
      { error: 'CANNOT_DELETE_SAMPLE', message: 'The demo sample report cannot be deleted.' },
      { status: 400 }
    );
  }

  if (inMemoryReports.has(id)) {
    inMemoryReports.delete(id);
    return NextResponse.json({ success: true, message: 'Report deleted from server session.' });
  }

  return NextResponse.json({ success: true, message: 'Report removed.' });
}
