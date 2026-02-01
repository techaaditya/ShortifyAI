"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NeuralGrid } from "@/components/ui/neural-grid";
import { HologramDisplay } from "@/components/ui/hologram-display";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { CyberProgress } from "@/components/ui/cyber-progress";
import { TerminalWindow } from "@/components/ui/terminal-window";
import {
  Brain,
  Scissors,
  MessageSquare,
  Mic,
  User,
  Palette,
  Share2,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Neural AI Analysis",
    description: "Advanced AI detects emotions, audio patterns, and viral moments",
    color: "blue",
    progress: 95,
    demo: "ai-analysis",
  },
  {
    icon: Scissors,
    title: "Smart Clip Generation",
    description: "Creates 5-10 optimized clips using temporal segmentation",
    color: "purple",
    progress: 88,
    demo: "clip-generation",
  },
  {
    icon: MessageSquare,
    title: "Auto Captions",
    description: "Dynamic captions with neural language processing in 50+ languages",
    color: "cyan",
    progress: 92,
    demo: "captions",
  },
  {
    icon: Mic,
    title: "Voice Synthesis",
    description: "ElevenLabs integration with voice cloning and emotional modulation",
    color: "pink",
    progress: 87,
    demo: "voice",
  },
  {
    icon: User,
    title: "AI Avatars",
    description: "Photorealistic AI presenters with advanced facial synthesis",
    color: "green",
    progress: 90,
    demo: "avatar",
  },
  {
    icon: Palette,
    title: "Brand Suite",
    description: "Logos, watermarks, and adaptive brand templates",
    color: "orange",
    progress: 85,
    demo: "branding",
  },
];

export function EnhancedFeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Neural Grid Background */}
      <div className="absolute inset-0">
        <NeuralGrid intensity="medium" animated />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass-strong border border-blue-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <EnergyOrb size="sm" color="blue" className="mr-2" />
            <span className="text-sm font-medium text-gray-200">
              Quantum AI Technology
            </span>
          </motion.div>
          
          <HologramDisplay>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Gen{" "}
              <span className="gradient-text">AI Features</span>
            </h2>
          </HologramDisplay>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience the future of content creation with our advanced AI suite.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -4 }}
            >
              <HolographicCard intensity="medium" className="h-full">
                <div className="glass-strong rounded-xl p-6 border border-white/20 h-full relative overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <EnergyOrb size="sm" color={feature.color as any} className="absolute -inset-1" />
                      <div className="relative z-10 p-3 rounded-lg glass">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">Efficiency</div>
                      <CyberProgress 
                        value={feature.progress} 
                        size="sm" 
                        color={feature.color as any}
                        className="w-12"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Demo Preview */}
                  <div className="mt-auto">
                    {feature.demo === "ai-analysis" && (
                      <TerminalWindow
                        title="AI Analysis"
                        commands={[
                          "$ analyzing content...",
                          "$ detecting peaks...",
                          "$ viral moments ✓",
                        ]}
                        className="h-24 text-xs"
                      />
                    )}
                    
                    {feature.demo === "clip-generation" && (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-400">Generated Clips</div>
                        {[...Array(3)].map((_, i) => (
                          <CyberProgress 
                            key={i}
                            value={85 + i * 5} 
                            size="sm" 
                            color="purple"
                            showValue={false}
                          />
                        ))}
                      </div>
                    )}
                    
                    {feature.demo === "captions" && (
                      <div className="glass rounded-lg p-2 text-center">
                        <motion.div
                          className="text-cyan-400 font-medium text-sm"
                          animate={{
                            textShadow: [
                              "0 0 10px rgba(6, 182, 212, 0.5)",
                              "0 0 20px rgba(6, 182, 212, 0.8)",
                              "0 0 10px rgba(6, 182, 212, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          "AI is the future"
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto relative">
              <EnergyOrb size="md" color="blue" className="absolute top-4 right-4" />
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready for the Future?
              </h3>
              <p className="text-gray-300 mb-6">
                Join creators using quantum AI to dominate social media.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href="/auth/signup"
                  className="btn-primary px-8 py-3 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter the Matrix
                </motion.a>
                <motion.a
                  href="/demo"
                  className="btn-secondary px-8 py-3 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Neural Demo
                </motion.a>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}