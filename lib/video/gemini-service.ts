/**
 * Gemini AI Service - Transcription & Content Analysis
 * 
 * Uses Google's Gemini API for:
 * - Video transcription with timestamps
 * - Content analysis and highlight detection
 * - Clip recommendations
 * - Metadata generation (hashtags, descriptions)
 */

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// ============================================================================
// TYPES
// ============================================================================

export interface TranscriptSegment {
    start: number;
    end: number;
    text: string;
    confidence: number;
    speaker?: string;
    emotion?: 'neutral' | 'happy' | 'excited' | 'serious' | 'sad';
}

export interface TranscriptionResult {
    fullText: string;
    segments: TranscriptSegment[];
    language: string;
    duration: number;
    wordCount: number;
}

export interface ContentHighlight {
    startTime: number;
    endTime: number;
    type: 'hook' | 'highlight' | 'conclusion' | 'key_point' | 'emotional_peak';
    confidence: number;
    summary: string;
    engagementScore: number;
    keywords: string[];
}

export interface ClipRecommendation {
    id: string;
    title: string;
    startTime: number;
    endTime: number;
    duration: number;
    type: 'hook' | 'highlight' | 'conclusion' | 'custom';
    confidence: number;
    summary: string;
    hashtags: string[];
    description: string;
    viralPotential: number; // 0-100
    targetPlatforms: string[];
}

export interface ContentAnalysis {
    summary: string;
    mainTopics: string[];
    keyPoints: string[];
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
    targetAudience: string[];
    suggestedHashtags: string[];
    highlights: ContentHighlight[];
    clipRecommendations: ClipRecommendation[];
}

// ============================================================================
// GEMINI SERVICE CLASS
// ============================================================================

export class GeminiService {
    private client: GoogleGenerativeAI | null = null;
    private model: GenerativeModel | null = null;
    private apiKey: string;

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';

        if (this.apiKey) {
            this.client = new GoogleGenerativeAI(this.apiKey);
            this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
        }
    }

    /**
     * Check if service is configured
     */
    isConfigured(): boolean {
        return !!this.client && !!this.model;
    }

    /**
     * Transcribe video content from audio/video URL
     * Note: Gemini 1.5 can process audio/video directly
     */
    async transcribeVideo(
        videoUrl: string,
        options: {
            language?: string;
            includeTimestamps?: boolean;
            detectSpeakers?: boolean;
        } = {}
    ): Promise<TranscriptionResult> {
        if (!this.isConfigured() || !this.model) {
            return this.getMockTranscription();
        }

        const { language = 'auto', includeTimestamps = true, detectSpeakers = false } = options;

        try {
            const prompt = `
You are an expert transcription AI. Analyze this video and provide a detailed transcription.

${includeTimestamps ? 'Include precise timestamps for each segment in the format [MM:SS].' : ''}
${detectSpeakers ? 'Identify different speakers if multiple people are talking.' : ''}
${language !== 'auto' ? `Transcribe in ${language}.` : 'Detect and transcribe in the original language.'}

Provide the response in this exact JSON format:
{
  "fullText": "Complete transcription text",
  "language": "detected language code (e.g., 'en')",
  "duration": estimated_duration_in_seconds,
  "segments": [
    {
      "start": start_time_in_seconds,
      "end": end_time_in_seconds,
      "text": "segment text",
      "confidence": 0.0-1.0,
      "speaker": "optional speaker name",
      "emotion": "neutral|happy|excited|serious|sad"
    }
  ]
}

Video URL: ${videoUrl}
`;

            const result = await this.model.generateContent(prompt);
            const response = result.response.text();

            // Parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    ...parsed,
                    wordCount: parsed.fullText.split(/\s+/).length,
                };
            }

            return this.getMockTranscription();
        } catch (error) {
            console.error('Gemini transcription error:', error);
            return this.getMockTranscription();
        }
    }

    /**
     * Analyze content and identify highlights
     */
    async analyzeContent(
        transcript: string,
        duration: number,
        options: {
            targetPlatform?: string;
            clipCount?: number;
            minClipDuration?: number;
            maxClipDuration?: number;
        } = {}
    ): Promise<ContentAnalysis> {
        if (!this.isConfigured() || !this.model) {
            return this.getMockAnalysis(transcript, duration);
        }

        const {
            targetPlatform = 'tiktok',
            clipCount = 3,
            minClipDuration = 15,
            maxClipDuration = 60,
        } = options;

        try {
            const prompt = `
You are an expert content strategist for viral short-form videos. Analyze this transcript and identify the best moments for ${targetPlatform} clips.

TRANSCRIPT (${duration} seconds total):
"""
${transcript}
"""

Analyze the content and provide recommendations in this exact JSON format:
{
  "summary": "Brief 2-3 sentence summary of the entire content",
  "mainTopics": ["topic1", "topic2", "topic3"],
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "sentiment": "positive|negative|neutral|mixed",
  "targetAudience": ["audience1", "audience2"],
  "suggestedHashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "highlights": [
    {
      "startTime": start_in_seconds,
      "endTime": end_in_seconds,
      "type": "hook|highlight|conclusion|key_point|emotional_peak",
      "confidence": 0.0-1.0,
      "summary": "Why this moment is engaging",
      "engagementScore": 0-100,
      "keywords": ["keyword1", "keyword2"]
    }
  ],
  "clipRecommendations": [
    {
      "id": "clip_1",
      "title": "Catchy title for the clip",
      "startTime": start_in_seconds,
      "endTime": end_in_seconds,
      "duration": duration_in_seconds,
      "type": "hook|highlight|conclusion",
      "confidence": 0.0-1.0,
      "summary": "What makes this clip special",
      "hashtags": ["#relevant", "#hashtags"],
      "description": "Engaging description for social media",
      "viralPotential": 0-100,
      "targetPlatforms": ["tiktok", "youtube", "instagram"]
    }
  ]
}

Requirements:
- Identify ${clipCount} best clips for ${targetPlatform}
- Each clip should be ${minClipDuration}-${maxClipDuration} seconds
- Prioritize: hooks (attention-grabbing openings), emotional peaks, and actionable conclusions
- Score viral potential based on: controversy, emotion, uniqueness, relatability
`;

            const result = await this.model.generateContent(prompt);
            const response = result.response.text();

            // Parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return this.getMockAnalysis(transcript, duration);
        } catch (error) {
            console.error('Gemini analysis error:', error);
            return this.getMockAnalysis(transcript, duration);
        }
    }

    /**
     * Generate captions with word-level timing
     */
    async generateCaptions(
        transcript: string,
        segments: TranscriptSegment[],
        options: {
            style?: 'karaoke' | 'word-by-word' | 'sentence' | 'minimal';
            highlightKeywords?: boolean;
        } = {}
    ): Promise<TranscriptSegment[]> {
        if (!this.isConfigured() || !this.model) {
            return segments;
        }

        const { style = 'karaoke', highlightKeywords = true } = options;

        try {
            const prompt = `
You are a caption timing expert. Given these transcript segments, optimize them for ${style} style captions.

SEGMENTS:
${JSON.stringify(segments, null, 2)}

Requirements:
- Split long segments into 3-5 word phrases for readability
- Ensure smooth timing transitions
${highlightKeywords ? '- Mark important keywords for emphasis' : ''}
- Output the same format but with optimized timing

Return JSON array of optimized segments.
`;

            const result = await this.model.generateContent(prompt);
            const response = result.response.text();

            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return segments;
        } catch (error) {
            console.error('Caption generation error:', error);
            return segments;
        }
    }

    /**
     * Generate engaging title and description
     */
    async generateMetadata(
        transcript: string,
        platform: string
    ): Promise<{
        title: string;
        description: string;
        hashtags: string[];
        callToAction: string;
    }> {
        if (!this.isConfigured() || !this.model) {
            return {
                title: 'Generated Video Clip',
                description: 'Check out this clip!',
                hashtags: ['#viral', '#trending', '#foryou'],
                callToAction: 'Follow for more!',
            };
        }

        try {
            const prompt = `
Generate viral-worthy metadata for a ${platform} video.

TRANSCRIPT:
"""
${transcript.slice(0, 1000)}
"""

Return JSON:
{
  "title": "Attention-grabbing title (max 100 chars)",
  "description": "Engaging description (max 300 chars)",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "callToAction": "Compelling CTA"
}
`;

            const result = await this.model.generateContent(prompt);
            const response = result.response.text();

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return {
                title: 'Generated Video Clip',
                description: 'Check out this clip!',
                hashtags: ['#viral', '#trending', '#foryou'],
                callToAction: 'Follow for more!',
            };
        } catch (error) {
            console.error('Metadata generation error:', error);
            return {
                title: 'Generated Video Clip',
                description: 'Check out this clip!',
                hashtags: ['#viral', '#trending', '#foryou'],
                callToAction: 'Follow for more!',
            };
        }
    }

    // ============================================================================
    // MOCK DATA (for development/fallback)
    // ============================================================================

    private getMockTranscription(): TranscriptionResult {
        return {
            fullText: `Welcome to today's discussion about AI and the future of work. 
        AI is transforming every industry, and we need to understand how to adapt. 
        The key is to focus on uniquely human skills like creativity, empathy, and complex problem-solving. 
        Don't fear AI, but learn to work alongside it for a better future.`,
            segments: [
                { start: 0, end: 5, text: "Welcome to today's discussion", confidence: 0.95, emotion: 'neutral' },
                { start: 5, end: 10, text: "about AI and the future of work.", confidence: 0.94, emotion: 'neutral' },
                { start: 10, end: 18, text: "AI is transforming every industry,", confidence: 0.93, emotion: 'excited' },
                { start: 18, end: 25, text: "and we need to understand how to adapt.", confidence: 0.92, emotion: 'serious' },
                { start: 25, end: 32, text: "The key is to focus on uniquely human skills", confidence: 0.94, emotion: 'neutral' },
                { start: 32, end: 40, text: "like creativity, empathy, and complex problem-solving.", confidence: 0.95, emotion: 'neutral' },
                { start: 40, end: 47, text: "Don't fear AI, but learn to work alongside it", confidence: 0.93, emotion: 'serious' },
                { start: 47, end: 52, text: "for a better future.", confidence: 0.96, emotion: 'happy' },
            ],
            language: 'en',
            duration: 52,
            wordCount: 52,
        };
    }

    private getMockAnalysis(transcript: string, duration: number): ContentAnalysis {
        return {
            summary: 'Discussion about AI transformation and the importance of maintaining human skills in an automated future.',
            mainTopics: ['AI', 'Future of Work', 'Human Skills', 'Adaptation'],
            keyPoints: [
                'AI is transforming every industry',
                'Focus on uniquely human skills',
                'Learn to work alongside AI',
            ],
            sentiment: 'positive',
            targetAudience: ['Professionals', 'Tech enthusiasts', 'Business leaders'],
            suggestedHashtags: ['#AI', '#FutureOfWork', '#Technology', '#Innovation', '#Skills'],
            highlights: [
                {
                    startTime: 0,
                    endTime: 15,
                    type: 'hook',
                    confidence: 0.95,
                    summary: 'Engaging opening about AI transformation',
                    engagementScore: 85,
                    keywords: ['AI', 'future', 'work'],
                },
                {
                    startTime: 25,
                    endTime: 40,
                    type: 'highlight',
                    confidence: 0.89,
                    summary: 'Key point about human skills',
                    engagementScore: 78,
                    keywords: ['creativity', 'empathy', 'problem-solving'],
                },
                {
                    startTime: 40,
                    endTime: 52,
                    type: 'conclusion',
                    confidence: 0.92,
                    summary: 'Inspiring call to action',
                    engagementScore: 82,
                    keywords: ['learn', 'future', 'collaboration'],
                },
            ],
            clipRecommendations: [
                {
                    id: 'clip_1',
                    title: 'The AI Revolution is Here 🚀',
                    startTime: 0,
                    endTime: 18,
                    duration: 18,
                    type: 'hook',
                    confidence: 0.95,
                    summary: 'Powerful hook about AI transformation',
                    hashtags: ['#AI', '#Tech', '#FutureIsNow'],
                    description: 'AI is changing EVERYTHING. Here\'s what you need to know...',
                    viralPotential: 85,
                    targetPlatforms: ['tiktok', 'youtube', 'instagram'],
                },
                {
                    id: 'clip_2',
                    title: 'Skills AI Can\'t Replace 💡',
                    startTime: 25,
                    endTime: 45,
                    duration: 20,
                    type: 'highlight',
                    confidence: 0.89,
                    summary: 'Essential human skills for the AI age',
                    hashtags: ['#CareerTips', '#FutureSkills', '#Success'],
                    description: 'These 3 skills will make you irreplaceable in the AI era...',
                    viralPotential: 78,
                    targetPlatforms: ['tiktok', 'linkedin', 'instagram'],
                },
                {
                    id: 'clip_3',
                    title: 'Work WITH AI, Not Against It 🤝',
                    startTime: 40,
                    endTime: 52,
                    duration: 12,
                    type: 'conclusion',
                    confidence: 0.92,
                    summary: 'Inspiring conclusion with clear takeaway',
                    hashtags: ['#Motivation', '#AICollaboration', '#Growth'],
                    description: 'Stop fearing AI. Start leveraging it. Here\'s how...',
                    viralPotential: 82,
                    targetPlatforms: ['tiktok', 'youtube', 'instagram'],
                },
            ],
        };
    }
}

// Export singleton instance
export const geminiService = new GeminiService();

export default GeminiService;
