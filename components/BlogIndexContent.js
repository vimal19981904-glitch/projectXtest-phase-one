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

      {/* High-Demand Programs Section */}
      <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] font-bold tracking-tight text-[#1D1D1F] uppercase opacity-50">Most Demanded Programs</h2>
          <Link href="/domains" className="text-[14px] font-bold text-[#0071E3] no-underline hover:underline">View All Domains →</Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6 snap-x">
          {[
            { name: 'Claude Code', category: 'AI & Engineering', icon: '🤖' },
            { name: 'Manhattan WMS', category: 'Supply Chain', icon: '🔗' },
            { name: 'Zscaler SASE', category: 'Cybersecurity', icon: '🛡️' },
            { name: 'SailPoint', category: 'Identity Management', icon: '👤' },
            { name: 'Duck Creek', category: 'Insurance Tech', icon: '🛡️' },
            { name: 'Oracle EPM', category: 'Finance ERP', icon: '📊' },
            { name: 'WindSurf', category: 'AI Learning', icon: '🌊' }
          ].map((program, idx) => {
            const slugMap = {
              'Claude Code': 'claude-code',
              'Manhattan WMS': 'manhattan-wms-training',
              'Zscaler SASE': 'zscaler-sase',
              'SailPoint': 'sailpoint-administration',
              'Duck Creek': 'duck-creek-policy',
              'Oracle EPM': 'oracle-epm-cloud',
              'WindSurf': 'windsurf-ai'
            };
            const slug = slugMap[program.name] || program.name.toLowerCase().replace(/\s+/g, '-');
            
            return (
              <motion.div 
                key={program.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="snap-start flex-shrink-0 w-[240px]"
              >
                <Link href={`/domains/${slug}`} className="no-underline group">
                  <ParallaxCard className="p-8 h-[160px] bg-white border border-[#D2D2D7]/40 rounded-3xl flex flex-col justify-between group-hover:border-[#0071E3] transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{program.icon}</span>
                      <ArrowRight className="w-5 h-5 text-[#0071E3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-[#1D1D1F] mb-1 line-clamp-1">{program.name}</h4>
                      <p className="text-[12px] text-[#86868B] font-medium uppercase tracking-wider">{program.category}</p>
                    </div>
                  </ParallaxCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

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
