"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Upload, 
  Download, 
  Share2, 
  Settings,
  Type,
  Image,
  Layers,
  Sparkles,
  Eye,
  Heart,
  TrendingUp,
  Loader2
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";

const brandTemplates = [
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean, professional look with subtle animations',
    thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop',
    colors: ['#3B82F6', '#1E293B', '#FFFFFF'],
    category: 'business',
  },
  {
    id: 'vibrant',
    name: 'Vibrant Energy',
    description: 'Bold colors and dynamic transitions',
    thumbnail: 'https://images.pexels.com/photos/8761569/pexels-photo-8761569.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop',
    colors: ['#EC4899', '#8B5CF6', '#06B6D4'],
    category: 'lifestyle',
  },
  {
    id: 'tech',
    name: 'Tech Futuristic',
    description: 'Neon accents with cyberpunk aesthetics',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop',
    colors: ['#00FF88', '#0066FF', '#000000'],
    category: 'tech',
  },
  {
    id: 'elegant',
    name: 'Elegant Gold',
    description: 'Luxury feel with gold accents',
    thumbnail: 'https://images.pexels.com/photos/4050438/pexels-photo-4050438.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop',
    colors: ['#F59E0B', '#1F2937', '#F3F4F6'],
    category: 'luxury',
  },
];

const captionStyles = [
  {
    id: 'bold',
    name: 'Bold Impact',
    preview: 'BOLD TEXT',
    style: { fontWeight: 'bold', fontSize: '32px', textTransform: 'uppercase' },
  },
  {
    id: 'elegant',
    name: 'Elegant Script',
    preview: 'Elegant Text',
    style: { fontFamily: 'serif', fontSize: '28px', fontStyle: 'italic' },
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    preview: 'Modern Text',
    style: { fontFamily: 'sans-serif', fontSize: '24px', fontWeight: '500' },
  },
  {
    id: 'playful',
    name: 'Playful Fun',
    preview: 'Fun Text!',
    style: { fontSize: '26px', fontWeight: 'bold', color: '#EC4899' },
  },
];

export default function BrandStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(brandTemplates[0]);
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState(captionStyles[0]);
  const [brandSettings, setBrandSettings] = useState({
    logoUrl: '',
    watermarkOpacity: [0.3],
    brandColors: ['#3B82F6', '#8B5CF6', '#EC4899'],
    fontSize: [24],
    captionPosition: 'bottom',
  });
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newVideos = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=112&fit=crop',
        duration: '0:30',
        status: 'ready',
      }));
      setUploadedVideos(prev => [...prev, ...newVideos]);
    }
  };

  const handleStyleVideo = async (videoId: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate video styling process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadedVideos(prev => prev.map(video => 
        video.id === videoId 
          ? { ...video, status: 'styled', styledUrl: 'https://example.com/styled-video.mp4' }
          : video
      ));
    } catch (error) {
      console.error('Styling error:', error);
    } finally {
      setIsProcessing(false);
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
            <h1 className="text-3xl font-bold text-white mb-2">Brand Studio</h1>
            <p className="text-gray-300">Style your videos with custom branding and captions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button className="btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Templates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <Palette className="h-5 w-5 text-purple-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Templates</h2>
                </div>

                <div className="space-y-4">
                  {brandTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      className={`
                        p-4 rounded-xl cursor-pointer transition-all duration-300 border
                        ${selectedTemplate.id === template.id 
                          ? "bg-purple-500/20 border-purple-500/50" 
                          : "glass hover:bg-white/5 border-white/10"
                        }
                      `}
                      onClick={() => setSelectedTemplate(template)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-20 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-300 mb-2">{template.description}</p>
                      <div className="flex items-center space-x-1">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Brand Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <Layers className="h-5 w-5 text-blue-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Branding</h2>
                </div>

                <div className="space-y-6">
                  {/* Logo Upload */}
                  <div>
                    <Label className="text-white mb-2 block">Logo</Label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Image className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Upload logo</p>
                    </div>
                  </div>

                  {/* Watermark Opacity */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Watermark Opacity: {brandSettings.watermarkOpacity[0]}
                    </Label>
                    <Slider
                      value={brandSettings.watermarkOpacity}
                      onValueChange={(value) => setBrandSettings(prev => ({ ...prev, watermarkOpacity: value }))}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Brand Colors */}
                  <div>
                    <Label className="text-white mb-2 block">Brand Colors</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {brandSettings.brandColors.map((color, index) => (
                        <div key={index} className="relative">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...brandSettings.brandColors];
                              newColors[index] = e.target.value;
                              setBrandSettings(prev => ({ ...prev, brandColors: newColors }));
                            }}
                            className="w-full h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Caption Settings */}
                  <div>
                    <Label className="text-white mb-2 block">Caption Style</Label>
                    <div className="space-y-2">
                      {captionStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedCaptionStyle(style)}
                          className={`
                            w-full p-3 rounded-lg text-left transition-all duration-200 border
                            ${selectedCaptionStyle.id === style.id
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "glass text-gray-300 hover:text-white border-white/10"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{style.name}</span>
                            <span className="text-xs" style={style.style as any}>{style.preview}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Font Size: {brandSettings.fontSize[0]}px
                    </Label>
                    <Slider
                      value={brandSettings.fontSize}
                      onValueChange={(value) => setBrandSettings(prev => ({ ...prev, fontSize: value }))}
                      max={48}
                      min={12}
                      step={2}
                      className="w-full"
                    />
                  </div>

                  {/* Caption Position */}
                  <div>
                    <Label className="text-white mb-2 block">Caption Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['top', 'center', 'bottom'].map((position) => (
                        <button
                          key={position}
                          onClick={() => setBrandSettings(prev => ({ ...prev, captionPosition: position }))}
                          className={`
                            p-2 rounded-lg text-xs font-medium transition-all duration-200 border
                            ${brandSettings.captionPosition === position
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "glass text-gray-300 hover:text-white border-white/10"
                            }
                          `}
                        >
                          <Type className="h-3 w-3 mx-auto mb-1" />
                          <span className="capitalize">{position}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Video Upload & Processing */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HolographicCard intensity="medium">
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-green-400 mr-3" />
                    <h2 className="text-xl font-bold text-white">Video Styling</h2>
                  </div>
                  <EnergyOrb size="sm" color="green" />
                </div>

                {/* Upload Area */}
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg text-white mb-2">Upload Videos to Style</p>
                      <p className="text-sm text-gray-400">
                        Drop video files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Supports MP4, MOV, AVI up to 500MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Uploaded Videos */}
                {uploadedVideos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Uploaded Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedVideos.map((video) => (
                        <motion.div
                          key={video.id}
                          className="glass rounded-xl p-4 border border-white/10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="relative mb-3">
                            <img
                              src={video.thumbnail}
                              alt={video.name}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                            {video.status === 'styled' && (
                              <div className="absolute top-2 left-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                                Styled
                              </div>
                            )}
                          </div>

                          <h4 className="font-medium text-white text-sm mb-2 truncate">
                            {video.name}
                          </h4>

                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <span>{(video.size / 1024 / 1024).toFixed(1)} MB</span>
                            <span>{video.status}</span>
                          </div>

                          <div className="space-y-2">
                            {video.status === 'ready' && (
                              <Button
                                onClick={() => handleStyleVideo(video.id)}
                                disabled={isProcessing}
                                className="w-full btn-primary text-xs py-2"
                              >
                                {isProcessing ? (
                                  <>
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    Styling...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Apply Style
                                  </>
                                )}
                              </Button>
                            )}

                            {video.status === 'styled' && (
                              <div className="flex space-x-2">
                                <Button className="flex-1 btn-primary text-xs py-2">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                                <Button className="flex-1 btn-secondary text-xs py-2">
                                  <Share2 className="h-3 w-3 mr-1" />
                                  Share
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analytics Preview */}
                {uploadedVideos.some(v => v.status === 'styled') && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Style Analytics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 glass rounded-lg">
                        <Eye className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">2.4K</div>
                        <div className="text-xs text-gray-400">Views</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <Heart className="h-5 w-5 text-pink-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">8.7%</div>
                        <div className="text-xs text-gray-400">Engagement</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">+23%</div>
                        <div className="text-xs text-gray-400">Growth</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}