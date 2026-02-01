"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Play,
    Upload,
    Link,
    Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface QuickStartProps {
    onQuickCreate?: (url: string) => void;
}

export function QuickStart({ onQuickCreate }: QuickStartProps) {
    const [videoUrl, setVideoUrl] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuickProcess = async () => {
        if (!videoUrl.trim()) return;

        setIsProcessing(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsProcessing(false);

        if (onQuickCreate) {
            onQuickCreate(videoUrl);
        } else {
            toast.success("Starting creation process...");
        }
        setVideoUrl("");
    };

    const handleUpload = () => {
        toast.info("File upload coming soon!");
    };

    return (
        <motion.div
            className="glass-strong rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Quick Start</h2>
            </div>

            <p className="text-gray-300 mb-6">
                Paste any video URL to instantly create viral shorts with AI
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="https://youtube.com/watch?v=... or upload file"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        disabled={isProcessing}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={handleQuickProcess}
                        disabled={!videoUrl.trim() || isProcessing}
                        className="btn-primary min-w-[120px]"
                    >
                        {isProcessing ? (
                            <div className="spinner mr-2" />
                        ) : (
                            <Play className="h-4 w-4 mr-2" />
                        )}
                        {isProcessing ? "Processing..." : "Create Shorts"}
                    </Button>

                    <Button className="btn-secondary" onClick={handleUpload}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                </div>
            </div>

            <div className="flex items-center mt-4 text-sm text-gray-400">
                <Link className="h-4 w-4 mr-2" />
                Supports YouTube, TikTok, Instagram, podcasts, and direct uploads
            </div>
        </motion.div>
    );
}
