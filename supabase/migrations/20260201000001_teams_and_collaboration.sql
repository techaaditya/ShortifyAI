/*
  # ShortifyAI Extended Schema - Teams & Collaboration

  This migration adds:
  1. Teams table for collaboration
  2. Team members with roles
  3. Branding templates enhancement
  4. Publishing queue for social media
  5. Additional indexes for performance
*/

-- Teams table for collaboration
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  logo_url text,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'team', 'enterprise')),
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members junction table
CREATE TABLE IF NOT EXISTS team_members (
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);

-- Team projects - projects can optionally belong to teams
ALTER TABLE projects ADD COLUMN IF NOT EXISTS team_id uuid REFERENCES teams(id) ON DELETE SET NULL;

-- Branding templates enhancement
CREATE TABLE IF NOT EXISTS branding_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  logo_url text,
  watermark_url text,
  intro_video_url text,
  outro_video_url text,
  caption_style jsonb DEFAULT '{}',
  color_scheme jsonb DEFAULT '{}',
  font_settings jsonb DEFAULT '{}',
  is_default boolean DEFAULT false,
  is_shared boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Publishing queue for social media scheduling
CREATE TABLE IF NOT EXISTS publishing_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  clip_id uuid REFERENCES clips(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram', 'facebook', 'twitter', 'linkedin')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'publishing', 'published', 'failed')),
  scheduled_for timestamptz,
  published_at timestamptz,
  post_url text,
  post_id text,
  metadata jsonb DEFAULT '{}',
  error_message text,
  retry_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Social platform connections
CREATE TABLE IF NOT EXISTS social_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram', 'facebook', 'twitter', 'linkedin')),
  account_id text NOT NULL,
  account_name text,
  account_avatar text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  scopes jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, account_id)
);

-- Transcripts table for better management
CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  language text DEFAULT 'en',
  segments jsonb NOT NULL DEFAULT '[]',
  full_text text,
  word_timings jsonb DEFAULT '[]',
  confidence numeric DEFAULT 0,
  source text DEFAULT 'gemini' CHECK (source IN ('gemini', 'whisper', 'manual')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE branding_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishing_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Team owners can manage teams"
  ON teams
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Team members can view teams"
  ON teams
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Team members policies
CREATE POLICY "Users can view team memberships"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    team_id IN (SELECT id FROM teams WHERE owner_id = auth.uid())
  );

CREATE POLICY "Team admins can manage members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    team_id IN (
      SELECT id FROM teams WHERE owner_id = auth.uid()
    ) OR
    team_id IN (
      SELECT team_id FROM team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Branding templates policies
CREATE POLICY "Users can manage own branding templates"
  ON branding_templates
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Team members can view shared templates"
  ON branding_templates
  FOR SELECT
  TO authenticated
  USING (
    is_shared = true AND team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Publishing queue policies
CREATE POLICY "Users can manage own publishing queue"
  ON publishing_queue
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Social connections policies
CREATE POLICY "Users can manage own social connections"
  ON social_connections
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Transcripts policies
CREATE POLICY "Users can view project transcripts"
  ON transcripts
  FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create project transcripts"
  ON transcripts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Additional indexes for new tables
CREATE INDEX IF NOT EXISTS idx_teams_owner_id ON teams(owner_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_branding_templates_user_id ON branding_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_branding_templates_team_id ON branding_templates(team_id);
CREATE INDEX IF NOT EXISTS idx_publishing_queue_user_id ON publishing_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_publishing_queue_clip_id ON publishing_queue(clip_id);
CREATE INDEX IF NOT EXISTS idx_publishing_queue_status ON publishing_queue(status);
CREATE INDEX IF NOT EXISTS idx_publishing_queue_scheduled_for ON publishing_queue(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social_connections_platform ON social_connections(platform);
CREATE INDEX IF NOT EXISTS idx_transcripts_project_id ON transcripts(project_id);

-- Add team_id index to projects
CREATE INDEX IF NOT EXISTS idx_projects_team_id ON projects(team_id);

-- Triggers for updated_at on new tables
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branding_templates_updated_at BEFORE UPDATE ON branding_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publishing_queue_updated_at BEFORE UPDATE ON publishing_queue FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_connections_updated_at BEFORE UPDATE ON social_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
