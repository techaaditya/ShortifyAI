'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassPanel, AnimatedButton } from '@/components/ui';
import {
    TrendingUp,
    TrendingDown,
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Play,
    Users,
    Clock,
    ArrowUpRight,
    BarChart3,
    Calendar,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface AnalyticsMetric {
    label: string;
    value: number;
    previousValue?: number;
    format?: 'number' | 'duration' | 'percentage';
    icon?: React.ReactNode;
}

interface ClipAnalytics {
    id: string;
    title: string;
    thumbnailUrl?: string;
    platform: string;
    publishedAt: Date;
    metrics: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
        avgWatchTime: number;
        completionRate: number;
    };
}

interface AnalyticsDashboardProps {
    clips: ClipAnalytics[];
    dateRange?: 'week' | 'month' | 'all';
    onDateRangeChange?: (range: 'week' | 'month' | 'all') => void;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatNumber(value: number): string {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
}

function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

interface MetricCardProps {
    label: string;
    value: string;
    change?: number;
    icon: React.ReactNode;
    color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon, color = 'neon-blue' }) => {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <GlassCard className="p-5">
            <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${color}/10`}>
                    {icon}
                </div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-neon-green' : isNegative ? 'text-neon-pink' : 'text-white/50'
                        }`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : isNegative ? <TrendingDown className="w-4 h-4" /> : null}
                        <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-white/50">{label}</div>
        </GlassCard>
    );
};

// ============================================================================
// CLIP PERFORMANCE ROW
// ============================================================================

interface ClipRowProps {
    clip: ClipAnalytics;
    rank: number;
}

const ClipRow: React.FC<ClipRowProps> = ({ clip, rank }) => {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            {/* Rank */}
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                {rank}
            </div>

            {/* Thumbnail */}
            <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                {clip.thumbnailUrl && (
                    <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{clip.title}</h4>
                <div className="flex items-center gap-3 text-xs text-white/50">
                    <span>{clip.platform}</span>
                    <span>•</span>
                    <span>{new Date(clip.publishedAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                    <div className="flex items-center gap-1 text-white">
                        <Eye className="w-4 h-4 text-white/40" />
                        {formatNumber(clip.metrics.views)}
                    </div>
                    <div className="text-xs text-white/40">Views</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1 text-white">
                        <Heart className="w-4 h-4 text-neon-pink/60" />
                        {formatNumber(clip.metrics.likes)}
                    </div>
                    <div className="text-xs text-white/40">Likes</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1 text-white">
                        <Share2 className="w-4 h-4 text-neon-blue/60" />
                        {formatNumber(clip.metrics.shares)}
                    </div>
                    <div className="text-xs text-white/40">Shares</div>
                </div>
                <div className="text-center">
                    <div className="text-neon-green">
                        {clip.metrics.completionRate.toFixed(0)}%
                    </div>
                    <div className="text-xs text-white/40">Completion</div>
                </div>
            </div>

            {/* Action */}
            <AnimatedButton variant="ghost" size="sm">
                <ArrowUpRight className="w-4 h-4" />
            </AnimatedButton>
        </div>
    );
};

// ============================================================================
// ANALYTICS DASHBOARD
// ============================================================================

export function AnalyticsDashboard({
    clips,
    dateRange = 'week',
    onDateRangeChange,
}: AnalyticsDashboardProps) {
    const [selectedRange, setSelectedRange] = useState(dateRange);

    // Aggregate metrics
    const totals = useMemo(() => {
        return clips.reduce(
            (acc, clip) => ({
                views: acc.views + clip.metrics.views,
                likes: acc.likes + clip.metrics.likes,
                comments: acc.comments + clip.metrics.comments,
                shares: acc.shares + clip.metrics.shares,
                avgWatchTime: acc.avgWatchTime + clip.metrics.avgWatchTime,
                completionRate: acc.completionRate + clip.metrics.completionRate,
            }),
            { views: 0, likes: 0, comments: 0, shares: 0, avgWatchTime: 0, completionRate: 0 }
        );
    }, [clips]);

    const avgMetrics = {
        avgWatchTime: clips.length > 0 ? totals.avgWatchTime / clips.length : 0,
        completionRate: clips.length > 0 ? totals.completionRate / clips.length : 0,
    };

    // Sort clips by views for top performers
    const topClips = [...clips].sort((a, b) => b.metrics.views - a.metrics.views).slice(0, 5);

    const handleRangeChange = (range: 'week' | 'month' | 'all') => {
        setSelectedRange(range);
        onDateRangeChange?.(range);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Analytics</h2>
                    <p className="text-white/60">Track your content performance</p>
                </div>

                {/* Date Range Selector */}
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                    {(['week', 'month', 'all'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => handleRangeChange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedRange === range
                                    ? 'bg-neon-blue/20 text-neon-blue'
                                    : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {range === 'week' ? '7 Days' : range === 'month' ? '30 Days' : 'All Time'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Views"
                    value={formatNumber(totals.views)}
                    change={12.5}
                    icon={<Eye className="w-5 h-5 text-neon-blue" />}
                    color="neon-blue"
                />
                <MetricCard
                    label="Total Likes"
                    value={formatNumber(totals.likes)}
                    change={8.2}
                    icon={<Heart className="w-5 h-5 text-neon-pink" />}
                    color="neon-pink"
                />
                <MetricCard
                    label="Comments"
                    value={formatNumber(totals.comments)}
                    change={-2.1}
                    icon={<MessageCircle className="w-5 h-5 text-neon-purple" />}
                    color="neon-purple"
                />
                <MetricCard
                    label="Shares"
                    value={formatNumber(totals.shares)}
                    change={15.8}
                    icon={<Share2 className="w-5 h-5 text-neon-green" />}
                    color="neon-green"
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neon-cyan/10">
                            <Clock className="w-5 h-5 text-neon-cyan" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">
                                {formatDuration(avgMetrics.avgWatchTime)}
                            </div>
                            <div className="text-xs text-white/50">Avg Watch Time</div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neon-green/10">
                            <Play className="w-5 h-5 text-neon-green" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">
                                {avgMetrics.completionRate.toFixed(0)}%
                            </div>
                            <div className="text-xs text-white/50">Avg Completion</div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neon-blue/10">
                            <Users className="w-5 h-5 text-neon-blue" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">
                                {clips.length}
                            </div>
                            <div className="text-xs text-white/50">Clips Published</div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neon-purple/10">
                            <BarChart3 className="w-5 h-5 text-neon-purple" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">
                                {totals.views > 0 ? ((totals.likes / totals.views) * 100).toFixed(1) : 0}%
                            </div>
                            <div className="text-xs text-white/50">Engagement Rate</div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Top Performing Clips */}
            <GlassPanel variant="default" className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-neon-green" />
                    Top Performing Clips
                </h3>
                <div className="space-y-3">
                    {topClips.length > 0 ? (
                        topClips.map((clip, index) => (
                            <ClipRow key={clip.id} clip={clip} rank={index + 1} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-white/50">
                            No clips published yet. Start creating to see analytics!
                        </div>
                    )}
                </div>
            </GlassPanel>
        </div>
    );
}

export default AnalyticsDashboard;
