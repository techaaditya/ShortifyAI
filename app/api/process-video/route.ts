import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import {
  validateVideoUrl,
  fetchVideoMetadata,
  geminiService,
  getRecommendedDuration,
} from '@/lib/video';

// ============================================================================
// TYPES
// ============================================================================

interface ProcessVideoRequest {
  videoUrl: string;
  title?: string;
  options?: {
    generateClips?: boolean;
    clipCount?: number;
    addCaptions?: boolean;
    targetPlatform?: 'tiktok' | 'youtube' | 'instagram' | 'linkedin';
  };
}

// ============================================================================
// POST - Process Video
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body: ProcessVideoRequest = await request.json();
    const { videoUrl, title, options = {} } = body;

    // Validate URL
    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required' },
        { status: 400 }
      );
    }

    // Validate video URL format and platform
    const urlValidation = validateVideoUrl(videoUrl);

    if (!urlValidation.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid video URL',
          details: urlValidation.error,
          supportedPlatforms: ['YouTube', 'TikTok', 'Instagram', 'Twitter/X', 'Facebook', 'LinkedIn']
        },
        { status: 400 }
      );
    }

    // Fetch video metadata
    const metadata = await fetchVideoMetadata(videoUrl);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Failed to fetch video metadata' },
        { status: 400 }
      );
    }

    // Get recommended duration for target platform
    const targetPlatform = options.targetPlatform || urlValidation.platform;
    const durationSettings = getRecommendedDuration(targetPlatform);

    // Transcribe and analyze with Gemini
    const transcription = await geminiService.transcribeVideo(videoUrl);

    const analysis = await geminiService.analyzeContent(
      transcription.fullText,
      transcription.duration,
      {
        targetPlatform,
        clipCount: options.clipCount || 3,
        minClipDuration: durationSettings.min,
        maxClipDuration: durationSettings.max,
      }
    );

    // Store in database (if user is authenticated)
    // This would be enhanced with actual auth in production

    return NextResponse.json({
      success: true,
      data: {
        videoUrl: urlValidation.cleanUrl,
        platform: urlValidation.platform,
        embedUrl: urlValidation.embedUrl,
        metadata: {
          title: metadata.title || title || 'Untitled Video',
          author: metadata.authorName,
          thumbnailUrl: urlValidation.thumbnailUrl || metadata.thumbnailUrl,
        },
        transcription: {
          fullText: transcription.fullText,
          segments: transcription.segments,
          language: transcription.language,
          duration: transcription.duration,
          wordCount: transcription.wordCount,
        },
        analysis: {
          summary: analysis.summary,
          mainTopics: analysis.mainTopics,
          keyPoints: analysis.keyPoints,
          sentiment: analysis.sentiment,
          suggestedHashtags: analysis.suggestedHashtags,
        },
        clips: analysis.clipRecommendations.map(clip => ({
          id: clip.id,
          title: clip.title,
          startTime: clip.startTime,
          endTime: clip.endTime,
          duration: clip.duration,
          type: clip.type,
          confidence: Math.round(clip.confidence * 100),
          thumbnailUrl: urlValidation.thumbnailUrl,
          summary: clip.summary,
          hashtags: clip.hashtags,
          description: clip.description,
          viralPotential: clip.viralPotential,
          targetPlatforms: clip.targetPlatforms,
        })),
        highlights: analysis.highlights,
        processedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Video processing error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET - Check Processing Status
// ============================================================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');
  const projectId = searchParams.get('projectId');

  if (!jobId && !projectId) {
    return NextResponse.json(
      { error: 'Job ID or Project ID is required' },
      { status: 400 }
    );
  }

  try {
    // In production, check actual job status from database or queue
    return NextResponse.json({
      success: true,
      data: {
        id: jobId || projectId,
        status: 'completed',
        progress: 100,
        message: 'Video processing completed successfully',
        completedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch processing status' },
      { status: 500 }
    );
  }
}