import { NextRequest, NextResponse } from 'next/server';
import { analyzeRequestSchema } from '@/lib/schema';
import { analyzeContract, AIConfigurationError, getAIConfig } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate request payload with Zod
    const validationResult = analyzeRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Invalid contract input data',
        },
        { status: 400 }
      );
    }

    const { contractText, documentType, documentTitle, jurisdiction } = validationResult.data;

    // 2. Check AI Configuration
    const aiConfig = getAIConfig();
    if (!aiConfig.isConfigured) {
      return NextResponse.json(
        {
          error: 'AI_NOT_CONFIGURED',
          message:
            'No AI API key is configured on the server. Please set GEMINI_API_KEY or AI_API_KEY in your .env.local file.',
          provider: aiConfig.provider,
          suggestedSampleUrl: '/report/sample-rental-agreement',
        },
        { status: 503 }
      );
    }

    // 3. Run real server-side AI pipeline
    const analysis = await analyzeContract({
      contractText,
      documentType,
      documentTitle,
      jurisdiction,
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: unknown) {
    if (error instanceof AIConfigurationError) {
      return NextResponse.json(
        {
          error: 'AI_NOT_CONFIGURED',
          message: error.message,
          suggestedSampleUrl: '/report/sample-rental-agreement',
        },
        { status: 503 }
      );
    }

    const message = error instanceof Error ? error.message : 'Contract analysis failed';
    console.error('Contract analysis error:', message);
    return NextResponse.json(
      {
        error: 'ANALYSIS_FAILED',
        message: `Failed to analyze contract: ${message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const config = getAIConfig();
  return NextResponse.json({
    status: 'ok',
    aiConfigured: config.isConfigured,
    provider: config.provider,
    model: config.model,
  });
}
