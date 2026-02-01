"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Link, 
  Mic, 
  User, 
  Palette, 
  BarChart3,
  Scissors,
  Settings,
  Sparkles,
  Brain,
  Zap
} from "lucide-react";

const actions = [
  {
    title: "Video Processor",
    description: "Transform long videos into viral shorts",
    icon: Brain,
    color: "blue",
    href: "/dashboard/video-processor",
  },
  {
    title: "AI Presenter",
    description: "Create videos with AI avatars",
    icon: User,
    color: "purple",
    href: "/dashboard/ai-presenter",
  },
  {
    title: "Brand Studio",
    description: "Style videos with custom branding",
    icon: Palette,
    color: "pink",
    href: "/dashboard/brand-studio",
  },
  {
    title: "Upload Video",
    description: "Drag and drop or select video files",
    icon: Upload,
    color: "green",
    href: "/dashboard/upload",
  },
  {
    title: "Paste URL",
    description: "From YouTube, TikTok, or any platform",
    icon: Link,
    color: "cyan",
    href: "/dashboard/url",
  },
  {
    title: "Voice Clone",
    description: "Clone voices with ElevenLabs",
    icon: Mic,
    color: "orange",
    href: "/dashboard/voice-clone",
  },
  {
    title: "Editor",
    description: "Edit clips, captions, and branding",
    icon: Scissors,
    color: "indigo",
    href: "/dashboard/editor",
  },
  {
    title: "Analytics",
    description: "View performance and insights",
    icon: BarChart3,
    color: "red",
    href: "/dashboard/analytics",
  },
];

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-400",
  green: "from-green-500/20 to-green-600/20 border-green-500/30 hover:border-green-400",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-400",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 hover:border-pink-400",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:border-orange-400",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:border-cyan-400",
  indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 hover:border-indigo-400",
  red: "from-red-500/20 to-red-600/20 border-red-500/30 hover:border-red-400",
};

export function QuickActions() {
  return (
    <div className="glass-strong rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Quick Actions</h2>
          <p className="text-gray-300">Jump into your most used features</p>
        </div>
        <div className="p-2 rounded-xl glass neon-blue">
          <Sparkles className="h-5 w-5 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.a
            key={action.title}
            href={action.href}
            className={`
              group relative p-4 rounded-xl border transition-all duration-300
              bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]}
              glass hover:shadow-xl cursor-pointer
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <div className="mb-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass neon-blue">
                <action.icon className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-white mb-1 text-sm">
                {action.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        ))}
      </div>

      {/* Featured Action */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white mb-1">
              🚀 New: AI Video Processor
            </h3>
            <p className="text-sm text-gray-300">
              Transform any video into viral shorts with advanced AI
            </p>
          </div>
          <Button className="btn-primary text-sm">
            <Zap className="h-4 w-4 mr-2" />
            Try Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}