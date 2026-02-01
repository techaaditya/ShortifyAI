import { NextRequest, NextResponse } from 'next/server';
import { tavusService } from '@/lib/video';

/**
 * AI Avatars API
 * 
 * GET - List available avatars
 * POST - Generate avatar video
 */

export async function GET() {
    try {
        const avatars = await tavusService.getAvatars();

        return NextResponse.json({
            success: true,
            data: {
                avatars,
                configured: tavusService.isConfigured(),
            }
        });
    } catch (error) {
        console.error('Avatars API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch avatars' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, ...options } = body;

        if (!action) {
            return NextResponse.json(
                { error: 'Action is required (generate or status)' },
                { status: 400 }
            );
        }

        switch (action) {
            case 'generate': {
                const { avatarId, script, voiceId, backgroundColor, emotion, aspectRatio } = options;

                if (!avatarId || !script) {
                    return NextResponse.json(
                        { error: 'avatarId and script are required' },
                        { status: 400 }
                    );
                }

                const result = await tavusService.generateVideo({
                    avatarId,
                    script,
                    voiceId,
                    backgroundColor,
                    emotion,
                    aspectRatio,
                });

                return NextResponse.json({
                    success: true,
                    data: result,
                });
            }

            case 'status': {
                const { videoId } = options;

                if (!videoId) {
                    return NextResponse.json(
                        { error: 'videoId is required for status check' },
                        { status: 400 }
                    );
                }

                const result = await tavusService.getVideoStatus(videoId);

                return NextResponse.json({
                    success: true,
                    data: result,
                });
            }

            case 'create': {
                const { name, sourceVideoUrl, consent, description } = options;

                if (!name || !sourceVideoUrl) {
                    return NextResponse.json(
                        { error: 'name and sourceVideoUrl are required' },
                        { status: 400 }
                    );
                }

                if (!consent) {
                    return NextResponse.json(
                        { error: 'Consent is required to create custom avatars' },
                        { status: 400 }
                    );
                }

                const avatar = await tavusService.createAvatar({
                    name,
                    description,
                    sourceVideoUrl,
                    consent,
                });

                if (!avatar) {
                    return NextResponse.json(
                        { error: 'Avatar creation failed' },
                        { status: 500 }
                    );
                }

                return NextResponse.json({
                    success: true,
                    data: avatar,
                });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid action. Use "generate", "status", or "create"' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Avatars API error:', error);
        return NextResponse.json(
            { error: 'Avatar operation failed' },
            { status: 500 }
        );
    }
}
