'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoProcessor } from '@/hooks';
import { GlassCard, GlassPanel, AnimatedButton, GradientButton } from '@/components/ui';
import {
    Link2,
    Play,
    Loader2,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Video,
    Scissors,
    Copy,
    Download,
    Share2,
} from 'lucide-react';

// ============================================================================
// VIDEO PROCESSOR COMPONENT
// ============================================================================

export function VideoProcessor() {
    const [url, setUrl] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
    const [clipCount, setClipCount] = useState(3);

    const {
        isLoading,
        isValidating,
        error,
        data,
        validation,
        progress,
        validateUrl,
        processVideo,
        reset
    } = useVideoProcessor({
        onSuccess: () => {
            // Could trigger a notification or analytics event
        },
    });

    // Handle URL input change with debounced validation
    const handleUrlChange = async (value: string) => {
        setUrl(value);
        if (value.length > 10) {
            await validateUrl(value);
        }
    };

    // Handle processing
    const handleProcess = async () => {
        if (!url || !validation?.isValid) return;

        await processVideo(url, {
            clipCount,
            targetPlatform: selectedPlatform,
        });
    };

    // Reset and start over
    const handleReset = () => {
        setUrl('');
        reset();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Transform Your Videos
                </h1>
                <p className="text-white/60">
                    Paste any video URL and let AI create viral short clips
                </p>
            </div>

            {/* URL Input Section */}
            {!data && (
                <GlassPanel variant="strong" className="p-6">
                    <div className="space-y-6">
                        {/* URL Input */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Video URL
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                                    <Link2 className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    placeholder="Paste YouTube, TikTok, or Instagram URL..."
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon-blue/50 focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {isValidating && <Loader2 className="w-5 h-5 text-neon-blue animate-spin" />}
                                    {validation?.isValid && <CheckCircle className="w-5 h-5 text-neon-green" />}
                                    {validation && !validation.isValid && <AlertCircle className="w-5 h-5 text-neon-pink" />}
                                </div>
                            </div>

                            {/* Validation Status */}
                            <AnimatePresence>
                                {validation && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-2"
                                    >
                                        {validation.isValid ? (
                                            <div className="flex items-center gap-2 text-sm text-neon-green">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Valid {validation.platform} video detected</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-neon-pink">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{validation.error}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Target Platform */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Optimize For
                                </label>
                                <div className="flex gap-2">
                                    {['tiktok', 'youtube', 'instagram'].map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => setSelectedPlatform(platform)}
                                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedPlatform === platform
                                                    ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue'
                                                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                                                }`}
                                        >
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clip Count */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Number of Clips
                                </label>
                                <div className="flex gap-2">
                                    {[1, 3, 5].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setClipCount(count)}
                                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${clipCount === count
                                                    ? 'bg-neon-purple/20 border border-neon-purple/50 text-neon-purple'
                                                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                                                }`}
                                        >
                                            {count} Clip{count > 1 ? 's' : ''}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Process Button */}
                        <GradientButton
                            onClick={handleProcess}
                            disabled={!validation?.isValid || isLoading}
                            className="w-full"
                            size="lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Processing... {progress}%</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>Generate Clips with AI</span>
                                </>
                            )}
                        </GradientButton>

                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="p-4 bg-neon-pink/10 border border-neon-pink/30 rounded-xl">
                                <p className="text-neon-pink text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                </GlassPanel>
            )}

            {/* Results Section */}
            {data && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Video Info Header */}
                    <GlassCard variant="neon" className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {data.metadata.thumbnailUrl && (
                                    <img
                                        src={data.metadata.thumbnailUrl}
                                        alt={data.metadata.title}
                                        className="w-20 h-12 object-cover rounded-lg"
                                    />
                                )}
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        {data.metadata.title}
                                    </h2>
                                    <p className="text-white/60 text-sm">
                                        {data.platform} • {data.transcription.duration}s • {data.transcription.wordCount} words
                                    </p>
                                </div>
                            </div>
                            <AnimatedButton
                                variant="ghost"
                                onClick={handleReset}
                            >
                                Process Another
                            </AnimatedButton>
                        </div>
                    </GlassCard>

                    {/* Analysis Summary */}
                    <GlassPanel variant="default" className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-neon-blue" />
                            AI Analysis
                        </h3>
                        <p className="text-white/80 mb-4">{data.analysis.summary}</p>
                        <div className="flex flex-wrap gap-2">
                            {data.analysis.suggestedHashtags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* Generated Clips */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Scissors className="w-5 h-5 text-neon-purple" />
                            Generated Clips ({data.clips.length})
                        </h3>
                        <div className="grid gap-4">
                            {data.clips.map((clip, index) => (
                                <GlassCard
                                    key={clip.id}
                                    variant="default"
                                    glowColor={index === 0 ? 'blue' : 'none'}
                                    hoverGlow
                                    className="p-5"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Thumbnail */}
                                        <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                                            {clip.thumbnailUrl && (
                                                <img
                                                    src={clip.thumbnailUrl}
                                                    alt={clip.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <Play className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 rounded text-xs text-white">
                                                {clip.duration}s
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${clip.type === 'hook'
                                                        ? 'bg-neon-green/20 text-neon-green'
                                                        : clip.type === 'conclusion'
                                                            ? 'bg-neon-pink/20 text-neon-pink'
                                                            : 'bg-neon-blue/20 text-neon-blue'
                                                    }`}>
                                                    {clip.type}
                                                </span>
                                                <span className="text-white/40 text-xs">
                                                    {clip.confidence}% confidence
                                                </span>
                                            </div>
                                            <h4 className="text-white font-medium truncate">
                                                {clip.title}
                                            </h4>
                                            <p className="text-white/60 text-sm mt-1 line-clamp-2">
                                                {clip.summary}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-white/40 text-xs">
                                                    Viral Score: {clip.viralPotential}%
                                                </span>
                                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                                                        style={{ width: `${clip.viralPotential}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2">
                                            <AnimatedButton variant="secondary" size="sm">
                                                <Video className="w-4 h-4" />
                                                Edit
                                            </AnimatedButton>
                                            <AnimatedButton variant="ghost" size="sm">
                                                <Download className="w-4 h-4" />
                                                Export
                                            </AnimatedButton>
                                        </div>
                                    </div>

                                    {/* Hashtags */}
                                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                                        {clip.hashtags.slice(0, 5).map((tag, i) => (
                                            <button
                                                key={i}
                                                className="px-2 py-0.5 text-xs text-white/50 hover:text-neon-blue hover:bg-neon-blue/10 rounded transition-colors"
                                                onClick={() => navigator.clipboard.writeText(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                        <button className="px-2 py-0.5 text-xs text-white/30 hover:text-white/60 transition-colors">
                                            <Copy className="w-3 h-3 inline-block mr-1" />
                                            Copy All
                                        </button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default VideoProcessor;
