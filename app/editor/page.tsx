'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ClipEditor } from '@/components/editor';
import { AuthGuard } from '@/components/auth/auth-guard';
import { type CaptionSegment } from '@/lib/captions';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockClip = {
    id: 'clip_001',
    title: 'AI-Generated Highlight',
    videoUrl: '',
    thumbnailUrl: '',
    duration: 45,
    startTime: 0,
    endTime: 45,
    captions: [
        {
            id: 'seg_1',
            words: [
                { text: 'Welcome', start: 0, end: 0.5 },
                { text: 'to', start: 0.5, end: 0.7 },
                { text: 'the', start: 0.7, end: 0.9 },
                { text: 'future', start: 0.9, end: 1.4 },
            ],
            startTime: 0,
            endTime: 1.5,
        },
        {
            id: 'seg_2',
            words: [
                { text: 'of', start: 1.5, end: 1.7 },
                { text: 'content', start: 1.7, end: 2.2 },
                { text: 'creation', start: 2.2, end: 2.8 },
            ],
            startTime: 1.5,
            endTime: 3,
        },
        {
            id: 'seg_3',
            words: [
                { text: 'AI', start: 4, end: 4.3, isHighlighted: true },
                { text: 'makes', start: 4.3, end: 4.7 },
                { text: 'it', start: 4.7, end: 4.9 },
                { text: 'easy', start: 4.9, end: 5.4, isHighlighted: true },
            ],
            startTime: 4,
            endTime: 5.5,
        },
    ] as CaptionSegment[],
};

// ============================================================================
// EDITOR PAGE
// ============================================================================

export default function EditorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const clipId = searchParams.get('clip');

    const [clip, setClip] = useState(mockClip);

    const handleBack = () => {
        router.push('/dashboard');
    };

    const handleSave = (updatedClip: typeof clip) => {
        console.log('Saving clip:', updatedClip);
        // In production: call API to save
    };

    const handleExport = (exportedClip: typeof clip, format: string) => {
        console.log('Exporting clip:', exportedClip, 'as', format);
        // In production: trigger export workflow
    };

    return (
        <AuthGuard requireAuth={true}>
            <ClipEditor
                clip={clip}
                onBack={handleBack}
                onSave={handleSave}
                onExport={handleExport}
            />
        </AuthGuard>
    );
}
