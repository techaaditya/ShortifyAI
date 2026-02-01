# 📋 Step-by-Step: How to Run SQL Script in Supabase

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Access Your Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click **"Sign in"** (top right)
3. Log in with your account
4. You'll see your projects dashboard
5. Click on your **ShortifyAI project** (or whatever you named it)

### Step 2: Open the SQL Editor
1. Once in your project dashboard, look at the **left sidebar**
2. Find and click on **"SQL Editor"** 
   - It's usually in the main navigation menu
   - Icon looks like `</>`
3. You'll see the SQL Editor interface

### Step 3: Create New Query
1. In the SQL Editor, click **"New query"** button
   - Usually at the top left of the editor
   - Or you might see a **"+"** button
2. This opens a blank SQL editor window

### Step 4: Copy and Paste the Script
1. Open the file `auth_setup.sql` from your project
2. **Select All** (Ctrl+A) and **Copy** (Ctrl+C) the entire content
3. Go back to Supabase SQL Editor
4. **Paste** (Ctrl+V) the entire script into the editor

### Step 5: Run the Script
1. Look for a **"Run"** button (usually green)
2. Click **"Run"** to execute the script
3. Wait for it to complete (usually takes 5-10 seconds)
4. Check for any error messages in the results panel

## Method 2: Using Supabase CLI (Alternative)

If you prefer command line:

```bash
# First, install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (you'll need your project reference)
supabase link --project-ref YOUR_PROJECT_REF

# Run the migration
supabase db push
```

## 🔍 What to Look For After Running

### ✅ Success Indicators:
- No red error messages
- You see "Success" or "Query executed successfully"
- Results panel shows table creation confirmations

### ❌ Common Issues:
- **"Permission denied"**: Make sure you're logged in as project owner
- **"Table already exists"**: That's OK! The script handles this
- **"Function already exists"**: Also OK! Script replaces them

## 📸 Visual Guide Screenshots

### Finding SQL Editor:
```
Supabase Dashboard Sidebar:
├── Home
├── Table Editor
├── Authentication
├── Storage
├── Edge Functions
├── 📝 SQL Editor  ← Click here!
├── Database
└── Settings
```

### SQL Editor Interface:
```
┌─ SQL Editor ─────────────────────────────┐
│ [New query] [Save] [Run] [Share]         │
├──────────────────────────────────────────┤
│ 1  -- Paste your SQL script here        │
│ 2  CREATE TABLE IF NOT EXISTS...        │
│ 3  ...                                  │
│ 4                                       │
│ 5                                       │
├──────────────────────────────────────────┤
│ Results:                                │
│ ✅ Query executed successfully           │
└──────────────────────────────────────────┘
```

## 🚨 Important Notes

1. **Make sure you're in the right project** - Check the project name at the top
2. **Run the ENTIRE script at once** - Don't run it line by line
3. **Wait for completion** - Don't refresh the page while it's running
4. **Save the query** - You can name it "Auth Setup" for future reference

## After Running the Script

1. Go to **"Table Editor"** in the sidebar
2. You should see a new **"profiles"** table
3. Go to **"Authentication"** to see if everything is connected
4. Test with the database test page: `http://localhost:3001/test-database`

## Need Help?

If you get stuck:
1. Check the Supabase logs (Dashboard → Logs)
2. Make sure your internet connection is stable
3. Try refreshing the browser and running again
4. Contact me with the exact error message if you see one

The script is designed to be safe - it won't break anything if run multiple times!
