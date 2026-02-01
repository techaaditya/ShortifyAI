/**
 * ElevenLabs Voice Service
 * 
 * Provides:
 * - Voice cloning capabilities
 * - Text-to-speech generation
 * - Voice library management
 * - Audio processing
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Voice {
    id: string;
    name: string;
    category: 'premade' | 'cloned' | 'generated';
    labels?: Record<string, string>;
    previewUrl?: string;
    settings?: VoiceSettings;
}

export interface VoiceSettings {
    stability: number; // 0-1
    similarityBoost: number; // 0-1
    style?: number; // 0-1
    useSpeakerBoost?: boolean;
}

export interface TextToSpeechOptions {
    voiceId: string;
    text: string;
    modelId?: string;
    settings?: VoiceSettings;
    outputFormat?: 'mp3_44100_128' | 'mp3_44100_192' | 'pcm_16000' | 'pcm_22050' | 'pcm_24000';
}

export interface VoiceCloneOptions {
    name: string;
    description?: string;
    labels?: Record<string, string>;
    files: File[] | string[]; // Audio files or URLs
}

export interface SpeechResult {
    audioUrl: string;
    duration: number;
    characterCount: number;
    modelId: string;
    voiceId: string;
}

// ============================================================================
// ELEVENLABS SERVICE
// ============================================================================

export class ElevenLabsService {
    private apiKey: string;
    private baseUrl = 'https://api.elevenlabs.io/v1';

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.ELEVENLABS_API_KEY || '';
    }

    /**
     * Check if service is configured
     */
    isConfigured(): boolean {
        return !!this.apiKey;
    }

    /**
     * Get available voices
     */
    async getVoices(): Promise<Voice[]> {
        if (!this.isConfigured()) {
            return this.getDefaultVoices();
        }

        try {
            const response = await fetch(`${this.baseUrl}/voices`, {
                headers: {
                    'xi-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error(`ElevenLabs API error: ${response.status}`);
            }

            const data = await response.json();
            return data.voices.map((v: any) => ({
                id: v.voice_id,
                name: v.name,
                category: v.category,
                labels: v.labels,
                previewUrl: v.preview_url,
                settings: v.settings,
            }));
        } catch (error) {
            console.error('ElevenLabs getVoices error:', error);
            return this.getDefaultVoices();
        }
    }

    /**
     * Generate speech from text
     */
    async textToSpeech(options: TextToSpeechOptions): Promise<SpeechResult> {
        if (!this.isConfigured()) {
            return this.getMockSpeechResult(options);
        }

        const {
            voiceId,
            text,
            modelId = 'eleven_multilingual_v2',
            settings = { stability: 0.5, similarityBoost: 0.75 },
            outputFormat = 'mp3_44100_128',
        } = options;

        try {
            const response = await fetch(
                `${this.baseUrl}/text-to-speech/${voiceId}?output_format=${outputFormat}`,
                {
                    method: 'POST',
                    headers: {
                        'xi-api-key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text,
                        model_id: modelId,
                        voice_settings: {
                            stability: settings.stability,
                            similarity_boost: settings.similarityBoost,
                            style: settings.style || 0,
                            use_speaker_boost: settings.useSpeakerBoost ?? true,
                        },
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`ElevenLabs TTS error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            // In production, you'd upload this to storage and return URL
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Estimate duration based on word count (~150 words per minute)
            const wordCount = text.split(/\s+/).length;
            const estimatedDuration = (wordCount / 150) * 60;

            return {
                audioUrl,
                duration: estimatedDuration,
                characterCount: text.length,
                modelId,
                voiceId,
            };
        } catch (error) {
            console.error('ElevenLabs TTS error:', error);
            return this.getMockSpeechResult(options);
        }
    }

    /**
     * Clone a voice from audio samples
     */
    async cloneVoice(options: VoiceCloneOptions): Promise<Voice | null> {
        if (!this.isConfigured()) {
            return {
                id: 'cloned_' + Date.now(),
                name: options.name,
                category: 'cloned',
                labels: options.labels,
            };
        }

        try {
            const formData = new FormData();
            formData.append('name', options.name);
            if (options.description) {
                formData.append('description', options.description);
            }
            if (options.labels) {
                formData.append('labels', JSON.stringify(options.labels));
            }

            // Handle files
            for (const file of options.files) {
                if (typeof file === 'string') {
                    // If URL, fetch and convert to blob
                    const response = await fetch(file);
                    const blob = await response.blob();
                    formData.append('files', blob, 'audio.mp3');
                } else {
                    formData.append('files', file);
                }
            }

            const response = await fetch(`${this.baseUrl}/voices/add`, {
                method: 'POST',
                headers: {
                    'xi-api-key': this.apiKey,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Voice cloning failed: ${response.status}`);
            }

            const data = await response.json();
            return {
                id: data.voice_id,
                name: options.name,
                category: 'cloned',
                labels: options.labels,
            };
        } catch (error) {
            console.error('Voice cloning error:', error);
            return null;
        }
    }

    /**
     * Delete a cloned voice
     */
    async deleteVoice(voiceId: string): Promise<boolean> {
        if (!this.isConfigured()) {
            return true;
        }

        try {
            const response = await fetch(`${this.baseUrl}/voices/${voiceId}`, {
                method: 'DELETE',
                headers: {
                    'xi-api-key': this.apiKey,
                },
            });

            return response.ok;
        } catch (error) {
            console.error('Voice deletion error:', error);
            return false;
        }
    }

    /**
     * Get voice settings
     */
    async getVoiceSettings(voiceId: string): Promise<VoiceSettings> {
        if (!this.isConfigured()) {
            return { stability: 0.5, similarityBoost: 0.75 };
        }

        try {
            const response = await fetch(`${this.baseUrl}/voices/${voiceId}/settings`, {
                headers: {
                    'xi-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to get voice settings: ${response.status}`);
            }

            const data = await response.json();
            return {
                stability: data.stability,
                similarityBoost: data.similarity_boost,
                style: data.style,
                useSpeakerBoost: data.use_speaker_boost,
            };
        } catch (error) {
            console.error('Get voice settings error:', error);
            return { stability: 0.5, similarityBoost: 0.75 };
        }
    }

    // ============================================================================
    // DEFAULT DATA
    // ============================================================================

    private getDefaultVoices(): Voice[] {
        return [
            { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', category: 'premade' },
            { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', category: 'premade' },
            { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', category: 'premade' },
            { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', category: 'premade' },
            { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', category: 'premade' },
            { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', category: 'premade' },
            { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', category: 'premade' },
            { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill', category: 'premade' },
        ];
    }

    private getMockSpeechResult(options: TextToSpeechOptions): SpeechResult {
        const wordCount = options.text.split(/\s+/).length;
        return {
            audioUrl: 'https://example.com/generated-speech.mp3',
            duration: (wordCount / 150) * 60,
            characterCount: options.text.length,
            modelId: options.modelId || 'eleven_multilingual_v2',
            voiceId: options.voiceId,
        };
    }
}

// Export singleton
export const elevenLabsService = new ElevenLabsService();

export default ElevenLabsService;
