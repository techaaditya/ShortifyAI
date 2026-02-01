/**
 * Caption System - Styles, Animations, and Presets
 * 
 * Provides comprehensive caption styling with:
 * - Multiple style presets (TikTok, YouTube, Minimal, etc.)
 * - Animation effects (fade, bounce, karaoke, typewriter)
 * - Word-level timing synchronization
 * - Multi-language support
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CaptionWord {
    text: string;
    start: number;
    end: number;
    confidence?: number;
    isHighlighted?: boolean;
    isPunctuation?: boolean;
}

export interface CaptionSegment {
    id: string;
    words: CaptionWord[];
    startTime: number;
    endTime: number;
    speaker?: string;
    style?: CaptionStyle;
}

export interface CaptionStyle {
    preset: CaptionPreset;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    color: string;
    highlightColor: string;
    backgroundColor: string;
    backgroundOpacity: number;
    strokeColor: string;
    strokeWidth: number;
    position: CaptionPosition;
    alignment: 'left' | 'center' | 'right';
    animation: CaptionAnimation;
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    letterSpacing: number;
    lineHeight: number;
    maxWidth: number;
    wordsPerLine: number;
    padding: { x: number; y: number };
}

export type CaptionPreset =
    | 'tiktok'
    | 'youtube'
    | 'minimal'
    | 'bold'
    | 'neon'
    | 'karaoke'
    | 'typewriter'
    | 'gradient'
    | 'shadow'
    | 'outline'
    | 'custom';

export type CaptionPosition =
    | 'bottom'
    | 'center'
    | 'top'
    | 'bottom-left'
    | 'bottom-right'
    | 'custom';

export type CaptionAnimation =
    | 'none'
    | 'fade'
    | 'bounce'
    | 'scale'
    | 'slide-up'
    | 'slide-down'
    | 'typewriter'
    | 'karaoke'
    | 'word-by-word'
    | 'glow-pulse';

// ============================================================================
// PRESET DEFINITIONS
// ============================================================================

export const CAPTION_PRESETS: Record<CaptionPreset, Partial<CaptionStyle>> = {
    tiktok: {
        preset: 'tiktok',
        fontSize: 48,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        color: '#FFFFFF',
        highlightColor: '#00D4FF',
        backgroundColor: '#000000',
        backgroundOpacity: 0.8,
        strokeColor: '#000000',
        strokeWidth: 4,
        position: 'center',
        alignment: 'center',
        animation: 'bounce',
        textTransform: 'uppercase',
        letterSpacing: 2,
        lineHeight: 1.2,
        maxWidth: 90,
        wordsPerLine: 3,
        padding: { x: 16, y: 8 },
    },

    youtube: {
        preset: 'youtube',
        fontSize: 32,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        color: '#FFFFFF',
        highlightColor: '#FFCC00',
        backgroundColor: '#000000',
        backgroundOpacity: 0.7,
        strokeColor: 'transparent',
        strokeWidth: 0,
        position: 'bottom',
        alignment: 'center',
        animation: 'fade',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1.4,
        maxWidth: 80,
        wordsPerLine: 8,
        padding: { x: 12, y: 6 },
    },

    minimal: {
        preset: 'minimal',
        fontSize: 28,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        color: '#FFFFFF',
        highlightColor: '#FFFFFF',
        backgroundColor: 'transparent',
        backgroundOpacity: 0,
        strokeColor: '#000000',
        strokeWidth: 2,
        position: 'bottom',
        alignment: 'center',
        animation: 'fade',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1.5,
        maxWidth: 85,
        wordsPerLine: 6,
        padding: { x: 0, y: 0 },
    },

    bold: {
        preset: 'bold',
        fontSize: 56,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        color: '#FFFFFF',
        highlightColor: '#FF006E',
        backgroundColor: '#000000',
        backgroundOpacity: 0.9,
        strokeColor: '#000000',
        strokeWidth: 6,
        position: 'center',
        alignment: 'center',
        animation: 'scale',
        textTransform: 'uppercase',
        letterSpacing: 4,
        lineHeight: 1.1,
        maxWidth: 95,
        wordsPerLine: 2,
        padding: { x: 20, y: 12 },
    },

    neon: {
        preset: 'neon',
        fontSize: 44,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        color: '#00D4FF',
        highlightColor: '#9D4EFF',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundOpacity: 0.5,
        strokeColor: '#00D4FF',
        strokeWidth: 2,
        position: 'center',
        alignment: 'center',
        animation: 'glow-pulse',
        textTransform: 'uppercase',
        letterSpacing: 3,
        lineHeight: 1.2,
        maxWidth: 90,
        wordsPerLine: 3,
        padding: { x: 16, y: 10 },
    },

    karaoke: {
        preset: 'karaoke',
        fontSize: 40,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        color: '#FFFFFF',
        highlightColor: '#00FF88',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundOpacity: 0.6,
        strokeColor: '#000000',
        strokeWidth: 3,
        position: 'bottom',
        alignment: 'center',
        animation: 'karaoke',
        textTransform: 'none',
        letterSpacing: 1,
        lineHeight: 1.3,
        maxWidth: 90,
        wordsPerLine: 5,
        padding: { x: 14, y: 8 },
    },

    typewriter: {
        preset: 'typewriter',
        fontSize: 36,
        fontFamily: '"Courier New", monospace',
        fontWeight: 500,
        color: '#00FF88',
        highlightColor: '#FFFFFF',
        backgroundColor: 'rgba(0, 10, 20, 0.8)',
        backgroundOpacity: 0.8,
        strokeColor: 'transparent',
        strokeWidth: 0,
        position: 'center',
        alignment: 'left',
        animation: 'typewriter',
        textTransform: 'none',
        letterSpacing: 2,
        lineHeight: 1.4,
        maxWidth: 85,
        wordsPerLine: 6,
        padding: { x: 20, y: 12 },
    },

    gradient: {
        preset: 'gradient',
        fontSize: 48,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        color: 'linear-gradient(90deg, #00D4FF, #9D4EFF, #FF006E)',
        highlightColor: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundOpacity: 0.7,
        strokeColor: '#000000',
        strokeWidth: 4,
        position: 'center',
        alignment: 'center',
        animation: 'scale',
        textTransform: 'uppercase',
        letterSpacing: 2,
        lineHeight: 1.2,
        maxWidth: 90,
        wordsPerLine: 3,
        padding: { x: 16, y: 10 },
    },

    shadow: {
        preset: 'shadow',
        fontSize: 44,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        color: '#FFFFFF',
        highlightColor: '#00D4FF',
        backgroundColor: 'transparent',
        backgroundOpacity: 0,
        strokeColor: 'transparent',
        strokeWidth: 0,
        position: 'center',
        alignment: 'center',
        animation: 'bounce',
        textTransform: 'none',
        letterSpacing: 1,
        lineHeight: 1.3,
        maxWidth: 90,
        wordsPerLine: 4,
        padding: { x: 0, y: 0 },
    },

    outline: {
        preset: 'outline',
        fontSize: 52,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        color: 'transparent',
        highlightColor: '#00D4FF',
        backgroundColor: 'transparent',
        backgroundOpacity: 0,
        strokeColor: '#FFFFFF',
        strokeWidth: 3,
        position: 'center',
        alignment: 'center',
        animation: 'scale',
        textTransform: 'uppercase',
        letterSpacing: 4,
        lineHeight: 1.2,
        maxWidth: 90,
        wordsPerLine: 2,
        padding: { x: 0, y: 0 },
    },

    custom: {
        preset: 'custom',
        fontSize: 36,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        color: '#FFFFFF',
        highlightColor: '#00D4FF',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundOpacity: 0.6,
        strokeColor: '#000000',
        strokeWidth: 2,
        position: 'bottom',
        alignment: 'center',
        animation: 'fade',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1.4,
        maxWidth: 90,
        wordsPerLine: 5,
        padding: { x: 12, y: 6 },
    },
};

// ============================================================================
// ANIMATION DEFINITIONS
// ============================================================================

export const CAPTION_ANIMATIONS: Record<CaptionAnimation, {
    name: string;
    description: string;
    cssKeyframes?: string;
    framerVariants?: any;
}> = {
    none: {
        name: 'None',
        description: 'No animation',
    },
    fade: {
        name: 'Fade',
        description: 'Smooth fade in/out',
        framerVariants: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.3 },
        },
    },
    bounce: {
        name: 'Bounce',
        description: 'Bouncy entrance',
        framerVariants: {
            initial: { opacity: 0, y: 20, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -10 },
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
    },
    scale: {
        name: 'Scale',
        description: 'Scale in from center',
        framerVariants: {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: { duration: 0.25 },
        },
    },
    'slide-up': {
        name: 'Slide Up',
        description: 'Slide in from bottom',
        framerVariants: {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    },
    'slide-down': {
        name: 'Slide Down',
        description: 'Slide in from top',
        framerVariants: {
            initial: { opacity: 0, y: -40 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    },
    typewriter: {
        name: 'Typewriter',
        description: 'Type out letter by letter',
        cssKeyframes: `
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
    `,
    },
    karaoke: {
        name: 'Karaoke',
        description: 'Highlight words as spoken',
        framerVariants: {
            initial: { color: 'inherit' },
            active: { color: 'var(--highlight-color)', scale: 1.05 },
            transition: { duration: 0.1 },
        },
    },
    'word-by-word': {
        name: 'Word by Word',
        description: 'Reveal one word at a time',
        framerVariants: {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { staggerChildren: 0.1 },
        },
    },
    'glow-pulse': {
        name: 'Glow Pulse',
        description: 'Pulsing neon glow effect',
        cssKeyframes: `
      @keyframes glow-pulse {
        0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
        50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
      }
    `,
        framerVariants: {
            initial: { textShadow: '0 0 10px currentColor' },
            animate: {
                textShadow: ['0 0 10px currentColor', '0 0 30px currentColor', '0 0 10px currentColor'],
            },
            transition: { duration: 2, repeat: Infinity },
        },
    },
};

// ============================================================================
// FONT OPTIONS
// ============================================================================

export const FONT_OPTIONS = [
    { value: 'Inter, sans-serif', label: 'Inter', category: 'Sans-serif' },
    { value: 'Roboto, sans-serif', label: 'Roboto', category: 'Sans-serif' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat', category: 'Sans-serif' },
    { value: 'Poppins, sans-serif', label: 'Poppins', category: 'Sans-serif' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans', category: 'Sans-serif' },
    { value: '"Bebas Neue", sans-serif', label: 'Bebas Neue', category: 'Display' },
    { value: '"Oswald", sans-serif', label: 'Oswald', category: 'Display' },
    { value: '"Playfair Display", serif', label: 'Playfair Display', category: 'Serif' },
    { value: '"Courier New", monospace', label: 'Courier New', category: 'Monospace' },
    { value: '"JetBrains Mono", monospace', label: 'JetBrains Mono', category: 'Monospace' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get default style for a preset
 */
export function getPresetStyle(preset: CaptionPreset): CaptionStyle {
    return CAPTION_PRESETS[preset] as CaptionStyle;
}

/**
 * Merge custom style with preset base
 */
export function mergeStyles(
    preset: CaptionPreset,
    customStyles: Partial<CaptionStyle>
): CaptionStyle {
    return {
        ...CAPTION_PRESETS[preset],
        ...customStyles,
    } as CaptionStyle;
}

/**
 * Generate CSS for caption style
 */
export function generateCaptionCSS(style: CaptionStyle): string {
    const bgColor = style.backgroundColor === 'transparent'
        ? 'transparent'
        : `rgba(${hexToRgb(style.backgroundColor)}, ${style.backgroundOpacity})`;

    return `
    font-size: ${style.fontSize}px;
    font-family: ${style.fontFamily};
    font-weight: ${style.fontWeight};
    color: ${style.color};
    background-color: ${bgColor};
    text-transform: ${style.textTransform};
    letter-spacing: ${style.letterSpacing}px;
    line-height: ${style.lineHeight};
    text-align: ${style.alignment};
    padding: ${style.padding.y}px ${style.padding.x}px;
    max-width: ${style.maxWidth}%;
    ${style.strokeWidth > 0 ? `-webkit-text-stroke: ${style.strokeWidth}px ${style.strokeColor};` : ''}
  `.trim();
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): string {
    if (hex === 'transparent' || !hex.startsWith('#')) return '0, 0, 0';

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0, 0, 0';

    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Split transcript into caption segments
 */
export function splitIntoSegments(
    words: CaptionWord[],
    wordsPerLine: number = 4,
    maxDuration: number = 4
): CaptionSegment[] {
    const segments: CaptionSegment[] = [];
    let currentWords: CaptionWord[] = [];
    let segmentStart = 0;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentWords.length === 0) {
            segmentStart = word.start;
        }

        currentWords.push(word);

        const duration = word.end - segmentStart;
        const shouldSplit =
            currentWords.length >= wordsPerLine ||
            duration >= maxDuration ||
            word.isPunctuation ||
            i === words.length - 1;

        if (shouldSplit) {
            segments.push({
                id: `segment_${segments.length}`,
                words: [...currentWords],
                startTime: segmentStart,
                endTime: word.end,
            });
            currentWords = [];
        }
    }

    return segments;
}

/**
 * Format time in MM:SS.ms format
 */
export function formatTimestamp(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

export default {
    CAPTION_PRESETS,
    CAPTION_ANIMATIONS,
    FONT_OPTIONS,
    getPresetStyle,
    mergeStyles,
    generateCaptionCSS,
    splitIntoSegments,
    formatTimestamp,
};
