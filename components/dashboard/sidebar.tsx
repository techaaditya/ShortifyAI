"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Video,
  Scissors,
  BarChart3,
  Settings,
  Users,
  Palette,
  Sparkles,
  X,
  Crown,
  HelpCircle,
  Brain,
  User,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Video Processor", href: "/dashboard/video-processor", icon: Brain },
  { name: "AI Presenter", href: "/dashboard/ai-presenter", icon: User },
  { name: "Brand Studio", href: "/dashboard/brand-studio", icon: Palette },
  { name: "Projects", href: "/dashboard/projects", icon: Video },
  { name: "Editor", href: "/dashboard/editor", icon: Scissors },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 glass-strong border-r border-white/10 transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="relative">
            <Sparkles className="h-8 w-8 text-blue-500" />
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
          <span className="text-xl font-bold gradient-text">ShortifyAI</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                  onClick={onClose}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-blue-400")} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade Section */}
      <div className="p-6 border-t border-white/10">
        <motion.div
          className="glass rounded-xl p-4 border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-3">
            <Crown className="h-5 w-5 text-purple-400 mr-2" />
            <span className="font-semibold text-white">Upgrade to Pro</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Unlock unlimited videos and advanced AI features
          </p>
          <Button className="w-full btn-primary text-sm">
            <Zap className="h-4 w-4 mr-2" />
            Upgrade Now
          </Button>
        </motion.div>
      </div>

      {/* Help */}
      <div className="p-6">
        <Link
          href="/help"
          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </Link>
      </div>
    </aside>
  );
}