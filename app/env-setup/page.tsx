'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, Copy } from 'lucide-react'

export default function EnvironmentSetupPage() {
  const [supabaseUrl, setSupabaseUrl] = useState('')
  const [supabaseKey, setSupabaseKey] = useState('')
  const [copied, setCopied] = useState(false)

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isConfigured = url && key && 
    !url.includes('your-project-ref') && 
    !key.includes('your_anon_key')

  const generateEnvContent = () => {
    return `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl || 'https://your-project-ref.supabase.co'}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey || 'your_anon_key_here'}
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_random_secret_here

# Development
NODE_ENV=development`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEnvContent())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Environment Setup</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Status */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Current Status</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {isConfigured ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span>Supabase URL: {url ? (url.includes('your-project-ref') ? 'Placeholder' : 'Set') : 'Missing'}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {isConfigured ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span>Supabase Key: {key ? (key.includes('your_anon_key') ? 'Placeholder' : 'Set') : 'Missing'}</span>
                </div>
              </div>

              {isConfigured ? (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
                  <p className="text-green-400">✅ Environment is configured!</p>
                  <p className="text-sm text-gray-300 mt-1">You can now test your authentication.</p>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded">
                  <p className="text-red-400">❌ Environment needs configuration</p>
                  <p className="text-sm text-gray-300 mt-1">Please follow the steps below to set up your Supabase credentials.</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <a 
                  href="https://supabase.com/dashboard" 
                  target="_blank" 
                  className="block w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
                >
                  Open Supabase Dashboard
                </a>
                
                <a 
                  href="/test-database" 
                  className="block w-full p-3 bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors"
                >
                  Test Database Connection
                </a>
                
                <a 
                  href="/auth/signup" 
                  className="block w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-center transition-colors"
                >
                  Try Signup Page
                </a>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Enter Your Supabase Credentials</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Supabase Project URL</Label>
                  <Input
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xxxxxxxxxxx.supabase.co"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Found in: Supabase Dashboard → Settings → API → Project URL
                  </p>
                </div>
                
                <div>
                  <Label>Supabase Anon Key</Label>
                  <Input
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Found in: Supabase Dashboard → Settings → API → anon public
                  </p>
                </div>
                
                <Button 
                  onClick={copyToClipboard}
                  className="w-full"
                  disabled={!supabaseUrl || !supabaseKey}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy .env.local Content'}
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">📋 Setup Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Get your credentials from Supabase Dashboard</li>
                <li>Enter them in the form above</li>
                <li>Click "Copy .env.local Content"</li>
                <li>Paste into your .env.local file</li>
                <li>Restart your development server</li>
                <li>Test your setup!</li>
              </ol>
            </div>

            {/* Generated .env content */}
            {(supabaseUrl || supabaseKey) && (
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Generated .env.local content:</h3>
                <pre className="text-xs bg-slate-900 p-3 rounded overflow-x-auto">
                  {generateEnvContent()}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
