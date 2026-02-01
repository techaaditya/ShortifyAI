"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Upload, 
  Link, 
  Sparkles, 
  Clock,
  TrendingUp,
  Users,
  Crown
} from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickProcess = async () => {
    if (!videoUrl.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setVideoUrl("");
    
    // In real implementation, this would trigger the video processing
    console.log("Processing video:", videoUrl);
  };

  const stats = [
    { label: "Videos Created", value: "127", icon: Play, color: "blue" },
    { label: "Total Views", value: "2.4M", icon: TrendingUp, color: "green" },
    { label: "Avg. Engagement", value: "8.3%", icon: Users, color: "purple" },
    { label: "Time Saved", value: "48h", icon: Clock, color: "orange" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">Sarah</span>! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              Ready to create some viral content today?
            </p>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-xl px-4 py-2 border border-purple-500/30">
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Pro Plan</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-white font-medium">23/50</span> videos this month
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Start Section */}
      <motion.div
        className="glass-strong rounded-2xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <Sparkles className="h-5 w-5 text-blue-400 mr-2" />
          <h2 className="text-xl font-bold text-white">Quick Start</h2>
        </div>
        
        <p className="text-gray-300 mb-6">
          Paste any video URL to instantly create viral shorts with AI
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="https://youtube.com/watch?v=... or upload file"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleQuickProcess}
              disabled={!videoUrl.trim() || isProcessing}
              className="btn-primary min-w-[120px]"
            >
              {isProcessing ? (
                <div className="spinner mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isProcessing ? "Processing..." : "Create Shorts"}
            </Button>
            
            <Button className="btn-secondary">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-400">
          <Link className="h-4 w-4 mr-2" />
          Supports YouTube, TikTok, Instagram, podcasts, and direct uploads
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
              <div className={`w-2 h-2 bg-${stat.color}-400 rounded-full`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}