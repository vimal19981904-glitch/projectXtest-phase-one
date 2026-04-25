'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';
import { ChevronRight, Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { getDomainIcon, ICON_PROPS } from '@/lib/iconMap';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { avatarData } from '@/data/avatarData';
import { domainData } from '@/lib/domainData';

const MegaMenuDropdown = dynamic(() => import('./MegaMenuDropdown'), { ssr: false });
const MegaMenuSearch = dynamic(() => import('./MegaMenuSearch'), { ssr: false });



export default function NavMegaMenu() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

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

  const navLinks = [
    { label: 'Consulting Firm Support', href: '/consulting-firm-support' },
    { label: 'Work With Us', href: '/work-with-us' },
    { label: 'Blog', href: '/blog' },
  ];

  const handleMobileMenuClick = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if a link should be considered active
  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Special check for "Job Support & Training" (domains)
  const isTrainingActive = pathname.includes('/domains');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled || megaMenuOpen ? 'bg-white border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[56px] md:h-[64px] flex items-center justify-between">
          {/* Logo & Slogan */}
          <div className="flex items-center z-50">
            <Link 
              href="/" 
              onClick={() => setIsSearchOpen(false)}
              className="text-[24px] md:text-[32px] font-bold tracking-tight text-text-primary no-underline relative group font-heading"
            >
              GapAnchor
              {pathname === '/' && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute -inset-x-3 -inset-y-1.5 bg-accent/5 rounded-lg -z-10"
                />
              )}
            </Link>
            <div className="hidden lg:block w-[1.5px] h-[22px] bg-border/60 mx-4" />
            <span className="text-[12px] md:text-[14px] font-semibold text-text-secondary/80 tracking-tight translate-y-[1px] opacity-0 md:opacity-100 md:block">
              Let’s bridge the gap together.
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {/* Mega Menu Trigger element */}
            <div 
              className="h-full flex items-center relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button 
                onClick={() => {
                  setMegaMenuOpen(!megaMenuOpen);
                  setIsSearchOpen(false);
                }}
                className={`text-[14px] font-semibold bg-transparent border-none cursor-pointer flex items-center gap-1.5 transition-all duration-300 relative py-2 px-3 rounded-xl ${
                  megaMenuOpen || isTrainingActive ? 'text-accent bg-accent/5' : 'text-text-primary hover:text-accent opacity-90 hover:opacity-100'
                }`}
              >
                Job Support & Training
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                {isTrainingActive && !megaMenuOpen && (
                   <motion.div 
                     layoutId="nav-underline"
                     className="absolute -bottom-[21px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent"
                   />
                )}
              </button>
              
              {/* Invisible full-height bridge to keep hover active - Larger and better positioned */}
              {megaMenuOpen && (
                 <div className="absolute top-[60%] left-[-100px] w-[600px] bg-transparent h-[80px] z-[9998]" />
              )}
            </div>



            {navLinks.map((l) => {
              const active = isLinkActive(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setIsSearchOpen(false)}
                  className={`text-[14px] font-semibold transition-all duration-300 no-underline relative py-1 opacity-90 hover:opacity-100 ${
                    active ? 'text-accent' : 'text-text-primary hover:text-accent'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                    />
                  )}
                </Link>
              );
            })}


            {/* Icons / Auth */}
            <div className="flex items-center gap-5 ml-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search" 
                className={`text-text-primary hover:text-accent transition-colors bg-transparent border-none cursor-pointer p-0 search-icon-anim ${isSearchOpen ? 'active' : ''}`}
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="relative border-l border-border/60 pl-5">
                {user ? (
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-[32px] h-[32px] rounded-full overflow-hidden border border-border cursor-pointer p-0 relative transition-all ${dropdownOpen ? 'ring-4 ring-accent/10 opacity-80' : 'hover:opacity-80'}`}
                    aria-label="Account options"
                  >
                    <Image
                      src={user.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80"}
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
                     <User className="w-5 h-5" />
                  </Link>
                )}

                {/* Profile Dropdown */}
                {dropdownOpen && user && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0d1a2e]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 py-3 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] z-[60] ring-1 ring-white/5 overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/5 mb-2 bg-white/[0.02]">
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account</p>
                       <p className="text-[14px] font-medium text-white truncate">{user.email}</p>
                    </div>
                    
                    <div className="px-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-[14px] font-semibold text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl border-none bg-transparent cursor-pointer transition-all duration-200 group"
                      >
                        <span>Sign Out</span>
                        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </button>
                    </div>

                    <div className="mt-2 px-5 py-2 bg-accent/5">
                        <p className="text-[10px] text-accent/80 font-medium text-center">Bridge the gap together</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-4 z-50">
            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search" 
              className="text-text-primary hover:text-accent transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Auth/Profile */}
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-[30px] h-[30px] rounded-full overflow-hidden border border-border cursor-pointer p-0 relative transition-all ${dropdownOpen ? 'ring-2 ring-accent' : ''}`}
                aria-label="Account options"
              >
                <Image
                  src={user.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80"}
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
                 <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="bg-transparent border-none cursor-pointer p-1 touch-target relative text-text-primary"
              onClick={handleMobileMenuClick}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Flyout (Desktop) Lazy Loaded */}
        <MegaMenuDropdown megaMenuOpen={megaMenuOpen} setMegaMenuOpen={setMegaMenuOpen} />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-[56px] h-screen overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
              {/* Mobile Links */}
              <div className="flex flex-col gap-5 border-b border-border/60 pb-6 mb-6">
                <button 
                  onClick={() => {
                    setIsSearchOpen(true);
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 text-[18px] font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer text-left w-full"
                >
                  <Search className="w-5 h-5 text-accent search-icon-anim" />
                  Search Catalog
                </button>
                {navLinks.map((l) => {
                  const active = isLinkActive(l.href);
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-[18px] font-semibold transition-colors no-underline ${
                        active ? 'text-accent pl-3 border-l-2 border-accent' : 'text-text-primary'
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>

              {/* Accordion mega menu */}
              <div className="mb-2 text-[13px] font-bold text-text-secondary uppercase tracking-wide">
                Training Domains
              </div>
              
              <div className="flex flex-col border-b border-border/60 mb-6 pb-4">
                {domainData.map((d) => (
                  <div key={`mobile-nav-${d.category}`} className="border-b border-border/40 last:border-0">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === d.category ? null : d.category)}
                      className="w-full flex items-center justify-between py-4 bg-transparent border-none text-[16px] font-medium text-text-primary relative cursor-pointer"
                    >
                      <span className="flex items-center gap-3 w-[85%] text-left">
                        <span className="flex-shrink-0 text-[#86868B]">{ (() => { const Icon = getDomainIcon(d.category); return <Icon {...ICON_PROPS} />; })() }</span> 
                        <span className="truncate">{d.category}</span>
                      </span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${mobileAccordion === d.category ? 'rotate-180 text-accent' : 'text-text-secondary'}`} />
                    </button>
                    
                    {/* Accordion Content */}
                    <AnimatePresence>
                      {mobileAccordion === d.category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-9 pr-2 pb-4 pt-1 flex flex-col gap-4">
                            {d.sub_domains.map((sub, idx) => (
                              <Link 
                                key={`mobile-nav-${d.category}-${sub.href}-${idx}`}
                                href={sub.href}
                                prefetch={false}
                                onClick={() => setMobileOpen(false)}
                                className="flex flex-col gap-1 no-underline"
                              >
                                <span className="text-[15px] font-medium text-text-primary">{sub.name}</span>
                                <span className="text-[13px] text-text-secondary">{sub.description}</span>
                              </Link>
                            ))}
                            <Link href="/domains" onClick={() => setMobileOpen(false)} className="text-accent text-[14px] font-semibold mt-2">
                               View All in Category →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Auth Mobile */}
              <div className="flex flex-col gap-4 mt-6">
                {!user ? (
                   <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="mx-auto btn-primary w-full text-center py-3 no-underline">
                     Sign In
                   </Link>
                ) : (
                  <button onClick={handleSignOut} className="w-full py-3 text-accent-red bg-white border border-accent-red rounded-xl hover:bg-accent-red hover:text-white transition-colors cursor-pointer font-medium">
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay Lazy Loaded */}
      <MegaMenuSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
}
