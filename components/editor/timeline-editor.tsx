'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel, AnimatedButton } from '@/components/ui';
import { formatTimestamp } from '@/lib/captions';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Scissors,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Volume2,
    VolumeX,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface TimelineClip {
    id: string;
    startTime: number;
    endTime: number;
    title?: string;
    type?: 'video' | 'audio' | 'caption' | 'effect';
    color?: string;
}

interface TimelineMarker {
    id: string;
    time: number;
    label: string;
    type: 'highlight' | 'cut' | 'custom';
}

interface TimelineEditorProps {
    duration: number;
    currentTime: number;
    clips: TimelineClip[];
    markers?: TimelineMarker[];
    isPlaying?: boolean;
    isMuted?: boolean;
    onTimeChange: (time: number) => void;
    onPlayPause: () => void;
    onMuteToggle?: () => void;
    onClipSelect?: (clip: TimelineClip) => void;
    onClipMove?: (clipId: string, newStart: number) => void;
    onClipTrim?: (clipId: string, start: number, end: number) => void;
    onMarkerAdd?: (time: number) => void;
    className?: string;
}

// ============================================================================
// TIMELINE EDITOR COMPONENT
// ============================================================================

export function TimelineEditor({
    duration,
    currentTime,
    clips,
    markers = [],
    isPlaying = false,
    isMuted = false,
    onTimeChange,
    onPlayPause,
    onMuteToggle,
    onClipSelect,
    onClipMove,
    onClipTrim,
    onMarkerAdd,
    className,
}: TimelineEditorProps) {
    const [zoom, setZoom] = useState(1);
    const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);

    // Calculate timeline width based on zoom
    const timelineWidth = useMemo(() => Math.max(100, duration * 10 * zoom), [duration, zoom]);

    // Handle timeline click for seeking
    const handleTimelineClick = useCallback((e: React.MouseEvent) => {
        if (!timelineRef.current) return;

        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
        const newTime = (x / timelineWidth) * duration;

        onTimeChange(Math.max(0, Math.min(duration, newTime)));
    }, [duration, timelineWidth, onTimeChange]);

    // Handle clip click
    const handleClipClick = useCallback((clip: TimelineClip, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedClipId(clip.id);
        onClipSelect?.(clip);
    }, [onClipSelect]);

    // Handle zoom
    const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5));

    // Jump forward/backward
    const jumpTime = (seconds: number) => {
        onTimeChange(Math.max(0, Math.min(duration, currentTime + seconds)));
    };

    // Generate time markers
    const timeMarkers = useMemo(() => {
        const interval = duration > 300 ? 60 : duration > 60 ? 10 : 5;
        const markers = [];
        for (let t = 0; t <= duration; t += interval) {
            markers.push(t);
        }
        return markers;
    }, [duration]);

    // Calculate playhead position
    const playheadPosition = (currentTime / duration) * timelineWidth;

    return (
        <div className={`space-y-3 ${className || ''}`}>
            {/* Transport Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Jump Back */}
                    <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => jumpTime(-5)}
                        className="p-2"
                    >
                        <SkipBack className="w-4 h-4" />
                    </AnimatedButton>

                    {/* Play/Pause */}
                    <AnimatedButton
                        variant="primary"
                        size="sm"
                        onClick={onPlayPause}
                        className="p-3"
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5" />
                        ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                        )}
                    </AnimatedButton>

                    {/* Jump Forward */}
                    <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => jumpTime(5)}
                        className="p-2"
                    >
                        <SkipForward className="w-4 h-4" />
                    </AnimatedButton>

                    {/* Mute Toggle */}
                    {onMuteToggle && (
                        <AnimatedButton
                            variant="ghost"
                            size="sm"
                            onClick={onMuteToggle}
                            className="p-2"
                        >
                            {isMuted ? (
                                <VolumeX className="w-4 h-4 text-neon-pink" />
                            ) : (
                                <Volume2 className="w-4 h-4" />
                            )}
                        </AnimatedButton>
                    )}
                </div>

                {/* Time Display */}
                <div className="flex items-center gap-3 text-sm font-mono">
                    <span className="text-neon-blue">{formatTimestamp(currentTime)}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/60">{formatTimestamp(duration)}</span>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                    <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={handleZoomOut}
                        className="p-2"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </AnimatedButton>
                    <span className="text-xs text-white/50 w-12 text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                    <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={handleZoomIn}
                        className="p-2"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </AnimatedButton>
                </div>
            </div>

            {/* Timeline */}
            <GlassPanel variant="default" className="p-3">
                <div
                    ref={timelineRef}
                    className="relative overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20"
                    style={{ height: '120px' }}
                >
                    {/* Timeline Container */}
                    <div
                        className="relative h-full"
                        style={{ width: `${timelineWidth}px`, minWidth: '100%' }}
                        onClick={handleTimelineClick}
                    >
                        {/* Time markers */}
                        <div className="absolute top-0 left-0 right-0 h-6 border-b border-white/10">
                            {timeMarkers.map((time) => (
                                <div
                                    key={time}
                                    className="absolute top-0 flex flex-col items-center"
                                    style={{ left: `${(time / duration) * 100}%` }}
                                >
                                    <span className="text-[10px] text-white/40">{formatTimestamp(time)}</span>
                                    <div className="w-px h-2 bg-white/20" />
                                </div>
                            ))}
                        </div>

                        {/* Clips Layer */}
                        <div className="absolute top-8 left-0 right-0 bottom-0">
                            {clips.map((clip) => {
                                const left = (clip.startTime / duration) * 100;
                                const width = ((clip.endTime - clip.startTime) / duration) * 100;
                                const isSelected = selectedClipId === clip.id;

                                return (
                                    <motion.div
                                        key={clip.id}
                                        className={`absolute top-2 h-16 rounded-lg cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-neon-blue' : ''
                                            }`}
                                        style={{
                                            left: `${left}%`,
                                            width: `${width}%`,
                                            backgroundColor: clip.color || 'rgba(0, 212, 255, 0.3)',
                                            borderLeft: '3px solid',
                                            borderColor: clip.color || '#00D4FF',
                                        }}
                                        onClick={(e) => handleClipClick(clip, e)}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        {/* Clip Content */}
                                        <div className="p-2 h-full flex flex-col justify-between">
                                            {clip.title && (
                                                <span className="text-xs text-white font-medium truncate">
                                                    {clip.title}
                                                </span>
                                            )}
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] text-white/60">
                                                    {formatTimestamp(clip.startTime)}
                                                </span>
                                                <span className="text-[10px] text-white/60">
                                                    {formatTimestamp(clip.endTime)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Trim Handles */}
                                        {isSelected && (
                                            <>
                                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-neon-blue/50 cursor-ew-resize hover:bg-neon-blue" />
                                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-neon-blue/50 cursor-ew-resize hover:bg-neon-blue" />
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Markers */}
                        {markers.map((marker) => (
                            <div
                                key={marker.id}
                                className="absolute top-6 bottom-0 w-0.5 cursor-pointer z-10"
                                style={{
                                    left: `${(marker.time / duration) * 100}%`,
                                    backgroundColor: marker.type === 'highlight' ? '#00FF88' : '#FF006E',
                                }}
                                title={marker.label}
                            >
                                <div
                                    className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: marker.type === 'highlight' ? '#00FF88' : '#FF006E',
                                    }}
                                />
                            </div>
                        ))}

                        {/* Playhead */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-0.5 bg-neon-blue z-20 pointer-events-none"
                            style={{ left: `${playheadPosition}px` }}
                            animate={{ x: isDragging ? undefined : 0 }}
                        >
                            <div className="absolute -top-1 -left-2 w-4 h-4 bg-neon-blue rounded-full shadow-lg shadow-neon-blue/50" />
                        </motion.div>
                    </div>
                </div>
            </GlassPanel>

            {/* Clip Actions */}
            <div className="flex items-center gap-2">
                <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkerAdd?.(currentTime)}
                >
                    <Scissors className="w-4 h-4 mr-1" />
                    Add Cut
                </AnimatedButton>
                <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(1)}
                >
                    <Maximize2 className="w-4 h-4 mr-1" />
                    Fit to View
                </AnimatedButton>
            </div>
        </div>
    );
}

export default TimelineEditor;
