"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Download, 
  Share2, 
  Smartphone, 
  Monitor, 
  Square,
  Settings,
  Palette,
  Type,
  Music,
  X,
  Check,
  Loader2
} from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  clipData: {
    id: string;
    title: string;
    duration: number;
    thumbnail: string;
  };
}

const platforms = [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Smartphone,
    aspectRatio: '9:16',
    maxDuration: 180,
    color: 'pink',
    features: ['Auto-captions', 'Trending hashtags', 'Music sync']
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts',
    icon: Monitor,
    aspectRatio: '9:16',
    maxDuration: 60,
    color: 'red',
    features: ['SEO optimization', 'Chapters', 'End screens']
  },
  {
    id: 'instagram',
    name: 'Instagram Reels',
    icon: Square,
    aspectRatio: '9:16',
    maxDuration: 90,
    color: 'purple',
    features: ['Story integration', 'Shopping tags', 'Music library']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Monitor,
    aspectRatio: '1:1',
    maxDuration: 600,
    color: 'blue',
    features: ['Professional tone', 'Industry hashtags', 'Thought leadership']
  },
];

const exportFormats = [
  { id: 'mp4', name: 'MP4 (H.264)', quality: 'High', size: '~15MB' },
  { id: 'webm', name: 'WebM', quality: 'Medium', size: '~8MB' },
  { id: 'mov', name: 'MOV', quality: 'Highest', size: '~25MB' },
];

export function ExportModal({ isOpen, onClose, clipData }: ExportModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok']);
  const [exportFormat, setExportFormat] = useState('mp4');
  const [customTitle, setCustomTitle] = useState(clipData.title);
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('#AI #shorts #viral');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }

    setIsExporting(false);
    setExportComplete(true);
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${clipData.title}.${exportFormat}`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-strong border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Download className="h-6 w-6 mr-2 text-blue-400" />
            Export & Share
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Preview & Settings */}
          <div className="space-y-6">
            {/* Preview */}
            <HolographicCard intensity="medium">
              <div className="glass rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Preview</h3>
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative overflow-hidden">
                  <img
                    src={clipData.thumbnail}
                    alt={clipData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(clipData.duration / 60)}:{(clipData.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </HolographicCard>

            {/* Export Settings */}
            <HolographicCard intensity="medium">
              <div className="glass rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Export Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Format</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {exportFormats.map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setExportFormat(format.id)}
                          className={`
                            p-3 rounded-lg text-left transition-all duration-200 border
                            ${exportFormat === format.id
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "glass text-gray-300 hover:text-white border-white/10"
                            }
                          `}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{format.name}</div>
                              <div className="text-xs opacity-70">{format.quality} quality</div>
                            </div>
                            <div className="text-xs">{format.size}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-white mb-2 block">Title</Label>
                    <Input
                      id="title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a description for your video..."
                      className="bg-slate-800/50 border-slate-700 text-white resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hashtags" className="text-white mb-2 block">Hashtags</Label>
                    <Input
                      id="hashtags"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </HolographicCard>
          </div>

          {/* Right Column - Platforms & Export */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <HolographicCard intensity="medium">
              <div className="glass rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Export Platforms</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`
                        p-4 rounded-xl text-left transition-all duration-200 border relative
                        ${selectedPlatforms.includes(platform.id)
                          ? "bg-blue-500/20 border-blue-500/50"
                          : "glass hover:bg-white/5 border-white/10"
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            <EnergyOrb size="sm" color={platform.color as any} className="absolute -inset-1" />
                            <div className="relative z-10 p-2 rounded-lg glass">
                              <platform.icon className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{platform.name}</h4>
                            <p className="text-xs text-gray-400">{platform.aspectRatio} • Max {platform.maxDuration}s</p>
                          </div>
                        </div>
                        
                        {selectedPlatforms.includes(platform.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {platform.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </HolographicCard>

            {/* Export Actions */}
            <HolographicCard intensity="medium">
              <div className="glass rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Export Actions</h3>
                
                {!exportComplete ? (
                  <div className="space-y-4">
                    {isExporting && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Exporting...</span>
                          <span>{exportProgress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${exportProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleExport}
                      disabled={isExporting || selectedPlatforms.length === 0}
                      className="w-full btn-primary py-3"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Export for {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3"
                      >
                        <Check className="h-8 w-8 text-green-400" />
                      </motion.div>
                      <h4 className="text-lg font-semibold text-white mb-1">Export Complete!</h4>
                      <p className="text-gray-300 text-sm">Your videos are ready for download</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button
                        onClick={handleDownload}
                        className="w-full btn-primary"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </Button>
                      
                      <Button
                        onClick={onClose}
                        className="w-full btn-secondary"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </HolographicCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}