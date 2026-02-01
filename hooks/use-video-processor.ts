'use client';

import { useState, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface VideoUrlValidation {
    isValid: boolean;
    platform: string;
    videoId: string | null;
    cleanUrl: string | null;
    embedUrl: string | null;
    thumbnailUrl: string | null;
    error?: string;
}

interface TranscriptSegment {
    start: number;
    end: number;
    text: string;
    confidence: number;
    emotion?: string;
}

interface ClipRecommendation {
    id: string;
    title: string;
    startTime: number;
    endTime: number;
    duration: number;
    type: string;
    confidence: number;
    thumbnailUrl?: string;
    summary: string;
    hashtags: string[];
    description: string;
    viralPotential: number;
    targetPlatforms: string[];
}

interface ProcessedVideo {
    videoUrl: string;
    platform: string;
    embedUrl: string | null;
    metadata: {
        title: string;
        author?: string;
        thumbnailUrl?: string;
    };
    transcription: {
        fullText: string;
        segments: TranscriptSegment[];
        language: string;
        duration: number;
        wordCount: number;
    };
    analysis: {
        summary: string;
        mainTopics: string[];
        keyPoints: string[];
        sentiment: string;
        suggestedHashtags: string[];
    };
    clips: ClipRecommendation[];
    processedAt: string;
}

// ============================================================================
// HOOK: useVideoProcessor
// ============================================================================

interface UseVideoProcessorOptions {
    onSuccess?: (data: ProcessedVideo) => void;
    onError?: (error: string) => void;
}

export function useVideoProcessor(options: UseVideoProcessorOptions = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ProcessedVideo | null>(null);
    const [validation, setValidation] = useState<VideoUrlValidation | null>(null);
    const [progress, setProgress] = useState(0);

    // Validate URL
    const validateUrl = useCallback(async (url: string): Promise<VideoUrlValidation | null> => {
        setIsValidating(true);
        setError(null);

        try {
            const response = await fetch('/api/validate-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Validation failed');
            }

            setValidation(result.data);
            return result.data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Validation failed';
            setError(errorMsg);
            return null;
        } finally {
            setIsValidating(false);
        }
    }, []);

    // Process video
    const processVideo = useCallback(async (
        videoUrl: string,
        processingOptions?: {
            title?: string;
            clipCount?: number;
            targetPlatform?: string;
        }
    ): Promise<ProcessedVideo | null> => {
        setIsLoading(true);
        setError(null);
        setProgress(0);

        try {
            // Simulate progress updates
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 500);

            const response = await fetch('/api/process-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    videoUrl,
                    title: processingOptions?.title,
                    options: {
                        generateClips: true,
                        clipCount: processingOptions?.clipCount || 3,
                        addCaptions: true,
                        targetPlatform: processingOptions?.targetPlatform || 'tiktok',
                    },
                }),
            });

            clearInterval(progressInterval);

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Processing failed');
            }

            setProgress(100);
            setData(result.data);
            options.onSuccess?.(result.data);
            return result.data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Processing failed';
            setError(errorMsg);
            options.onError?.(errorMsg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [options]);

    // Reset state
    const reset = useCallback(() => {
        setIsLoading(false);
        setIsValidating(false);
        setError(null);
        setData(null);
        setValidation(null);
        setProgress(0);
    }, []);

    return {
        // State
        isLoading,
        isValidating,
        error,
        data,
        validation,
        progress,
        // Actions
        validateUrl,
        processVideo,
        reset,
    };
}

// ============================================================================
// HOOK: useVoices
// ============================================================================

interface Voice {
    id: string;
    name: string;
    category: string;
    previewUrl?: string;
}

interface SpeechResult {
    audioUrl: string;
    duration: number;
    characterCount: number;
}

export function useVoices() {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch voices
    const fetchVoices = useCallback(async (): Promise<Voice[]> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/voices');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch voices');
            }

            setVoices(result.data.voices);
            return result.data.voices;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch voices';
            setError(errorMsg);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Generate speech
    const generateSpeech = useCallback(async (
        voiceId: string,
        text: string,
        settings?: { stability?: number; similarityBoost?: number }
    ): Promise<SpeechResult | null> => {
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/voices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'tts',
                    voiceId,
                    text,
                    settings,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Speech generation failed');
            }

            return result.data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Speech generation failed';
            setError(errorMsg);
            return null;
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return {
        voices,
        isLoading,
        isGenerating,
        error,
        fetchVoices,
        generateSpeech,
    };
}

// ============================================================================
// HOOK: useAvatars
// ============================================================================

interface Avatar {
    id: string;
    name: string;
    thumbnailUrl: string;
    gender: string;
    style: string;
    voiceOptions: string[];
}

interface AvatarVideoResult {
    id: string;
    status: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    duration?: number;
    error?: string;
}

export function useAvatars() {
    const [avatars, setAvatars] = useState<Avatar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentVideo, setCurrentVideo] = useState<AvatarVideoResult | null>(null);

    // Fetch avatars
    const fetchAvatars = useCallback(async (): Promise<Avatar[]> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/avatars');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch avatars');
            }

            setAvatars(result.data.avatars);
            return result.data.avatars;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch avatars';
            setError(errorMsg);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Generate avatar video
    const generateVideo = useCallback(async (
        avatarId: string,
        script: string,
        options?: {
            voiceId?: string;
            backgroundColor?: string;
            emotion?: string;
            aspectRatio?: string;
        }
    ): Promise<AvatarVideoResult | null> => {
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/avatars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generate',
                    avatarId,
                    script,
                    ...options,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Video generation failed');
            }

            setCurrentVideo(result.data);
            return result.data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Video generation failed';
            setError(errorMsg);
            return null;
        } finally {
            setIsGenerating(false);
        }
    }, []);

    // Check video status
    const checkVideoStatus = useCallback(async (videoId: string): Promise<AvatarVideoResult | null> => {
        try {
            const response = await fetch('/api/avatars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'status',
                    videoId,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Status check failed');
            }

            setCurrentVideo(result.data);
            return result.data;
        } catch (err) {
            return null;
        }
    }, []);

    return {
        avatars,
        isLoading,
        isGenerating,
        error,
        currentVideo,
        fetchAvatars,
        generateVideo,
        checkVideoStatus,
    };
}

export default {
    useVideoProcessor,
    useVoices,
    useAvatars,
};
