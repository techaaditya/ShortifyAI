"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnergyOrbProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "green" | "pink" | "cyan" | "orange";
  className?: string;
  animated?: boolean;
}

export function EnergyOrb({ 
  size = "md", 
  color = "blue", 
  className,
  animated = true 
}: EnergyOrbProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const colors = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    pink: "bg-pink-500",
    cyan: "bg-cyan-500",
    orange: "bg-orange-500",
  };

  const glowColors = {
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    green: "shadow-green-500/50",
    pink: "shadow-pink-500/50",
    cyan: "shadow-cyan-500/50",
    orange: "shadow-orange-500/50",
  };

  return (
    <motion.div
      className={cn(
        "rounded-full",
        sizes[size],
        colors[color],
        glowColors[color],
        className
      )}
      animate={animated ? {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        boxShadow: [
          `0 0 10px ${color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : color === 'green' ? '#10b981' : color === 'pink' ? '#ec4899' : color === 'cyan' ? '#06b6d4' : '#f97316'}`,
          `0 0 20px ${color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : color === 'green' ? '#10b981' : color === 'pink' ? '#ec4899' : color === 'cyan' ? '#06b6d4' : '#f97316'}`,
          `0 0 10px ${color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : color === 'green' ? '#10b981' : color === 'pink' ? '#ec4899' : color === 'cyan' ? '#06b6d4' : '#f97316'}`,
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}