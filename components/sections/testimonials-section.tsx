"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    company: "@sarahcreates",
    followers: "2.3M",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "ShortifyAI transformed my content strategy. I went from 8 hours editing to 10 viral shorts in 30 minutes. Engagement increased 400%!",
    metrics: { views: "12M", engagement: "+400%", time_saved: "8hrs/week" },
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "YouTube Creator",
    company: "TechTalks Daily",
    followers: "890K",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "The AI perfectly identifies the best moments from my tech reviews. Auto-captions are spot-on, and branding templates look professional.",
    metrics: { views: "8.5M", engagement: "+250%", time_saved: "12hrs/week" },
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Digital Agency",
    company: "Creative Pulse",
    followers: "500K",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "We manage 50+ clients, and ShortifyAI has been a game-changer. Team collaboration and bulk processing save countless hours. ROI increased 300%.",
    metrics: { views: "25M", engagement: "+300%", time_saved: "40hrs/week" },
    rating: 5,
  },
  {
    name: "David Park",
    role: "Podcast Host",
    company: "The Startup Journey",
    followers: "1.2M",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "Converting podcast episodes into TikTok clips has never been easier. Voice cloning lets me add intros seamlessly. Discovery rate tripled!",
    metrics: { views: "6.2M", engagement: "+180%", time_saved: "15hrs/week" },
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "E-commerce Brand",
    company: "StyleForward",
    followers: "3.1M",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "Product demos were getting lost in long videos. ShortifyAI creates perfect highlight reels that convert. Sales from social increased 500%!",
    metrics: { views: "18M", engagement: "+320%", time_saved: "25hrs/week" },
    rating: 5,
  },
  {
    name: "James Mitchell",
    role: "Fitness Influencer",
    company: "@FitWithJames",
    followers: "1.8M",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
    content: "Workout videos are automatically turned into bite-sized motivation clips. AI knows exactly which exercises resonate most. Growth is incredible!",
    metrics: { views: "9.8M", engagement: "+275%", time_saved: "10hrs/week" },
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass-strong border border-yellow-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Star className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-gray-200">
              Trusted by 50K+ Creators
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Creators Love{" "}
            <span className="gradient-text">ShortifyAI</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join thousands who transformed their content strategy and grew their audience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -4 }}
            >
              <HolographicCard intensity="medium" className="h-full">
                <div className="glass-strong rounded-xl p-5 border border-white/20 h-full">
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <Quote className="h-6 w-6 text-blue-400/60" />
                    <EnergyOrb size="sm" color="blue" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-lg bg-slate-800/30 border border-white/10">
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{testimonial.metrics.views}</div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-400">{testimonial.metrics.engagement}</div>
                      <div className="text-xs text-gray-400">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">{testimonial.metrics.time_saved}</div>
                      <div className="text-xs text-gray-400">Saved</div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-400">{testimonial.role}</div>
                      <div className="text-xs text-blue-400">{testimonial.company} • {testimonial.followers}</div>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.9/5</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-gray-400 text-sm">Creators</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">2M+</div>
                  <div className="text-gray-400 text-sm">Videos</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">10x</div>
                  <div className="text-gray-400 text-sm">Growth</div>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}