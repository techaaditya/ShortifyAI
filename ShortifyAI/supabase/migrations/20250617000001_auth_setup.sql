/*
  # Authentication Setup for ShortifyAI

  1. Functions
    - handle_new_user() - Automatically create profile when user signs up
    - get_user_plan_limits() - Get plan-specific limits
    - check_usage_limits() - Verify if user can create more content

  2. Triggers
    - on_auth_user_created - Trigger profile creation
    - on_auth_user_updated - Update profile when user data changes

  3. Policies
    - Additional security policies for authentication flow
*/

-- Function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, plan, videos_used, videos_limit)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url',
    'free', -- Default plan
    0, -- Default videos used
    CASE 
      WHEN new.raw_user_meta_data->>'plan' = 'creator' THEN 50
      WHEN new.raw_user_meta_data->>'plan' = 'agency' THEN 500
      ELSE 5 -- Free plan default
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get plan limits
CREATE OR REPLACE FUNCTION public.get_user_plan_limits(user_uuid uuid)
RETURNS TABLE(plan text, videos_limit integer, videos_used integer, can_create boolean) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.plan,
    p.videos_limit,
    p.videos_used,
    (p.videos_used < p.videos_limit) as can_create
  FROM profiles p
  WHERE p.id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can create more content
CREATE OR REPLACE FUNCTION public.check_usage_limits(user_uuid uuid)
RETURNS boolean AS $$
DECLARE
  user_plan record;
BEGIN
  SELECT videos_used, videos_limit INTO user_plan
  FROM profiles
  WHERE id = user_uuid;
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  RETURN user_plan.videos_used < user_plan.videos_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage count
CREATE OR REPLACE FUNCTION public.increment_user_usage(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  UPDATE profiles 
  SET videos_used = videos_used + 1,
      updated_at = now()
  WHERE id = user_uuid 
    AND videos_used < videos_limit;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user profile from auth metadata
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET 
    email = new.email,
    full_name = COALESCE(new.raw_user_meta_data->>'full_name', full_name),
    avatar_url = COALESCE(new.raw_user_meta_data->>'avatar_url', avatar_url),
    updated_at = now()
  WHERE id = new.id;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update profile when user auth data changes
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Additional RLS policies for better security

-- Policy to allow users to see their own auth data
CREATE POLICY "Users can view own auth data" 
  ON auth.users 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

-- Function to get current user profile (useful for client-side)
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS profiles AS $$
DECLARE
  user_profile profiles;
BEGIN
  SELECT * INTO user_profile
  FROM profiles
  WHERE id = auth.uid();
  
  RETURN user_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Ensure profiles table has proper permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON clips TO authenticated;
GRANT ALL ON templates TO authenticated;
GRANT ALL ON voices TO authenticated;
GRANT ALL ON avatars TO authenticated;
GRANT ALL ON analytics TO authenticated;
