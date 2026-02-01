"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantumLoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "cyan";
  className?: string;
}

export function QuantumLoader({ 
  size = "md", 
  color = "blue",
  className 
}: QuantumLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    cyan: "border-cyan-500",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-t-transparent",
          colorClasses[color]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Middle ring */}
      <motion.div
        className={cn(
          "absolute inset-1 rounded-full border-2 border-r-transparent",
          colorClasses[color]
        )}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Inner ring */}
      <motion.div
        className={cn(
          "absolute inset-2 rounded-full border-2 border-b-transparent",
          colorClasses[color]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Core */}
      <motion.div
        className={cn(
          "absolute inset-3 rounded-full",
          color === "blue" ? "bg-blue-500" :
          color === "purple" ? "bg-purple-500" :
          "bg-cyan-500"
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full",
            color === "blue" ? "bg-blue-400" :
            color === "purple" ? "bg-purple-400" :
            "bg-cyan-400"
          )}
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: `${size === "sm" ? 16 : size === "md" ? 24 : 32}px 0`,
          }}
          animate={{
            rotate: 360,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}