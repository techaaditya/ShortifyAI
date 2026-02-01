/**
 * Video Effects System
 * 
 * Provides visual effects overlays for video clips:
 * - Filters (brightness, contrast, saturation)
 * - Overlays (gradients, vignette, grain)
 * - Transitions (fade, zoom, slide)
 * - Branding (logo, watermark, CTA)
 */

// ============================================================================
// TYPES
// ============================================================================

export interface VideoEffect {
    id: string;
    name: string;
    type: EffectType;
    enabled: boolean;
    intensity: number; // 0-100
    parameters: Record<string, any>;
}

export type EffectType =
    | 'filter'
    | 'overlay'
    | 'transition'
    | 'branding'
    | 'animation';

export interface FilterEffect {
    brightness: number; // 0-200, 100 = normal
    contrast: number; // 0-200, 100 = normal
    saturation: number; // 0-200, 100 = normal
    blur: number; // 0-20px
    hueRotate: number; // 0-360deg
    grayscale: number; // 0-100%
    sepia: number; // 0-100%
    invert: number; // 0-100%
}

export interface OverlayEffect {
    type: 'gradient' | 'vignette' | 'grain' | 'bokeh' | 'light-leak' | 'dust';
    opacity: number; // 0-100
    blendMode: string;
    color?: string;
    secondaryColor?: string;
    angle?: number;
}

export interface TransitionEffect {
    type: 'fade' | 'zoom' | 'slide' | 'wipe' | 'dissolve' | 'glitch';
    duration: number; // seconds
    easing: string;
    direction?: 'in' | 'out' | 'both';
}

export interface BrandingEffect {
    type: 'logo' | 'watermark' | 'cta' | 'frame';
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    size: number; // percentage
    opacity: number; // 0-100
    imageUrl?: string;
    text?: string;
}

// ============================================================================
// FILTER PRESETS
// ============================================================================

export const FILTER_PRESETS: Record<string, Partial<FilterEffect>> = {
    none: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hueRotate: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
    },
    vibrant: {
        brightness: 105,
        contrast: 110,
        saturation: 130,
    },
    cinematic: {
        brightness: 95,
        contrast: 115,
        saturation: 90,
        sepia: 10,
    },
    retro: {
        brightness: 100,
        contrast: 95,
        saturation: 80,
        sepia: 30,
    },
    noir: {
        brightness: 95,
        contrast: 120,
        saturation: 0,
        grayscale: 100,
    },
    cool: {
        brightness: 100,
        contrast: 105,
        saturation: 95,
        hueRotate: 180,
    },
    warm: {
        brightness: 102,
        contrast: 105,
        saturation: 110,
        sepia: 15,
    },
    dramatic: {
        brightness: 90,
        contrast: 130,
        saturation: 110,
    },
    dreamy: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        blur: 2,
    },
    neon: {
        brightness: 100,
        contrast: 120,
        saturation: 150,
    },
};

// ============================================================================
// OVERLAY PRESETS
// ============================================================================

export const OVERLAY_PRESETS: Record<string, OverlayEffect> = {
    gradient_dark: {
        type: 'gradient',
        opacity: 60,
        blendMode: 'multiply',
        color: '#000000',
        secondaryColor: 'transparent',
        angle: 180,
    },
    gradient_blue: {
        type: 'gradient',
        opacity: 40,
        blendMode: 'overlay',
        color: '#0066FF',
        secondaryColor: '#9D4EFF',
        angle: 135,
    },
    gradient_sunset: {
        type: 'gradient',
        opacity: 50,
        blendMode: 'overlay',
        color: '#FF6B6B',
        secondaryColor: '#FFE66D',
        angle: 45,
    },
    vignette_light: {
        type: 'vignette',
        opacity: 30,
        blendMode: 'multiply',
    },
    vignette_heavy: {
        type: 'vignette',
        opacity: 60,
        blendMode: 'multiply',
    },
    grain_subtle: {
        type: 'grain',
        opacity: 15,
        blendMode: 'overlay',
    },
    grain_heavy: {
        type: 'grain',
        opacity: 35,
        blendMode: 'overlay',
    },
    light_leak: {
        type: 'light-leak',
        opacity: 40,
        blendMode: 'screen',
        color: '#FF9500',
    },
    bokeh: {
        type: 'bokeh',
        opacity: 30,
        blendMode: 'screen',
    },
    dust: {
        type: 'dust',
        opacity: 25,
        blendMode: 'screen',
    },
};

// ============================================================================
// CSS GENERATION
// ============================================================================

/**
 * Generate CSS filter string from filter effect
 */
export function generateFilterCSS(filter: Partial<FilterEffect>): string {
    const filters: string[] = [];

    if (filter.brightness !== undefined && filter.brightness !== 100) {
        filters.push(`brightness(${filter.brightness}%)`);
    }
    if (filter.contrast !== undefined && filter.contrast !== 100) {
        filters.push(`contrast(${filter.contrast}%)`);
    }
    if (filter.saturation !== undefined && filter.saturation !== 100) {
        filters.push(`saturate(${filter.saturation}%)`);
    }
    if (filter.blur && filter.blur > 0) {
        filters.push(`blur(${filter.blur}px)`);
    }
    if (filter.hueRotate && filter.hueRotate !== 0) {
        filters.push(`hue-rotate(${filter.hueRotate}deg)`);
    }
    if (filter.grayscale && filter.grayscale > 0) {
        filters.push(`grayscale(${filter.grayscale}%)`);
    }
    if (filter.sepia && filter.sepia > 0) {
        filters.push(`sepia(${filter.sepia}%)`);
    }
    if (filter.invert && filter.invert > 0) {
        filters.push(`invert(${filter.invert}%)`);
    }

    return filters.length > 0 ? filters.join(' ') : 'none';
}

/**
 * Generate CSS for overlay effect
 */
export function generateOverlayCSS(overlay: OverlayEffect): React.CSSProperties {
    const baseStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: overlay.blendMode as any,
        opacity: overlay.opacity / 100,
    };

    switch (overlay.type) {
        case 'gradient':
            return {
                ...baseStyles,
                background: `linear-gradient(${overlay.angle || 180}deg, ${overlay.color}, ${overlay.secondaryColor || 'transparent'})`,
            };
        case 'vignette':
            return {
                ...baseStyles,
                background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
            };
        case 'grain':
            return {
                ...baseStyles,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            };
        case 'light-leak':
            return {
                ...baseStyles,
                background: `radial-gradient(ellipse at 20% 20%, ${overlay.color}80 0%, transparent 50%)`,
            };
        case 'bokeh':
            return {
                ...baseStyles,
                background: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 20%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 15%),
          radial-gradient(circle at 60% 70%, rgba(255,255,255,0.25) 0%, transparent 18%)
        `,
            };
        default:
            return baseStyles;
    }
}

/**
 * Generate Framer Motion variants for transition
 */
export function generateTransitionVariants(
    transition: TransitionEffect
): { initial: any; animate: any; exit: any; transition: any } {
    const duration = transition.duration;
    const ease = transition.easing || 'easeInOut';

    switch (transition.type) {
        case 'fade':
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration, ease },
            };
        case 'zoom':
            return {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 1.2 },
                transition: { duration, ease },
            };
        case 'slide':
            return {
                initial: { opacity: 0, x: '-100%' },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: '100%' },
                transition: { duration, ease },
            };
        case 'wipe':
            return {
                initial: { clipPath: 'inset(0 100% 0 0)' },
                animate: { clipPath: 'inset(0 0% 0 0)' },
                exit: { clipPath: 'inset(0 0 0 100%)' },
                transition: { duration, ease },
            };
        case 'glitch':
            return {
                initial: { opacity: 0, filter: 'hue-rotate(90deg)' },
                animate: { opacity: [0, 1, 0.8, 1], filter: 'hue-rotate(0deg)' },
                exit: { opacity: 0, filter: 'hue-rotate(-90deg)' },
                transition: { duration: duration * 0.5, ease: 'linear' },
            };
        default:
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration, ease },
            };
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    FILTER_PRESETS,
    OVERLAY_PRESETS,
    generateFilterCSS,
    generateOverlayCSS,
    generateTransitionVariants,
};
