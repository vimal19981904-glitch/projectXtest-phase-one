'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { domainData } from '@/lib/domainData';
import { motion, AnimatePresence } from 'framer-motion';

export default function MegaMenuDropdown({ megaMenuOpen, setMegaMenuOpen }) {
  const [activeCategory, setActiveCategory] = useState(domainData[0].category);
  const activeSubDomains = domainData.find(d => d.category === activeCategory)?.sub_domains || [];

  return (
    <AnimatePresence>
      {megaMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-white border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden hidden lg:block"
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
        >
          <div className="max-w-[1400px] mx-auto flex h-[500px]">
            {/* Left Panel - Categories */}
            <div className="w-[300px] bg-[#FAFAFC] border-r border-border py-6 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="px-6 mb-3 text-[12px] font-bold text-text-secondary tracking-wider uppercase">Domains</div>
              {domainData.map((d) => (
                <button
                  key={d.category}
                  onMouseEnter={() => setActiveCategory(d.category)}
                  className={`text-left px-6 py-3 border-l-[3px] transition-all bg-transparent cursor-pointer flex items-center justify-between ${
                    activeCategory === d.category 
                      ? 'border-accent bg-white text-accent font-semibold shadow-[-4px_0_10px_rgba(0,0,0,0.02)]' 
                      : 'border-transparent text-text-primary hover:bg-black/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[18px]">{d.icon}</span>
                    <span className="text-[14px]">{d.category}</span>
                  </span>
                  {activeCategory === d.category && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              ))}
            </div>

            {/* Right Panel - Sub-Domains */}
            <div className="flex-1 bg-white p-8 overflow-y-auto relative custom-scrollbar">
              <div className="mb-8 border-b border-border/50 pb-4">
                  {domainData.filter(d => d.category === activeCategory).map(activeData => (
                    <motion.div 
                      key={activeData.category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-[22px] font-bold text-text-primary flex items-center gap-2 mb-2">
                        <span style={{ color: activeData.color_accent }}>{activeData.icon}</span> 
                        {activeData.category}
                      </h3>
                      <p className="text-[14px] text-text-secondary">{activeData.description}</p>
                    </motion.div>
                  ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {activeSubDomains.map((sub) => (
                  <Link 
                    key={sub.name} 
                    href={sub.href}
                    className="group flex flex-col gap-1 no-underline p-3 -mx-3 rounded-lg hover:bg-[#F5F5F7] transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-semibold text-text-primary group-hover:text-accent transition-colors flex items-center gap-1.5 line-clamp-1">
                          {sub.name}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all flex-shrink-0" />
                      </div>
                      <span className="text-[12px] text-text-secondary leading-snug line-clamp-2">
                        {sub.description}
                      </span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-10 pt-6 border-t border-border/40">
                  <Link href="/domains" className="text-accent font-semibold text-[14px] flex items-center gap-1 hover:underline w-fit">
                    Explore all {activeCategory} courses <ChevronRight className="w-4 h-4" />
                  </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
