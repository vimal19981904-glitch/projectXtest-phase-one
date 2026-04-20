'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight } from 'lucide-react';
import { domainData } from '@/lib/domainData';
import { motion, AnimatePresence } from 'framer-motion';

export default function MegaMenuSearch({ isSearchOpen, setIsSearchOpen }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-[56px] md:top-[64px] z-[999] bg-white/95 backdrop-blur-xl flex flex-col items-center pt-20 px-6"
        >
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 p-2 text-text-secondary hover:text-text-primary bg-transparent border-none cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-[800px]">
            <div className="relative mb-8 pb-4 border-b-2 border-border/40 focus-within:border-accent transition-colors">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary" />
              <input
                autoFocus
                type="text"
                placeholder="Search domains, support & training, or categories..."
                className="w-full bg-transparent border-none outline-none pl-10 text-[24px] md:text-[32px] font-bold text-text-primary placeholder:text-text-secondary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                }}
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-10">
                  <p className="text-text-secondary text-[16px]">Try searching for &quot;Salesforce&quot;, &quot;Cloud&quot;, or &quot;ERP&quot;</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {(() => {
                    const lowerQuery = searchQuery.toLowerCase();
                    const results = [];
                    domainData.forEach(cat => {
                      if (cat.category.toLowerCase().includes(lowerQuery)) {
                        results.push({ type: 'Category', name: cat.category, href: '/domains' });
                      }
                      cat.sub_domains.forEach(sub => {
                        if (sub.name.toLowerCase().includes(lowerQuery) || sub.description.toLowerCase().includes(lowerQuery)) {
                          results.push({ type: 'Support & Training', name: sub.name, href: sub.href, desc: sub.description, category: cat.category });
                        }
                      });
                    });

                    if (results.length === 0) {
                      return (
                        <div className="text-center py-10">
                          <p className="text-text-secondary text-[16px]">No results found for &quot;{searchQuery}&quot;</p>
                        </div>
                      );
                    }

                    // show top 50 results at most to prevent lag
                    return results.slice(0, 50).map((res, i) => (
                      <Link
                        key={`search-res-${res.type}-${res.name}-${i}`}
                        href={res.href}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="group flex items-center justify-between p-5 rounded-2xl hover:bg-secondary-bg transition-all no-underline border border-transparent hover:border-border/40"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-md bg-accent/5">
                              {res.type}
                            </span>
                            <span className="text-[18px] font-bold text-text-primary group-hover:text-accent transition-colors">
                              {res.name}
                            </span>
                          </div>
                          {res.desc && (
                            <p className="text-[14px] text-text-secondary line-clamp-1">{res.desc}</p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </Link>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
