import { NextRequest, NextResponse } from 'next/server';
import { tavusAPI } from '@/lib/api-integrations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      script, 
      avatarId = 'sarah', 
      voiceId,
      emotion = 'professional',
      background = 'studio'
    } = body;

    if (!script) {
      return NextResponse.json(
        { error: 'Script is required for AI presenter generation' },
        { status: 400 }
      );
    }

    if (script.length > 2000) {
      return NextResponse.json(
        { error: 'Script is too long. Maximum 2000 characters allowed.' },
        { status: 400 }
      );
    }

    // Generate AI presenter video
    const result = await tavusAPI.generateAIPresenter({
      script,
      avatarId,
      voiceId,
      emotion,
      background,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        script,
        generatedAt: new Date().toISOString(),
        charactersUsed: script.length,
      }
    });

  } catch (error) {
    console.error('AI presenter generation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI presenter video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for available avatars
export async function GET(request: NextRequest) {
  try {
    const avatars = await tavusAPI.getAvatars();

    return NextResponse.json({
      success: true,
      data: avatars
    });
  } catch (error) {
    console.error('Avatars fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch avatars',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}