"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  commands: string[];
  className?: string;
  autoPlay?: boolean;
  delay?: number;
}

export function TerminalWindow({ 
  title = "Terminal", 
  commands, 
  className,
  autoPlay = true,
  delay = 1000 
}: TerminalWindowProps) {
  const [visibleCommands, setVisibleCommands] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || currentIndex >= commands.length) return;

    const timer = setTimeout(() => {
      setVisibleCommands(prev => [...prev, commands[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, commands, autoPlay, delay]);

  return (
    <motion.div
      className={cn(
        "bg-slate-900 rounded-lg border border-white/20 overflow-hidden",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="text-xs text-gray-400 font-mono">{title}</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm">
        {visibleCommands.map((command, index) => (
          <motion.div
            key={index}
            className="text-green-400 mb-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {command}
          </motion.div>
        ))}
        
        {/* Cursor */}
        {currentIndex < commands.length && (
          <motion.span
            className="inline-block w-2 h-4 bg-green-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}