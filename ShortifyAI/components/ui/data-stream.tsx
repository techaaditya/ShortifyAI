"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DataStreamProps {
  direction?: "vertical" | "horizontal";
  speed?: number;
  density?: number;
  color?: "green" | "blue" | "cyan" | "purple";
  className?: string;
}

export function DataStream({
  direction = "vertical",
  speed = 1,
  density = 20,
  color = "green",
  className,
}: DataStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const characters = "0123456789ABCDEF";
  
  const colorClasses = {
    green: "text-green-400",
    blue: "text-blue-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const streams: HTMLDivElement[] = [];

    const createStream = () => {
      const stream = document.createElement("div");
      stream.className = `absolute font-mono text-xs ${colorClasses[color]} opacity-70`;
      
      if (direction === "vertical") {
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.top = "-20px";
        stream.style.writingMode = "vertical-rl";
      } else {
        stream.style.top = `${Math.random() * 100}%`;
        stream.style.left = "-20px";
      }

      // Generate random characters
      const length = Math.floor(Math.random() * 10) + 5;
      let text = "";
      for (let i = 0; i < length; i++) {
        text += characters[Math.floor(Math.random() * characters.length)];
      }
      stream.textContent = text;

      container.appendChild(stream);
      streams.push(stream);

      // Animate the stream
      const animate = () => {
        if (direction === "vertical") {
          const currentTop = parseInt(stream.style.top) || 0;
          stream.style.top = `${currentTop + speed}px`;
          
          if (currentTop > container.offsetHeight + 20) {
            container.removeChild(stream);
            const index = streams.indexOf(stream);
            if (index > -1) streams.splice(index, 1);
            return;
          }
        } else {
          const currentLeft = parseInt(stream.style.left) || 0;
          stream.style.left = `${currentLeft + speed}px`;
          
          if (currentLeft > container.offsetWidth + 20) {
            container.removeChild(stream);
            const index = streams.indexOf(stream);
            if (index > -1) streams.splice(index, 1);
            return;
          }
        }

        requestAnimationFrame(animate);
      };

      animate();
    };

    const interval = setInterval(createStream, 1000 / density);

    return () => {
      clearInterval(interval);
      streams.forEach(stream => {
        if (container.contains(stream)) {
          container.removeChild(stream);
        }
      });
    };
  }, [direction, speed, density, color]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: "100%", width: "100%" }}
    />
  );
}