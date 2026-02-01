"use client";

import { motion } from "framer-motion";
import { 
  Play, 
  Upload, 
  Download, 
  Share2, 
  User, 
  CheckCircle, 
  AlertCircle,
  Clock,
  TrendingUp
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "video_completed",
    title: "Video processing completed",
    description: "AI vs Human: The Future of Work",
    time: "2 minutes ago",
    icon: CheckCircle,
    color: "green",
    metadata: "8 shorts generated",
  },
  {
    id: 2,
    type: "export",
    title: "Video exported to TikTok",
    description: "Productivity Hacks #3",
    time: "15 minutes ago",
    icon: Download,
    color: "blue",
    metadata: "1080x1920, 45s",
  },
  {
    id: 3,
    type: "share",
    title: "Video shared to YouTube Shorts",
    description: "Building a Startup from Zero",
    time: "1 hour ago",
    icon: Share2,
    color: "purple",
    metadata: "Auto-published",
  },
  {
    id: 4,
    type: "upload",
    title: "New video uploaded",
    description: "The Psychology of Social Media",
    time: "2 hours ago",
    icon: Upload,
    color: "orange",
    metadata: "Processing started",
  },
  {
    id: 5,
    type: "processing",
    title: "AI analysis in progress",
    description: "Analyzing scenes and highlights...",
    time: "2 hours ago",
    icon: Clock,
    color: "yellow",
    metadata: "65% complete",
  },
  {
    id: 6,
    type: "engagement",
    title: "High engagement detected",
    description: "Your startup video is trending!",
    time: "3 hours ago",
    icon: TrendingUp,
    color: "pink",
    metadata: "+127% views",
  },
  {
    id: 7,
    type: "team",
    title: "Team member joined",
    description: "Alex Chen joined your workspace",
    time: "1 day ago",
    icon: User,
    color: "cyan",
    metadata: "Editor access",
  },
  {
    id: 8,
    type: "error",
    title: "Processing failed",
    description: "Unable to process video format",
    time: "2 days ago",
    icon: AlertCircle,
    color: "red",
    metadata: "Unsupported format",
  },
];

const iconColors = {
  green: "text-green-400 bg-green-500/20",
  blue: "text-blue-400 bg-blue-500/20",
  purple: "text-purple-400 bg-purple-500/20",
  orange: "text-orange-400 bg-orange-500/20",
  yellow: "text-yellow-400 bg-yellow-500/20",
  pink: "text-pink-400 bg-pink-500/20",
  cyan: "text-cyan-400 bg-cyan-500/20",
  red: "text-red-400 bg-red-500/20",
};

export function ActivityFeed() {
  return (
    <div className="glass-strong rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
        <div className="text-sm text-gray-400">
          Live updates
          <div className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="group relative p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ x: -2 }}
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                ${iconColors[activity.color as keyof typeof iconColors]}
              `}>
                <activity.icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white text-sm">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-1">
                  {activity.description}
                </p>
                
                {activity.metadata && (
                  <div className="text-xs text-gray-400 bg-slate-800/50 px-2 py-1 rounded-md inline-block">
                    {activity.metadata}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-7 top-12 w-px h-4 bg-gradient-to-b from-white/20 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors duration-200">
          View all activity →
        </button>
      </div>
    </div>
  );
}