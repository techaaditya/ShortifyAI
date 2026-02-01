/**
 * Video URL Validation & Metadata Extraction
 * 
 * Supports: YouTube, TikTok, Instagram Reels, Twitter/X, Facebook, LinkedIn
 */

// ============================================================================
// TYPES
// ============================================================================

export type SupportedPlatform = 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'unknown';

export interface VideoUrlInfo {
    isValid: boolean;
    platform: SupportedPlatform;
    videoId: string | null;
    cleanUrl: string | null;
    embedUrl: string | null;
    thumbnailUrl: string | null;
    error?: string;
}

export interface PlatformVideoMeta {
    title?: string;
    description?: string;
    duration?: number;
    thumbnailUrl?: string;
    authorName?: string;
    authorUrl?: string;
    platform: SupportedPlatform;
    uploadDate?: string;
    viewCount?: number;
}

// ============================================================================
// URL PATTERNS
// ============================================================================

const URL_PATTERNS: Record<SupportedPlatform, RegExp[]> = {
    youtube: [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ],
    tiktok: [
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
        /(?:https?:\/\/)?(?:vm\.|vt\.)?tiktok\.com\/(\w+)/,
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/t\/(\w+)/,
    ],
    instagram: [
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/tv\/([a-zA-Z0-9_-]+)/,
    ],
    twitter: [
        /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/\w+\/status\/(\d+)/,
    ],
    facebook: [
        /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[\w.]+\/videos\/(\d+)/,
        /(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch\/?\?v=(\d+)/,
        /(?:https?:\/\/)?(?:www\.)?fb\.watch\/(\w+)/,
    ],
    linkedin: [
        /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/posts\/[\w-]+-(\d+)/,
        /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/feed\/update\/urn:li:activity:(\d+)/,
    ],
    unknown: [],
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Detect platform from URL
 */
export function detectPlatform(url: string): SupportedPlatform {
    const normalizedUrl = url.trim().toLowerCase();

    for (const [platform, patterns] of Object.entries(URL_PATTERNS)) {
        if (platform === 'unknown') continue;

        for (const pattern of patterns) {
            if (pattern.test(normalizedUrl) || pattern.test(url)) {
                return platform as SupportedPlatform;
            }
        }
    }

    // Fallback detection based on domain
    if (normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) return 'youtube';
    if (normalizedUrl.includes('tiktok.com')) return 'tiktok';
    if (normalizedUrl.includes('instagram.com')) return 'instagram';
    if (normalizedUrl.includes('twitter.com') || normalizedUrl.includes('x.com')) return 'twitter';
    if (normalizedUrl.includes('facebook.com') || normalizedUrl.includes('fb.watch')) return 'facebook';
    if (normalizedUrl.includes('linkedin.com')) return 'linkedin';

    return 'unknown';
}

/**
 * Extract video ID from URL
 */
export function extractVideoId(url: string): string | null {
    const platform = detectPlatform(url);
    const patterns = URL_PATTERNS[platform];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

/**
 * Validate video URL and extract info
 */
export function validateVideoUrl(url: string): VideoUrlInfo {
    // Basic URL validation
    if (!url || typeof url !== 'string') {
        return {
            isValid: false,
            platform: 'unknown',
            videoId: null,
            cleanUrl: null,
            embedUrl: null,
            thumbnailUrl: null,
            error: 'URL is required',
        };
    }

    // Trim and normalize
    const trimmedUrl = url.trim();

    // Check if valid URL format
    try {
        new URL(trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`);
    } catch {
        return {
            isValid: false,
            platform: 'unknown',
            videoId: null,
            cleanUrl: null,
            embedUrl: null,
            thumbnailUrl: null,
            error: 'Invalid URL format',
        };
    }

    const platform = detectPlatform(trimmedUrl);

    if (platform === 'unknown') {
        return {
            isValid: false,
            platform: 'unknown',
            videoId: null,
            cleanUrl: null,
            embedUrl: null,
            thumbnailUrl: null,
            error: 'Unsupported platform. Supported: YouTube, TikTok, Instagram, Twitter/X, Facebook, LinkedIn',
        };
    }

    const videoId = extractVideoId(trimmedUrl);

    if (!videoId) {
        return {
            isValid: false,
            platform,
            videoId: null,
            cleanUrl: null,
            embedUrl: null,
            thumbnailUrl: null,
            error: `Could not extract video ID from ${platform} URL`,
        };
    }

    // Generate clean and embed URLs
    const { cleanUrl, embedUrl, thumbnailUrl } = generateUrls(platform, videoId);

    return {
        isValid: true,
        platform,
        videoId,
        cleanUrl,
        embedUrl,
        thumbnailUrl,
    };
}

/**
 * Generate clean, embed, and thumbnail URLs
 */
function generateUrls(platform: SupportedPlatform, videoId: string): {
    cleanUrl: string;
    embedUrl: string | null;
    thumbnailUrl: string | null;
} {
    switch (platform) {
        case 'youtube':
            return {
                cleanUrl: `https://www.youtube.com/watch?v=${videoId}`,
                embedUrl: `https://www.youtube.com/embed/${videoId}`,
                thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            };
        case 'tiktok':
            return {
                cleanUrl: `https://www.tiktok.com/@/video/${videoId}`,
                embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
                thumbnailUrl: null, // TikTok requires API for thumbnails
            };
        case 'instagram':
            return {
                cleanUrl: `https://www.instagram.com/reel/${videoId}/`,
                embedUrl: `https://www.instagram.com/reel/${videoId}/embed/`,
                thumbnailUrl: null, // Instagram requires API for thumbnails
            };
        case 'twitter':
            return {
                cleanUrl: `https://twitter.com/i/status/${videoId}`,
                embedUrl: null,
                thumbnailUrl: null,
            };
        case 'facebook':
            return {
                cleanUrl: `https://www.facebook.com/watch/?v=${videoId}`,
                embedUrl: `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${videoId}`,
                thumbnailUrl: null,
            };
        case 'linkedin':
            return {
                cleanUrl: `https://www.linkedin.com/feed/update/urn:li:activity:${videoId}`,
                embedUrl: null,
                thumbnailUrl: null,
            };
        default:
            return {
                cleanUrl: '',
                embedUrl: null,
                thumbnailUrl: null,
            };
    }
}

// ============================================================================
// METADATA FETCHING (oEmbed)
// ============================================================================

/**
 * Fetch video metadata using oEmbed
 */
export async function fetchVideoMetadata(url: string): Promise<PlatformVideoMeta | null> {
    const validation = validateVideoUrl(url);

    if (!validation.isValid || !validation.cleanUrl) {
        return null;
    }

    const { platform, cleanUrl } = validation;

    try {
        switch (platform) {
            case 'youtube':
                return await fetchYouTubeMetadata(cleanUrl);
            case 'tiktok':
                return await fetchTikTokMetadata(cleanUrl);
            case 'instagram':
                return await fetchInstagramMetadata(cleanUrl);
            default:
                return {
                    platform,
                    title: 'Video from ' + platform,
                };
        }
    } catch (error) {
        console.error(`Error fetching metadata for ${platform}:`, error);
        return null;
    }
}

async function fetchYouTubeMetadata(url: string): Promise<PlatformVideoMeta> {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

    try {
        const response = await fetch(oembedUrl, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`YouTube oEmbed failed: ${response.status}`);
        }

        const data = await response.json();

        return {
            platform: 'youtube',
            title: data.title,
            authorName: data.author_name,
            authorUrl: data.author_url,
            thumbnailUrl: data.thumbnail_url,
        };
    } catch {
        return {
            platform: 'youtube',
            title: 'YouTube Video',
        };
    }
}

async function fetchTikTokMetadata(url: string): Promise<PlatformVideoMeta> {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(oembedUrl, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`TikTok oEmbed failed: ${response.status}`);
        }

        const data = await response.json();

        return {
            platform: 'tiktok',
            title: data.title,
            authorName: data.author_name,
            authorUrl: data.author_url,
            thumbnailUrl: data.thumbnail_url,
        };
    } catch {
        return {
            platform: 'tiktok',
            title: 'TikTok Video',
        };
    }
}

async function fetchInstagramMetadata(url: string): Promise<PlatformVideoMeta> {
    // Instagram oEmbed requires app credentials, return basic info
    return {
        platform: 'instagram',
        title: 'Instagram Reel',
    };
}

// ============================================================================
// PLATFORM-SPECIFIC UTILITIES
// ============================================================================

/**
 * Get recommended clip duration range for platform
 */
export function getRecommendedDuration(platform: SupportedPlatform): {
    min: number;
    max: number;
    optimal: number;
} {
    switch (platform) {
        case 'tiktok':
            return { min: 15, max: 180, optimal: 45 };
        case 'youtube':
            return { min: 15, max: 60, optimal: 45 }; // YouTube Shorts
        case 'instagram':
            return { min: 15, max: 90, optimal: 30 }; // Reels
        case 'twitter':
            return { min: 10, max: 140, optimal: 30 };
        case 'linkedin':
            return { min: 30, max: 180, optimal: 60 };
        case 'facebook':
            return { min: 15, max: 120, optimal: 45 };
        default:
            return { min: 15, max: 60, optimal: 30 };
    }
}

/**
 * Get aspect ratio for platform
 */
export function getAspectRatio(platform: SupportedPlatform): {
    width: number;
    height: number;
    ratio: string;
} {
    switch (platform) {
        case 'tiktok':
        case 'instagram':
        case 'youtube': // Shorts
            return { width: 1080, height: 1920, ratio: '9:16' };
        case 'twitter':
        case 'linkedin':
            return { width: 1080, height: 1080, ratio: '1:1' };
        case 'facebook':
            return { width: 1080, height: 1920, ratio: '9:16' };
        default:
            return { width: 1920, height: 1080, ratio: '16:9' };
    }
}

/**
 * Check if URL is a short-form video
 */
export function isShortFormVideo(url: string): boolean {
    const normalizedUrl = url.toLowerCase();

    // YouTube Shorts
    if (normalizedUrl.includes('youtube.com/shorts/')) return true;

    // TikTok is always short-form
    if (normalizedUrl.includes('tiktok.com')) return true;

    // Instagram Reels
    if (normalizedUrl.includes('instagram.com/reel/')) return true;

    return false;
}

export default {
    validateVideoUrl,
    detectPlatform,
    extractVideoId,
    fetchVideoMetadata,
    getRecommendedDuration,
    getAspectRatio,
    isShortFormVideo,
};
