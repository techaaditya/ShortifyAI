import { NextRequest, NextResponse } from 'next/server';

// Mock AI processing function
async function processVideoWithAI(videoUrl: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock response from AI services
  return {
    transcript: "Welcome to today's discussion about AI and the future of work. AI is transforming every industry, and we need to understand how to adapt. The key is to focus on uniquely human skills like creativity, empathy, and complex problem-solving. Don't fear AI, but learn to work alongside it.",
    highlights: [
      {
        start: 0,
        end: 15,
        confidence: 0.95,
        type: "hook",
        description: "Engaging opening about AI transformation"
      },
      {
        start: 20,
        end: 35,
        confidence: 0.89,
        type: "key_point",
        description: "Focus on human skills"
      },
      {
        start: 40,
        end: 52,
        confidence: 0.92,
        type: "conclusion",
        description: "Call to action about AI collaboration"
      }
    ],
    clips: [
      {
        id: 1,
        title: "Hook: AI vs Human Debate",
        startTime: 0,
        endTime: 15,
        duration: 15,
        confidence: 95,
        thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        captions: [
          { start: 0, end: 5, text: "Welcome to today's discussion" },
          { start: 5, end: 10, text: "about AI and the future of work" },
          { start: 10, end: 15, text: "AI is transforming every industry" }
        ]
      },
      {
        id: 2,
        title: "Key Point: Future of Work",
        startTime: 20,
        endTime: 35,
        duration: 15,
        confidence: 89,
        thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        captions: [
          { start: 20, end: 25, text: "Focus on uniquely human skills" },
          { start: 25, end: 30, text: "like creativity and empathy" },
          { start: 30, end: 35, text: "and complex problem-solving" }
        ]
      },
      {
        id: 3,
        title: "Conclusion: Take Action",
        startTime: 40,
        endTime: 52,
        duration: 12,
        confidence: 92,
        thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        captions: [
          { start: 40, end: 45, text: "Don't fear AI" },
          { start: 45, end: 50, text: "but learn to work alongside it" },
          { start: 50, end: 52, text: "for the future" }
        ]
      }
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoUrl, options = {} } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format (basic validation)
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid video URL format' },
        { status: 400 }
      );
    }

    // Process video with AI
    const result = await processVideoWithAI(videoUrl);

    return NextResponse.json({
      success: true,
      data: {
        videoUrl,
        processedAt: new Date().toISOString(),
        ...result
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

// GET endpoint for checking processing status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json(
      { error: 'Job ID is required' },
      { status: 400 }
    );
  }

  // Mock status response
  return NextResponse.json({
    jobId,
    status: 'completed',
    progress: 100,
    message: 'Video processing completed successfully'
  });
}