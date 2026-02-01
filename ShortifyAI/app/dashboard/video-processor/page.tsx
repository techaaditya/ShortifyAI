"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VideoPlayer } from "@/components/ui/video-player";
import { ExportModal } from "@/components/ui/export-modal";
import { AuthGuard } from "@/components/auth/auth-guard";
import { 
  Link, 
  Upload, 
  Play, 
  Download, 
  Share2, 
  Settings,
  Sparkles,
  Brain,
  Scissors,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
  Music,
  Palette,
  Target,
  TrendingUp,
  Eye,
  Heart
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { CyberProgress } from "@/components/ui/cyber-progress";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

interface GeneratedClip {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  confidence: number;
  type: 'hook' | 'highlight' | 'conclusion';
  metadata: {
    summary: string;
    hashtags: string[];
    engagementScore: number;
    keywordDensity: number;
    viralPotential: number;
  };
  analytics: {
    estimatedViews: string;
    completionRate: number;
    shareability: number;
  };
}

export default function VideoProcessorPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: 'extract',
      title: 'Video Analysis',
      description: 'Extracting metadata and analyzing content structure',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'transcript',
      title: 'AI Transcription',
      description: 'Generating accurate transcript with Gemini AI',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'moments',
      title: 'Viral Moments Detection',
      description: 'Identifying high-engagement moments and hooks',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'clips',
      title: 'Smart Clip Generation',
      description: 'Creating optimized short clips with perfect timing',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'captions',
      title: 'Dynamic Captions',
      description: 'Adding animated captions and subtitle styling',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'optimization',
      title: 'Platform Optimization',
      description: 'Optimizing for TikTok, YouTube Shorts, and Instagram',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'metadata',
      title: 'SEO & Metadata',
      description: 'Generating titles, descriptions, and viral hashtags',
      status: 'pending',
      progress: 0,
    },
  ]);
  const [generatedClips, setGeneratedClips] = useState<GeneratedClip[]>([]);
  const [selectedClip, setSelectedClip] = useState<GeneratedClip | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleProcessVideo = async () => {
    if (!videoUrl.trim()) return;
    
    setIsProcessing(true);
    setGeneratedClips([]);
    
    // Reset processing steps
    setProcessingSteps(steps => steps.map(step => ({
      ...step,
      status: 'pending',
      progress: 0,
    })));

    try {
      // Simulate processing steps with realistic timing
      for (let i = 0; i < processingSteps.length; i++) {
        const stepId = processingSteps[i].id;
        
        // Start processing step
        setProcessingSteps(steps => steps.map(step => 
          step.id === stepId 
            ? { ...step, status: 'processing' }
            : step
        ));

        // Simulate progress with variable timing
        const stepDuration = stepId === 'transcript' ? 4000 : stepId === 'clips' ? 6000 : 3000;
        const progressSteps = 20;
        const stepInterval = stepDuration / progressSteps;

        for (let progress = 0; progress <= 100; progress += 5) {
          await new Promise(resolve => setTimeout(resolve, stepInterval));
          setProcessingSteps(steps => steps.map(step => 
            step.id === stepId 
              ? { ...step, progress }
              : step
          ));
        }

        // Complete step
        setProcessingSteps(steps => steps.map(step => 
          step.id === stepId 
            ? { ...step, status: 'completed', progress: 100 }
            : step
        ));

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Generate enhanced mock clips with analytics
      const mockClips: GeneratedClip[] = [
        {
          id: 1,
          title: "Hook: AI vs Human Debate",
          duration: "0:45",
          thumbnail: "https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          confidence: 95,
          type: "hook",
          metadata: {
            summary: "Engaging opening about AI transformation in the workplace",
            hashtags: ["#AI", "#FutureOfWork", "#Technology", "#Innovation", "#Viral"],
            engagementScore: 92,
            keywordDensity: 8.5,
            viralPotential: 88,
          },
          analytics: {
            estimatedViews: "150K-300K",
            completionRate: 78,
            shareability: 85,
          },
        },
        {
          id: 2,
          title: "Key Point: Human Skills Matter",
          duration: "0:38",
          thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          confidence: 89,
          type: "highlight",
          metadata: {
            summary: "Focus on uniquely human skills like creativity and empathy",
            hashtags: ["#Skills", "#Creativity", "#Empathy", "#HumanValue", "#Career"],
            engagementScore: 87,
            keywordDensity: 7.2,
            viralPotential: 82,
          },
          analytics: {
            estimatedViews: "80K-150K",
            completionRate: 72,
            shareability: 79,
          },
        },
        {
          id: 3,
          title: "Call to Action: Embrace AI",
          duration: "0:52",
          thumbnail: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          confidence: 92,
          type: "conclusion",
          metadata: {
            summary: "Powerful call to action about AI collaboration and adaptation",
            hashtags: ["#Action", "#Collaboration", "#Future", "#Adaptation", "#Growth"],
            engagementScore: 94,
            keywordDensity: 9.1,
            viralPotential: 91,
          },
          analytics: {
            estimatedViews: "200K-400K",
            completionRate: 81,
            shareability: 88,
          },
        },
        {
          id: 4,
          title: "Insight: AI Productivity Boost",
          duration: "0:41",
          thumbnail: "https://images.pexels.com/photos/4050438/pexels-photo-4050438.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          confidence: 86,
          type: "highlight",
          metadata: {
            summary: "How AI tools can increase productivity by 40%",
            hashtags: ["#Productivity", "#AITools", "#Efficiency", "#Business", "#Success"],
            engagementScore: 83,
            keywordDensity: 6.8,
            viralPotential: 79,
          },
          analytics: {
            estimatedViews: "60K-120K",
            completionRate: 69,
            shareability: 74,
          },
        },
        {
          id: 5,
          title: "Trend: Remote Work Evolution",
          duration: "0:36",
          thumbnail: "https://images.pexels.com/photos/4050438/pexels-photo-4050438.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          confidence: 84,
          type: "highlight",
          metadata: {
            summary: "The evolution of remote work with AI assistance",
            hashtags: ["#RemoteWork", "#WorkFromHome", "#DigitalNomad", "#Future", "#Flexibility"],
            engagementScore: 81,
            keywordDensity: 7.5,
            viralPotential: 76,
          },
          analytics: {
            estimatedViews: "90K-180K",
            completionRate: 75,
            shareability: 77,
          },
        },
      ];

      setGeneratedClips(mockClips);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-400" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getViralPotentialColor = (potential: number) => {
    if (potential >= 85) return 'from-green-400 to-emerald-500';
    if (potential >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">AI Video Processor</h1>
              <p className="text-gray-300">Transform long videos into viral shorts with advanced AI</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button className="btn-secondary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HolographicCard intensity="medium">
                <div className="glass-strong rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-6">
                    <EnergyOrb size="sm" color="blue" className="mr-3" />
                    <h2 className="text-xl font-bold text-white">Video Input</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectTitle" className="text-white mb-2 block">
                        Project Title
                      </Label>
                      <Input
                        id="projectTitle"
                        placeholder="My Awesome Video Project"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400"
                        disabled={isProcessing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="videoUrl" className="text-white mb-2 block">
                        Video URL
                      </Label>
                      <Input
                        id="videoUrl"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400"
                        disabled={isProcessing}
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Supports YouTube, TikTok, Instagram, podcasts, and direct uploads
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <Label className="text-white mb-2 block">
                        Or Upload File
                      </Label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          Drop video file here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Max 500MB • MP4, MOV, AVI supported
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleProcessVideo}
                      disabled={!videoUrl.trim() || isProcessing}
                      className="w-full btn-primary py-3"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Viral Shorts
                        </>
                      )}
                    </Button>

                    {/* Processing Options */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-white">Processing Options</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-4 h-4 border border-gray-400 rounded bg-blue-500 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="ml-2 text-sm text-gray-300">Auto-generate captions</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-4 h-4 border border-gray-400 rounded bg-blue-500 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="ml-2 text-sm text-gray-300">Add background music</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-4 h-4 border border-gray-400 rounded bg-blue-500 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="ml-2 text-sm text-gray-300">Optimize for all platforms</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            {/* Processing Status */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HolographicCard intensity="medium">
                <div className="glass-strong rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-6">
                    <Brain className="h-5 w-5 text-purple-400 mr-3" />
                    <h2 className="text-xl font-bold text-white">AI Processing Pipeline</h2>
                  </div>

                  <div className="space-y-4">
                    {processingSteps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className="flex items-center space-x-4 p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          {getStepIcon(step.status)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-white text-sm">
                              {step.title}
                            </h3>
                            <span className="text-xs text-gray-400">
                              {step.progress}%
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-2">
                            {step.description}
                          </p>
                          
                          <CyberProgress 
                            value={step.progress} 
                            size="sm" 
                            color={step.status === 'completed' ? 'green' : 'blue'}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </div>

          {/* Generated Clips */}
          {generatedClips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <HolographicCard intensity="medium">
                <div className="glass-strong rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Scissors className="h-5 w-5 text-green-400 mr-3" />
                      <h2 className="text-xl font-bold text-white">Generated Viral Clips</h2>
                    </div>
                    <Button className="btn-primary">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedClips.map((clip, index) => (
                      <motion.div
                        key={clip.id}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                          {/* Thumbnail */}
                          <div className="relative mb-4">
                            <img
                              src={clip.thumbnail}
                              alt={clip.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {clip.duration}
                            </div>
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                              {clip.confidence}% match
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="font-semibold text-white mb-2 text-sm">
                            {clip.title}
                          </h3>
                          
                          <p className="text-xs text-gray-300 mb-3">
                            {clip.metadata.summary}
                          </p>

                          {/* Viral Potential */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Viral Potential</span>
                              <span className="text-xs font-semibold text-white">{clip.metadata.viralPotential}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getViralPotentialColor(clip.metadata.viralPotential)}`}
                                style={{ width: `${clip.metadata.viralPotential}%` }}
                              />
                            </div>
                          </div>

                          {/* Analytics */}
                          <div className="grid grid-cols-3 gap-2 mb-3 p-2 rounded-lg bg-slate-800/30">
                            <div className="text-center">
                              <div className="text-xs font-bold text-white">{clip.analytics.estimatedViews}</div>
                              <div className="text-xs text-gray-400">Est. Views</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-bold text-green-400">{clip.analytics.completionRate}%</div>
                              <div className="text-xs text-gray-400">Completion</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-bold text-blue-400">{clip.analytics.shareability}%</div>
                              <div className="text-xs text-gray-400">Shareability</div>
                            </div>
                          </div>

                          {/* Hashtags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {clip.metadata.hashtags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="btn-primary text-xs flex-1"
                              onClick={() => {
                                setSelectedClip(clip);
                                setShowExportModal(true);
                              }}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                            <Button size="sm" className="btn-secondary text-xs flex-1">
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 glass rounded-lg">
                        <Scissors className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">{generatedClips.length}</div>
                        <div className="text-xs text-gray-400">Clips Generated</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <Target className="h-5 w-5 text-green-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">
                          {Math.round(generatedClips.reduce((acc, clip) => acc + clip.metadata.viralPotential, 0) / generatedClips.length)}%
                        </div>
                        <div className="text-xs text-gray-400">Avg Viral Score</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <Eye className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">500K+</div>
                        <div className="text-xs text-gray-400">Est. Total Views</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <TrendingUp className="h-5 w-5 text-pink-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">85%</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          )}

          {/* Export Modal */}
          {selectedClip && (
            <ExportModal
              isOpen={showExportModal}
              onClose={() => {
                setShowExportModal(false);
                setSelectedClip(null);
              }}
              clipData={{
                id: selectedClip.id.toString(),
                title: selectedClip.title,
                duration: parseInt(selectedClip.duration.split(':')[1]),
                thumbnail: selectedClip.thumbnail,
              }}
            />
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}