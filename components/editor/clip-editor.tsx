'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TimelineEditor } from './timeline-editor';
import { CaptionEditor, CaptionRenderer } from '@/components/captions';
import { VideoEffectsEditor } from '@/components/effects';
import { GlassCard, GlassPanel, AnimatedButton, GradientButton } from '@/components/ui';
import {
    CAPTION_PRESETS,
    type CaptionStyle,
    type CaptionSegment
} from '@/lib/captions';
import {
    FILTER_PRESETS,
    type FilterEffect,
    type OverlayEffect
} from '@/lib/effects';
import {
    Type,
    Sparkles,
    Layers,
    Music,
    Download,
    Share2,
    Settings,
    ChevronLeft,
    Play,
    Pause,
    Volume2,
    VolumeX,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface ClipData {
    id: string;
    title: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    duration: number;
    startTime: number;
    endTime: number;
    captions: CaptionSegment[];
}

interface ClipEditorProps {
    clip: ClipData;
    onBack?: () => void;
    onSave?: (clip: ClipData) => void;
    onExport?: (clip: ClipData, format: string) => void;
}

type EditorTab = 'captions' | 'effects' | 'audio' | 'settings';

// ============================================================================
// CLIP EDITOR COMPONENT
// ============================================================================

export function ClipEditor({
    clip,
    onBack,
    onSave,
    onExport,
}: ClipEditorProps) {
    // State
    const [activeTab, setActiveTab] = useState<EditorTab>('captions');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [captionStyle, setCaptionStyle] = useState<Partial<CaptionStyle>>(
        CAPTION_PRESETS.tiktok
    );
    const [filter, setFilter] = useState<Partial<FilterEffect>>(FILTER_PRESETS.none);
    const [overlay, setOverlay] = useState<OverlayEffect | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Playback controls
    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleTimeChange = useCallback((time: number) => {
        setCurrentTime(time);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
    }, []);

    const handleMuteToggle = useCallback(() => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    }, [isMuted]);

    // Export handler
    const handleExport = (format: string) => {
        onExport?.(clip, format);
    };

    return (
        <div className="h-screen flex flex-col bg-[#0a0a1a]">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <AnimatedButton variant="ghost" size="sm" onClick={onBack}>
                            <ChevronLeft className="w-5 h-5" />
                        </AnimatedButton>
                    )}
                    <div>
                        <h1 className="text-lg font-semibold text-white">{clip.title}</h1>
                        <p className="text-xs text-white/50">
                            {clip.duration}s • Clip Editor
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <AnimatedButton variant="secondary" onClick={() => onSave?.(clip)}>
                        Save Draft
                    </AnimatedButton>
                    <GradientButton onClick={() => handleExport('mp4')}>
                        <Download className="w-4 h-4" />
                        Export
                    </GradientButton>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Preview */}
                <div className="flex-1 flex flex-col p-6">
                    <GlassPanel variant="strong" className="flex-1 relative overflow-hidden">
                        {/* Video Player */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <div className="relative w-full max-w-[40vh] aspect-[9/16]">
                                {/* Video Element or Thumbnail */}
                                {clip.videoUrl ? (
                                    <video
                                        ref={videoRef}
                                        src={clip.videoUrl}
                                        className="w-full h-full object-cover rounded-lg"
                                        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                                        onEnded={() => setIsPlaying(false)}
                                        muted={isMuted}
                                        style={{
                                            filter: filter ? `brightness(${filter.brightness || 100}%) contrast(${filter.contrast || 100}%) saturate(${filter.saturation || 100}%)` : 'none',
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full rounded-lg bg-cover bg-center"
                                        style={{
                                            backgroundImage: clip.thumbnailUrl
                                                ? `url(${clip.thumbnailUrl})`
                                                : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                            filter: filter ? `brightness(${filter.brightness || 100}%) contrast(${filter.contrast || 100}%) saturate(${filter.saturation || 100}%)` : 'none',
                                        }}
                                    />
                                )}

                                {/* Overlay Effect */}
                                {overlay && (
                                    <div
                                        className="absolute inset-0 rounded-lg pointer-events-none"
                                        style={{
                                            opacity: overlay.opacity / 100,
                                            mixBlendMode: overlay.blendMode as any,
                                            background: overlay.type === 'gradient'
                                                ? `linear-gradient(${overlay.angle || 180}deg, ${overlay.color}, ${overlay.secondaryColor || 'transparent'})`
                                                : overlay.type === 'vignette'
                                                    ? 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%)'
                                                    : undefined,
                                        }}
                                    />
                                )}

                                {/* Caption Renderer */}
                                <CaptionRenderer
                                    segments={clip.captions}
                                    currentTime={currentTime}
                                    style={captionStyle}
                                />

                                {/* Play/Pause Overlay */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                    onClick={handlePlayPause}
                                >
                                    {!isPlaying && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                        >
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </GlassPanel>

                    {/* Timeline */}
                    <div className="mt-4">
                        <TimelineEditor
                            duration={clip.duration}
                            currentTime={currentTime}
                            isPlaying={isPlaying}
                            isMuted={isMuted}
                            clips={[
                                {
                                    id: clip.id,
                                    startTime: clip.startTime,
                                    endTime: clip.endTime,
                                    title: clip.title,
                                    color: 'rgba(0, 212, 255, 0.4)',
                                },
                            ]}
                            onTimeChange={handleTimeChange}
                            onPlayPause={handlePlayPause}
                            onMuteToggle={handleMuteToggle}
                        />
                    </div>
                </div>

                {/* Right Panel - Tools */}
                <div className="w-96 border-l border-white/10 flex flex-col">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-white/10">
                        {[
                            { id: 'captions', label: 'Captions', icon: Type },
                            { id: 'effects', label: 'Effects', icon: Sparkles },
                            { id: 'audio', label: 'Audio', icon: Music },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as EditorTab)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'text-neon-blue border-b-2 border-neon-blue bg-neon-blue/5'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {activeTab === 'captions' && (
                            <CaptionEditor
                                style={captionStyle}
                                onChange={setCaptionStyle}
                                previewText="Sample caption text"
                            />
                        )}

                        {activeTab === 'effects' && (
                            <VideoEffectsEditor
                                filter={filter}
                                overlay={overlay}
                                onFilterChange={setFilter}
                                onOverlayChange={setOverlay}
                                thumbnailUrl={clip.thumbnailUrl}
                            />
                        )}

                        {activeTab === 'audio' && (
                            <div className="space-y-6">
                                <GlassCard className="p-4">
                                    <h3 className="text-white font-medium mb-4">Audio Settings</h3>

                                    {/* Volume */}
                                    <div className="mb-4">
                                        <label className="block text-white/70 text-sm mb-2">
                                            Original Volume
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            defaultValue="100"
                                            className="w-full accent-neon-blue"
                                        />
                                    </div>

                                    {/* Background Music */}
                                    <div>
                                        <label className="block text-white/70 text-sm mb-2">
                                            Background Music
                                        </label>
                                        <AnimatedButton variant="outline" className="w-full">
                                            <Music className="w-4 h-4 mr-2" />
                                            Add Music
                                        </AnimatedButton>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-4">
                                    <h3 className="text-white font-medium mb-4">AI Voiceover</h3>
                                    <p className="text-sm text-white/50 mb-4">
                                        Add an AI-generated voiceover to your clip
                                    </p>
                                    <AnimatedButton variant="secondary" className="w-full">
                                        Generate Voiceover
                                    </AnimatedButton>
                                </GlassCard>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <GlassCard className="p-4">
                                    <h3 className="text-white font-medium mb-4">Export Settings</h3>

                                    {/* Quality */}
                                    <div className="mb-4">
                                        <label className="block text-white/70 text-sm mb-2">
                                            Quality
                                        </label>
                                        <div className="flex gap-2">
                                            {['720p', '1080p', '4K'].map((quality) => (
                                                <button
                                                    key={quality}
                                                    className="flex-1 py-2 px-3 rounded-lg text-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
                                                >
                                                    {quality}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Format */}
                                    <div className="mb-4">
                                        <label className="block text-white/70 text-sm mb-2">
                                            Format
                                        </label>
                                        <div className="flex gap-2">
                                            {['MP4', 'MOV', 'GIF'].map((format) => (
                                                <button
                                                    key={format}
                                                    className="flex-1 py-2 px-3 rounded-lg text-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
                                                >
                                                    {format}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-4">
                                    <h3 className="text-white font-medium mb-4">Branding</h3>
                                    <AnimatedButton variant="outline" className="w-full mb-3">
                                        <Layers className="w-4 h-4 mr-2" />
                                        Add Watermark
                                    </AnimatedButton>
                                    <AnimatedButton variant="outline" className="w-full">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Add Logo
                                    </AnimatedButton>
                                </GlassCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClipEditor;
