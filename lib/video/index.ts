/**
 * Video Services Index
 * 
 * Central export for all video processing services
 */

// URL Validation & Metadata
export {
    validateVideoUrl,
    detectPlatform,
    extractVideoId,
    fetchVideoMetadata,
    getRecommendedDuration,
    getAspectRatio,
    isShortFormVideo,
    type SupportedPlatform,
    type VideoUrlInfo,
    type PlatformVideoMeta,
} from './url-validator';

// Gemini AI Service
export {
    GeminiService,
    geminiService,
    type TranscriptSegment,
    type TranscriptionResult,
    type ContentHighlight,
    type ClipRecommendation,
    type ContentAnalysis,
} from './gemini-service';

// ElevenLabs Voice Service
export {
    ElevenLabsService,
    elevenLabsService,
    type Voice,
    type VoiceSettings,
    type TextToSpeechOptions,
    type VoiceCloneOptions,
    type SpeechResult,
} from './elevenlabs-service';

// Tavus AI Presenter Service
export {
    TavusService,
    tavusService,
    type Avatar,
    type AvatarVideoOptions,
    type AvatarVideoResult,
} from './tavus-service';
