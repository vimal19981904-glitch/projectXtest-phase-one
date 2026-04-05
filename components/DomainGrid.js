'use client';

import { useState } from 'react';
import Link from 'next/link';
import { domainData } from '@/lib/domainData';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxCard from '@/components/ParallaxCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export default function DomainGrid() {
  const [activeCategory, setActiveCategory] = useState(domainData[0].category);
  const activeData = domainData.find(d => d.category === activeCategory);

  // Pagination / Chunking to limit to 10 items initially
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (category) => {
    setActiveCategory(category);
    setVisibleCount(12); // reset on switch
    setSearchTerm('');
  };

  const filteredSubDomains = activeData ? activeData.sub_domains.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <section className="bg-secondary-bg py-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[34px] md:text-[45px] font-bold text-text-primary mb-4"
          >
            Train for Your Next Project
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-text-secondary max-w-[640px] mx-auto leading-relaxed"
          >
            Explore our massive catalog of over 250+ specialized tech domains. Select a category to see specific on-job support programs.
          </motion.p>
        </div>

        {/* Categorized Tabs UI & Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             {domainData.map((domain) => (
               <button
                 key={domain.category}
                 onClick={() => handleTabClick(domain.category)}
                 className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                   activeCategory === domain.category 
                     ? 'bg-text-primary text-white border-text-primary shadow-lg scale-105'
                     : 'bg-white text-text-secondary border-border/60 hover:border-text-secondary/30 hover:bg-[#F5F5F7]'
                 }`}
               >
                 <span>{domain.icon}</span>
                 {domain.category}
               </button>
             ))}
          </div>
          
          <div className="w-full md:w-auto min-w-[280px]">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Search domains..."
                 value={searchTerm}
                 onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(12);
                 }}
                 className="w-full px-4 py-2.5 pl-10 rounded-xl border border-border/80 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
               />
               <svg className="w-4 h-4 text-text-secondary absolute left-3.5 top-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
        </div>

        {/* Active Category Header */}
        {activeData && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm"
            >
               <div className="mb-8 border-b border-border/50 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[28px] font-bold text-text-primary flex items-center gap-3">
                      <span style={{ color: activeData.color_accent }}>{activeData.icon}</span> 
                      {activeData.category}
                    </h3>
                    <p className="text-[16px] text-text-secondary mt-2 max-w-3xl">
                      {activeData.description} — Showing {Math.min(visibleCount, filteredSubDomains.length)} of {filteredSubDomains.length} programs.
                    </p>
                  </div>
                  <div className="px-4 py-1.5 bg-[#F5F5F7] rounded-lg text-text-secondary font-medium text-[14px] border border-border/40">
                    {filteredSubDomains.length} Domains Available
                  </div>
               </div>

               {/* Grid chunking 5-10 items */}
               <motion.div 
                 variants={containerVariants}
                 initial="hidden"
                 animate="visible"
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
               >
                 {filteredSubDomains.slice(0, visibleCount).map((sub) => (
                   <motion.div key={sub.name} variants={itemVariants}>
                     <Link
                       href={sub.href}
                       className="group relative bg-white p-5 rounded-2xl border border-border flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-300 no-underline hover:-translate-y-1 block"
                     >
                       <div 
                         className="absolute top-0 left-0 w-1 h-full transition-all duration-300"
                         style={{ backgroundColor: activeData.color_accent, opacity: 0.6 }}
                       />
                       <div className="pl-3 h-full flex flex-col">
                         <div className="flex items-start justify-between mb-2">
                           <h4 className="text-[16px] font-bold text-text-primary leading-snug group-hover:text-accent transition-colors">
                             {sub.name}
                           </h4>
                           <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                         </div>
                         <p className="text-[13px] text-text-secondary line-clamp-3 mb-4 flex-1">
                           {sub.description}
                         </p>
                         <div className="mt-auto text-[13px] font-semibold text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           View Program <ArrowRight className="w-3.5 h-3.5" />
                         </div>
                       </div>
                     </Link>
                   </motion.div>
                 ))}
               </motion.div>

               {/* Load More Button */}
               {visibleCount < filteredSubDomains.length && (
                 <div className="mt-10 flex justify-center">
                   <button 
                     onClick={() => setVisibleCount(prev => prev + 12)}
                     className="px-6 py-2.5 bg-white border border-border rounded-xl text-text-primary text-[14px] font-semibold hover:bg-[#F5F5F7] transition-colors cursor-pointer shadow-sm hover:shadow active:scale-95"
                   >
                     Load More Programs
                   </button>
                 </div>
               )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
