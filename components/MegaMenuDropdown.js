'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { domainData, domainVersion } from '@/lib/domainData';
import { getDomainIcon, ICON_PROPS } from '@/lib/iconMap';
import { motion, AnimatePresence } from 'framer-motion';

export default function MegaMenuDropdown({ megaMenuOpen, setMegaMenuOpen }) {
  const [activeCategory, setActiveCategory] = useState(domainData[0].category);
  const activeSubDomains = domainData.find(d => d.category === activeCategory)?.sub_domains || [];

  return (
    <AnimatePresence>
      {megaMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-[#ffffff] border-b border-border shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden hidden lg:block z-[9999]"
          style={{ isolation: 'isolate' }}
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
        >

          <div className="max-w-[1400px] mx-auto flex h-[520px]">
            {/* Left Panel - Categories */}
            <div className="w-[320px] bg-[#F8F9FB] border-r border-border/40 py-8 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="px-8 mb-5 text-[11px] font-bold text-text-secondary tracking-[0.1em] uppercase opacity-60">Training Domains</div>
              {domainData.map((d) => {
                const IconComponent = getDomainIcon(d.category);
                return (
                  <button
                    key={d.category}
                    onMouseEnter={() => setActiveCategory(d.category)}
                    className={`text-left px-8 py-4 border-l-[3px] transition-all duration-300 bg-transparent cursor-pointer flex items-center justify-between group/cat ${
                      activeCategory === d.category 
                        ? 'border-accent bg-white text-accent font-bold shadow-[4px_0_15px_rgba(0,0,0,0.02)]' 
                        : 'border-transparent text-text-primary hover:bg-black/5'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`transition-transform duration-300 ${activeCategory === d.category ? 'scale-110 text-accent' : 'text-[#86868B] group-hover/cat:scale-110'}`}>
                        <IconComponent {...ICON_PROPS} />
                      </span>
                      <span className="text-[14px] font-heading">{d.category}</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeCategory === d.category ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                  </button>
                );
              })}
            </div>
            
            {/* Right Panel - Grid Content */}
            <div className="flex-1 bg-white p-10 overflow-y-auto relative custom-scrollbar">
              <div className="mb-10 flex items-start justify-between border-b border-border/30 pb-6">
                  {domainData.filter(d => d.category === activeCategory).map(activeData => {
                    const ActiveIcon = getDomainIcon(activeData.category);
                    return (
                      <motion.div 
                        key={activeData.category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl"
                      >
                        <h3 className="text-[26px] font-bold text-text-primary flex items-center gap-3 mb-3 font-heading">
                          <span style={{ color: activeData.color_accent }}>
                            <ActiveIcon size={28} strokeWidth={1.75} />
                          </span>
                          {activeData.category}
                        </h3>
                        <p className="text-[15px] text-text-secondary font-medium leading-relaxed">{activeData.description}</p>
                      </motion.div>
                    );
                  })}
                  
                  <div className="hidden xl:block">
                     <Link href="/domains" className="btn-secondary whitespace-nowrap !py-2.5 !px-5 !text-[13px]">
                        View All Courses
                     </Link>
                  </div>
              </div>

              {/* Multi-column Grid - Limited to 18 items for performance */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                {activeSubDomains.slice(0, 18).map((sub, idx) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.01, 0.1) }} // Cap the delay
                  >
                    <Link 
                      href={sub.href}
                      className="group flex flex-col gap-1.5 no-underline p-4 -mx-4 rounded-xl hover:bg-[#F8F9FB] transition-all duration-300 border border-transparent hover:border-border/20"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-bold text-text-primary group-hover:text-accent transition-colors flex items-center gap-2 font-heading">
                            {sub.name}
                            {sub.isHot && <span className="bg-accent-red/10 text-accent-red text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">HOT</span>}
                          </span>
                          <ChevronRight className="w-4 h-4 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                        <span className="text-[13px] text-text-secondary leading-snug font-medium line-clamp-2 opacity-80 group-hover:opacity-100">
                          {sub.description}
                        </span>
                    </Link>
                  </motion.div>
                ))}
                
                {activeSubDomains.length > 18 && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="col-span-full pt-4"
                   >
                     <Link 
                       href={`/domains/${activeCategory.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`}
                       className="text-accent font-bold text-[14px] hover:underline flex items-center gap-2"
                     >
                        + View {activeSubDomains.length - 18} more specialized programs in this category
                     </Link>
                   </motion.div>
                )}
              </div>

              
              <div className="mt-12 pt-8 border-t border-border/30 flex items-center justify-between">
                  <Link href={`/domains/${activeCategory.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="text-accent font-bold text-[14px] flex items-center gap-2 hover:gap-3 transition-all font-heading">
                    Explore all {activeCategory} courses <ChevronRight className="w-4 h-4" />
                  </Link>
                  <div className="flex flex-col items-end">
                    <p className="text-[12px] text-text-secondary italic">Trusted by 500+ corporate clients worldwide</p>
                    <p className="text-[10px] text-text-secondary/50 font-mono mt-1">Registry v{domainVersion}</p>
                  </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
