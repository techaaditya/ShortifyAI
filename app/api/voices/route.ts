import { NextRequest, NextResponse } from 'next/server';
import { elevenLabsService } from '@/lib/video';

/**
 * Voices API
 * 
 * GET - List available voices
 * POST - Generate speech or clone voice
 */

export async function GET() {
    try {
        const voices = await elevenLabsService.getVoices();

        return NextResponse.json({
            success: true,
            data: {
                voices,
                configured: elevenLabsService.isConfigured(),
            }
        });
    } catch (error) {
        console.error('Voices API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch voices' },
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
                { error: 'Action is required (tts or clone)' },
                { status: 400 }
            );
        }

        switch (action) {
            case 'tts': {
                const { voiceId, text, settings } = options;

                if (!voiceId || !text) {
                    return NextResponse.json(
                        { error: 'voiceId and text are required for TTS' },
                        { status: 400 }
                    );
                }

                const result = await elevenLabsService.textToSpeech({
                    voiceId,
                    text,
                    settings,
                });

                return NextResponse.json({
                    success: true,
                    data: result,
                });
            }

            case 'clone': {
                const { name, description, files } = options;

                if (!name || !files || files.length === 0) {
                    return NextResponse.json(
                        { error: 'name and files are required for voice cloning' },
                        { status: 400 }
                    );
                }

                const voice = await elevenLabsService.cloneVoice({
                    name,
                    description,
                    files,
                });

                if (!voice) {
                    return NextResponse.json(
                        { error: 'Voice cloning failed' },
                        { status: 500 }
                    );
                }

                return NextResponse.json({
                    success: true,
                    data: voice,
                });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid action. Use "tts" or "clone"' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Voices API error:', error);
        return NextResponse.json(
            { error: 'Voice operation failed' },
            { status: 500 }
        );
    }
}
