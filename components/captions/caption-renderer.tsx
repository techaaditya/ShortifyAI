/**
 * Caption Renderer Component
 * 
 * Renders captions with real-time animation and styling
 */

'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaptionSegment,
  CaptionStyle,
  CaptionWord,
  CAPTION_PRESETS,
  CAPTION_ANIMATIONS,
  getPresetStyle,
} from '@/lib/captions/caption-styles';

// ============================================================================
// PROPS
// ============================================================================

interface CaptionRendererProps {
  segments: CaptionSegment[];
  currentTime: number;
  style?: Partial<CaptionStyle>;
  className?: string;
  onSegmentChange?: (segment: CaptionSegment | null) => void;
}

interface WordRendererProps {
  word: CaptionWord;
  currentTime: number;
  style: CaptionStyle;
  isActive: boolean;
}

// ============================================================================
// WORD RENDERER
// ============================================================================

const WordRenderer: React.FC<WordRendererProps> = ({
  word,
  currentTime,
  style,
  isActive,
}) => {
  const isHighlighted = currentTime >= word.start && currentTime <= word.end;
  const animation = CAPTION_ANIMATIONS[style.animation];
  
  // Karaoke-style word highlighting
  if (style.animation === 'karaoke') {
    const progress = isHighlighted 
      ? Math.min(1, (currentTime - word.start) / (word.end - word.start))
      : currentTime > word.end ? 1 : 0;

    return (
      <motion.span
        className="inline-block mx-1"
        animate={{
          color: progress > 0 ? style.highlightColor : style.color,
          scale: isHighlighted ? 1.05 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {word.text}
      </motion.span>
    );
  }

  // Word-by-word reveal
  if (style.animation === 'word-by-word') {
    const isVisible = currentTime >= word.start;
    
    return (
      <motion.span
        className="inline-block mx-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 10 
        }}
        transition={{ duration: 0.15 }}
      >
        <span style={{ color: isHighlighted ? style.highlightColor : 'inherit' }}>
          {word.text}
        </span>
      </motion.span>
    );
  }

  // Default word rendering
  return (
    <span 
      className="mx-0.5"
      style={{ 
        color: isHighlighted && word.isHighlighted ? style.highlightColor : 'inherit',
      }}
    >
      {word.text}
    </span>
  );
};

// ============================================================================
// CAPTION RENDERER
// ============================================================================

export const CaptionRenderer: React.FC<CaptionRendererProps> = ({
  segments,
  currentTime,
  style: customStyle,
  className,
  onSegmentChange,
}) => {
  const [activeSegment, setActiveSegment] = useState<CaptionSegment | null>(null);

  // Merge custom style with preset
  const style = useMemo(() => {
    const preset = customStyle?.preset || 'tiktok';
    return {
      ...getPresetStyle(preset),
      ...customStyle,
    } as CaptionStyle;
  }, [customStyle]);

  // Find active segment based on current time
  useEffect(() => {
    const segment = segments.find(
      (s) => currentTime >= s.startTime && currentTime <= s.endTime
    ) || null;

    if (segment?.id !== activeSegment?.id) {
      setActiveSegment(segment);
      onSegmentChange?.(segment);
    }
  }, [currentTime, segments, activeSegment?.id, onSegmentChange]);

  // Get animation variants
  const animation = CAPTION_ANIMATIONS[style.animation];
  const variants = animation?.framerVariants || {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Position styles
  const positionStyles = useMemo(() => {
    switch (style.position) {
      case 'top':
        return { top: '10%', left: '50%', transform: 'translateX(-50%)' };
      case 'center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom-left':
        return { bottom: '15%', left: '5%' };
      case 'bottom-right':
        return { bottom: '15%', right: '5%' };
      case 'bottom':
      default:
        return { bottom: '15%', left: '50%', transform: 'translateX(-50%)' };
    }
  }, [style.position]);

  // Caption container styles
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    ...positionStyles,
    maxWidth: `${style.maxWidth}%`,
    fontSize: `${style.fontSize}px`,
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    color: style.color,
    textAlign: style.alignment,
    textTransform: style.textTransform,
    letterSpacing: `${style.letterSpacing}px`,
    lineHeight: style.lineHeight,
    padding: `${style.padding.y}px ${style.padding.x}px`,
    zIndex: 50,
    pointerEvents: 'none',
    ...(style.strokeWidth > 0 && {
      WebkitTextStroke: `${style.strokeWidth}px ${style.strokeColor}`,
    }),
  };

  // Background styles
  const backgroundStyles: React.CSSProperties = style.backgroundOpacity > 0
    ? {
        backgroundColor: style.backgroundColor,
        opacity: style.backgroundOpacity,
        borderRadius: '8px',
      }
    : {};

  // Glow effect for neon preset
  const glowStyles: React.CSSProperties = style.preset === 'neon'
    ? {
        textShadow: `0 0 10px ${style.color}, 0 0 20px ${style.color}, 0 0 30px ${style.color}`,
      }
    : {};

  // Shadow effect for shadow preset
  const shadowStyles: React.CSSProperties = style.preset === 'shadow'
    ? {
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8), -1px -1px 0 rgba(0, 0, 0, 0.5)',
      }
    : {};

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AnimatePresence mode="wait">
        {activeSegment && (
          <motion.div
            key={activeSegment.id}
            style={{
              ...containerStyles,
              ...backgroundStyles,
              ...glowStyles,
              ...shadowStyles,
            }}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={variants.transition || { duration: 0.3 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-1">
              {activeSegment.words.map((word, index) => (
                <WordRenderer
                  key={`${activeSegment.id}-${index}`}
                  word={word}
                  currentTime={currentTime}
                  style={style}
                  isActive={currentTime >= word.start && currentTime <= word.end}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// CAPTION PREVIEW (for editor)
// ============================================================================

interface CaptionPreviewProps {
  text: string;
  style?: Partial<CaptionStyle>;
  className?: string;
}

export const CaptionPreview: React.FC<CaptionPreviewProps> = ({
  text,
  style: customStyle,
  className,
}) => {
  const style = useMemo(() => {
    const preset = customStyle?.preset || 'tiktok';
    return {
      ...getPresetStyle(preset),
      ...customStyle,
    } as CaptionStyle;
  }, [customStyle]);

  // Position styles
  const positionStyles = useMemo(() => {
    switch (style.position) {
      case 'top':
        return 'top-[10%] left-1/2 -translate-x-1/2';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'bottom-left':
        return 'bottom-[15%] left-[5%]';
      case 'bottom-right':
        return 'bottom-[15%] right-[5%]';
      case 'bottom':
      default:
        return 'bottom-[15%] left-1/2 -translate-x-1/2';
    }
  }, [style.position]);

  // Inline styles
  const inlineStyles: React.CSSProperties = {
    maxWidth: `${style.maxWidth}%`,
    fontSize: `${style.fontSize}px`,
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    color: style.color,
    textAlign: style.alignment,
    textTransform: style.textTransform,
    letterSpacing: `${style.letterSpacing}px`,
    lineHeight: style.lineHeight,
    padding: `${style.padding.y}px ${style.padding.x}px`,
    ...(style.backgroundOpacity > 0 && {
      backgroundColor: style.backgroundColor,
      opacity: style.backgroundOpacity,
      borderRadius: '8px',
    }),
    ...(style.strokeWidth > 0 && {
      WebkitTextStroke: `${style.strokeWidth}px ${style.strokeColor}`,
    }),
    ...(style.preset === 'neon' && {
      textShadow: `0 0 10px ${style.color}, 0 0 20px ${style.color}`,
    }),
    ...(style.preset === 'shadow' && {
      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
    }),
  };

  return (
    <div className={`absolute ${positionStyles} ${className || ''}`} style={inlineStyles}>
      {text}
    </div>
  );
};

export default CaptionRenderer;
