"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  MoreHorizontal, 
  Eye, 
  Heart, 
  Share2, 
  Clock,
  Download,
  Edit3,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  {
    id: 1,
    title: "AI vs Human: The Future of Work",
    thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "2:34",
    shortsGenerated: 8,
    totalViews: "127K",
    engagement: "9.2%",
    createdAt: "2 hours ago",
    status: "completed",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "10 Productivity Hacks That Actually Work",
    thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "8:45",
    shortsGenerated: 12,
    totalViews: "89K",
    engagement: "7.8%",
    createdAt: "1 day ago",
    status: "completed",
    platform: "TikTok",
  },
  {
    id: 3,
    title: "Building a Startup from Zero",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "15:22",
    shortsGenerated: 15,
    totalViews: "234K",
    engagement: "12.4%",
    createdAt: "3 days ago",
    status: "completed",
    platform: "YouTube",
  },
  {
    id: 4,
    title: "The Psychology of Social Media",
    thumbnail: "https://images.pexels.com/photos/4050438/pexels-photo-4050438.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "0:00",
    shortsGenerated: 0,
    totalViews: "0",
    engagement: "0%",
    createdAt: "Just now",
    status: "processing",
    platform: "Instagram",
  },
];

const statusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function RecentProjects() {
  return (
    <div className="glass-strong rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
        <Button className="btn-secondary text-sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group relative p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-20 h-12 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {project.duration}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white truncate pr-4">
                    {project.title}
                  </h3>
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-medium border
                    ${statusColors[project.status as keyof typeof statusColors]}
                  `}>
                    {project.status}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    {project.shortsGenerated} shorts
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {project.totalViews}
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {project.engagement}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {project.createdAt}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {project.status === "completed" && (
                  <>
                    <Button size="sm" className="btn-primary text-xs">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="btn-secondary text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass-strong border-white/20" align="end">
                    <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Processing Bar */}
            {project.status === "processing" && (
              <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}