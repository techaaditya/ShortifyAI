"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberProgressProps {
  value: number;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "green" | "pink" | "cyan" | "orange";
  showValue?: boolean;
  className?: string;
}

export function CyberProgress({ 
  value, 
  size = "md", 
  color = "blue",
  showValue = true,
  className 
}: CyberProgressProps) {
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colors = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
    pink: "from-pink-400 to-pink-600",
    cyan: "from-cyan-400 to-cyan-600",
    orange: "from-orange-400 to-orange-600",
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
    <div className={cn("w-full", className)}>
      <div className={cn("relative bg-white/10 rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          className={cn(
            "h-full bg-gradient-to-r rounded-full",
            colors[color],
            glowColors[color]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            boxShadow: `0 0 10px ${color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : color === 'green' ? '#10b981' : color === 'pink' ? '#ec4899' : color === 'cyan' ? '#06b6d4' : '#f97316'}`,
          }}
        />
        
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {showValue && (
        <motion.div
          className="text-xs text-gray-400 mt-1 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(value)}%
        </motion.div>
      )}
    </div>
  );
}