'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    FilterEffect,
    OverlayEffect,
    FILTER_PRESETS,
    OVERLAY_PRESETS,
    generateFilterCSS,
    generateOverlayCSS,
} from '@/lib/effects/video-effects';
import { GlassPanel, AnimatedButton } from '@/components/ui';
import {
    Sun,
    Contrast,
    Droplet,
    Layers,
    Sparkles,
    Check,
} from 'lucide-react';

// ============================================================================
// PROPS
// ============================================================================

interface VideoEffectsEditorProps {
    filter: Partial<FilterEffect>;
    overlay?: OverlayEffect | null;
    onFilterChange: (filter: Partial<FilterEffect>) => void;
    onOverlayChange: (overlay: OverlayEffect | null) => void;
    thumbnailUrl?: string;
}

// ============================================================================
// EFFECTS EDITOR COMPONENT
// ============================================================================

export function VideoEffectsEditor({
    filter,
    overlay,
    onFilterChange,
    onOverlayChange,
    thumbnailUrl,
}: VideoEffectsEditorProps) {
    const [activeTab, setActiveTab] = useState<'presets' | 'adjust' | 'overlays'>('presets');

    const filterCSS = useMemo(() => generateFilterCSS(filter), [filter]);
    const overlayCSS = useMemo(() => overlay ? generateOverlayCSS(overlay) : null, [overlay]);

    const handleFilterPreset = (presetKey: string) => {
        onFilterChange(FILTER_PRESETS[presetKey]);
    };

    const handleOverlayPreset = (presetKey: string | null) => {
        if (!presetKey) {
            onOverlayChange(null);
        } else {
            onOverlayChange(OVERLAY_PRESETS[presetKey]);
        }
    };

    return (
        <div className="space-y-6">
            {/* Preview */}
            <GlassPanel variant="strong" className="aspect-video relative overflow-hidden rounded-xl">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: thumbnailUrl
                            ? `url(${thumbnailUrl})`
                            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                        filter: filterCSS,
                    }}
                />
                {overlayCSS && <div style={overlayCSS} />}

                {/* Sample text for preview */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white font-bold text-lg drop-shadow-lg">
                        Effects Preview
                    </p>
                </div>
            </GlassPanel>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {[
                    { id: 'presets', label: 'Presets', icon: Sparkles },
                    { id: 'adjust', label: 'Adjust', icon: Sun },
                    { id: 'overlays', label: 'Overlays', icon: Layers },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-neon-blue/20 text-neon-blue'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                {/* Presets Tab */}
                {activeTab === 'presets' && (
                    <div className="grid grid-cols-3 gap-2">
                        {Object.keys(FILTER_PRESETS).map((presetKey) => {
                            const preset = FILTER_PRESETS[presetKey];
                            const isActive = JSON.stringify(filter) === JSON.stringify(preset);

                            return (
                                <button
                                    key={presetKey}
                                    onClick={() => handleFilterPreset(presetKey)}
                                    className={`relative p-3 rounded-xl border transition-all ${isActive
                                            ? 'bg-neon-blue/20 border-neon-blue/50'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div
                                        className="h-12 rounded-lg mb-2 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40"
                                        style={{ filter: generateFilterCSS(preset) }}
                                    />
                                    <span className="text-xs text-white/80 capitalize">{presetKey}</span>
                                    {isActive && (
                                        <Check className="w-3 h-3 text-neon-blue absolute top-2 right-2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Adjust Tab */}
                {activeTab === 'adjust' && (
                    <div className="space-y-5">
                        {/* Brightness */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-white/70 text-sm flex items-center gap-2">
                                    <Sun className="w-4 h-4" />
                                    Brightness
                                </label>
                                <span className="text-neon-blue text-sm">{filter.brightness || 100}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={filter.brightness || 100}
                                onChange={(e) => onFilterChange({ ...filter, brightness: Number(e.target.value) })}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Contrast */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-white/70 text-sm flex items-center gap-2">
                                    <Contrast className="w-4 h-4" />
                                    Contrast
                                </label>
                                <span className="text-neon-blue text-sm">{filter.contrast || 100}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={filter.contrast || 100}
                                onChange={(e) => onFilterChange({ ...filter, contrast: Number(e.target.value) })}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Saturation */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-white/70 text-sm flex items-center gap-2">
                                    <Droplet className="w-4 h-4" />
                                    Saturation
                                </label>
                                <span className="text-neon-blue text-sm">{filter.saturation || 100}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={filter.saturation || 100}
                                onChange={(e) => onFilterChange({ ...filter, saturation: Number(e.target.value) })}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Blur */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-white/70 text-sm">Blur</label>
                                <span className="text-neon-blue text-sm">{filter.blur || 0}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={filter.blur || 0}
                                onChange={(e) => onFilterChange({ ...filter, blur: Number(e.target.value) })}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Grayscale */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-white/70 text-sm">Grayscale</label>
                                <span className="text-neon-blue text-sm">{filter.grayscale || 0}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={filter.grayscale || 0}
                                onChange={(e) => onFilterChange({ ...filter, grayscale: Number(e.target.value) })}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Reset Button */}
                        <AnimatedButton
                            variant="ghost"
                            className="w-full"
                            onClick={() => onFilterChange(FILTER_PRESETS.none)}
                        >
                            Reset to Default
                        </AnimatedButton>
                    </div>
                )}

                {/* Overlays Tab */}
                {activeTab === 'overlays' && (
                    <div className="space-y-4">
                        {/* No overlay option */}
                        <button
                            onClick={() => handleOverlayPreset(null)}
                            className={`w-full p-3 rounded-xl border text-left transition-all ${!overlay
                                    ? 'bg-neon-blue/20 border-neon-blue/50'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white">No Overlay</span>
                                {!overlay && <Check className="w-4 h-4 text-neon-blue" />}
                            </div>
                        </button>

                        {/* Overlay presets */}
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(OVERLAY_PRESETS).map(([key, preset]) => {
                                const isActive = overlay?.type === preset.type &&
                                    (!preset.color || overlay?.color === preset.color);

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleOverlayPreset(key)}
                                        className={`relative p-3 rounded-xl border transition-all ${isActive
                                                ? 'bg-neon-purple/20 border-neon-purple/50'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div
                                            className="h-10 rounded-lg mb-2 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 relative overflow-hidden"
                                        >
                                            <div style={generateOverlayCSS(preset)} />
                                        </div>
                                        <span className="text-xs text-white/80">
                                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                        {isActive && (
                                            <Check className="w-3 h-3 text-neon-purple absolute top-2 right-2" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Overlay intensity */}
                        {overlay && (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-white/70 text-sm">Intensity</label>
                                    <span className="text-neon-purple text-sm">{overlay.opacity}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={overlay.opacity}
                                    onChange={(e) => onOverlayChange({ ...overlay, opacity: Number(e.target.value) })}
                                    className="w-full accent-neon-purple"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoEffectsEditor;
