"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "/api-docs" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Community", href: "/community" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/shortifyai", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com/@shortifyai", icon: Youtube },
  { name: "Instagram", href: "https://instagram.com/shortifyai", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/shortifyai", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative bg-slate-950/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12">
          <HolographicCard intensity="low">
            <div className="glass-strong rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                {/* Brand */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="flex items-center space-x-2 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative">
                      <Sparkles className="h-7 w-7 text-blue-500" />
                      <motion.div
                        className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <span className="text-xl font-bold gradient-text">
                      ShortifyAI
                    </span>
                  </motion.div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Transform your long-form content into viral shorts with AI.
                    Join 50,000+ creators who trust ShortifyAI.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-2" />
                      hello@shortifyai.com
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-2" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      San Francisco, CA
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm">Product</h3>
                  <ul className="space-y-2">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm">Company</h3>
                  <ul className="space-y-2">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm">Resources</h3>
                  <ul className="space-y-2">
                    {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-4 text-sm">Legal</h3>
                  <ul className="space-y-2">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ShortifyAI. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}