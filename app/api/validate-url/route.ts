import { NextRequest, NextResponse } from 'next/server';
import { validateVideoUrl } from '@/lib/video';

/**
 * Validate Video URL API
 * 
 * Quick validation endpoint for video URLs
 */
export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const validation = validateVideoUrl(url);

        return NextResponse.json({
            success: true,
            data: {
                isValid: validation.isValid,
                platform: validation.platform,
                videoId: validation.videoId,
                cleanUrl: validation.cleanUrl,
                embedUrl: validation.embedUrl,
                thumbnailUrl: validation.thumbnailUrl,
                error: validation.error,
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Validation failed' },
            { status: 500 }
        );
    }
}
