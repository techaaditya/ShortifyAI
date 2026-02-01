"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { CyberButton } from "@/components/ui/cyber-button";
import { Link, Upload, Brain, Scissors, Download, Share2 } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Paste Link",
    description: "YouTube, TikTok, or podcast URL",
    details: ["YouTube videos", "TikTok content", "Podcast episodes", "Direct uploads"],
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Neural AI identifies key moments",
    details: ["Emotion detection", "Audio analysis", "Scene changes", "Viral peaks"],
  },
  {
    icon: Scissors,
    title: "Generate Clips",
    description: "5-10 optimized clips with captions",
    details: ["Smart selection", "Auto captions", "Brand overlay", "Templates"],
  },
  {
    icon: Share2,
    title: "Publish",
    description: "One-click export to all platforms",
    details: ["TikTok ready", "YouTube Shorts", "Instagram Reels", "Custom formats"],
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass-strong border border-purple-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Scissors className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-gray-200">
              4-Step Process
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How{" "}
            <span className="gradient-text">ShortifyAI</span>{" "}
            Works
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Transform content into viral shorts in minutes, not hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-green-500/50 transform -translate-x-1/2" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                      <EnergyOrb size="sm" color="blue" className="absolute -inset-1" />
                      <div className="relative z-10 p-3 rounded-xl glass">
                        <step.icon className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white/20">
                      0{index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-300 mb-4">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detail}
                        className="flex items-center text-sm text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + detailIndex * 0.1 + 0.5 }}
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2" />
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-md">
                  <HolographicCard intensity="medium">
                    <div className="glass-strong rounded-xl p-6 border border-white/20">
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/10 mb-4">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                        >
                          <step.icon className="h-12 w-12 text-white/40" />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-2 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full" />
                        <div className="h-2 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full w-3/4" />
                        <div className="h-2 bg-gradient-to-r from-green-500/20 to-transparent rounded-full w-1/2" />
                      </div>
                    </div>
                  </HolographicCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                See It In Action
              </h3>
              <p className="text-gray-300 mb-6">
                Watch creators achieve 10x better engagement rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <CyberButton variant="primary" className="px-6 py-3">
                  Live Demo
                </CyberButton>
                <CyberButton variant="secondary" className="px-6 py-3">
                  Try Free
                </CyberButton>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}