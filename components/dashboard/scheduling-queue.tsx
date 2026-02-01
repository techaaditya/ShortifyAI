'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PLATFORM_CONFIG,
    type SocialPlatform,
    type PublishQueueItem,
} from '@/lib/publishing/social-publishing';
import { GlassCard, GlassPanel, AnimatedButton } from '@/components/ui';
import {
    Calendar,
    Clock,
    Check,
    X,
    Loader2,
    AlertCircle,
    MoreVertical,
    Play,
    Pause,
    Trash2,
    Edit3,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface SchedulingQueueProps {
    items: PublishQueueItem[];
    onPublishNow?: (itemId: string) => void;
    onReschedule?: (itemId: string, newDate: Date) => void;
    onCancel?: (itemId: string) => void;
    onEdit?: (itemId: string) => void;
}

// ============================================================================
// STATUS BADGE
// ============================================================================

const StatusBadge: React.FC<{ status: PublishQueueItem['status'] }> = ({ status }) => {
    const configs = {
        pending: { color: 'bg-white/20 text-white/70', icon: Clock },
        scheduled: { color: 'bg-neon-blue/20 text-neon-blue', icon: Calendar },
        publishing: { color: 'bg-neon-purple/20 text-neon-purple', icon: Loader2 },
        published: { color: 'bg-neon-green/20 text-neon-green', icon: Check },
        failed: { color: 'bg-neon-pink/20 text-neon-pink', icon: AlertCircle },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
            <Icon className={`w-3 h-3 ${status === 'publishing' ? 'animate-spin' : ''}`} />
            <span className="capitalize">{status}</span>
        </span>
    );
};

// ============================================================================
// QUEUE ITEM
// ============================================================================

interface QueueItemProps {
    item: PublishQueueItem;
    onPublishNow?: () => void;
    onReschedule?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
}

const QueueItem: React.FC<QueueItemProps> = ({
    item,
    onPublishNow,
    onReschedule,
    onCancel,
    onEdit,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const platformConfig = PLATFORM_CONFIG[item.platform];

    const formatScheduledTime = (date?: Date) => {
        if (!date) return 'Not scheduled';
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all"
        >
            <div className="flex items-center gap-4">
                {/* Platform Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: platformConfig.color + '20' }}
                >
                    {platformConfig.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium truncate">
                            {item.options.title || 'Untitled Clip'}
                        </h4>
                        <StatusBadge status={item.status} />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/50">
                        <span style={{ color: platformConfig.color }}>{platformConfig.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatScheduledTime(item.scheduledFor)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {item.status === 'scheduled' && (
                        <>
                            <AnimatedButton
                                variant="ghost"
                                size="sm"
                                onClick={onPublishNow}
                                className="text-neon-green"
                            >
                                <Play className="w-4 h-4" />
                            </AnimatedButton>
                            <AnimatedButton
                                variant="ghost"
                                size="sm"
                                onClick={onEdit}
                            >
                                <Edit3 className="w-4 h-4" />
                            </AnimatedButton>
                        </>
                    )}

                    {(item.status === 'pending' || item.status === 'scheduled') && (
                        <AnimatedButton
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            className="text-neon-pink"
                        >
                            <Trash2 className="w-4 h-4" />
                        </AnimatedButton>
                    )}

                    {item.status === 'failed' && (
                        <AnimatedButton
                            variant="secondary"
                            size="sm"
                            onClick={onPublishNow}
                        >
                            Retry
                        </AnimatedButton>
                    )}

                    {item.status === 'published' && item.result?.postUrl && (
                        <AnimatedButton
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(item.result?.postUrl, '_blank')}
                        >
                            View Post
                        </AnimatedButton>
                    )}
                </div>
            </div>

            {/* Error message if failed */}
            {item.status === 'failed' && item.result?.error && (
                <div className="mt-3 p-2 rounded-lg bg-neon-pink/10 border border-neon-pink/20 text-sm text-neon-pink">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    {item.result.error}
                </div>
            )}

            {/* Hashtags preview */}
            {item.options.hashtags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {item.options.hashtags.slice(0, 5).map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50"
                        >
                            {tag}
                        </span>
                    ))}
                    {item.options.hashtags.length > 5 && (
                        <span className="text-xs text-white/30">
                            +{item.options.hashtags.length - 5} more
                        </span>
                    )}
                </div>
            )}
        </motion.div>
    );
};

// ============================================================================
// SCHEDULING QUEUE COMPONENT
// ============================================================================

export function SchedulingQueue({
    items,
    onPublishNow,
    onReschedule,
    onCancel,
    onEdit,
}: SchedulingQueueProps) {
    const [filter, setFilter] = useState<'all' | PublishQueueItem['status']>('all');

    // Filter items
    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.status === filter);

    // Group by status for counts
    const counts = {
        all: items.length,
        pending: items.filter(i => i.status === 'pending').length,
        scheduled: items.filter(i => i.status === 'scheduled').length,
        publishing: items.filter(i => i.status === 'publishing').length,
        published: items.filter(i => i.status === 'published').length,
        failed: items.filter(i => i.status === 'failed').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Publishing Queue</h2>
                    <p className="text-white/60 text-sm">
                        {counts.scheduled} scheduled • {counts.published} published
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {(['all', 'scheduled', 'pending', 'publishing', 'published', 'failed'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === status
                                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                                : 'bg-white/5 text-white/60 border border-transparent hover:bg-white/10'
                            }`}
                    >
                        <span className="capitalize">{status}</span>
                        {counts[status] > 0 && (
                            <span className="ml-2 text-xs opacity-70">({counts[status]})</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Queue Items */}
            <GlassPanel variant="default" className="p-4">
                <AnimatePresence mode="popLayout">
                    {filteredItems.length > 0 ? (
                        <div className="space-y-3">
                            {filteredItems.map((item) => (
                                <QueueItem
                                    key={item.id}
                                    item={item}
                                    onPublishNow={() => onPublishNow?.(item.id)}
                                    onReschedule={() => onReschedule?.(item.id, new Date())}
                                    onCancel={() => onCancel?.(item.id)}
                                    onEdit={() => onEdit?.(item.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-white font-medium mb-2">No items in queue</h3>
                            <p className="text-white/50 text-sm">
                                {filter === 'all'
                                    ? 'Schedule your first post to get started'
                                    : `No ${filter} items found`}
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </GlassPanel>
        </div>
    );
}

export default SchedulingQueue;
