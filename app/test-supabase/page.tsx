'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function TestSupabasePage() {
  const [status, setStatus] = useState<string>('Not tested')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus('Testing...')
    
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        setStatus(`Error: ${error.message}`)
      } else {
        setStatus('✅ Supabase connection successful!')
      }
    } catch (error: any) {
      setStatus(`❌ Connection failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testEnvironment = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!url || !key) {
      setStatus('❌ Environment variables not set. Please check your .env.local file.')
    } else {
      setStatus('✅ Environment variables are set')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div>
            <Button onClick={testEnvironment} className="mr-4">
              Test Environment Variables
            </Button>
            <Button onClick={testConnection} disabled={loading}>
              Test Supabase Connection
            </Button>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Status:</h3>
            <p>{status}</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Environment Check:</h3>
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}</p>
            <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Create a Supabase project at <a href="https://supabase.com" className="text-blue-400 underline">supabase.com</a></li>
              <li>Go to Settings → API in your Supabase dashboard</li>
              <li>Copy the Project URL and anon key to your .env.local file</li>
              <li>Restart your development server</li>
              <li>Test the connection using the buttons above</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
