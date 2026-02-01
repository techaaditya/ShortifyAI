# 🚀 ShortifyAI Authentication Setup Guide

Since you already have your Supabase API keys, here's exactly what you need to do to get authentication working:

## Step 1: Run the SQL Script in Supabase

1. Open your Supabase dashboard
2. Go to **SQL Editor** (in the sidebar)
3. Copy and paste the entire content of `auth_setup.sql` into the editor
4. Click **Run** to execute the script

This script will:
- ✅ Create the profiles table with proper RLS policies
- ✅ Set up automatic profile creation when users sign up
- ✅ Add helpful database functions for usage tracking
- ✅ Configure proper permissions and triggers

## Step 2: Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication → Settings**
2. Update these settings:
   - **Site URL**: `http://localhost:3001`
   - **Redirect URLs**: Add `http://localhost:3001/auth/callback`
   - **Email confirmation**: You can disable this for development

## Step 3: Test Your Setup

1. Visit `http://localhost:3001/test-database` to run comprehensive tests
2. The test page will verify:
   - Database connection
   - Table structure
   - RLS policies
   - Auth functions
   - Signup process

## Step 4: Optional - Configure Email Provider

For production, configure an email provider:
1. Go to **Authentication → Settings → SMTP Settings**
2. Add your email service credentials (SendGrid, Mailgun, etc.)

## What the SQL Script Does

### 🔧 **Tables Created:**
- `profiles` - User profile information linked to auth.users

### 🛡️ **Security Features:**
- Row Level Security (RLS) enabled
- Users can only access their own data
- Automatic profile creation on signup

### ⚡ **Functions Added:**
- `handle_new_user()` - Creates profile when user signs up
- `get_current_user_profile()` - Gets current user's profile
- `check_usage_limits()` - Checks if user can create more content
- `increment_usage()` - Tracks usage for billing/limits

### 🔗 **Triggers:**
- Automatic profile creation on user registration
- Profile updates when auth data changes
- Updated timestamp management

## Troubleshooting

### If signup/login doesn't work:
1. Check browser console for errors
2. Verify environment variables are set
3. Run the database test page
4. Check Supabase logs in your dashboard

### If profiles aren't created:
1. Check if the `handle_new_user()` trigger is working
2. Look at Supabase logs for any trigger errors
3. Manually run the test signup function

### If RLS policies block access:
1. Verify you're authenticated
2. Check that user IDs match between auth.users and profiles
3. Test with the database test page

## Files You Need to Check

- ✅ `.env.local` - Should have your Supabase keys
- ✅ `auth_setup.sql` - Run this in Supabase SQL Editor
- ✅ `app/test-database/page.tsx` - Use this to test everything

Once you run the SQL script and configure the settings, your authentication should work perfectly! The test page will help you verify everything is set up correctly.
