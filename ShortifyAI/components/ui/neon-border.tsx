"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonBorderProps {
  children: React.ReactNode;
  color?: "blue" | "purple" | "green" | "pink" | "cyan" | "orange";
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
  className?: string;
}

export function NeonBorder({ 
  children, 
  color = "blue", 
  intensity = "medium",
  animated = true,
  className 
}: NeonBorderProps) {
  const colors = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#10b981",
    pink: "#ec4899",
    cyan: "#06b6d4",
    orange: "#f97316",
  };

  const intensities = {
    low: 0.3,
    medium: 0.5,
    high: 0.8,
  };

  const colorValue = colors[color];
  const intensityValue = intensities[intensity];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        filter: animated ? `drop-shadow(0 0 10px ${colorValue}${Math.round(intensityValue * 255).toString(16)})` : undefined,
      }}
      animate={animated ? {
        filter: [
          `drop-shadow(0 0 5px ${colorValue}${Math.round(intensityValue * 0.5 * 255).toString(16)})`,
          `drop-shadow(0 0 15px ${colorValue}${Math.round(intensityValue * 255).toString(16)})`,
          `drop-shadow(0 0 5px ${colorValue}${Math.round(intensityValue * 0.5 * 255).toString(16)})`,
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}