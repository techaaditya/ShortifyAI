/**
 * Social Media Publishing Service
 * 
 * Handles connections and publishing to:
 * - TikTok
 * - YouTube Shorts
 * - Instagram Reels
 * - LinkedIn
 * - Twitter/X
 */

// ============================================================================
// TYPES
// ============================================================================

export type SocialPlatform = 'tiktok' | 'youtube' | 'instagram' | 'linkedin' | 'twitter';

export interface SocialConnection {
    id: string;
    platform: SocialPlatform;
    userId: string;
    accountName: string;
    accountHandle?: string;
    accountAvatar?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PublishOptions {
    title: string;
    description: string;
    hashtags: string[];
    privacy: 'public' | 'private' | 'unlisted';
    scheduledFor?: Date;
    thumbnailUrl?: string;
    callToAction?: string;
    location?: string;
    mentions?: string[];
}

export interface PublishResult {
    success: boolean;
    platform: SocialPlatform;
    postId?: string;
    postUrl?: string;
    error?: string;
    publishedAt?: Date;
}

export interface PublishQueueItem {
    id: string;
    clipId: string;
    userId: string;
    platform: SocialPlatform;
    status: 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed';
    options: PublishOptions;
    result?: PublishResult;
    scheduledFor?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================================
// PLATFORM CONFIGURATIONS
// ============================================================================

export const PLATFORM_CONFIG: Record<SocialPlatform, {
    name: string;
    icon: string;
    color: string;
    maxTitleLength: number;
    maxDescriptionLength: number;
    maxHashtags: number;
    aspectRatios: string[];
    maxDuration: number; // seconds
    supportsScheduling: boolean;
    authUrl?: string;
}> = {
    tiktok: {
        name: 'TikTok',
        icon: '🎵',
        color: '#00F2EA',
        maxTitleLength: 150,
        maxDescriptionLength: 2200,
        maxHashtags: 30,
        aspectRatios: ['9:16'],
        maxDuration: 180,
        supportsScheduling: true,
        authUrl: 'https://open-api.tiktok.com/platform/oauth/connect',
    },
    youtube: {
        name: 'YouTube',
        icon: '▶️',
        color: '#FF0000',
        maxTitleLength: 100,
        maxDescriptionLength: 5000,
        maxHashtags: 15,
        aspectRatios: ['9:16', '16:9', '1:1'],
        maxDuration: 60,
        supportsScheduling: true,
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    },
    instagram: {
        name: 'Instagram',
        icon: '📸',
        color: '#E4405F',
        maxTitleLength: 0,
        maxDescriptionLength: 2200,
        maxHashtags: 30,
        aspectRatios: ['9:16', '1:1', '4:5'],
        maxDuration: 90,
        supportsScheduling: true,
        authUrl: 'https://api.instagram.com/oauth/authorize',
    },
    linkedin: {
        name: 'LinkedIn',
        icon: '💼',
        color: '#0A66C2',
        maxTitleLength: 200,
        maxDescriptionLength: 3000,
        maxHashtags: 10,
        aspectRatios: ['1:1', '16:9', '9:16'],
        maxDuration: 180,
        supportsScheduling: true,
        authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    },
    twitter: {
        name: 'X (Twitter)',
        icon: '𝕏',
        color: '#000000',
        maxTitleLength: 0,
        maxDescriptionLength: 280,
        maxHashtags: 5,
        aspectRatios: ['16:9', '1:1'],
        maxDuration: 140,
        supportsScheduling: true,
        authUrl: 'https://twitter.com/i/oauth2/authorize',
    },
};

// ============================================================================
// SOCIAL PUBLISHING SERVICE
// ============================================================================

export class SocialPublishingService {
    private connections: Map<string, SocialConnection> = new Map();

    /**
     * Get OAuth URL for platform
     */
    getAuthUrl(platform: SocialPlatform, redirectUri: string): string {
        const config = PLATFORM_CONFIG[platform];
        const clientId = this.getClientId(platform);

        if (!config.authUrl || !clientId) {
            throw new Error(`OAuth not configured for ${platform}`);
        }

        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: this.getScopes(platform),
            state: this.generateState(platform),
        });

        return `${config.authUrl}?${params.toString()}`;
    }

    /**
     * Exchange auth code for tokens
     */
    async exchangeCode(
        platform: SocialPlatform,
        code: string,
        redirectUri: string
    ): Promise<SocialConnection | null> {
        // Mock implementation - in production, call actual OAuth endpoints
        return {
            id: `conn_${Date.now()}`,
            platform,
            userId: 'current_user',
            accountName: 'Connected Account',
            accountHandle: '@user',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    /**
     * Disconnect platform
     */
    async disconnect(connectionId: string): Promise<boolean> {
        this.connections.delete(connectionId);
        return true;
    }

    /**
     * Get connected accounts
     */
    getConnections(userId: string): SocialConnection[] {
        return Array.from(this.connections.values()).filter(c => c.userId === userId);
    }

    /**
     * Publish video to platform
     */
    async publish(
        connectionId: string,
        videoUrl: string,
        options: PublishOptions
    ): Promise<PublishResult> {
        const connection = this.connections.get(connectionId);

        if (!connection) {
            return {
                success: false,
                platform: 'tiktok',
                error: 'Connection not found',
            };
        }

        // Validate options against platform limits
        const validation = this.validatePublishOptions(connection.platform, options);
        if (!validation.valid) {
            return {
                success: false,
                platform: connection.platform,
                error: validation.error,
            };
        }

        // Mock publish - in production, call platform APIs
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            success: true,
            platform: connection.platform,
            postId: `post_${Date.now()}`,
            postUrl: `https://${connection.platform}.com/video/${Date.now()}`,
            publishedAt: new Date(),
        };
    }

    /**
     * Schedule video for later publishing
     */
    async schedule(
        connectionId: string,
        videoUrl: string,
        options: PublishOptions,
        scheduledFor: Date
    ): Promise<PublishQueueItem> {
        const connection = this.connections.get(connectionId);

        if (!connection) {
            throw new Error('Connection not found');
        }

        return {
            id: `queue_${Date.now()}`,
            clipId: 'clip_123',
            userId: connection.userId,
            platform: connection.platform,
            status: 'scheduled',
            options,
            scheduledFor,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    /**
     * Get optimal posting times for platform
     */
    getOptimalPostingTimes(platform: SocialPlatform): { day: string; times: string[] }[] {
        // Simplified optimal times based on general best practices
        const times: Record<SocialPlatform, { day: string; times: string[] }[]> = {
            tiktok: [
                { day: 'Monday', times: ['6:00 AM', '10:00 AM', '10:00 PM'] },
                { day: 'Tuesday', times: ['2:00 AM', '4:00 AM', '9:00 AM'] },
                { day: 'Wednesday', times: ['7:00 AM', '8:00 AM', '11:00 PM'] },
                { day: 'Thursday', times: ['9:00 AM', '12:00 PM', '7:00 PM'] },
                { day: 'Friday', times: ['5:00 AM', '1:00 PM', '3:00 PM'] },
                { day: 'Saturday', times: ['11:00 AM', '7:00 PM', '8:00 PM'] },
                { day: 'Sunday', times: ['7:00 AM', '8:00 AM', '4:00 PM'] },
            ],
            youtube: [
                { day: 'Thursday', times: ['12:00 PM', '3:00 PM'] },
                { day: 'Friday', times: ['9:00 AM', '12:00 PM', '3:00 PM'] },
                { day: 'Saturday', times: ['9:00 AM', '12:00 PM'] },
            ],
            instagram: [
                { day: 'Monday', times: ['6:00 AM', '10:00 AM', '10:00 PM'] },
                { day: 'Tuesday', times: ['5:00 AM', '2:00 PM'] },
                { day: 'Wednesday', times: ['11:00 AM'] },
                { day: 'Thursday', times: ['9:00 AM', '7:00 PM'] },
                { day: 'Friday', times: ['10:00 AM', '11:00 AM'] },
            ],
            linkedin: [
                { day: 'Tuesday', times: ['8:00 AM', '10:00 AM', '12:00 PM'] },
                { day: 'Wednesday', times: ['8:00 AM', '12:00 PM'] },
                { day: 'Thursday', times: ['9:00 AM', '1:00 PM', '2:00 PM'] },
            ],
            twitter: [
                { day: 'Monday', times: ['8:00 AM', '4:00 PM'] },
                { day: 'Tuesday', times: ['9:00 AM', '5:00 PM'] },
                { day: 'Wednesday', times: ['8:00 AM', '5:00 PM'] },
                { day: 'Thursday', times: ['8:00 AM', '5:00 PM'] },
                { day: 'Friday', times: ['10:00 AM', '12:00 PM'] },
            ],
        };

        return times[platform] || [];
    }

    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================

    private getClientId(platform: SocialPlatform): string {
        const envKeys: Record<SocialPlatform, string> = {
            tiktok: 'TIKTOK_CLIENT_ID',
            youtube: 'GOOGLE_CLIENT_ID',
            instagram: 'INSTAGRAM_CLIENT_ID',
            linkedin: 'LINKEDIN_CLIENT_ID',
            twitter: 'TWITTER_CLIENT_ID',
        };

        return process.env[envKeys[platform]] || '';
    }

    private getScopes(platform: SocialPlatform): string {
        const scopes: Record<SocialPlatform, string> = {
            tiktok: 'user.info.basic,video.upload,video.publish',
            youtube: 'https://www.googleapis.com/auth/youtube.upload',
            instagram: 'instagram_content_publish,instagram_basic',
            linkedin: 'w_member_social,r_basicprofile',
            twitter: 'tweet.read,tweet.write,users.read',
        };

        return scopes[platform];
    }

    private generateState(platform: SocialPlatform): string {
        return Buffer.from(JSON.stringify({
            platform,
            timestamp: Date.now(),
            nonce: Math.random().toString(36).substring(7),
        })).toString('base64');
    }

    private validatePublishOptions(
        platform: SocialPlatform,
        options: PublishOptions
    ): { valid: boolean; error?: string } {
        const config = PLATFORM_CONFIG[platform];

        if (options.title && options.title.length > config.maxTitleLength && config.maxTitleLength > 0) {
            return { valid: false, error: `Title exceeds ${config.maxTitleLength} characters` };
        }

        if (options.description.length > config.maxDescriptionLength) {
            return { valid: false, error: `Description exceeds ${config.maxDescriptionLength} characters` };
        }

        if (options.hashtags.length > config.maxHashtags) {
            return { valid: false, error: `Too many hashtags (max ${config.maxHashtags})` };
        }

        return { valid: true };
    }
}

// Export singleton
export const socialPublishingService = new SocialPublishingService();

export default SocialPublishingService;
