"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { CyberButton } from "@/components/ui/cyber-button";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { useState } from "react";

export function CTASection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/auth/signup?email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <HolographicCard intensity="high">
            <div className="glass-strong rounded-3xl p-12 border border-white/20 neon-blue relative">
              {/* Energy Orbs */}
              <EnergyOrb size="lg" color="blue" className="absolute top-6 right-6" />
              <EnergyOrb size="md" color="purple" className="absolute bottom-6 left-6" />

              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass neon-blue mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="h-10 w-10 text-blue-400" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                Ready to Go{" "}
                <span className="gradient-text">Viral</span>?
              </motion.h2>

              {/* Subheading */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                Join 50,000+ creators transforming their content with AI.
                Start creating viral shorts in minutes, not hours.
              </motion.p>

              {/* Email Signup */}
              <motion.form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 input-futuristic"
                    required
                  />
                  <CyberButton
                    type="submit"
                    variant="primary"
                    className="px-6"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </CyberButton>
                </div>
              </motion.form>

              {/* Alternative CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CyberButton variant="secondary" className="px-6 py-3">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Demo
                  </CyberButton>
                </motion.a>
                <motion.a
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center py-3"
                  whileHover={{ scale: 1.05 }}
                >
                  Try Without Signup →
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
              >
                <p className="text-sm text-gray-400 mb-4">
                  ✓ Free forever plan ✓ No credit card ✓ Cancel anytime
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500">
                  <div className="text-xs">
                    <span className="font-semibold">4.9/5</span> rating
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">50K+</span> creators
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">2M+</span> videos
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">99.9%</span> uptime
                  </div>
                </div>
              </motion.div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}