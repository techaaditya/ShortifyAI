"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Play, 
  Clock,
  Eye,
  Heart,
  Share2,
  Download
} from "lucide-react";

const stats = [
  {
    title: "Total Views",
    value: "2,847,392",
    change: "+23.4%",
    changeType: "positive" as const,
    icon: Eye,
    color: "blue",
    details: "vs last month"
  },
  {
    title: "Engagement Rate",
    value: "8.74%",
    change: "+15.2%",
    changeType: "positive" as const,
    icon: Heart,
    color: "pink",
    details: "average across all videos"
  },
  {
    title: "Videos Created",
    value: "127",
    change: "+34",
    changeType: "positive" as const,
    icon: Play,
    color: "green",
    details: "this month"
  },
  {
    title: "Shares Generated",
    value: "45,829",
    change: "+89.3%",
    changeType: "positive" as const,
    icon: Share2,
    color: "purple",
    details: "organic shares"
  },
  {
    title: "Time Saved",
    value: "148h",
    change: "vs manual editing",
    changeType: "neutral" as const,
    icon: Clock,
    color: "orange",
    details: "this month"
  },
  {
    title: "Downloads",
    value: "892",
    change: "+12.8%",
    changeType: "positive" as const,
    icon: Download,
    color: "cyan",
    details: "total exports"
  },
];

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
  green: "from-green-500/20 to-green-600/20 border-green-500/30",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
};

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`
            relative p-6 rounded-2xl border transition-all duration-300 group
            bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]}
            glass-strong hover:shadow-2xl hover:scale-[1.02]
          `}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl glass neon-blue">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            
            {stat.changeType !== "neutral" && (
              <div className={`
                flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${stat.changeType === "positive" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
                }
              `}>
                <TrendingUp className={`h-3 w-3 mr-1 ${
                  (stat.changeType as string) === "negative" ? "rotate-180" : ""
                }`} />
                {stat.change}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">{stat.title}</h3>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-gray-400">{stat.details}</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-500`}
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
            />
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
}