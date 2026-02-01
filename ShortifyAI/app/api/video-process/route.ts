import { NextRequest, NextResponse } from 'next/server';
import { videoProcessor } from '@/lib/video-processor';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      url, 
      userId,
      title,
      generateClips = true,
      clipCount = 5,
      addCaptions = true,
      addBranding = false,
      targetPlatforms = ['tiktok', 'youtube', 'instagram']
    } = body;

    if (!url || !userId) {
      return NextResponse.json(
        { error: 'URL and user ID are required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not initialized' },
        { status: 500 }
      );
    }

    // Check user's video limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('videos_used, videos_limit')
      .eq('id', userId)
      .single();

    if (profile && profile.videos_used >= profile.videos_limit) {
      return NextResponse.json(
        { error: 'Video limit reached. Please upgrade your plan.' },
        { status: 403 }
      );
    }

    // Process video
    const result = await videoProcessor.processVideo({
      url,
      userId,
      title,
      generateClips,
      clipCount,
      addCaptions,
      addBranding,
      targetPlatforms,
    });

    // Update user's video usage
    if (profile) {
      await supabase
        .from('profiles')
        .update({ videos_used: profile.videos_used + 1 })
        .eq('id', userId);
    }

    return NextResponse.json({
      success: true,
      data: result,
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const userId = searchParams.get('userId');

  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase client not initialized' },
      { status: 500 }
    );
  }

  if (!projectId || !userId) {
    return NextResponse.json(
      { error: 'Project ID and user ID are required' },
      { status: 400 }
    );
  }

  try {
    // Get project with clips
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select(`
        *,
        clips (*)
      `)
      .eq('id', projectId)
      .eq('user_id', userId)
      .single();

    if (projectError) throw projectError;

    return NextResponse.json({
      success: true,
      data: project,
    });

  } catch (error) {
    console.error('Project fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}