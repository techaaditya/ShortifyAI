"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// GLASS CARD VARIANTS
// ============================================================================

export type GlassVariant = "default" | "strong" | "subtle" | "neon" | "elevated";
export type GlowColor = "blue" | "purple" | "green" | "pink" | "cyan" | "none";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    variant?: GlassVariant;
    glowColor?: GlowColor;
    hoverEffect?: boolean;
    hoverGlow?: boolean;
    hoverScale?: boolean;
    borderGlow?: boolean;
    className?: string;
    children: React.ReactNode;
}

const variantStyles: Record<GlassVariant, string> = {
    default: "bg-[rgba(20,20,40,0.5)] backdrop-blur-[20px] border border-white/10",
    strong: "bg-[rgba(20,20,40,0.7)] backdrop-blur-[30px] border border-white/15",
    subtle: "bg-[rgba(20,20,40,0.3)] backdrop-blur-[15px] border border-white/5",
    neon: "bg-[rgba(10,10,26,0.8)] backdrop-blur-[25px] border border-neon-blue/30",
    elevated: "bg-[rgba(30,30,60,0.6)] backdrop-blur-[20px] border border-white/10 shadow-elevated",
};

const glowStyles: Record<GlowColor, string> = {
    blue: "shadow-neon-blue",
    purple: "shadow-neon-purple",
    green: "shadow-neon-green",
    pink: "shadow-neon-pink",
    cyan: "shadow-[0_0_20px_rgba(6,182,212,0.4),0_0_40px_rgba(6,182,212,0.2)]",
    none: "",
};

const hoverGlowStyles: Record<GlowColor, string> = {
    blue: "hover:shadow-[0_0_30px_rgba(0,212,255,0.5),0_0_60px_rgba(0,212,255,0.3)]",
    purple: "hover:shadow-[0_0_30px_rgba(157,78,255,0.5),0_0_60px_rgba(157,78,255,0.3)]",
    green: "hover:shadow-[0_0_30px_rgba(0,255,136,0.5),0_0_60px_rgba(0,255,136,0.3)]",
    pink: "hover:shadow-[0_0_30px_rgba(255,0,110,0.5),0_0_60px_rgba(255,0,110,0.3)]",
    cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.5),0_0_60px_rgba(6,182,212,0.3)]",
    none: "",
};

const borderGlowHoverStyles: Record<GlowColor, string> = {
    blue: "hover:border-neon-blue/50",
    purple: "hover:border-neon-purple/50",
    green: "hover:border-neon-green/50",
    pink: "hover:border-neon-pink/50",
    cyan: "hover:border-[#06b6d4]/50",
    none: "",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    (
        {
            variant = "default",
            glowColor = "none",
            hoverEffect = true,
            hoverGlow = false,
            hoverScale = true,
            borderGlow = true,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-xl overflow-hidden relative",
                    variantStyles[variant],
                    glowColor !== "none" && glowStyles[glowColor],
                    hoverGlow && hoverGlowStyles[glowColor],
                    borderGlow && borderGlowHoverStyles[glowColor],
                    hoverEffect && "transition-all duration-300 ease-out",
                    className
                )}
                whileHover={
                    hoverScale
                        ? {
                            y: -4,
                            scale: 1.02,
                            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        }
                        : undefined
                }
                {...props}
            >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">{children}</div>
            </motion.div>
        );
    }
);
GlassCard.displayName = "GlassCard";

// ============================================================================
// GLASS PANEL (for larger sections)
// ============================================================================

interface GlassPanelProps extends HTMLMotionProps<"div"> {
    variant?: GlassVariant;
    className?: string;
    children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
    ({ variant = "strong", className, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl overflow-hidden",
                    variantStyles[variant],
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
GlassPanel.displayName = "GlassPanel";

// ============================================================================
// NEON BORDER CARD
// ============================================================================

interface NeonBorderCardProps extends HTMLMotionProps<"div"> {
    color?: GlowColor;
    animated?: boolean;
    className?: string;
    children: React.ReactNode;
}

const neonBorderColors: Record<GlowColor, string> = {
    blue: "from-neon-blue via-neon-purple to-neon-blue",
    purple: "from-neon-purple via-neon-pink to-neon-purple",
    green: "from-neon-green via-neon-blue to-neon-green",
    pink: "from-neon-pink via-neon-purple to-neon-pink",
    cyan: "from-[#06b6d4] via-neon-blue to-[#06b6d4]",
    none: "from-white/20 via-white/10 to-white/20",
};

export const NeonBorderCard = React.forwardRef<HTMLDivElement, NeonBorderCardProps>(
    ({ color = "blue", animated = true, className, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn("relative p-[1px] rounded-xl overflow-hidden", className)}
                whileHover={{ scale: 1.02 }}
                {...props}
            >
                {/* Animated gradient border */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-r rounded-xl",
                        neonBorderColors[color],
                        animated && "animate-gradient-shift bg-[length:200%_200%]"
                    )}
                />

                {/* Inner content */}
                <div className="relative bg-bg-primary rounded-xl p-6 h-full">
                    {children}
                </div>
            </motion.div>
        );
    }
);
NeonBorderCard.displayName = "NeonBorderCard";

// ============================================================================
// HOLOGRAPHIC CARD
// ============================================================================

interface HolographicCardProps extends HTMLMotionProps<"div"> {
    className?: string;
    children: React.ReactNode;
}

export const HolographicCard = React.forwardRef<HTMLDivElement, HolographicCardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "relative rounded-xl overflow-hidden",
                    "bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10",
                    "bg-[length:400%_400%] animate-gradient-shift",
                    "backdrop-blur-[20px] border border-white/10",
                    className
                )}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                }}
                {...props}
            >
                {/* Holographic shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">{children}</div>
            </motion.div>
        );
    }
);
HolographicCard.displayName = "HolographicCard";

// ============================================================================
// FEATURE CARD (for landing page features)
// ============================================================================

interface FeatureCardProps extends HTMLMotionProps<"div"> {
    icon: React.ReactNode;
    title: string;
    description: string;
    glowColor?: GlowColor;
    className?: string;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
    ({ icon, title, description, glowColor = "blue", className, ...props }, ref) => {
        return (
            <GlassCard
                ref={ref}
                variant="default"
                glowColor={glowColor}
                hoverGlow
                borderGlow
                className={cn("p-6", className)}
                {...props}
            >
                {/* Icon container */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                        "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20",
                        "border border-neon-blue/30"
                    )}
                >
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </GlassCard>
        );
    }
);
FeatureCard.displayName = "FeatureCard";

// ============================================================================
// STAT CARD
// ============================================================================

interface StatCardProps extends HTMLMotionProps<"div"> {
    label: string;
    value: string | number;
    change?: string;
    changeType?: "increase" | "decrease" | "neutral";
    icon?: React.ReactNode;
    className?: string;
}

const changeColors = {
    increase: "text-neon-green",
    decrease: "text-neon-pink",
    neutral: "text-white/50",
};

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
    ({ label, value, change, changeType = "neutral", icon, className, ...props }, ref) => {
        return (
            <GlassCard
                ref={ref}
                variant="default"
                hoverScale={false}
                className={cn("p-5", className)}
                {...props}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-white/50 text-sm mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                        {change && (
                            <p className={cn("text-sm mt-1", changeColors[changeType])}>
                                {change}
                            </p>
                        )}
                    </div>
                    {icon && (
                        <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                </div>
            </GlassCard>
        );
    }
);
StatCard.displayName = "StatCard";

export default GlassCard;
