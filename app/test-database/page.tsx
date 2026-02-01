'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { authService } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function DatabaseTestPage() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [testPassword, setTestPassword] = useState('password123')

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }
  const runDatabaseTests = async () => {
    setLoading(true)
    setResults([])
    
    try {
      // Check environment variables first
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!url || !key) {
        addResult('❌ Missing environment variables!')
        addResult('Please set up your .env.local file first.')
        addResult('Visit /env-setup for help')
        return
      }
      
      if (url.includes('your-project-ref') || key.includes('your_anon_key')) {
        addResult('❌ Environment variables still have placeholder values')
        addResult('Please update with your actual Supabase credentials')
        addResult('Visit /env-setup for help')
        return
      }
      
      const supabase = createClient()
      
      // Test 1: Check if profiles table exists
      addResult('Testing database connection...')
      const { data: tables, error: tablesError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (tablesError) {
        addResult(`❌ Database connection failed: ${tablesError.message}`)
        return
      }
      
      addResult('✅ Database connection successful')
      
      // Test 2: Check RLS policies
      addResult('Testing Row Level Security...')
      try {
        const { data: session } = await supabase.auth.getSession()
        if (session.session) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.session.user.id)
          
          if (profileError) {
            addResult(`⚠️ RLS test: ${profileError.message}`)
          } else {
            addResult('✅ RLS policies working correctly')
          }
        } else {
          addResult('ℹ️ No active session for RLS test')
        }
      } catch (error: any) {
        addResult(`⚠️ RLS test error: ${error.message}`)
      }
      
      // Test 3: Check functions exist
      addResult('Testing database functions...')
      try {
        const { data: funcData, error: funcError } = await supabase
          .rpc('check_usage_limits')
        
        if (funcError) {
          addResult(`❌ Function test failed: ${funcError.message}`)
        } else {
          addResult('✅ Database functions are working')
        }
      } catch (error: any) {
        addResult(`❌ Function test error: ${error.message}`)
      }
      
      // Test 4: Check auth service
      addResult('Testing AuthService...')
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          addResult(`✅ AuthService working - User: ${user.email}`)
        } else {
          addResult('ℹ️ AuthService working - No logged in user')
        }
      } catch (error: any) {
        addResult(`❌ AuthService error: ${error.message}`)
      }
      
    } catch (error: any) {
      addResult(`❌ Test failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSignup = async () => {
    setLoading(true)
    addResult('Testing signup process...')
    
    try {
      // Use a random email to avoid conflicts
      const randomEmail = `test${Date.now()}@example.com`
      const result = await authService.signUp(randomEmail, testPassword, 'Test User')
      
      if (result.user) {
        addResult(`✅ Signup successful - User created: ${result.user.email}`)
        if (result.session) {
          addResult('✅ Session created successfully')
        } else {
          addResult('ℹ️ Email confirmation required')
        }
      } else {
        addResult('❌ Signup failed - No user returned')
      }
    } catch (error: any) {
      addResult(`❌ Signup error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database & Authentication Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
              
              <div className="space-y-4">
                <Button 
                  onClick={runDatabaseTests} 
                  disabled={loading}
                  className="w-full"
                >
                  Run Database Tests
                </Button>
                
                <div className="space-y-2">
                  <Label>Test Email</Label>
                  <Input
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Test Password</Label>
                  <Input
                    type="password"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    placeholder="password123"
                  />
                </div>
                
                <Button 
                  onClick={testSignup} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  Test Signup Process
                </Button>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Run the auth_setup.sql script in Supabase SQL Editor</li>
                <li>Check Authentication &gt; Settings in Supabase dashboard</li>
                <li>Set Site URL to: http://localhost:3001</li>
                <li>Add redirect URL: http://localhost:3001/auth/callback</li>
                <li>Run tests to verify everything works</li>
              </ol>
              
              <div className="mt-4 p-3 bg-slate-700 rounded text-xs">
                <p className="font-medium mb-2">🔗 Quick Links:</p>
                <p>• SQL Script: Open auth_setup.sql file</p>
                <p>• Supabase: <a href="https://supabase.com" target="_blank" className="text-blue-400 underline">supabase.com</a></p>
                <p>• Help Guide: Check HOW_TO_RUN_SQL.md</p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            <div className="bg-slate-900 p-4 rounded-lg h-96 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-gray-400">No tests run yet...</p>
              ) : (
                <div className="space-y-1">
                  {results.map((result, index) => (
                    <div key={index} className="text-sm font-mono">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button
              onClick={() => setResults([])}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Clear Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
