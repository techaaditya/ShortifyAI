"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
}

export function HolographicCard({ 
  children, 
  className, 
  intensity = "medium",
  animated = true 
}: HolographicCardProps) {
  const intensityClasses = {
    low: "bg-gradient-to-br from-slate-900/20 to-slate-800/20",
    medium: "bg-gradient-to-br from-slate-900/40 to-slate-800/40",
    high: "bg-gradient-to-br from-slate-900/60 to-slate-800/60",
  };

  return (
    <motion.div
      className={cn("relative group", className)}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Holographic background */}
      <div className={cn(
        "absolute inset-0 rounded-xl backdrop-blur-xl border border-white/10",
        intensityClasses[intensity]
      )} />
      
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
        }}
        animate={animated ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}