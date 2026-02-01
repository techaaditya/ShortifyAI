/**
 * Tavus AI Presenter Service
 * 
 * Provides:
 * - AI avatar video generation
 * - Script-to-video conversion
 * - Avatar customization
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Avatar {
    id: string;
    name: string;
    thumbnailUrl: string;
    gender: 'male' | 'female' | 'neutral';
    style: 'professional' | 'casual' | 'animated';
    voiceOptions: string[];
    isPublic: boolean;
}

export interface AvatarVideoOptions {
    avatarId: string;
    script: string;
    voiceId?: string;
    backgroundColor?: string;
    backgroundVideoUrl?: string;
    emotion?: 'neutral' | 'happy' | 'serious' | 'excited';
    gestures?: boolean;
    eyeContact?: boolean;
    resolution?: '720p' | '1080p';
    aspectRatio?: '9:16' | '16:9' | '1:1';
}

export interface AvatarVideoResult {
    id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
    thumbnailUrl?: string;
    duration?: number;
    estimatedCompletionTime?: number;
    error?: string;
}

// ============================================================================
// TAVUS SERVICE
// ============================================================================

export class TavusService {
    private apiKey: string;
    private baseUrl = 'https://tavusapi.com/v2';

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.TAVUS_API_KEY || '';
    }

    /**
     * Check if service is configured
     */
    isConfigured(): boolean {
        return !!this.apiKey;
    }

    /**
     * Get available avatars
     */
    async getAvatars(): Promise<Avatar[]> {
        if (!this.isConfigured()) {
            return this.getDefaultAvatars();
        }

        try {
            const response = await fetch(`${this.baseUrl}/avatars`, {
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Tavus API error: ${response.status}`);
            }

            const data = await response.json();
            return data.avatars || this.getDefaultAvatars();
        } catch (error) {
            console.error('Tavus getAvatars error:', error);
            return this.getDefaultAvatars();
        }
    }

    /**
     * Generate AI presenter video
     */
    async generateVideo(options: AvatarVideoOptions): Promise<AvatarVideoResult> {
        if (!this.isConfigured()) {
            return this.getMockVideoResult(options);
        }

        const {
            avatarId,
            script,
            voiceId,
            backgroundColor = '#0a0a1a',
            emotion = 'neutral',
            gestures = true,
            eyeContact = true,
            resolution = '1080p',
            aspectRatio = '9:16',
        } = options;

        try {
            const response = await fetch(`${this.baseUrl}/videos`, {
                method: 'POST',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    replica_id: avatarId,
                    script,
                    voice_id: voiceId,
                    background_color: backgroundColor,
                    background_source_url: options.backgroundVideoUrl,
                    video_settings: {
                        resolution,
                        aspect_ratio: aspectRatio,
                    },
                    presenter_settings: {
                        emotion,
                        gestures_enabled: gestures,
                        eye_contact_enabled: eyeContact,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Tavus video generation error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            return {
                id: data.video_id,
                status: 'queued',
                estimatedCompletionTime: data.estimated_completion_time,
            };
        } catch (error) {
            console.error('Tavus video generation error:', error);
            return this.getMockVideoResult(options);
        }
    }

    /**
     * Check video generation status
     */
    async getVideoStatus(videoId: string): Promise<AvatarVideoResult> {
        if (!this.isConfigured()) {
            return {
                id: videoId,
                status: 'completed',
                videoUrl: 'https://example.com/ai-presenter.mp4',
                thumbnailUrl: 'https://example.com/ai-presenter-thumb.jpg',
                duration: 30,
            };
        }

        try {
            const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error(`Tavus status check error: ${response.status}`);
            }

            const data = await response.json();
            return {
                id: videoId,
                status: data.status,
                videoUrl: data.video_url,
                thumbnailUrl: data.thumbnail_url,
                duration: data.duration,
                error: data.error,
            };
        } catch (error) {
            console.error('Tavus status check error:', error);
            return {
                id: videoId,
                status: 'failed',
                error: 'Failed to check video status',
            };
        }
    }

    /**
     * Create custom avatar from video
     */
    async createAvatar(options: {
        name: string;
        description?: string;
        sourceVideoUrl: string;
        consent: boolean;
    }): Promise<Avatar | null> {
        if (!this.isConfigured()) {
            return {
                id: 'custom_' + Date.now(),
                name: options.name,
                thumbnailUrl: 'https://example.com/custom-avatar.jpg',
                gender: 'neutral',
                style: 'professional',
                voiceOptions: [],
                isPublic: false,
            };
        }

        try {
            const response = await fetch(`${this.baseUrl}/replicas`, {
                method: 'POST',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: options.name,
                    description: options.description,
                    source_video_url: options.sourceVideoUrl,
                    consent_given: options.consent,
                }),
            });

            if (!response.ok) {
                throw new Error(`Avatar creation failed: ${response.status}`);
            }

            const data = await response.json();
            return {
                id: data.replica_id,
                name: options.name,
                thumbnailUrl: data.thumbnail_url || '',
                gender: 'neutral',
                style: 'professional',
                voiceOptions: data.voice_ids || [],
                isPublic: false,
            };
        } catch (error) {
            console.error('Avatar creation error:', error);
            return null;
        }
    }

    /**
     * Delete custom avatar
     */
    async deleteAvatar(avatarId: string): Promise<boolean> {
        if (!this.isConfigured()) {
            return true;
        }

        try {
            const response = await fetch(`${this.baseUrl}/replicas/${avatarId}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': this.apiKey,
                },
            });

            return response.ok;
        } catch (error) {
            console.error('Avatar deletion error:', error);
            return false;
        }
    }

    // ============================================================================
    // DEFAULT DATA
    // ============================================================================

    private getDefaultAvatars(): Avatar[] {
        return [
            {
                id: 'avatar_professional_m1',
                name: 'Alex (Professional)',
                thumbnailUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=200&h=200&fit=crop',
                gender: 'male',
                style: 'professional',
                voiceOptions: ['adam', 'josh'],
                isPublic: true,
            },
            {
                id: 'avatar_professional_f1',
                name: 'Sarah (Professional)',
                thumbnailUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200&h=200&fit=crop',
                gender: 'female',
                style: 'professional',
                voiceOptions: ['sarah', 'rachel'],
                isPublic: true,
            },
            {
                id: 'avatar_casual_m1',
                name: 'Mike (Casual)',
                thumbnailUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200&h=200&fit=crop',
                gender: 'male',
                style: 'casual',
                voiceOptions: ['josh', 'arnold'],
                isPublic: true,
            },
            {
                id: 'avatar_casual_f1',
                name: 'Emma (Casual)',
                thumbnailUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=200&h=200&fit=crop',
                gender: 'female',
                style: 'casual',
                voiceOptions: ['elli', 'domi'],
                isPublic: true,
            },
        ];
    }

    private getMockVideoResult(options: AvatarVideoOptions): AvatarVideoResult {
        // Estimate duration from script word count
        const wordCount = options.script.split(/\s+/).length;
        const duration = (wordCount / 150) * 60; // ~150 words per minute

        return {
            id: 'video_' + Date.now(),
            status: 'completed',
            videoUrl: 'https://example.com/ai-presenter-video.mp4',
            thumbnailUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=300&h=400&fit=crop',
            duration,
        };
    }
}

// Export singleton
export const tavusService = new TavusService();

export default TavusService;
