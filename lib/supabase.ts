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
    };
  };
};