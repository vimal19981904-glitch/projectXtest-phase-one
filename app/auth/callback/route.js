import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  
  // Handle OAuth errors (e.g., user denied access)
  if (error) {
    console.error('Auth callback error:', error, error_description)
    return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(error_description || error)}`, origin))
  }

  if (code) {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // We ignore it since this is a route handler
            }
          },
        },
      }
    )
    
    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError.message)
        return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(exchangeError.message)}`, origin))
      }
    } catch (err) {
      console.error('Unexpected auth error:', err)
      return NextResponse.redirect(new URL('/sign-in?error=Authentication+failed', origin))
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/', origin))
}
