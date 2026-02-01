'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { VideoProcessor } from '@/components/dashboard/video-processor';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { SchedulingQueue } from '@/components/dashboard/scheduling-queue';
import { AuthGuard } from '@/components/auth/auth-guard';
import { GlassPanel, AnimatedButton } from '@/components/ui';
import {
  type PublishQueueItem,
  type SocialPlatform,
} from '@/lib/publishing';
import {
  Home,
  Video,
  BarChart3,
  Calendar,
  Settings,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type DashboardTab = 'overview' | 'create' | 'analytics' | 'schedule' | 'settings';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockAnalyticsClips = [
  {
    id: '1',
    title: 'AI Tools Every Developer Needs',
    thumbnailUrl: '',
    platform: 'TikTok',
    publishedAt: new Date('2026-01-28'),
    metrics: {
      views: 125000,
      likes: 8500,
      comments: 245,
      shares: 1200,
      avgWatchTime: 45,
      completionRate: 78,
    },
  },
  {
    id: '2',
    title: 'React Tips & Tricks',
    thumbnailUrl: '',
    platform: 'YouTube',
    publishedAt: new Date('2026-01-25'),
    metrics: {
      views: 89000,
      likes: 5200,
      comments: 180,
      shares: 800,
      avgWatchTime: 52,
      completionRate: 85,
    },
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    thumbnailUrl: '',
    platform: 'Instagram',
    publishedAt: new Date('2026-01-22'),
    metrics: {
      views: 67000,
      likes: 4100,
      comments: 156,
      shares: 650,
      avgWatchTime: 38,
      completionRate: 72,
    },
  },
];

const mockQueueItems: PublishQueueItem[] = [
  {
    id: 'q1',
    clipId: 'c1',
    userId: 'u1',
    platform: 'tiktok' as SocialPlatform,
    status: 'scheduled',
    options: {
      title: 'Upcoming AI Tutorial',
      description: 'Learn how to use AI for content creation',
      hashtags: ['#AI', '#Tutorial', '#Tech'],
      privacy: 'public',
    },
    scheduledFor: new Date('2026-02-02T10:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'q2',
    clipId: 'c2',
    userId: 'u1',
    platform: 'youtube' as SocialPlatform,
    status: 'pending',
    options: {
      title: 'Quick Coding Tips',
      description: 'Master these coding shortcuts',
      hashtags: ['#Coding', '#Developer'],
      privacy: 'public',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================================================
// TAB NAVIGATION
// ============================================================================

interface TabNavProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'create', label: 'Create', icon: Video },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

// ============================================================================
// OVERVIEW TAB CONTENT
// ============================================================================

const OverviewContent: React.FC<{ onNavigate: (tab: DashboardTab) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Create Card */}
        <GlassPanel variant="strong" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-neon-blue/10">
              <Sparkles className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Create</h3>
              <p className="text-sm text-white/50">Transform any video into viral clips</p>
            </div>
          </div>
          <AnimatedButton
            variant="primary"
            className="w-full"
            onClick={() => onNavigate('create')}
          >
            <Video className="w-4 h-4" />
            Start Creating
          </AnimatedButton>
        </GlassPanel>

        {/* Upcoming Posts Card */}
        <GlassPanel variant="strong" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Upcoming Posts</h3>
            <button
              className="text-sm text-neon-blue hover:underline"
              onClick={() => onNavigate('schedule')}
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockQueueItems.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
              >
                <Calendar className="w-5 h-5 text-neon-purple" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.options.title}</p>
                  <p className="text-xs text-white/40 capitalize">{item.platform}</p>
                </div>
                <span className="text-xs text-white/50">
                  {item.scheduledFor?.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Recent Performance */}
      <GlassPanel variant="default" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Performance</h3>
          <button
            className="text-sm text-neon-blue hover:underline"
            onClick={() => onNavigate('analytics')}
          >
            View Details
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAnalyticsClips.slice(0, 3).map((clip) => (
            <div
              key={clip.id}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all"
            >
              <h4 className="text-white font-medium truncate mb-2">{clip.title}</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">{clip.platform}</span>
                <span className="text-neon-green">
                  {(clip.metrics.views / 1000).toFixed(1)}K views
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};

// ============================================================================
// SETTINGS TAB CONTENT
// ============================================================================

const SettingsContent: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <GlassPanel variant="default" className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Display Name</label>
            <input
              type="text"
              defaultValue="User"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-blue/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-blue/50 focus:outline-none"
            />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel variant="default" className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Branding Defaults</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Default Caption Style</label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon-blue/50 focus:outline-none">
              <option value="tiktok">TikTok Style</option>
              <option value="youtube">YouTube Style</option>
              <option value="neon">Neon Style</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Watermark</label>
            <AnimatedButton variant="outline" className="w-full">
              Upload Watermark
            </AnimatedButton>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel variant="default" className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Connected Accounts</h3>
        <div className="space-y-3">
          {['TikTok', 'YouTube', 'Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
            <div key={platform} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-white">{platform}</span>
              <AnimatedButton variant="outline" size="sm">
                Connect
              </AnimatedButton>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD PAGE
// ============================================================================

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const handlePublishNow = (itemId: string) => {
    console.log('Publish now:', itemId);
  };

  const handleCancelItem = (itemId: string) => {
    console.log('Cancel:', itemId);
  };

  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header with Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <DashboardHeader />
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <OverviewContent onNavigate={setActiveTab} />
              )}

              {activeTab === 'create' && (
                <VideoProcessor />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsDashboard clips={mockAnalyticsClips} />
              )}

              {activeTab === 'schedule' && (
                <SchedulingQueue
                  items={mockQueueItems}
                  onPublishNow={handlePublishNow}
                  onCancel={handleCancelItem}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsContent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}