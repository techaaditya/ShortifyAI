"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Sparkles, Crown, Rocket } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { HolographicCard } from "@/components/ui/holographic-card";
import { EnergyOrb } from "@/components/ui/energy-orb";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for trying ShortifyAI",
    icon: Sparkles,
    features: [
      "5 videos/month",
      "Basic AI analysis",
      "Standard templates",
      "720p exports",
      "Community support",
    ],
    limitations: [
      "Watermark included",
      "30-second clips max",
    ],
    cta: "Start Free",
    popular: false,
    color: "blue",
  },
  {
    name: "Creator",
    price: "$29",
    period: "per month",
    description: "For serious creators",
    icon: Crown,
    features: [
      "50 videos/month",
      "Advanced AI analysis",
      "Custom branding",
      "4K exports",
      "Priority support",
      "Voice cloning (10h)",
      "AI avatars",
      "Multi-platform publishing",
    ],
    cta: "Start Creating",
    popular: true,
    color: "purple",
  },
  {
    name: "Agency",
    price: "$99",
    period: "per month",
    description: "For agencies and teams",
    icon: Rocket,
    features: [
      "Unlimited videos",
      "White-label solution",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "Team management",
      "Unlimited voice cloning",
      "Custom AI avatars",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "green",
  },
];

export function PricingSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
            <Crown className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-gray-200">
              Choose Your Plan
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Simple{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`
                relative group
                ${plan.popular ? 'md:-mt-4' : ''}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <HolographicCard intensity={plan.popular ? "high" : "medium"}>
                <div className={`
                  relative h-full p-6 rounded-xl border transition-all duration-300
                  glass-strong
                  ${plan.popular ? 'border-purple-500/50 scale-105' : 'border-white/20'}
                `}>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <EnergyOrb size="sm" color={plan.color as any} className="absolute -inset-1" />
                      <div className="relative z-10 p-3 rounded-lg glass">
                        <plan.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{plan.description}</p>
                    
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Free" && (
                        <span className="text-gray-400 ml-1 text-sm">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-center text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 + 0.5 }}
                        >
                          <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <ul className="space-y-1 mt-3 pt-3 border-t border-white/10">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-center text-gray-500 text-xs">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTA Button */}
                  <CyberButton
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full py-3"
                  >
                    {plan.cta}
                  </CyberButton>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <HolographicCard intensity="medium">
            <div className="glass-strong rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                FAQ
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Change plans anytime?</h4>
                  <p className="text-gray-300 text-xs">
                    Yes, upgrade or downgrade instantly.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Long-term contract?</h4>
                  <p className="text-gray-300 text-xs">
                    No contracts. Month-to-month, cancel anytime.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Unused credits?</h4>
                  <p className="text-gray-300 text-xs">
                    Credits roll over (up to 2x your plan limit).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Refunds?</h4>
                  <p className="text-gray-300 text-xs">
                    30-day money-back guarantee.
                  </p>
                </div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}