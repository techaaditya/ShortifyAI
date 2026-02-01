'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    CaptionPreset,
    CaptionStyle,
    CaptionAnimation,
    CaptionPosition,
    CAPTION_PRESETS,
    CAPTION_ANIMATIONS,
    FONT_OPTIONS,
    getPresetStyle,
} from '@/lib/captions/caption-styles';
import { CaptionPreview } from './caption-renderer';
import { GlassPanel, AnimatedButton } from '@/components/ui';
import {
    Type,
    Palette,
    Move,
    Sparkles,
    ChevronDown,
    Check,
} from 'lucide-react';

// ============================================================================
// PROPS
// ============================================================================

interface CaptionEditorProps {
    style: Partial<CaptionStyle>;
    onChange: (style: Partial<CaptionStyle>) => void;
    previewText?: string;
}

// ============================================================================
// CAPTION EDITOR COMPONENT
// ============================================================================

export function CaptionEditor({
    style,
    onChange,
    previewText = 'Your caption will appear here',
}: CaptionEditorProps) {
    const [activeTab, setActiveTab] = useState<'presets' | 'style' | 'animation'>('presets');

    const handlePresetChange = useCallback((preset: CaptionPreset) => {
        onChange({ ...getPresetStyle(preset), preset });
    }, [onChange]);

    const handleStyleChange = useCallback(<K extends keyof CaptionStyle>(
        key: K,
        value: CaptionStyle[K]
    ) => {
        onChange({ ...style, [key]: value });
    }, [style, onChange]);

    return (
        <div className="space-y-6">
            {/* Preview */}
            <GlassPanel variant="strong" className="aspect-[9/16] max-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20" />
                <CaptionPreview text={previewText} style={style} />
            </GlassPanel>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {[
                    { id: 'presets', label: 'Presets', icon: Sparkles },
                    { id: 'style', label: 'Style', icon: Type },
                    { id: 'animation', label: 'Animation', icon: Move },
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
                        {Object.keys(CAPTION_PRESETS).map((presetKey) => {
                            const preset = presetKey as CaptionPreset;
                            const isActive = style.preset === preset;
                            const presetStyle = CAPTION_PRESETS[preset];

                            return (
                                <button
                                    key={preset}
                                    onClick={() => handlePresetChange(preset)}
                                    className={`p-3 rounded-xl border transition-all ${isActive
                                            ? 'bg-neon-blue/20 border-neon-blue/50'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div
                                        className="h-8 flex items-center justify-center text-xs font-semibold mb-2 rounded-md"
                                        style={{
                                            fontFamily: presetStyle.fontFamily,
                                            color: presetStyle.color === 'transparent' ? '#fff' : presetStyle.color,
                                            WebkitTextStroke: presetStyle.strokeWidth ? `1px ${presetStyle.strokeColor}` : undefined,
                                            textShadow: preset === 'neon' ? `0 0 8px ${presetStyle.color}` : undefined,
                                        }}
                                    >
                                        Aa
                                    </div>
                                    <span className="text-xs text-white/80 capitalize">{preset}</span>
                                    {isActive && (
                                        <Check className="w-3 h-3 text-neon-blue absolute top-2 right-2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Style Tab */}
                {activeTab === 'style' && (
                    <div className="space-y-5">
                        {/* Font Size */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Font Size: {style.fontSize || 36}px
                            </label>
                            <input
                                type="range"
                                min="20"
                                max="72"
                                value={style.fontSize || 36}
                                onChange={(e) => handleStyleChange('fontSize', Number(e.target.value))}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Font Weight */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Font Weight: {style.fontWeight || 600}
                            </label>
                            <input
                                type="range"
                                min="300"
                                max="900"
                                step="100"
                                value={style.fontWeight || 600}
                                onChange={(e) => handleStyleChange('fontWeight', Number(e.target.value))}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        {/* Font Family */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Font</label>
                            <div className="grid grid-cols-2 gap-2">
                                {FONT_OPTIONS.slice(0, 6).map((font) => (
                                    <button
                                        key={font.value}
                                        onClick={() => handleStyleChange('fontFamily', font.value)}
                                        className={`px-3 py-2 rounded-lg text-sm transition-all ${style.fontFamily === font.value
                                                ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue'
                                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                                            }`}
                                        style={{ fontFamily: font.value }}
                                    >
                                        {font.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Text Color</label>
                                <div className="flex gap-2">
                                    {['#FFFFFF', '#00D4FF', '#9D4EFF', '#00FF88', '#FF006E'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleStyleChange('color', color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${style.color === color ? 'border-white scale-110' : 'border-transparent'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Highlight</label>
                                <div className="flex gap-2">
                                    {['#FFFFFF', '#00D4FF', '#9D4EFF', '#00FF88', '#FFCC00'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleStyleChange('highlightColor', color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${style.highlightColor === color ? 'border-white scale-110' : 'border-transparent'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Position</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['top', 'center', 'bottom'] as CaptionPosition[]).map((pos) => (
                                    <button
                                        key={pos}
                                        onClick={() => handleStyleChange('position', pos)}
                                        className={`py-2 px-3 rounded-lg text-sm capitalize transition-all ${style.position === pos
                                                ? 'bg-neon-purple/20 border border-neon-purple/50 text-neon-purple'
                                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                                            }`}
                                    >
                                        {pos}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Transform */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">Transform</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['none', 'uppercase', 'capitalize'] as const).map((transform) => (
                                    <button
                                        key={transform}
                                        onClick={() => handleStyleChange('textTransform', transform)}
                                        className={`py-2 px-3 rounded-lg text-sm capitalize transition-all ${style.textTransform === transform
                                                ? 'bg-neon-green/20 border border-neon-green/50 text-neon-green'
                                                : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                                            }`}
                                    >
                                        {transform === 'none' ? 'Normal' : transform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Animation Tab */}
                {activeTab === 'animation' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(CAPTION_ANIMATIONS).map(([key, anim]) => {
                                const animation = key as CaptionAnimation;
                                const isActive = style.animation === animation;

                                return (
                                    <button
                                        key={animation}
                                        onClick={() => handleStyleChange('animation', animation)}
                                        className={`p-3 rounded-xl border text-left transition-all ${isActive
                                                ? 'bg-neon-purple/20 border-neon-purple/50'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-white">{anim.name}</span>
                                            {isActive && <Check className="w-4 h-4 text-neon-purple" />}
                                        </div>
                                        <p className="text-xs text-white/50">{anim.description}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Words per line */}
                        <div>
                            <label className="block text-white/70 text-sm mb-2">
                                Words per line: {style.wordsPerLine || 4}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="8"
                                value={style.wordsPerLine || 4}
                                onChange={(e) => handleStyleChange('wordsPerLine', Number(e.target.value))}
                                className="w-full accent-neon-purple"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CaptionEditor;
