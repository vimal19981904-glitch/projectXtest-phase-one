'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';
import { ChevronRight, Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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

  // Load domainData dynamically only when needed for mobile, otherwise it's lazy-loaded by MegaMenuDropdown
  const [mobileDomainData, setMobileDomainData] = useState([]);

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
    { label: 'On-Job Support', href: '/job-support' },
    { label: 'Work With Us', href: '/work-with-us' },
    { label: 'Blog', href: '/blog' },
  ];

  const handleMobileMenuClick = async () => {
    if (mobileDomainData.length === 0) {
      const { domainData } = await import('@/lib/domainData');
      setMobileDomainData(domainData);
    }
    setMobileOpen(!mobileOpen);
  };

  // Check if a link should be considered active
  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Special check for "Project Training" (domains)
  const isTrainingActive = pathname.includes('/domains') || pathname === '/manhattan-wms';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || megaMenuOpen ? 'bg-white/90 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[56px] md:h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-[20px] md:text-[22px] font-bold tracking-tight text-text-primary no-underline z-50 relative group">
            Project X
            {pathname === '/' && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute -inset-x-2 -inset-y-1 bg-accent/5 rounded-lg -z-10"
              />
            )}
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {/* Mega Menu Trigger element */}
            <div 
              className="h-full flex items-center relative group"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button 
                className={`text-[15px] font-medium bg-transparent border-none cursor-pointer flex items-center gap-1 transition-all duration-300 relative py-1 ${
                  megaMenuOpen || isTrainingActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                }`}
              >
                Project Training
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                {isTrainingActive && !megaMenuOpen && (
                   <motion.div 
                     layoutId="nav-underline"
                     className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                   />
                )}
              </button>
              
              {/* Invisible full-height bridge to keep hover active */}
              {megaMenuOpen && (
                 <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1200px] bg-transparent h-[40px]" />
              )}
            </div>

            {navLinks.map((l) => {
              const active = isLinkActive(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-[15px] font-medium transition-all duration-300 no-underline relative py-1 ${
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
                    className="w-[32px] h-[32px] rounded-full overflow-hidden border border-border cursor-pointer p-0 relative"
                  >
                    <Image
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`}
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
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-border py-2 animate-[slideUp_0.2s_ease]">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-[12px] text-text-secondary truncate">{user.email}</p>
                    </div>
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
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden bg-transparent border-none cursor-pointer p-1 touch-target z-50 relative text-text-primary"
            onClick={handleMobileMenuClick}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                Project Training Domains
              </div>
              
              <div className="flex flex-col border-b border-border/60 mb-6 pb-4">
                {mobileDomainData.map((d) => (
                  <div key={d.category} className="border-b border-border/40 last:border-0">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === d.category ? null : d.category)}
                      className="w-full flex items-center justify-between py-4 bg-transparent border-none text-[16px] font-medium text-text-primary relative cursor-pointer"
                    >
                      <span className="flex items-center gap-3 w-[85%] text-left">
                        <span className="flex-shrink-0">{d.icon}</span> 
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
                            {d.sub_domains.map(sub => (
                              <Link 
                                key={sub.name}
                                href={sub.href}
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
              <div className="flex flex-col gap-4">
                {!user ? (
                   <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="mx-auto btn-primary w-full text-center py-3">
                     Sign In
                   </Link>
                ) : (
                  <button onClick={handleSignOut} className="btn-secondary w-full py-3 text-accent-red border-accent-red hover:bg-accent-red cursor-pointer">
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
