"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  Calendar,
  Filter,
  RefreshCw,
  ExternalLink,
  Play,
  Clock,
  Users,
  Target
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { AnalyticsChart, EngagementMetrics } from "@/components/ui/analytics-chart";

const timeRanges = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '1y', label: '1 Year' },
];

const topVideos = [
  {
    id: 1,
    title: "AI vs Human: The Future of Work",
    thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    views: 127000,
    engagement: 9.2,
    duration: "0:45",
    platform: "TikTok",
    publishedAt: "2 days ago",
  },
  {
    id: 2,
    title: "10 Productivity Hacks That Work",
    thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    views: 89000,
    engagement: 7.8,
    duration: "0:38",
    platform: "YouTube",
    publishedAt: "5 days ago",
  },
  {
    id: 3,
    title: "Building a Startup from Zero",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    views: 234000,
    engagement: 12.4,
    duration: "0:52",
    platform: "Instagram",
    publishedAt: "1 week ago",
  },
];

const viewsData = [
  { name: 'Mon', value: 12000 },
  { name: 'Tue', value: 19000 },
  { name: 'Wed', value: 15000 },
  { name: 'Thu', value: 25000 },
  { name: 'Fri', value: 32000 },
  { name: 'Sat', value: 28000 },
  { name: 'Sun', value: 35000 },
];

const engagementData = [
  { name: 'Likes', value: 45 },
  { name: 'Comments', value: 25 },
  { name: 'Shares', value: 20 },
  { name: 'Saves', value: 10 },
];

const platformData = [
  { name: 'TikTok', value: 40 },
  { name: 'YouTube', value: 30 },
  { name: 'Instagram', value: 20 },
  { name: 'LinkedIn', value: 10 },
];

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-300">Track your content performance and audience insights</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id)}
                  className={`text-sm ${
                    selectedTimeRange === range.id
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  size="sm"
                >
                  {range.label}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-secondary"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EngagementMetrics />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnalyticsChart
              type="line"
              data={viewsData}
              title="Views Over Time"
              metric="166K Total Views"
              change={23.4}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnalyticsChart
              type="pie"
              data={engagementData}
              title="Engagement Breakdown"
              metric="8.7% Avg Rate"
              change={15.2}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <AnalyticsChart
              type="bar"
              data={platformData}
              title="Platform Performance"
              metric="4 Platforms"
              change={12.8}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Audience Insights</h3>
                  <EnergyOrb size="sm" color="purple" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Top Age Group</span>
                    <span className="text-white font-medium">25-34 (42%)</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Primary Gender</span>
                    <span className="text-white font-medium">Male (58%)</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Top Location</span>
                    <span className="text-white font-medium">United States</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Peak Hours</span>
                    <span className="text-white font-medium">6-9 PM EST</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Watch Time</span>
                    <span className="text-white font-medium">32 seconds</span>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        {/* Top Performing Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Top Performing Videos</h2>
                <Button className="btn-secondary text-sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {topVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    className="flex items-center space-x-4 p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-14 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate mb-1">
                        {video.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {(video.views / 1000).toFixed(0)}K views
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {video.engagement}% engagement
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.publishedAt}
                        </div>
                      </div>
                    </div>

                    {/* Platform & Actions */}
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Platform</div>
                        <div className="text-sm font-medium text-white">{video.platform}</div>
                      </div>
                      
                      <Button size="sm" className="btn-secondary">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">AI Performance Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="font-semibold text-white">Best Performing Content</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Videos with "AI" and "Future" keywords perform 40% better than average.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="font-semibold text-white">Optimal Length</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    45-second clips have the highest completion rate at 78%.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="font-semibold text-white">Audience Growth</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your follower growth rate is 23% above industry average.
                  </p>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}