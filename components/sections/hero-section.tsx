"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CyberButton } from "@/components/ui/cyber-button";
import { NeonBorder } from "@/components/ui/neon-border";
import { HolographicCard } from "@/components/ui/holographic-card";
import { Play, Sparkles, Zap, Users, BarChart3, ArrowRight, Brain, Video, Palette } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Users, value: "50K+", label: "Creators" },
  { icon: Play, value: "2M+", label: "Videos" },
  { icon: BarChart3, value: "10x", label: "Growth" },
  { icon: Zap, value: "5min", label: "Speed" },
];

const features = [
  {
    icon: Brain,
    title: "AI Video Processor",
    description: "Transform long videos into viral shorts with advanced AI analysis",
    color: "blue",
  },
  {
    icon: Video,
    title: "Interactive AI Agent",
    description: "Create engaging videos with AI presenters and voice cloning",
    color: "purple",
  },
  {
    icon: Palette,
    title: "Brand Studio",
    description: "Style videos with custom branding, captions, and templates",
    color: "pink",
  },
];

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleQuickStart = () => {
    if (videoUrl) {
      window.location.href = `/dashboard?url=${encodeURIComponent(videoUrl)}`;
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.7, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <NeonBorder color="blue" intensity="medium" animated className="inline-flex items-center px-6 py-3 rounded-full glass-strong mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-blue-400 mr-3" />
              </motion.div>
              <span className="text-sm font-medium text-gray-200">
                Powered by Advanced AI • Trusted by 50K+ Creators
              </span>
            </NeonBorder>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform Videos into{" "}
            <motion.span 
              className="gradient-text block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Viral Shorts
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            AI instantly creates 5-10 engaging clips with auto-captions, branding, and optimization.
            Ready for TikTok, YouTube Shorts, Instagram Reels, and LinkedIn.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <HolographicCard intensity="medium" className="p-6 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass neon-blue mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Start */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <HolographicCard intensity="high" className="p-8">
              <div className="glass-strong rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Try ShortifyAI Now</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Paste YouTube, TikTok, or podcast URL..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="input-futuristic py-4 text-base"
                    />
                  </div>
                  <CyberButton
                    onClick={handleQuickStart}
                    variant="primary"
                    size="lg"
                    className="px-8"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Create Shorts
                  </CyberButton>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  ✨ Free trial • No credit card required • 5 videos included
                </p>
              </div>
            </HolographicCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link href="/auth/signup">
              <CyberButton variant="primary" size="lg" className="px-10 py-4">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </CyberButton>
            </Link>
            <Link href="#how-it-works">
              <CyberButton variant="secondary" size="lg" className="px-10 py-4">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </CyberButton>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <HolographicCard intensity="low" className="text-center p-6">
                  <NeonBorder 
                    color={index % 2 === 0 ? 'blue' : 'purple'} 
                    intensity="low" 
                    animated
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass-strong mb-4"
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </NeonBorder>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <NeonBorder color="cyan" intensity="low" animated className="w-6 h-10 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </NeonBorder>
      </motion.div>
    </section>
  );
}