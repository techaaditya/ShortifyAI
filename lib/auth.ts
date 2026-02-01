import { createClient } from './supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  plan: 'free' | 'creator' | 'agency';
  videos_used: number;
  videos_limit: number;
}

export class AuthService {
  private static instance: AuthService;
  private supabase = createClient();

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private mapUser(supabaseUser: SupabaseUser | null): User | null {
    if (!supabaseUser) return null;
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      full_name: supabaseUser.user_metadata?.full_name,
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      plan: 'free', // Default plan
      videos_used: 0, // Default values
      videos_limit: 10, // Default limit for free plan
    };
  }
  async signUp(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return { 
        user: this.mapUser(data.user), 
        session: data.session 
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { 
        user: this.mapUser(data.user), 
        session: data.session 
      };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      if (error) throw error;
      return this.mapUser(user);
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(this.mapUser(session?.user ?? null));
    });
  }

  // Database helper functions
  async getUserProfile(): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .rpc('get_current_user_profile');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  async checkUsageLimits(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .rpc('check_usage_limits');
      
      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Check usage limits error:', error);
      return false;
    }
  }

  async incrementUsage(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .rpc('increment_usage');
      
      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Increment usage error:', error);
      return false;
    }
  }

  async updateProfile(updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .update(updates)
        .eq('id', (await this.getCurrentUser())?.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}

export const authService = AuthService.getInstance();
