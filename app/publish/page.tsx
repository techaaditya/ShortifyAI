'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PublishPanel } from '@/components/publishing';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AuthGuard } from '@/components/auth/auth-guard';
import { GlassPanel, AnimatedButton } from '@/components/ui';
import { type SocialConnection, type SocialPlatform, type PublishOptions } from '@/lib/publishing';
import { ChevronLeft } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockConnections: SocialConnection[] = [
    {
        id: 'conn_1',
        platform: 'tiktok',
        userId: 'user_1',
        accountName: 'My TikTok',
        accountHandle: '@myaccount',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'conn_2',
        platform: 'youtube',
        userId: 'user_1',
        accountName: 'My YouTube Channel',
        accountHandle: '@mychannel',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// ============================================================================
// PUBLISH PAGE CONTENT
// ============================================================================

function PublishPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const clipId = searchParams.get('clip') || 'sample_clip';
    const clipTitle = searchParams.get('title') || 'My Awesome Clip';

    const [connections] = useState<SocialConnection[]>(mockConnections);

    const handleConnect = (platform: SocialPlatform) => {
        console.log('Connect:', platform);
        // In production: initiate OAuth flow
    };

    const handlePublish = async (platforms: SocialPlatform[], options: PublishOptions) => {
        console.log('Publishing to:', platforms, options);
        // In production: call publishing API
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/dashboard?tab=schedule');
    };

    const handleSchedule = async (platforms: SocialPlatform[], options: PublishOptions, scheduledFor: Date) => {
        console.log('Scheduling for:', scheduledFor, platforms, options);
        // In production: call scheduling API
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/dashboard?tab=schedule');
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <AnimatedButton variant="ghost" onClick={() => router.back()}>
                        <ChevronLeft className="w-5 h-5" />
                    </AnimatedButton>
                    <div>
                        <h1 className="text-xl font-bold text-white">Publish Clip</h1>
                        <p className="text-sm text-white/50">{clipTitle}</p>
                    </div>
                </div>

                {/* Publish Panel */}
                <GlassPanel variant="strong" className="p-6">
                    <PublishPanel
                        clipId={clipId}
                        clipTitle={clipTitle}
                        connections={connections}
                        onConnect={handleConnect}
                        onPublish={handlePublish}
                        onSchedule={handleSchedule}
                    />
                </GlassPanel>
            </div>
        </DashboardLayout>
    );
}

// ============================================================================
// PUBLISH PAGE
// ============================================================================

export default function PublishPage() {
    return (
        <AuthGuard requireAuth={true}>
            <Suspense fallback={
                <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
                    <div className="text-white">Loading...</div>
                </div>
            }>
                <PublishPageContent />
            </Suspense>
        </AuthGuard>
    );
}
