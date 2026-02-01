"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  User, 
  Mic, 
  Play, 
  Download, 
  Settings,
  Sparkles,
  Loader2,
  Volume2,
  Heart,
  Zap,
  Camera
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { CyberProgress } from "@/components/ui/cyber-progress";

const avatars = [
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Professional presenter with warm personality',
    thumbnail: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    voices: ['professional', 'friendly', 'energetic'],
    languages: ['en', 'es', 'fr'],
    category: 'business',
  },
  {
    id: 'david',
    name: 'David',
    description: 'Tech-savvy presenter for technical content',
    thumbnail: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    voices: ['authoritative', 'casual', 'expert'],
    languages: ['en', 'de', 'zh'],
    category: 'tech',
  },
  {
    id: 'emma',
    name: 'Emma',
    description: 'Creative presenter perfect for lifestyle content',
    thumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    voices: ['creative', 'inspiring', 'upbeat'],
    languages: ['en', 'it', 'pt'],
    category: 'lifestyle',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Versatile presenter for educational content',
    thumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    voices: ['educational', 'clear', 'engaging'],
    languages: ['en', 'ja', 'ko'],
    category: 'education',
  },
];

const voiceSettings = {
  stability: [0.75],
  clarity: [0.8],
  emotion: 'neutral',
};

export default function AIPresenterPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(avatars[0].voices[0]);
  const [settings, setSettings] = useState(voiceSettings);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);

  const handleGenerate = async () => {
    if (!script.trim()) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    try {
      // Simulate AI presenter generation with progress
      const steps = [
        'Analyzing script...',
        'Generating voice...',
        'Creating avatar movements...',
        'Rendering video...',
        'Finalizing output...',
      ];
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGenerationProgress(((i + 1) / steps.length) * 100);
      }
      
      // Mock generated video
      setGeneratedVideo({
        id: 'generated_' + Date.now(),
        videoUrl: 'https://example.com/ai-presenter-video.mp4',
        thumbnailUrl: selectedAvatar.thumbnail,
        duration: script.split(' ').length * 0.5,
        avatar: selectedAvatar,
        voice: selectedVoice,
        script,
        settings,
        generatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Presenter Studio</h1>
            <p className="text-gray-300">Create professional videos with AI avatars and voice cloning</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 text-blue-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Choose Avatar</h2>
                </div>

                <div className="space-y-4">
                  {avatars.map((avatar) => (
                    <motion.div
                      key={avatar.id}
                      className={`
                        p-4 rounded-xl cursor-pointer transition-all duration-300 border
                        ${selectedAvatar.id === avatar.id 
                          ? "bg-blue-500/20 border-blue-500/50" 
                          : "glass hover:bg-white/5 border-white/10"
                        }
                      `}
                      onClick={() => setSelectedAvatar(avatar)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={avatar.thumbnail}
                            alt={avatar.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <EnergyOrb size="sm" color="blue" className="absolute -bottom-1 -right-1" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{avatar.name}</h3>
                          <p className="text-xs text-gray-300 mb-1">{avatar.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                              {avatar.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {avatar.languages.length} languages
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Voice Selection */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Label className="text-white mb-3 block">Voice Style</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedAvatar.voices.map((voice) => (
                      <button
                        key={voice}
                        onClick={() => setSelectedVoice(voice)}
                        className={`
                          p-3 rounded-lg text-sm font-medium transition-all duration-200 border
                          ${selectedVoice === voice
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "glass text-gray-300 hover:text-white border-white/10"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="capitalize">{voice}</span>
                          <Volume2 className="h-3 w-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Script & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <Mic className="h-5 w-5 text-purple-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Script & Voice</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="script" className="text-white mb-2 block">
                      Script
                    </Label>
                    <Textarea
                      id="script"
                      placeholder="Enter your script here... The AI will generate natural speech and avatar movements."
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      className="min-h-32 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 resize-none"
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-400">
                        {script.length}/1000 characters
                      </p>
                      <p className="text-xs text-gray-400">
                        ~{Math.ceil(script.split(' ').length * 0.5)}s duration
                      </p>
                    </div>
                  </div>

                  {/* Voice Settings */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white mb-2 block">
                        Stability: {settings.stability[0]}
                      </Label>
                      <Slider
                        value={settings.stability}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, stability: value }))}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                        disabled={isGenerating}
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">
                        Clarity: {settings.clarity[0]}
                      </Label>
                      <Slider
                        value={settings.clarity}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, clarity: value }))}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                        disabled={isGenerating}
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Emotion</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {['neutral', 'happy', 'serious'].map((emotion) => (
                          <button
                            key={emotion}
                            onClick={() => setSettings(prev => ({ ...prev, emotion }))}
                            className={`
                              p-2 rounded-lg text-xs font-medium transition-all duration-200 border
                              ${settings.emotion === emotion
                                ? "bg-pink-500/20 text-pink-400 border-pink-500/30"
                                : "glass text-gray-300 hover:text-white border-white/10"
                              }
                            `}
                            disabled={isGenerating}
                          >
                            <div className="flex items-center justify-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span className="capitalize">{emotion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!script.trim() || isGenerating}
                    className="w-full btn-primary py-3"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating... {Math.round(generationProgress)}%
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Video
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <CyberProgress value={generationProgress} color="purple" />
                      <p className="text-xs text-gray-400 text-center">
                        Creating your AI presenter video...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Preview & Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <Camera className="h-5 w-5 text-green-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Preview</h2>
                </div>

                {generatedVideo ? (
                  <div className="space-y-4">
                    {/* Video Preview */}
                    <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl relative overflow-hidden border border-white/10">
                      <img
                        src={generatedVideo.thumbnailUrl}
                        alt="Generated video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4">
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/80 text-white text-center py-2 px-4 rounded-lg text-sm">
                          AI Presenter: {generatedVideo.avatar.name}
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Duration</span>
                        <span className="text-sm text-white">{Math.round(generatedVideo.duration)}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Avatar</span>
                        <span className="text-sm text-white">{generatedVideo.avatar.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Voice</span>
                        <span className="text-sm text-white capitalize">{generatedVideo.voice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Quality</span>
                        <span className="text-sm text-green-400">HD 1080p</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <Button className="w-full btn-primary">
                        <Download className="h-4 w-4 mr-2" />
                        Download Video
                      </Button>
                      <Button className="w-full btn-secondary">
                        <Zap className="h-4 w-4 mr-2" />
                        Add to Project
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">No video generated yet</p>
                      <p className="text-sm text-gray-500">
                        Enter a script and click generate to create your AI presenter video
                      </p>
                    </div>
                  </div>
                )}

                {/* Recent Generations */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-3">Recent Generations</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3 p-2 rounded-lg glass hover:bg-white/5 transition-colors cursor-pointer">
                        <img
                          src={`https://images.pexels.com/photos/${774909 + i}/pexels-photo-${774909 + i}.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop&crop=face`}
                          alt={`Generation ${i}`}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white truncate">AI Presenter Video {i}</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                        <Play className="h-3 w-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}