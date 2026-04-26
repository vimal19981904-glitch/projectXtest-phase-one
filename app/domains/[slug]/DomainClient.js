'use client';

import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, ChevronDown, ChevronRight, ChevronLeft, HelpCircle, BookOpen, Star, Mail, LayoutGrid, Table2, Award, Layers, Box } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import ParallaxCard from '@/components/ParallaxCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Synthesize a curriculum from legacy features/plans when curriculum is absent
function buildCurriculum(content) {
  if (content.curriculum && content.curriculum.length > 0) return content.curriculum;

  const levels = ['Foundation', 'Intermediate', 'Advanced', 'Expert'];
  const durations = ['2 Weeks', '3 Weeks', '4 Weeks', '2 Weeks'];

  // Prefer features → one module per feature
  if (content.features && content.features.length > 0) {
    return content.features.map((f, i) => ({
      id: i + 1,
      name: typeof f === 'string' ? f.split(':')[0] : f.title,
      level: levels[i % levels.length],
      duration: durations[i % durations.length],
      topics: typeof f === 'string'
        ? [f]
        : [f.desc || f.title, `${f.title} configuration`, `${f.title} best practices`],
    }));
  }

  // Fallback: use plan names
  if (content.plans && content.plans.length > 0) {
    return content.plans.map((p, i) => ({
      id: i + 1,
      name: p.name || `Module ${i + 1}`,
      level: levels[i % levels.length],
      duration: durations[i % durations.length],
      topics: Array.isArray(p.features) ? p.features : [p.name],
    }));
  }

  // Last resort: single generic module
  return [{
    id: 1,
    name: `${content.title} Core Training`,
    level: 'Foundation',
    duration: '4 Weeks',
    topics: ['Platform fundamentals', 'Configuration & setup', 'Enterprise integration', 'Best practices & production support'],
  }];
}

export default function DomainClient({ content }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [activeStream, setActiveStream] = useState(null);
  const [streamPage, setStreamPage] = useState(0);
  const streamContentRef = useRef(null);
  
  // [PROTECTED] Precision Auto-scroll Logic - DO NOT REMOVE OR MODIFY WITHOUT TESTING
  // This logic ensures perfect alignment with sticky headers on both Mobile & Desktop.
  // Breaks in this logic will cause inconsistent "jumping" during stream expansion.
  useEffect(() => {
    if (activeStream !== null && streamContentRef.current) {
      const isMobile = window.innerWidth < 768;
      
      // 350ms delay to allow AnimatePresence height transition to complete
      const timer = setTimeout(() => {
        const element = streamContentRef.current;
        if (!element) return; // guard: element may have unmounted before timer fires
        // Different offsets for perfect alignment:
        // Mobile: 56px header + 24px padding = 80px
        // Desktop: 64px header + 36px padding = 100px
        const offset = isMobile ? 80 : 100; 
        
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeStream]);

  const streamsPerPage = 6;
  const streams = content.streams || [];
  const totalStreamPages = Math.ceil(streams.length / streamsPerPage);
  const visibleStreams = streams.slice(streamPage * streamsPerPage, (streamPage + 1) * streamsPerPage);

  const curriculum = buildCurriculum(content);
  const { getDomainIcon } = require('@/lib/iconMap');
  const IconComponent = getDomainIcon(content.category);

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto bg-white scroll-smooth">
        {/* Dynamic Hero Section */}
        <div className="w-full text-white py-24 md:py-32 px-8 relative overflow-hidden flex items-center min-h-[500px]" style={{ background: 'linear-gradient(115deg, #000000 0%, #000000 55%, #18181b 55%, #18181b 100%)' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[120px]"
            style={{ backgroundColor: content.color }}
          />
          
          <div className="max-w-5xl relative z-10 mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full text-[13px] font-bold uppercase tracking-[0.15em] border backdrop-blur-md"
                style={{ color: content.color, borderColor: `${content.color}40`, backgroundColor: `${content.color}10` }}
              >
                <IconComponent size={16} /> {content.category}
              </div>
              
              <h1 className="text-[40px] md:text-[64px] font-bold tracking-tight mb-8 leading-[1.1] text-white">
                {content.title} <span className="block text-[0.6em] opacity-80">Online Training & Job Support</span>
              </h1>
              
              {/* SEO Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": `${content.title} Training & Job Support`,
                    "description": content.heroDescription,
                    "provider": {
                      "@type": "Organization",
                      "name": "GapAnchor",
                      "sameAs": "https://gapanchor.com"
                    },
                    "courseMode": "Online",
                    "occupationalCategory": content.category
                  })
                }}
              />

              <p className="text-[20px] md:text-[22px] text-[#A1A1A6] leading-relaxed max-w-3xl mb-12 font-light">
                {content.heroDescription}
              </p>
              
              <div className="flex gap-5 flex-wrap">
                <button 
                  onClick={() => document.getElementById('enroll-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#1D1D1F] px-10 py-4 rounded-full text-[16px] font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] border-none cursor-pointer"
                >
                  Book a Free Demo
                </button>
                <button 
                   onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                   className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full text-[16px] font-semibold hover:bg-white/5 transition-all cursor-pointer"
                >
                  View Curriculum
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8">
          {/* Section A: Enriched Overview */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="py-16 pb-12"
          >
            <div className="max-w-4xl">
              <div className="space-y-8">
                <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] tracking-tight">Mastering {content.title}: Training & Career Support</h2>
                {content.overviewParagraphs && content.overviewParagraphs.length > 0 ? (
                  content.overviewParagraphs.map((p, i) => (
                    <p key={i} className="text-[18px] text-[#424245] leading-relaxed font-normal">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-[18px] text-[#424245] leading-relaxed font-normal">
                    {content.about}
                  </p>
                )}
              </div>
            </div>
          </motion.section>

          {/* Streams — Clickable Cards with Expandable Content */}
          {streams.length > 0 && (
            <section className="py-12 pb-24 bg-white border-t border-[#D2D2D7]/30">
              <div className="max-w-6xl mx-auto">
                <div className="md:w-3/5">
                  <h2 className="text-[28px] md:text-[34px] font-bold text-[#1D1D1F] tracking-tight mb-4">Specialized Training Streams</h2>
                  <p className="text-[17px] text-[#424245] leading-relaxed mb-8">Select a module below to explore detailed curriculum and specialized job support options.</p>
                </div>
                {/* Pagination */}
                {totalStreamPages > 1 && (
                  <div className="flex items-center justify-end gap-3 mb-6">
                    <button
                      onClick={() => { setStreamPage(p => Math.max(0, p - 1)); setActiveStream(null); }}
                      disabled={streamPage === 0}
                      className="w-9 h-9 rounded-full border border-[#D2D2D7] bg-white flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[13px] text-[#86868B] font-mono tabular-nums">
                      {streamPage + 1}/{totalStreamPages}
                    </span>
                    <button
                      onClick={() => { setStreamPage(p => Math.min(totalStreamPages - 1, p + 1)); setActiveStream(null); }}
                      disabled={streamPage >= totalStreamPages - 1}
                      className="w-9 h-9 rounded-full border border-[#D2D2D7] bg-white flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={streamPage}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {visibleStreams.map((stream, i) => {
                      const globalIdx = streamPage * streamsPerPage + i;
                      const isActive = activeStream === globalIdx;
                      const accentColor = content.color || '#2563eb';
                      return (
                        <button
                          key={`stream-${globalIdx}`}
                          onClick={() => setActiveStream(isActive ? null : globalIdx)}
                          className={cn(
                            "relative rounded-2xl p-5 text-left transition-all duration-300 border-2 cursor-pointer group",
                            isActive
                              ? "shadow-lg scale-[1.02]"
                              : "shadow-sm hover:shadow-md hover:scale-[1.01]"
                          )}
                          style={{
                            backgroundColor: isActive ? `${accentColor}08` : '#F8F9FA',
                            borderColor: isActive ? accentColor : 'transparent',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                              style={{ backgroundColor: `${accentColor}15` }}
                            >
                              <Box className="w-4 h-4" style={{ color: accentColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[13px] font-bold text-[#1D1D1F] leading-tight mb-0.5">
                                {stream.name}
                              </h4>
                              <p className="text-[11px] text-[#86868B] leading-tight line-clamp-1 opacity-70">
                                {stream.description}
                              </p>
                            </div>
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 shrink-0 mt-0.5 transition-transform duration-300",
                                isActive ? "rotate-180" : "text-[#86868B]"
                              )}
                              style={{ color: isActive ? accentColor : undefined }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Expanded Content Panel */}
                <AnimatePresence>
                  {activeStream !== null && streams[activeStream] && (
                      <motion.div
                        key={`content-${activeStream}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden mb-12"
                      >
                        <div
                          ref={streamContentRef}
                          className="mt-8 rounded-[2.5rem] border-2 overflow-hidden shadow-2xl shadow-black/5 scroll-mt-32"
                        style={{ borderColor: `${content.color || '#2563eb'}15` }}
                      >
                        {/* Header */}
                        <div
                          className="flex items-center justify-between px-10 py-8"
                          style={{ backgroundColor: `${content.color || '#2563eb'}05` }}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                              style={{ backgroundColor: 'white', border: `1px solid ${content.color || '#2563eb'}20` }}
                            >
                              <BookOpen className="w-6 h-6" style={{ color: content.color || '#2563eb' }} />
                            </div>
                            <div>
                              <p className="text-[12px] font-bold uppercase tracking-widest text-accent mb-1" style={{ color: content.color || '#2563eb' }}>Module Detailed Overview</p>
                              <h3 className="text-[28px] md:text-[32px] font-bold text-[#1D1D1F] tracking-tight">{streams[activeStream].name}</h3>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveStream(null)}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all bg-transparent border-none cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Article body */}
                        <div className="px-10 py-10 space-y-4 max-w-4xl bg-white">
                          {streams[activeStream].body ? (
                            streams[activeStream].body.map((paragraph, pi) => {
                              const isClientList = paragraph.includes('|');
                              const isClientIntro = paragraph.toLowerCase().includes('few of the clients');
                              
                              if (isClientList) {
                                const clients = paragraph.split('|').map(c => c.trim()).filter(Boolean);
                                return (
                                  <div key={pi} className="pt-6 pb-2">
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-60">
                                      {clients.map((client, ci) => (
                                        <span key={ci} className="text-[13px] font-black tracking-tighter text-[#1D1D1F] whitespace-nowrap">
                                          {client.replace('and many more.', '')}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <p key={pi} className={cn(
                                  "text-[15px] text-[#424245] leading-[1.6] font-normal",
                                  isClientIntro ? "text-[12px] font-bold uppercase tracking-widest text-[#86868B] mt-8 mb-2" : ""
                                )}>
                                  {paragraph}
                                </p>
                              );
                            })
                          ) : (
                            <p className="text-[16px] text-[#424245] leading-[1.8]">
                              {streams[activeStream].description}
                            </p>
                          )}
                          <div className="pt-4">
                            <Link
                              href="/book-demo"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold text-white no-underline transition-all hover:brightness-110"
                              style={{ backgroundColor: content.color || '#2563eb' }}
                            >
                              Book a Free Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* Section B: Curriculum Section */}
          <section id="curriculum" className="py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <div>
                <h2 className="text-[28px] md:text-[34px] font-bold text-[#1D1D1F] tracking-tight mb-3">Training Curriculum</h2>
                <p className="text-[17px] text-[#86868B] max-w-2xl">Standardized training paths from foundational to advanced mastery.</p>
              </div>
              
              {/* Layout Toggle UI */}
              <div className="flex p-1 bg-[#F5F5F7] rounded-xl border border-[#D2D2D7]/30 self-start">
                <button 
                  onClick={() => setViewMode('cards')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-bold transition-all",
                    viewMode === 'cards' ? "bg-white text-accent shadow-sm" : "text-[#86868B] hover:text-[#1D1D1F]"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" /> Cards
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-bold transition-all",
                    viewMode === 'table' ? "bg-white text-accent shadow-sm" : "text-[#86868B] hover:text-[#1D1D1F]"
                  )}
                >
                  <Table2 className="w-4 h-4" /> Table
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'cards' ? (
                <motion.div 
                  key="cards"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 gap-6"
                >
                  {curriculum.map((item) => (
                    <div 
                      key={item.id}
                      className="group relative bg-[#F5F5F7]/50 hover:bg-white rounded-[2rem] p-8 border border-[#D2D2D7]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 flex flex-col lg:flex-row gap-8 items-start lg:items-center"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[20px] font-black text-accent border border-[#D2D2D7]/40">
                        {item.id.toString().padStart(2, '0')}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[12px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                            {item.level}
                          </span>
                          <span className="text-[14px] text-[#86868B] font-medium flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {item.duration}
                          </span>
                        </div>
                        <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-4 group-hover:text-accent transition-colors">
                          {item.name}
                        </h3>
                        <div className="space-y-2 mb-6">
                          {(Array.isArray(item.topics) ? item.topics : item.topics.split(',')).map((topic, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[15px] text-[#424245]">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                              {typeof topic === 'string' ? topic.trim() : topic}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex-shrink-0 w-full lg:w-auto">
                        <Link 
                          href="/book-demo" 
                          className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-[#1D1D1F] text-white rounded-2xl text-[15px] font-bold hover:bg-black transition-colors no-underline"
                        >
                          Inquire now <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="table"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="overflow-x-auto rounded-[2rem] border border-[#D2D2D7]/30 shadow-sm"
                >
                  <table className="w-full border-collapse text-left bg-white">
                    <thead>
                      <tr className="bg-[#F5F5F7] border-b border-[#D2D2D7]/30">
                        <th className="px-8 py-6 text-[14px] font-bold text-[#1D1D1F] uppercase tracking-wider w-[80px]">ID</th>
                        <th className="px-8 py-6 text-[14px] font-bold text-[#1D1D1F] uppercase tracking-wider">Module Name & Details</th>
                        <th className="px-8 py-6 text-[14px] font-bold text-[#1D1D1F] uppercase tracking-wider w-[150px]">Level/Duration</th>
                        <th className="px-8 py-6 text-[14px] font-bold text-[#1D1D1F] uppercase tracking-wider w-[180px]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curriculum.map((item) => (
                        <tr key={item.id} className="border-b border-[#D2D2D7]/20 hover:bg-[#F5F5F7]/30 transition-colors">
                          <td className="px-8 py-8 align-top">
                            <span className="text-[18px] font-black text-[#86868B]">{item.id.toString().padStart(2, '0')}</span>
                          </td>
                          <td className="px-8 py-8 align-top">
                            <h4 className="text-[19px] font-bold text-[#1D1D1F] mb-3">{item.name}</h4>
                            <p className="text-[15px] text-[#424245] leading-relaxed mb-4 max-w-2xl">{item.detailedDesc || (Array.isArray(item.topics) ? item.topics.join(', ') : item.topics)}</p>
                            <div className="flex flex-wrap gap-2">
                              {(Array.isArray(item.topics) ? item.topics : item.topics.split(',')).map((tag, i) => (
                                <span key={i} className="text-[12px] text-[#6E6E73] bg-[#F5F5F7] px-2 py-1 rounded-md border border-[#D2D2D7]/30">{typeof tag === 'string' ? tag.trim() : tag}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-8 align-top">
                            <div className="flex flex-col gap-2">
                              <span className="text-[12px] font-bold uppercase tracking-wider text-accent">{item.level}</span>
                              <span className="text-[14px] text-[#86868B]">{item.duration}</span>
                            </div>
                          </td>
                          <td className="px-8 py-8 align-top">
                            <Link 
                              href="/book-demo" 
                              className="inline-flex items-center text-accent font-bold text-[15px] hover:gap-2 transition-all no-underline"
                            >
                              Inquire <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Section C: Features & Benefits */}
          <section className="py-20 bg-[#F5F5F7] -mx-8 px-16 rounded-[3rem] mb-20">
            <h2 className="text-[28px] md:text-[34px] font-bold text-[#1D1D1F] tracking-tight mb-12 text-center">Platform Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(content.benefits || content.features || curriculum.map(m => ({ title: m.name, desc: Array.isArray(m.topics) ? m.topics[0] : m.topics }))).map((benefit, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-[#D2D2D7]/20 shadow-sm hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1D1D1F] mb-3">{typeof benefit === 'string' ? benefit.split(':')[0] : benefit.title}</h4>
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed line-clamp-3">
                    {typeof benefit === 'string' ? benefit.split(':')[1] : benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section D: FAQ Section */}
          <section className="py-20 max-w-4xl mx-auto">
            <h2 className="text-[28px] md:text-[34px] font-bold text-[#1D1D1F] tracking-tight mb-10 flex items-center gap-3">
              <HelpCircle className="text-accent" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faqs?.map((faq, i) => (
                <div key={i} className="border-b border-[#D2D2D7]/40">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left bg-transparent border-none cursor-pointer group"
                  >
                    <span className="text-[18px] font-bold text-[#1D1D1F] group-hover:text-accent transition-colors">{faq.q}</span>
                    <ChevronDown className={cn("w-5 h-5 text-[#86868B] transition-transform duration-300", activeFaq === i ? "rotate-180 text-accent" : "")} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[17px] text-[#6E6E73] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
          
          {/* Section E: Trainer Spotlight */}
          {content.trainer && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-24 border-t border-[#D2D2D7]/30"
            >
              <div className="bg-white p-12 rounded-[3rem] border border-[#D2D2D7]/30 flex flex-col md:flex-row items-center gap-12">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-[#60a5fa] flex items-center justify-center text-white text-[48px] font-bold shadow-xl shadow-accent/20 shrink-0">
                  {content.trainer.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[13px] font-bold text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full border border-accent/10">Expert Lead</span>
                    <span className="text-[14px] text-[#86868B] font-medium flex items-center gap-1"><Award className="w-4 h-4" /> {content.trainer.experience} Experience</span>
                  </div>
                  <h3 className="text-[32px] font-bold text-[#1D1D1F] mb-4">Meet {content.trainer.name}</h3>
                  <p className="text-[18px] text-[#424245] leading-relaxed mb-6 max-w-2xl">
                    {content.trainer.bio}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {content.trainer.expertise?.map((skill, i) => (
                      <span key={i} className="px-4 py-1.5 bg-[#F5F5F7] text-[#1D1D1F] text-[14px] font-semibold rounded-full border border-[#D2D2D7]/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Related Paths */}
          <section className="py-24 border-t border-[#D2D2D7]/30 text-center">
            <p className="text-[14px] text-[#86868B] uppercase font-bold tracking-[0.2em] mb-8">Related Training Paths</p>
            <div className="flex flex-wrap justify-center gap-4">
              {content.relatedTraining?.map((path, i) => (
                <Link 
                  key={`related-${path}-${i}`} 
                  href={`/domains/${path.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-6 py-3 rounded-full border border-[#D2D2D7] text-[15px] font-medium text-[#1D1D1F] hover:bg-black hover:text-white transition-all no-underline"
                >
                  {path}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
