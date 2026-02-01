"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MatrixRainProps {
  intensity?: "low" | "medium" | "high";
  color?: "green" | "blue" | "purple" | "cyan";
}

export function MatrixRain({ intensity = "medium", color = "green" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const colors = {
      green: "#00ff41",
      blue: "#0099ff",
      purple: "#9966ff",
      cyan: "#00ffff",
    };

    const intensities = {
      low: 0.02,
      medium: 0.05,
      high: 0.1,
    };

    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - intensities[intensity]})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors[color];
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
      // Reinitialize drops for new canvas size
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) drops[i] = 1;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, color]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 2 }}
    />
  );
}