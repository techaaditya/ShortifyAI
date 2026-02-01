"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Brain,
  Scissors,
  MessageSquare,
  Mic,
  User,
  Palette,
  Share2,
  BarChart3,
  Zap,
  Globe,
  Users,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI detects highlights, emotions, and key moments automatically",
    color: "blue",
  },
  {
    icon: Scissors,
    title: "Smart Clip Generation",
    description: "Creates 5-10 optimized short clips from any long-form content",
    color: "purple",
  },
  {
    icon: MessageSquare,
    title: "Auto Captions & Subtitles",
    description: "Dynamic, animated captions in multiple languages with custom styling",
    color: "green",
  },
  {
    icon: Mic,
    title: "Voice Cloning",
    description: "ElevenLabs integration for AI voiceovers and voice cloning",
    color: "orange",
  },
  {
    icon: User,
    title: "AI Presenter Avatars",
    description: "Tavus AI avatars for professional intro/outro segments",
    color: "pink",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Add logos, watermarks, and brand templates to all videos",
    color: "cyan",
  },
  {
    icon: Share2,
    title: "One-Click Publishing",
    description: "Direct export to TikTok, YouTube Shorts, and Instagram Reels",
    color: "indigo",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track performance, engagement, and A/B test results",
    color: "red",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process videos in under 5 minutes with cloud-powered AI",
    color: "yellow",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Generate content in 50+ languages with auto-translation",
    color: "teal",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite team members and manage projects together",
    color: "violet",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with enterprise-grade security features",
    color: "emerald",
  },
];

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 group-hover:border-blue-400",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 group-hover:border-purple-400",
  green: "from-green-500/20 to-green-600/20 border-green-500/30 group-hover:border-green-400",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 group-hover:border-orange-400",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 group-hover:border-pink-400",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 group-hover:border-cyan-400",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 group-hover:border-indigo-400",
  red: "from-red-500/20 to-red-600/20 border-red-500/30 group-hover:border-red-400",
  yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 group-hover:border-yellow-400",
  teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 group-hover:border-teal-400",
  violet: "from-violet-500/20 to-violet-600/20 border-violet-500/30 group-hover:border-violet-400",
  emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 group-hover:border-emerald-400",
};

export function FeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Brain className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-gray-300">
              Powered by Cutting-Edge AI
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need to Create{" "}
            <span className="gradient-text">Viral Content</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From AI-powered video analysis to one-click publishing, ShortifyAI
            provides a complete toolkit for modern content creators.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className={`
                relative p-8 rounded-2xl border transition-all duration-300
                bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]}
                glass-strong group-hover:shadow-2xl
              `}>
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass neon-blue">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="glass-strong rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Content?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of creators who are already using ShortifyAI to
              boost their engagement and grow their audience.
            </p>
            <motion.a
              href="/auth/signup"
              className="inline-block btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Creating Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}