'use client';

import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, ChevronDown, ChevronRight, HelpCircle, BookOpen, Star, Mail, LayoutGrid, Table2, Award } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import ParallaxCard from '@/components/ParallaxCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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

  const curriculum = buildCurriculum(content);

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto bg-white">
        {/* Dynamic Hero Section */}
        <div className="text-white py-24 md:py-32 px-8 relative overflow-hidden flex items-center min-h-[500px]" style={{ background: 'linear-gradient(115deg, #000000 0%, #000000 55%, #18181b 55%, #18181b 100%)' }}>
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
                {content.icon} {content.category}
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
                <Link 
                  href="/book-demo" 
                  className="bg-white text-[#1D1D1F] px-10 py-4 rounded-full text-[16px] font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] no-underline"
                >
                  Book a Free Demo
                </Link>
                <Link 
                   href="#curriculum"
                   className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full text-[16px] font-semibold hover:bg-white/5 transition-all no-underline"
                >
                  View Curriculum
                </Link>
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
            className="py-24 border-b border-[#D2D2D7]/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-8 space-y-8">
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
              
              <div className="lg:col-span-4 sticky top-24">
                <ParallaxCard className="bg-[#F5F5F7] p-8 rounded-[2rem] border border-[#D2D2D7]/30">
                  <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-6 flex items-center gap-2">
                    <Star className="text-[#FF9500] w-5 h-5 fill-[#FF9500]" /> Career Impact
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#D2D2D7]/20">
                      <p className="text-[13px] text-[#86868B] uppercase font-bold tracking-wider mb-1">Average Salary</p>
                      <p className="text-[24px] font-bold text-[#1D1D1F] tracking-tight">$95,000 - $145,000</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#D2D2D7]/20">
                      <p className="text-[13px] text-[#86868B] uppercase font-bold tracking-wider mb-1">Market Demand</p>
                      <p className="text-[24px] font-bold text-[#34C759] tracking-tight">High Velocity</p>
                    </div>
                    <button className="w-full btn-primary py-4 rounded-2xl shadow-lg shadow-[#0071E3]/20">
                      Get Career Consultation
                    </button>
                  </div>
                </ParallaxCard>
              </div>
            </div>
          </motion.section>

          {/* Section B: Curriculum Section */}
          <section id="curriculum" className="py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-[32px] md:text-[42px] font-bold text-[#1D1D1F] tracking-tight mb-4">Course Curriculum</h2>
                <p className="text-[19px] text-[#86868B] max-w-2xl">Standardized training paths from foundational to advanced mastery.</p>
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
                          {Array.isArray(item.topics) ? (
                             item.topics.map((topic, idx) => (
                               <div key={idx} className="flex items-center gap-2 text-[15px] text-[#424245]">
                                 <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                 {topic}
                               </div>
                             ))
                          ) : (
                            item.topics.split(',').map((topic, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[15px] text-[#424245]">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                {topic.trim()}
                              </div>
                            ))
                          )}
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
          <section className="py-24 bg-[#F5F5F7] -mx-8 px-16 rounded-[4rem] mb-24">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] tracking-tight mb-16 text-center">Platform Benefits</h2>
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
          <section className="py-24 max-w-4xl mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] tracking-tight mb-12 flex items-center gap-3">
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
