'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // Redirect to login if auth is required but user is not logged in
        router.push('/auth/login')
      } else if (!requireAuth && user) {
        // Redirect to dashboard if user is already logged in and trying to access login/signup
        router.push('/dashboard')
      }
    }
  }, [user, loading, requireAuth, router])

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // If auth is required and user is not logged in, don't render children
  if (requireAuth && !user) {
    return null
  }

  // If auth is not required and user is logged in, don't render children (for login/signup pages)
  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
}
