'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { domainData } from '@/lib/domainData';
import { ArrowRight, ChevronRight, Play, Pause, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxCard from '@/components/ParallaxCard';
import { getDomainIcon, ICON_PROPS } from '@/lib/iconMap';

const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      staggerChildren: 0.05,
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

export default function DomainGrid() {
  const [activeCategory, setActiveCategory] = useState(domainData[0].category);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const timerRef = useRef(null);

  const activeData = domainData.find(d => d.category === activeCategory);

  const nextCategory = useCallback(() => {
    const currentIndex = domainData.findIndex(d => d.category === activeCategory);
    const nextIndex = (currentIndex + 1) % domainData.length;
    setActiveCategory(domainData[nextIndex].category);
  }, [activeCategory]);

  // Auto-rotation logic
  useEffect(() => {
    if (isAutoPlaying && !searchTerm) {
      timerRef.current = setInterval(nextCategory, 8000); // 8 seconds rotation
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextCategory, searchTerm]);

  const handleTabClick = (category) => {
    setActiveCategory(category);
    setIsAutoPlaying(false); // Pause on manual interaction
    setVisibleCount(12);
    setSearchTerm('');
  };

  const filteredSubDomains = activeData ? activeData.sub_domains.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <section className="bg-secondary-bg py-24 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[12px] font-bold uppercase tracking-widest mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Explore Our Catalog
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[34px] md:text-[52px] font-black text-text-primary mb-6 tracking-tight leading-tight"
          >
            Train for Your <span className="text-accent underline decoration-accent/20 underline-offset-8">Next Project</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[18px] text-text-secondary max-w-[700px] mx-auto leading-relaxed font-light"
          >
            Discover our industry-validated curriculum across 250+ specialized domains. From legacy systems to AI-driven automation, we bridge the skill gap.
          </motion.p>
        </div>

        {/* Categorized Tabs UI & Search */}
        <div className="mb-14 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-3 max-w-[1100px]">
             {domainData.map((domain) => {
               const Icon = getDomainIcon(domain.category);
               return (
                <button
                  key={domain.category}
                  onClick={() => handleTabClick(domain.category)}
                  className={`px-5 py-3 rounded-2xl text-[14px] font-bold transition-all duration-300 border cursor-pointer flex items-center gap-3 backdrop-blur-sm ${
                    activeCategory === domain.category 
                      ? 'bg-text-primary text-white border-text-primary shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-105 z-10'
                      : 'bg-white/60 text-text-secondary border-border/40 hover:border-accent/40 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <Icon size={18} strokeWidth={activeCategory === domain.category ? 2.5 : 2} />
                  {domain.category}
                </button>
               );
             })}
          </div>
          
          <div className="w-full max-w-[600px] group">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Search over 250+ specialized domains..."
                 value={searchTerm}
                 onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(12);
                    setIsAutoPlaying(false);
                 }}
                 className="w-full px-6 py-4 pl-14 rounded-2xl border border-border/80 bg-white/80 backdrop-blur-md text-[16px] shadow-sm focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all group-hover:shadow-md"
               />
               <Search className="w-5 h-5 text-text-secondary absolute left-5 top-1/2 -translate-y-1/2 transition-colors group-hover:text-accent" />
               
               {/* Auto Play Toggle */}
               <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-secondary-bg transition-colors border-none bg-transparent cursor-pointer"
                title={isAutoPlaying ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
               >
                 {isAutoPlaying ? <Pause size={18} className="text-accent" /> : <Play size={18} className="text-text-secondary" />}
               </button>
             </div>
          </div>
        </div>

        {/* Active Category Display */}
        {activeData && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-border shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
            >
               <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: activeData.color_accent }}>
                        {(() => { const Icon = getDomainIcon(activeData.category); return <Icon size={32} strokeWidth={2.5} />; })()}
                      </div>
                      <h3 className="text-[32px] md:text-[40px] font-black text-text-primary tracking-tight">
                        {activeData.category}
                      </h3>
                    </div>
                    <p className="text-[18px] text-text-secondary leading-relaxed max-w-3xl font-light">
                      {activeData.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="px-5 py-2 bg-accent/5 text-accent rounded-full font-bold text-[14px] border border-accent/10 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                       {filteredSubDomains.length} Programs Available
                    </div>
                  </div>
               </div>

               {/* Course Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredSubDomains.slice(0, visibleCount).map((sub) => (
                   <motion.div key={sub.name} variants={itemVariants}>
                     <Link
                       href={sub.href}
                       className="group relative bg-white p-7 rounded-3xl border border-border/60 flex flex-col h-full overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 no-underline hover:-translate-y-2 block"
                     >
                       {/* Brand Accent Bar */}
                       <div 
                         className="absolute top-0 left-0 right-0 h-1.5 opacity-40 transition-all duration-500 group-hover:h-3 group-hover:opacity-100"
                         style={{ backgroundColor: activeData.color_accent }}
                       />

                       <div className="flex flex-col h-full mt-2">
                         <div className="flex items-start justify-between mb-4">
                           <h4 className="text-[18px] font-extrabold text-text-primary leading-tight group-hover:text-accent transition-colors duration-300">
                             {sub.name}
                           </h4>
                           <div className="p-1.5 rounded-full bg-secondary-bg opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                             <ChevronRight className="w-4 h-4 text-accent" />
                           </div>
                         </div>
                         <p className="text-[14px] text-text-secondary line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
                           {sub.description}
                         </p>
                         <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                           <span className="text-[13px] font-bold text-accent uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                             View Details <ArrowRight size={14} />
                           </span>
                           <span className="text-[12px] text-text-secondary/50 font-medium">Updated 2024</span>
                         </div>
                       </div>
                     </Link>
                   </motion.div>
                 ))}
               </div>

               {/* Pagination UI */}
               {visibleCount < filteredSubDomains.length && (
                 <div className="mt-16 flex justify-center">
                   <button 
                     onClick={() => setVisibleCount(prev => prev + 12)}
                     className="group relative px-10 py-4 bg-text-primary text-white rounded-2xl text-[15px] font-black hover:bg-accent transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-accent/30 overflow-hidden"
                   >
                     <span className="relative z-10 flex items-center gap-2">
                       Load More Specialized Programs <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                   </button>
                 </div>
               )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

