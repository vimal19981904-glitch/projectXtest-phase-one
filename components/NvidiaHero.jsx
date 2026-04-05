'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * NvidiaHero - premium interactive hero slider with glassmorphism and slide-active highlight.
 * @param data - items to slide (e.g., blog categories).
 */
export default function NvidiaHero({ items, activeTabId, onTabChange }) {
  const activeTab = items.find(item => item.id === activeTabId) || items[0];
  const featuredItem = activeTab.featuredItem || null;

  return (
    <section className="relative h-[75vh] min-h-[500px] w-full bg-white dark:bg-[#050505] overflow-hidden flex flex-col justify-between pt-32 pb-0 border-b border-[#D2D2D7]/50 dark:border-white/10 transition-colors">
        
        {/* Dynamic Background Transitions */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-white dark:bg-black" />
            
            {/* Soft Ambient Glows */}
            <div className="absolute top-[0%] left-[10%] w-[600px] h-[600px] bg-[#0071E3] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-[0.04] dark:opacity-[0.1]" />
            <div className="absolute bottom-[0%] right-[10%] w-[500px] h-[500px] bg-[#34C759] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-[0.03] dark:opacity-[0.08]" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredItem?.slug || 'none'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              {featuredItem ? (
                <>
                  <div className="inline-block px-3 py-1 mb-6 border border-[#0071E3]/20 rounded-full text-[12px] font-bold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/5 backdrop-blur-sm">
                    {featuredItem.category} Featured
                  </div>
                  <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight mb-6 leading-[1.05] text-[#1D1D1F] dark:text-white">
                    {featuredItem.title}
                  </h1>
                  <p className="text-[19px] md:text-[21px] text-[#6E6E73] mb-8 max-w-2xl leading-relaxed font-light">
                    {featuredItem.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${featuredItem.slug}`}
                    className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 group no-underline shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              ) : (
                <div className="py-20">
                  <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight mb-6 text-[#1D1D1F] dark:text-white">Discover Insights</h1>
                  <p className="text-[21px] text-[#6E6E73]">Stay updated with the latest trends and resources.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation with Glassmorphism & Sliding Highlight */}
        <div className="relative z-20 w-full bg-white/60 dark:bg-black/40 backdrop-blur-md border-t border-[#D2D2D7]/50 dark:border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex overflow-x-auto no-scrollbar">
              {items.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab)}
                    className={cn(
                      "relative px-8 py-6 text-[15px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 bg-transparent border-none cursor-pointer",
                      isActive ? 'text-[#0071E3] dark:text-white' : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-gray-300'
                    )}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicatorHero"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0071E3] shadow-[0_2px_10px_rgba(0,113,227,0.4)]"
                        initial={false}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
    </section>
  );
}
