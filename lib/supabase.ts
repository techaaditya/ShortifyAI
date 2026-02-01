import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please check your .env.local file and make sure you have:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Singleton client instance to avoid multiple instances
let clientInstance: ReturnType<typeof createClientComponentClient> | null = null;

// For client components (browser) - needed for auth
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
  }

  if (!clientInstance) {
    clientInstance = createClientComponentClient();
  }
  return clientInstance;
}

// Original client (keep for backward compatibility)
export const supabase = supabaseUrl && supabaseAnonKey ?
  createSupabaseClient(supabaseUrl, supabaseAnonKey) :
  null;

// For server components - create a separate server-only file for this

// Admin client for server-side operations
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = serviceRoleKey ? createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) : null;

// Your existing database types (keeping them as they're perfect!)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: 'free' | 'creator' | 'agency';
          videos_used: number;
          videos_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: 'free' | 'creator' | 'agency';
          videos_used?: number;
          videos_limit?: number;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: 'free' | 'creator' | 'agency';
          videos_used?: number;
          videos_limit?: number;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          team_id: string | null;
          title: string;
          description: string | null;
          source_url: string | null;
          source_type: 'url' | 'upload' | 'script';
          status: 'processing' | 'completed' | 'failed';
          transcript: string | null;
          duration: number | null;
          thumbnail_url: string | null;
          clips_generated: number;
          total_views: number;
          total_engagement: number;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          team_id?: string | null;
          title: string;
          description?: string | null;
          source_url?: string | null;
          source_type?: 'url' | 'upload' | 'script';
          status?: 'processing' | 'completed' | 'failed';
          transcript?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          clips_generated?: number;
          total_views?: number;
          total_engagement?: number;
          metadata?: any;
        };
        Update: {
          team_id?: string | null;
          title?: string;
          description?: string | null;
          status?: 'processing' | 'completed' | 'failed';
          transcript?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          clips_generated?: number;
          total_views?: number;
          total_engagement?: number;
          metadata?: any;
        };
      };
      clips: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          title: string;
          start_time: number;
          end_time: number;
          duration: number;
          confidence: number;
          clip_type: 'hook' | 'highlight' | 'conclusion' | 'custom';
          video_url: string | null;
          thumbnail_url: string | null;
          captions: any[];
          style_settings: any;
          views: number;
          engagement_rate: number;
          exports: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          title: string;
          start_time: number;
          end_time: number;
          duration: number;
          confidence?: number;
          clip_type?: 'hook' | 'highlight' | 'conclusion' | 'custom';
          video_url?: string | null;
          thumbnail_url?: string | null;
          captions?: any[];
          style_settings?: any;
          views?: number;
          engagement_rate?: number;
          exports?: number;
        };
        Update: {
          title?: string;
          start_time?: number;
          end_time?: number;
          duration?: number;
          confidence?: number;
          clip_type?: 'hook' | 'highlight' | 'conclusion' | 'custom';
          video_url?: string | null;
          thumbnail_url?: string | null;
          captions?: any[];
          style_settings?: any;
          views?: number;
          engagement_rate?: number;
          exports?: number;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          owner_id: string;
          logo_url: string | null;
          plan: 'free' | 'team' | 'enterprise';
          settings: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          owner_id: string;
          logo_url?: string | null;
          plan?: 'free' | 'team' | 'enterprise';
          settings?: any;
        };
        Update: {
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          plan?: 'free' | 'team' | 'enterprise';
          settings?: any;
        };
      };
      team_members: {
        Row: {
          team_id: string;
          user_id: string;
          role: 'admin' | 'editor' | 'viewer';
          invited_by: string | null;
          joined_at: string;
        };
        Insert: {
          team_id: string;
          user_id: string;
          role?: 'admin' | 'editor' | 'viewer';
          invited_by?: string | null;
        };
        Update: {
          role?: 'admin' | 'editor' | 'viewer';
        };
      };
      branding_templates: {
        Row: {
          id: string;
          user_id: string;
          team_id: string | null;
          name: string;
          description: string | null;
          logo_url: string | null;
          watermark_url: string | null;
          intro_video_url: string | null;
          outro_video_url: string | null;
          caption_style: any;
          color_scheme: any;
          font_settings: any;
          is_default: boolean;
          is_shared: boolean;
          usage_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          team_id?: string | null;
          name: string;
          description?: string | null;
          logo_url?: string | null;
          watermark_url?: string | null;
          intro_video_url?: string | null;
          outro_video_url?: string | null;
          caption_style?: any;
          color_scheme?: any;
          font_settings?: any;
          is_default?: boolean;
          is_shared?: boolean;
          usage_count?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          watermark_url?: string | null;
          intro_video_url?: string | null;
          outro_video_url?: string | null;
          caption_style?: any;
          color_scheme?: any;
          font_settings?: any;
          is_default?: boolean;
          is_shared?: boolean;
          usage_count?: number;
        };
      };
      publishing_queue: {
        Row: {
          id: string;
          user_id: string;
          clip_id: string;
          platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin';
          status: 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed';
          scheduled_for: string | null;
          published_at: string | null;
          post_url: string | null;
          post_id: string | null;
          metadata: any;
          error_message: string | null;
          retry_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          clip_id: string;
          platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin';
          status?: 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed';
          scheduled_for?: string | null;
          metadata?: any;
        };
        Update: {
          status?: 'pending' | 'scheduled' | 'publishing' | 'published' | 'failed';
          scheduled_for?: string | null;
          published_at?: string | null;
          post_url?: string | null;
          post_id?: string | null;
          metadata?: any;
          error_message?: string | null;
          retry_count?: number;
        };
      };
      social_connections: {
        Row: {
          id: string;
          user_id: string;
          platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin';
          account_id: string;
          account_name: string | null;
          account_avatar: string | null;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          scopes: any[];
          is_active: boolean;
          last_used_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin';
          account_id: string;
          account_name?: string | null;
          account_avatar?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: any[];
          is_active?: boolean;
        };
        Update: {
          account_name?: string | null;
          account_avatar?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: any[];
          is_active?: boolean;
          last_used_at?: string | null;
        };
      };
      transcripts: {
        Row: {
          id: string;
          project_id: string;
          language: string;
          segments: any[];
          full_text: string | null;
          word_timings: any[];
          confidence: number;
          source: 'gemini' | 'whisper' | 'manual';
          created_at: string;
        };
        Insert: {
          project_id: string;
          language?: string;
          segments?: any[];
          full_text?: string | null;
          word_timings?: any[];
          confidence?: number;
          source?: 'gemini' | 'whisper' | 'manual';
        };
        Update: {
          language?: string;
          segments?: any[];
          full_text?: string | null;
          word_timings?: any[];
          confidence?: number;
          source?: 'gemini' | 'whisper' | 'manual';
        };
      };
    };
  };
};