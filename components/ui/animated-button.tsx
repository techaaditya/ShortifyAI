"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// BUTTON VARIANTS AND TYPES
// ============================================================================

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success" | "neon";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    ripple?: boolean;
    glow?: boolean;
    children: React.ReactNode;
    className?: string;
}

// ============================================================================
// STYLE MAPPINGS
// ============================================================================

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-gradient-to-r from-neon-blue to-neon-purple
    text-white font-semibold
    border border-neon-blue/30
    hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]
  `,
    secondary: `
    bg-[rgba(20,20,40,0.5)] backdrop-blur-[20px]
    text-white font-medium
    border border-white/20
    hover:bg-[rgba(30,30,60,0.6)] hover:border-neon-blue/40
  `,
    ghost: `
    bg-transparent
    text-white/80 font-medium
    hover:bg-white/10 hover:text-white
  `,
    outline: `
    bg-transparent
    text-neon-blue font-medium
    border-2 border-neon-blue/50
    hover:bg-neon-blue/10 hover:border-neon-blue
  `,
    danger: `
    bg-gradient-to-r from-neon-pink to-red-600
    text-white font-semibold
    border border-neon-pink/30
    hover:shadow-[0_0_30px_rgba(255,0,110,0.5)]
  `,
    success: `
    bg-gradient-to-r from-neon-green to-emerald-600
    text-white font-semibold
    border border-neon-green/30
    hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]
  `,
    neon: `
    bg-transparent
    text-neon-blue font-semibold
    border-2 border-neon-blue
    shadow-[0_0_15px_rgba(0,212,255,0.4),inset_0_0_15px_rgba(0,212,255,0.1)]
    hover:bg-neon-blue/10
    hover:shadow-[0_0_25px_rgba(0,212,255,0.6),inset_0_0_20px_rgba(0,212,255,0.2)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-2xl",
};

// ============================================================================
// ANIMATED BUTTON COMPONENT
// ============================================================================

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            ripple = true,
            glow = false,
            children,
            className,
            disabled,
            onClick,
            ...props
        },
        ref
    ) => {
        const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (ripple && !disabled && !isLoading) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const id = Date.now();

                setRipples((prev) => [...prev, { x, y, id }]);

                // Remove ripple after animation
                setTimeout(() => {
                    setRipples((prev) => prev.filter((r) => r.id !== id));
                }, 600);
            }

            onClick?.(e);
        };

        return (
            <motion.button
                ref={ref}
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center gap-2",
                    "transition-all duration-300 ease-out",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variantStyles[variant],
                    sizeStyles[size],
                    glow && "animate-glow-pulse",
                    className
                )}
                whileHover={
                    !disabled && !isLoading
                        ? { scale: 1.02, y: -2 }
                        : undefined
                }
                whileTap={
                    !disabled && !isLoading
                        ? { scale: 0.98 }
                        : undefined
                }
                disabled={disabled || isLoading}
                onClick={handleClick}
                {...props}
            >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />

                {/* Ripple effects */}
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
                        style={{
                            left: ripple.x - 10,
                            top: ripple.y - 10,
                            width: 20,
                            height: 20,
                        }}
                    />
                ))}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                        <LoadingSpinner size={size} />
                    ) : (
                        <>
                            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                            {children}
                            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                        </>
                    )}
                </span>
            </motion.button>
        );
    }
);
AnimatedButton.displayName = "AnimatedButton";

// ============================================================================
// LOADING SPINNER
// ============================================================================

interface LoadingSpinnerProps {
    size?: ButtonSize;
    className?: string;
}

const spinnerSizes: Record<ButtonSize, string> = {
    sm: "w-3 h-3 border",
    md: "w-4 h-4 border-2",
    lg: "w-5 h-5 border-2",
    xl: "w-6 h-6 border-2",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", className }) => {
    return (
        <span
            className={cn(
                "rounded-full border-white/30 border-t-white animate-spin",
                spinnerSizes[size],
                className
            )}
        />
    );
};

// ============================================================================
// ICON BUTTON
// ============================================================================

interface IconButtonProps extends Omit<AnimatedButtonProps, "children" | "leftIcon" | "rightIcon"> {
    icon: React.ReactNode;
    "aria-label": string;
}

const iconSizeStyles: Record<ButtonSize, string> = {
    sm: "p-1.5 rounded-lg",
    md: "p-2.5 rounded-xl",
    lg: "p-3 rounded-xl",
    xl: "p-4 rounded-2xl",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ variant = "ghost", size = "md", icon, className, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center",
                    "transition-all duration-300 ease-out",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variantStyles[variant],
                    iconSizeStyles[size],
                    className
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                {...props}
            >
                {icon}
            </motion.button>
        );
    }
);
IconButton.displayName = "IconButton";

// ============================================================================
// GRADIENT BUTTON (Special animated gradient)
// ============================================================================

interface GradientButtonProps extends Omit<AnimatedButtonProps, "variant"> {
    gradient?: "primary" | "rainbow" | "purple";
}

const gradientStyles: Record<string, string> = {
    primary: "bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue",
    rainbow: "bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink",
    purple: "bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple",
};

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
    ({ gradient = "primary", size = "md", children, className, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center",
                    "text-white font-semibold",
                    "transition-all duration-300 ease-out",
                    "bg-[length:200%_auto] animate-gradient-shift",
                    gradientStyles[gradient],
                    sizeStyles[size],
                    "hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]",
                    className
                )}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />

                <span className="relative z-10">{children}</span>
            </motion.button>
        );
    }
);
GradientButton.displayName = "GradientButton";

export default AnimatedButton;
