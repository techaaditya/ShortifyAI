"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus,
  Play,
  MoreHorizontal,
  Eye,
  Heart,
  Share2,
  Download,
  Edit3,
  Trash2,
  Clock,
  Calendar,
  Folder,
  Star
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
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
    description: "Exploring how AI will transform the workplace and what skills humans need to develop.",
    thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "2:34",
    clipsGenerated: 8,
    totalViews: 127000,
    engagement: 9.2,
    status: "completed",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    platform: "YouTube",
    tags: ["AI", "Future", "Work", "Technology"],
    isStarred: true,
  },
  {
    id: 2,
    title: "10 Productivity Hacks That Actually Work",
    description: "Science-backed productivity techniques that can transform your daily routine.",
    thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "8:45",
    clipsGenerated: 12,
    totalViews: 89000,
    engagement: 7.8,
    status: "completed",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-13",
    platform: "TikTok",
    tags: ["Productivity", "Hacks", "Lifestyle"],
    isStarred: false,
  },
  {
    id: 3,
    title: "Building a Startup from Zero",
    description: "Complete guide to starting a tech company with no initial funding.",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "15:22",
    clipsGenerated: 15,
    totalViews: 234000,
    engagement: 12.4,
    status: "completed",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-10",
    platform: "YouTube",
    tags: ["Startup", "Business", "Entrepreneurship"],
    isStarred: true,
  },
  {
    id: 4,
    title: "The Psychology of Social Media",
    description: "Understanding how social platforms affect our behavior and mental health.",
    thumbnail: "https://images.pexels.com/photos/4050438/pexels-photo-4050438.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "0:00",
    clipsGenerated: 0,
    totalViews: 0,
    engagement: 0,
    status: "processing",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    platform: "Instagram",
    tags: ["Psychology", "Social Media", "Mental Health"],
    isStarred: false,
  },
  {
    id: 5,
    title: "Crypto Trading for Beginners",
    description: "Essential strategies and tips for getting started with cryptocurrency trading.",
    thumbnail: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "12:18",
    clipsGenerated: 10,
    totalViews: 156000,
    engagement: 8.9,
    status: "completed",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-06",
    platform: "YouTube",
    tags: ["Crypto", "Trading", "Finance"],
    isStarred: false,
  },
  {
    id: 6,
    title: "Healthy Meal Prep Ideas",
    description: "Quick and nutritious meal prep recipes for busy professionals.",
    thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    duration: "6:42",
    clipsGenerated: 7,
    totalViews: 78000,
    engagement: 11.3,
    status: "completed",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-04",
    platform: "Instagram",
    tags: ["Health", "Food", "Lifestyle"],
    isStarred: false,
  },
];

const statusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

const filterOptions = [
  { id: 'all', label: 'All Projects' },
  { id: 'completed', label: 'Completed' },
  { id: 'processing', label: 'Processing' },
  { id: 'starred', label: 'Starred' },
];

const sortOptions = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'views', label: 'Most Views' },
  { id: 'engagement', label: 'Best Engagement' },
  { id: 'clips', label: 'Most Clips' },
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'starred' && project.isStarred) ||
                         project.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (selectedSort) {
      case 'views':
        return b.totalViews - a.totalViews;
      case 'engagement':
        return b.engagement - a.engagement;
      case 'clips':
        return b.clipsGenerated - a.clipsGenerated;
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
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
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-300">Manage your video projects and generated clips</p>
          </div>
          
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {filterOptions.map((option) => (
                      <Button
                        key={option.id}
                        onClick={() => setSelectedFilter(option.id)}
                        className={`text-sm ${
                          selectedFilter === option.id
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                        size="sm"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="btn-secondary" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-strong border-white/20">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.id}
                          onClick={() => setSelectedSort(option.id)}
                          className="text-gray-300 focus:text-white focus:bg-white/10"
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-center space-x-1 border border-white/20 rounded-lg p-1">
                    <Button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid'
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                      size="sm"
                      variant="ghost"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list'
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                      size="sm"
                      variant="ghost"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <HolographicCard intensity="medium" className="h-full">
                    <div className="glass-strong rounded-xl border border-white/20 h-full overflow-hidden">
                      {/* Thumbnail */}
                      <div className="relative">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <div className={`
                            px-2 py-1 rounded-full text-xs font-medium border
                            ${statusColors[project.status as keyof typeof statusColors]}
                          `}>
                            {project.status}
                          </div>
                        </div>

                        {/* Star */}
                        {project.isStarred && (
                          <div className="absolute top-3 right-3">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                        )}

                        {/* Duration */}
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {project.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Play className="h-3 w-3 mr-1" />
                              {project.clipsGenerated}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {formatViews(project.totalViews)}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {project.engagement}%
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400">
                            {formatDate(project.updatedAt)}
                          </div>
                          
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
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit
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
                    </div>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl border border-white/20">
                <div className="divide-y divide-white/10">
                  {sortedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="p-6 hover:bg-white/5 transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-24 h-14 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {project.duration}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-white truncate">
                                {project.title}
                              </h3>
                              {project.isStarred && (
                                <Star className="h-4 w-4 text-yellow-400 fill-current flex-shrink-0" />
                              )}
                            </div>
                            <div className={`
                              px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0
                              ${statusColors[project.status as keyof typeof statusColors]}
                            `}>
                              {project.status}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-2 line-clamp-1">
                            {project.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Play className="h-3 w-3 mr-1" />
                                {project.clipsGenerated} clips
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {formatViews(project.totalViews)}
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {project.engagement}%
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(project.updatedAt)}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button size="sm" className="btn-primary">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="glass-strong border-white/20" align="end">
                                  <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Edit
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
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          )}
        </motion.div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
            </p>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}