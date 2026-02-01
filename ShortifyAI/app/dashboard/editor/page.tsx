"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Download,
  Share2,
  Settings,
  Type,
  Palette,
  User,
  Mic,
  Scissors,
  Layers,
  Sparkles
} from "lucide-react";

const clips = [
  {
    id: 1,
    title: "Hook: AI vs Human Debate",
    duration: "0:45",
    thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    confidence: 95,
  },
  {
    id: 2,
    title: "Key Point: Future of Work",
    duration: "0:38",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    confidence: 89,
  },
  {
    id: 3,
    title: "Conclusion: Take Action",
    duration: "0:52",
    thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop",
    confidence: 92,
  },
];

export default function EditorPage() {
  const [selectedClip, setSelectedClip] = useState(clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [activeTab, setActiveTab] = useState("captions");

  const tabs = [
    { id: "captions", label: "Captions", icon: Type },
    { id: "style", label: "Style", icon: Palette },
    { id: "avatar", label: "Avatar", icon: User },
    { id: "audio", label: "Audio", icon: Mic },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Video Editor</h1>
            <p className="text-gray-300">Edit and customize your AI-generated shorts</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Clips Sidebar */}
          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Scissors className="h-5 w-5 text-blue-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Generated Clips</h2>
            </div>
            
            <div className="space-y-3">
              {clips.map((clip, index) => (
                <motion.div
                  key={clip.id}
                  className={`
                    p-3 rounded-xl cursor-pointer transition-all duration-200 border
                    ${selectedClip.id === clip.id 
                      ? "bg-blue-500/20 border-blue-500/50" 
                      : "glass hover:bg-white/5 border-white/10"
                    }
                  `}
                  onClick={() => setSelectedClip(clip)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-16 h-9 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm mb-1 truncate">
                        {clip.title}
                      </h3>
                      <div className="text-xs text-gray-400 mb-2">
                        {clip.duration}
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-white/10 rounded-full h-1 mr-2">
                          <div 
                            className="h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                            style={{ width: `${clip.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{clip.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="w-full mt-6 btn-secondary text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate More
            </Button>
          </motion.div>

          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 relative overflow-hidden">
                <img
                  src={selectedClip.thumbnail}
                  alt={selectedClip.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 text-white text-center py-2 px-4 rounded-lg text-sm font-medium">
                    "AI is transforming the way we work"
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400 w-12">0:00</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full cursor-pointer">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-1/3" />
                  </div>
                  <span className="text-sm text-gray-400 w-12">{selectedClip.duration}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-gray-400" />
                    <div className="w-20">
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Editor */}
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Timeline</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Layers className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white">Video Track</span>
                  <div className="flex-1 h-8 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded ml-4" />
                </div>
                
                <div className="flex items-center space-x-2 p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Type className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-white">Captions</span>
                  <div className="flex-1 h-6 bg-gradient-to-r from-green-500/50 to-cyan-500/50 rounded ml-4" />
                </div>
                
                <div className="flex items-center space-x-2 p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <Mic className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-white">Audio</span>
                  <div className="flex-1 h-6 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded ml-4" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Properties Panel */}
          <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Properties</h2>
            
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center justify-center p-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "glass text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <tab.icon className="h-4 w-4 mr-1" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "captions" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Caption Text</Label>
                    <Input
                      value="AI is transforming the way we work"
                      className="mt-1 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Font Size</Label>
                    <Slider
                      defaultValue={[24]}
                      max={48}
                      min={12}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Position</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["Top", "Center", "Bottom"].map((pos) => (
                        <Button key={pos} size="sm" className="btn-secondary text-xs">
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "style" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Template</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Modern", "Classic", "Bold", "Minimal"].map((style) => (
                        <Button key={style} size="sm" className="btn-secondary text-xs">
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Color Scheme</Label>
                    <div className="flex space-x-2 mt-2">
                      {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"].map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full cursor-pointer border-2 border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "avatar" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">AI Presenter</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Sarah", "David", "Emma", "Custom"].map((avatar) => (
                        <Button key={avatar} size="sm" className="btn-secondary text-xs">
                          {avatar}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Corner", "Center", "Side", "Hidden"].map((pos) => (
                        <Button key={pos} size="sm" className="btn-secondary text-xs">
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "audio" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Voice</Label>
                    <div className="space-y-2 mt-2">
                      {["Original", "AI Clone", "Custom"].map((voice) => (
                        <Button key={voice} size="sm" className="w-full btn-secondary text-xs">
                          {voice}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Volume</Label>
                    <Slider
                      defaultValue={[75]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Export Options */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="font-semibold text-white mb-4">Export</h3>
              <div className="space-y-2">
                <Button className="w-full btn-primary text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download MP4
                </Button>
                <Button className="w-full btn-secondary text-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share to Platforms
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}