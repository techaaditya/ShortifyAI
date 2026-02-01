import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// For server components - needed for SSR auth
export const createServerClient = () => createServerComponentClient({ cookies })
