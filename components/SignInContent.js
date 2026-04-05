'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SignInContent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLink = (e) => {
    e.preventDefault();
    alert('Magic link coming soon! For now, please use Continue with Google.');
  };

  const handleGoogleSignIn = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1D1F] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] bg-white rounded-[12px] p-[48px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] animate-[slideUp_0.4s_ease]">
        <h1 className="text-[32px] font-bold text-[#1D1D1F] mb-2">Sign in</h1>
        <p className="text-[14px] text-[#6E6E73] mb-8">
          New user?{' '}
          <Link href="#" className="text-[#0071E3] hover:underline no-underline">
            Create an account
          </Link>
        </p>

        <form onSubmit={handleMagicLink} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-[#1D1D1F]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 h-[44px] border border-[#D2D2D7] rounded-[8px] outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#0071E3] text-white rounded-full px-[24px] h-[40px] text-[15px] font-medium hover:bg-[#0077ED] transition-colors border-none cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#D2D2D7]"></div>
          </div>
          <div className="relative flex justify-center text-[13px]">
            <span className="px-3 bg-white text-[#6E6E73]">Or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-[48px] bg-white border border-[#D2D2D7] rounded-full flex items-center justify-center gap-3 hover:bg-[#F5F5F7] transition-colors cursor-pointer group disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-[15px] font-medium text-[#1D1D1F]">Continue with Google</span>
        </button>

        <div className="mt-8 flex justify-center gap-3 text-[13px] text-[#6E6E73]">
          <Link href="#" className="hover:text-[#0071E3] no-underline">More sign-in options</Link>
          <span>·</span>
          <Link href="#" className="hover:text-[#0071E3] no-underline">Get help signing in</Link>
        </div>
      </div>
    </div>
  );
}
