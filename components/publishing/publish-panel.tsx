'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PLATFORM_CONFIG,
    type SocialPlatform,
    type SocialConnection,
    type PublishOptions,
} from '@/lib/publishing/social-publishing';
import { GlassCard, GlassPanel, AnimatedButton, GradientButton } from '@/components/ui';
import {
    Link2,
    Check,
    X,
    Calendar,
    Clock,
    Send,
    Loader2,
    AlertCircle,
    CheckCircle,
    ChevronDown,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface PublishPanelProps {
    clipId: string;
    clipTitle: string;
    thumbnailUrl?: string;
    connections: SocialConnection[];
    onConnect: (platform: SocialPlatform) => void;
    onPublish: (platforms: SocialPlatform[], options: PublishOptions) => Promise<void>;
    onSchedule: (platforms: SocialPlatform[], options: PublishOptions, scheduledFor: Date) => Promise<void>;
}

// ============================================================================
// PLATFORM ICON COMPONENT
// ============================================================================

const PlatformIcon: React.FC<{ platform: SocialPlatform; size?: number }> = ({
    platform,
    size = 24
}) => {
    const config = PLATFORM_CONFIG[platform];

    return (
        <div
            className="flex items-center justify-center rounded-lg"
            style={{
                width: size,
                height: size,
                backgroundColor: config.color + '20',
            }}
        >
            <span style={{ fontSize: size * 0.6 }}>{config.icon}</span>
        </div>
    );
};

// ============================================================================
// PUBLISH PANEL COMPONENT
// ============================================================================

export function PublishPanel({
    clipId,
    clipTitle,
    thumbnailUrl,
    connections,
    onConnect,
    onPublish,
    onSchedule,
}: PublishPanelProps) {
    const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [showScheduler, setShowScheduler] = useState(false);
    const [scheduledDate, setScheduledDate] = useState<string>('');
    const [scheduledTime, setScheduledTime] = useState<string>('');
    const [publishOptions, setPublishOptions] = useState<PublishOptions>({
        title: clipTitle,
        description: '',
        hashtags: [],
        privacy: 'public',
    });
    const [hashtagInput, setHashtagInput] = useState('');

    // Toggle platform selection
    const togglePlatform = (platform: SocialPlatform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    // Add hashtag
    const addHashtag = () => {
        if (!hashtagInput.trim()) return;

        const tag = hashtagInput.startsWith('#') ? hashtagInput : `#${hashtagInput}`;
        if (!publishOptions.hashtags.includes(tag)) {
            setPublishOptions(prev => ({
                ...prev,
                hashtags: [...prev.hashtags, tag],
            }));
        }
        setHashtagInput('');
    };

    // Remove hashtag
    const removeHashtag = (tag: string) => {
        setPublishOptions(prev => ({
            ...prev,
            hashtags: prev.hashtags.filter(h => h !== tag),
        }));
    };

    // Handle publish
    const handlePublish = async () => {
        if (selectedPlatforms.length === 0) return;

        setIsPublishing(true);
        try {
            await onPublish(selectedPlatforms, publishOptions);
        } finally {
            setIsPublishing(false);
        }
    };

    // Handle schedule
    const handleSchedule = async () => {
        if (selectedPlatforms.length === 0 || !scheduledDate || !scheduledTime) return;

        const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);

        setIsPublishing(true);
        try {
            await onSchedule(selectedPlatforms, publishOptions, scheduledFor);
            setShowScheduler(false);
        } finally {
            setIsPublishing(false);
        }
    };

    // Check if platform is connected
    const isConnected = (platform: SocialPlatform) =>
        connections.some(c => c.platform === platform && c.isActive);

    // Get connection for platform
    const getConnection = (platform: SocialPlatform) =>
        connections.find(c => c.platform === platform && c.isActive);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-white mb-2">Publish Clip</h2>
                <p className="text-white/60 text-sm">
                    Share your clip across multiple platforms simultaneously
                </p>
            </div>

            {/* Platform Selection */}
            <GlassPanel variant="default" className="p-4">
                <h3 className="text-white font-medium mb-4">Select Platforms</h3>
                <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(PLATFORM_CONFIG) as SocialPlatform[]).map((platform) => {
                        const config = PLATFORM_CONFIG[platform];
                        const connected = isConnected(platform);
                        const selected = selectedPlatforms.includes(platform);
                        const connection = getConnection(platform);

                        return (
                            <div
                                key={platform}
                                className={`relative p-4 rounded-xl border transition-all ${connected
                                        ? selected
                                            ? 'bg-neon-blue/10 border-neon-blue/50'
                                            : 'bg-white/5 border-white/10 hover:border-white/20 cursor-pointer'
                                        : 'bg-white/5 border-white/10 opacity-60'
                                    }`}
                                onClick={() => connected && togglePlatform(platform)}
                            >
                                <div className="flex items-center gap-3">
                                    <PlatformIcon platform={platform} size={32} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium">{config.name}</span>
                                            {connected && selected && (
                                                <Check className="w-4 h-4 text-neon-blue" />
                                            )}
                                        </div>
                                        {connected ? (
                                            <span className="text-xs text-white/50">
                                                {connection?.accountHandle || 'Connected'}
                                            </span>
                                        ) : (
                                            <button
                                                className="text-xs text-neon-blue hover:underline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onConnect(platform);
                                                }}
                                            >
                                                Connect Account
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Platform limits info */}
                                {selected && (
                                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/40">
                                        <span>Max {config.maxDuration}s • {config.aspectRatios.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassPanel>

            {/* Content Options */}
            {selectedPlatforms.length > 0 && (
                <GlassPanel variant="default" className="p-4">
                    <h3 className="text-white font-medium mb-4">Content Details</h3>
                    <div className="space-y-4">
                        {/* Title (for platforms that support it) */}
                        {selectedPlatforms.some(p => PLATFORM_CONFIG[p].maxTitleLength > 0) && (
                            <div>
                                <label className="block text-white/70 text-sm mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={publishOptions.title}
                                    onChange={(e) => setPublishOptions(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon-blue/50 focus:outline-none"
                                    placeholder="Enter title..."
                                />
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Description / Caption
                            </label>
                            <textarea
                                value={publishOptions.description}
                                onChange={(e) => setPublishOptions(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon-blue/50 focus:outline-none resize-none"
                                rows={3}
                                placeholder="Write a caption..."
                            />
                            <div className="mt-1 text-right text-xs text-white/40">
                                {publishOptions.description.length} / {Math.min(...selectedPlatforms.map(p => PLATFORM_CONFIG[p].maxDescriptionLength))}
                            </div>
                        </div>

                        {/* Hashtags */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Hashtags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={hashtagInput}
                                    onChange={(e) => setHashtagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:border-neon-blue/50 focus:outline-none"
                                    placeholder="Add hashtag..."
                                />
                                <AnimatedButton variant="secondary" size="sm" onClick={addHashtag}>
                                    Add
                                </AnimatedButton>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {publishOptions.hashtags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm rounded-md"
                                    >
                                        {tag}
                                        <button onClick={() => removeHashtag(tag)}>
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Privacy */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Privacy
                            </label>
                            <div className="flex gap-2">
                                {(['public', 'unlisted', 'private'] as const).map((privacy) => (
                                    <button
                                        key={privacy}
                                        onClick={() => setPublishOptions(prev => ({ ...prev, privacy }))}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize transition-all ${publishOptions.privacy === privacy
                                                ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue'
                                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                                            }`}
                                    >
                                        {privacy}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassPanel>
            )}

            {/* Schedule Options */}
            <AnimatePresence>
                {showScheduler && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <GlassPanel variant="default" className="p-4">
                            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-neon-purple" />
                                Schedule Publishing
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={scheduledDate}
                                        onChange={(e) => setScheduledDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-purple/50 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-purple/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </GlassPanel>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actions */}
            {selectedPlatforms.length > 0 && (
                <div className="flex gap-3">
                    <AnimatedButton
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowScheduler(!showScheduler)}
                    >
                        <Clock className="w-4 h-4" />
                        {showScheduler ? 'Cancel Scheduling' : 'Schedule'}
                    </AnimatedButton>

                    {showScheduler ? (
                        <GradientButton
                            className="flex-1"
                            onClick={handleSchedule}
                            disabled={isPublishing || !scheduledDate || !scheduledTime}
                        >
                            {isPublishing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Calendar className="w-4 h-4" />
                            )}
                            Schedule
                        </GradientButton>
                    ) : (
                        <GradientButton
                            className="flex-1"
                            onClick={handlePublish}
                            disabled={isPublishing}
                        >
                            {isPublishing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            Publish Now
                        </GradientButton>
                    )}
                </div>
            )}
        </div>
    );
}

export default PublishPanel;
