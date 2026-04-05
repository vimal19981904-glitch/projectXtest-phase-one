'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NvidiaHero from '@/components/NvidiaHero';
import ParallaxCard from '@/components/ParallaxCard';

const TABS = [
  { id: 'All', label: 'All', mapCategory: null },
  { id: 'WMS Updates', label: 'WMS Updates', mapCategory: 'WMS' },
  { id: 'Job Support', label: 'Job Support', mapCategory: 'Job Support' },
  { id: 'Career Advice', label: 'Career Advice', mapCategory: 'Career' },
];

const getBadgeColor = (cat) => {
  switch (cat) {
    case 'WMS': return 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20';
    case 'Job Support': return 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20';
    case 'Career': return 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20';
    case 'Industry News': return 'bg-[#AF52DE]/10 text-[#AF52DE] border-[#AF52DE]/20';
    default: return 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogIndexContent() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const filteredPosts = useMemo(() => {
    if (!activeTab.mapCategory) return blogPosts;
    return blogPosts.filter(post => post.category === activeTab.mapCategory);
  }, [activeTab]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  // Prepare items for NvidiaHero
  const heroItems = TABS.map(tab => ({
    ...tab,
    featuredItem: (tab.mapCategory ? blogPosts.filter(p => p.category === tab.mapCategory)[0] : blogPosts[0])
  }));

  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0071E3]/20 selection:text-[#1D1D1F]">
      
      <NvidiaHero 
        items={heroItems} 
        activeTabId={activeTab.id} 
        onTabChange={(tab) => {
          const originalTab = TABS.find(t => t.id === tab.id);
          setActiveTab(originalTab);
        }} 
      />

      {/* Grid Section */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#1D1D1F]">
            Latest in <span className="text-[#0071E3] font-black">{activeTab.label}</span>
          </h2>
        </div>

        {gridPosts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab.id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post) => (
                <motion.div
                  layout
                  key={post.slug}
                  variants={itemVariants}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <ParallaxCard className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-white border border-[#D2D2D7]/50 rounded-[2rem] overflow-hidden hover:border-[#0071E3] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 no-underline"
                    >
                      <div className="p-10 flex-1 flex flex-col relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`px-4 py-1.5 border rounded-full text-[11px] font-bold uppercase tracking-[0.1em] ${getBadgeColor(post.category)}`}>
                            {post.category}
                          </div>
                          <span className="text-[13px] text-[#86868B] font-medium">{post.date}</span>
                        </div>
                        
                        <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-4 leading-tight group-hover:text-[#0071E3] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-[#6E6E73] text-[16px] leading-[1.6] mb-8 line-clamp-3 font-light">
                          {post.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-8 border-t border-[#F5F5F7] flex items-center justify-between">
                          <span className="text-[14px] font-bold text-[#1D1D1F] opacity-70 uppercase tracking-wider">{post.author}</span>
                          <div className="flex items-center text-[14px] font-bold text-[#0071E3]">
                             Read <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ParallaxCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[2rem] border border-[#D2D2D7]/50 shadow-sm">
             <p className="text-[#6E6E73] text-[19px] font-light italic">No additional stories in this category today.</p>
          </div>
        )}
      </section>
    </div>
  );
}
