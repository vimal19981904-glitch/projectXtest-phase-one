'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    // Auth state listener
    let subscription = null;
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });
      subscription = data.subscription;
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setDropdownOpen(false);
    router.push('/');
  };

  const links = [
    { label: 'Corporate Training', href: '/work-with-us' },
    { label: 'On-Job Support', href: '/job-support' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-300 ${
        scrolled ? 'border-b border-border/50 shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[48px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-[20px] font-bold tracking-tight text-text-primary no-underline">
          Project X
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[14px] font-normal text-text-primary hover:text-accent transition-colors no-underline"
            >
              {l.label}
            </Link>
          ))}

          {/* Search icon */}
          <button aria-label="Search" className="text-text-primary hover:text-accent transition-colors bg-transparent border-none cursor-pointer p-0 search-icon-anim">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Course pill */}
          <Link href="/manhattan-wms" className="btn-primary !py-[6px] !px-[16px] !text-[13px]">
            Course
          </Link>

          {/* Auth Menu */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-[28px] h-[28px] rounded-full overflow-hidden border border-border cursor-pointer p-0 relative"
              >
                <Image
                  src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </button>
            ) : (
              <Link
                href="/sign-in"
                aria-label="Login"
                className="text-text-primary hover:text-accent transition-colors p-0 flex items-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* Dropdown */}
            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2 animate-[slideUp_0.2s_ease]">
                <div className="px-4 py-2 border-b border-border mb-1">
                  <p className="text-[12px] text-text-secondary truncate">{user.email}</p>
                </div>
                <Link
                  href="#"
                  className="block px-4 py-2 text-[14px] text-text-primary hover:bg-secondary-bg no-underline"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-[14px] text-accent-red hover:bg-secondary-bg border-none bg-transparent cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer p-1 touch-target"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border/30 px-6 py-4 space-y-4 animate-[slideUp_0.3s_ease]">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[15px] text-text-primary hover:text-accent no-underline py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/manhattan-wms" onClick={() => setMobileOpen(false)} className="btn-primary !text-[13px] w-full text-center">
            Course
          </Link>
          {!user && (
            <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block text-[15px] text-text-primary hover:text-accent no-underline py-1">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
