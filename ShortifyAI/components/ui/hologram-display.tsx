"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HologramDisplayProps {
  children: React.ReactNode;
  className?: string;
  glitchEffect?: boolean;
}

export function HologramDisplay({ children, className, glitchEffect = true }: HologramDisplayProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hologram effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-cyan-500/10 pointer-events-none"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(transparent 50%, rgba(0, 255, 255, 0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%"],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glitch effect */}
      {glitchEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, 2, -2, 0],
            filter: [
              "hue-rotate(0deg)",
              "hue-rotate(90deg)",
              "hue-rotate(180deg)",
              "hue-rotate(0deg)",
            ],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20" />
        </motion.div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}