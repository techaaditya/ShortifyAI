import { NextRequest, NextResponse } from 'next/server';
import { ffmpegProcessor } from '@/lib/api-integrations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      videoUrl,
      userId,
      branding = {},
      captions = {},
      targetPlatform = 'tiktok'
    } = body;

    if (!videoUrl || !userId) {
      return NextResponse.json(
        { error: 'Video URL and user ID are required' },
        { status: 400 }
      );
    }

    // Process video with branding
    const brandedResult = await ffmpegProcessor.addBranding({
      videoUrl,
      logoUrl: branding.logo,
      watermarkUrl: branding.watermark,
      brandColors: branding.colors,
      position: branding.position || 'bottom-right',
      opacity: branding.opacity || 0.3,
    });

    // Add captions if specified
    let finalVideoUrl = brandedResult.outputUrl;
    if (captions.enabled && captions.text) {
      const captionResult = await ffmpegProcessor.addCaptions({
        videoUrl: finalVideoUrl,
        captions: [{
          start: 0,
          end: 30, // Mock duration
          text: captions.text,
          style: captions.style,
        }],
      });
      finalVideoUrl = captionResult.outputUrl;
    }

    // Generate metadata
    const metadata = {
      platform: targetPlatform,
      aspectRatio: getAspectRatio(targetPlatform),
      duration: 30, // Mock duration
      fileSize: '15MB',
      brandingApplied: Object.keys(branding).length > 0,
      captionsAdded: captions.enabled,
    };

    return NextResponse.json({
      success: true,
      data: {
        styledVideoUrl: finalVideoUrl,
        thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        metadata,
        generatedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Brand styling error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to style video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getAspectRatio(platform: string): string {
  switch (platform) {
    case 'tiktok':
    case 'instagram':
      return '9:16';
    case 'youtube':
      return '16:9';
    case 'linkedin':
      return '1:1';
    default:
      return '16:9';
  }
}