/**
 * ShortifyAI Design System Tokens
 * 
 * Premium dark theme with neon accents for AI-powered video platform.
 * All colors, typography, spacing, and animation values centralized here.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Background colors
  bg: {
    primary: '#0a0a1a',      // Deep indigo base
    secondary: '#141428',     // Slightly lighter panel
    tertiary: '#1e1e3c',      // Card backgrounds
    elevated: '#252545',      // Elevated elements
  },
  
  // Accent colors (Neon)
  accent: {
    blue: '#00d4ff',          // Neon blue (primary)
    purple: '#9d4eff',        // Cyber purple
    green: '#00ff88',         // Neon green (success)
    pink: '#ff006e',          // Hot pink
    cyan: '#06b6d4',          // Cyan
    orange: '#ff9500',        // Warning orange
  },
  
  // Text colors
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Semantic colors
  semantic: {
    success: '#00ff88',
    warning: '#ff9500',
    error: '#ff006e',
    info: '#00d4ff',
  },
  
  // Glass effect colors
  glass: {
    bg: 'rgba(20, 20, 40, 0.7)',
    bgLight: 'rgba(20, 20, 40, 0.5)',
    bgDark: 'rgba(10, 10, 26, 0.8)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(0, 212, 255, 0.5)',
  },
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  primary: 'linear-gradient(135deg, #00d4ff 0%, #9d4eff 100%)',
  accent: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 100%)',
  purple: 'linear-gradient(135deg, #9d4eff 0%, #ff006e 100%)',
  rainbow: 'linear-gradient(135deg, #00d4ff 0%, #9d4eff 25%, #ff006e 50%, #00ff88 75%, #00d4ff 100%)',
  
  // Glow effects
  glowBlue: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
  glowPurple: 'radial-gradient(circle, rgba(157, 78, 255, 0.3) 0%, transparent 70%)',
  glowPink: 'radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, transparent 70%)',
  
  // Background gradients
  bgMain: `
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(157, 78, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a1a 0%, #141428 50%, #0a0a1a 100%)
  `,
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  fontSizes: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
    base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
    lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
    xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
    '3xl': 'clamp(2rem, 1.7rem + 1.5vw, 2.5rem)',
    '4xl': 'clamp(2.5rem, 2rem + 2.5vw, 3.5rem)',
    '5xl': 'clamp(3rem, 2.5rem + 3vw, 4.5rem)',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  // Soft shadows
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
  
  // Neon glow shadows
  neonBlue: `
    0 0 20px rgba(0, 212, 255, 0.4),
    0 0 40px rgba(0, 212, 255, 0.2),
    0 0 80px rgba(0, 212, 255, 0.1)
  `,
  neonPurple: `
    0 0 20px rgba(157, 78, 255, 0.4),
    0 0 40px rgba(157, 78, 255, 0.2),
    0 0 80px rgba(157, 78, 255, 0.1)
  `,
  neonGreen: `
    0 0 20px rgba(0, 255, 136, 0.4),
    0 0 40px rgba(0, 255, 136, 0.2),
    0 0 80px rgba(0, 255, 136, 0.1)
  `,
  neonPink: `
    0 0 20px rgba(255, 0, 110, 0.4),
    0 0 40px rgba(255, 0, 110, 0.2),
    0 0 80px rgba(255, 0, 110, 0.1)
  `,
  
  // Glass shadow
  glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  // Durations
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },
  
  // Easings
  easings: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

export const motionVariants = {
  // Page transitions
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  
  // Scale up
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  
  // Button hover
  buttonHover: {
    hover: { scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
    tap: { scale: 0.98 },
  },
  
  // Card hover
  cardHover: {
    rest: { y: 0, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
    hover: { 
      y: -8, 
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
    },
  },
  
  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  
  // Floating animation
  float: {
    animate: {
      y: [-10, 10, -10],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  
  // Glow pulse
  glowPulse: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(0, 212, 255, 0.4)',
        '0 0 40px rgba(0, 212, 255, 0.6)',
        '0 0 20px rgba(0, 212, 255, 0.4)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: '320px',
  mobileLg: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLg: '1440px',
  desktopXl: '1920px',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  behind: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

// Default export for convenience
const designTokens = {
  colors,
  gradients,
  typography,
  spacing,
  shadows,
  animations,
  motionVariants,
  breakpoints,
  zIndex,
  borderRadius,
};

export default designTokens;
