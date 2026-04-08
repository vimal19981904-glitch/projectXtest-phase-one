'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import EmailGateModal from '@/components/EmailGateModal';
import HeroDark from '@/components/HeroDark';
import DomainGrid from '@/components/DomainGrid';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Activity } from 'lucide-react';
import ParallaxCard from '@/components/ParallaxCard';

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

export default function HomeContent() {
  const [tab, setTab] = useState('Trending');
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [gatedContent, setGatedContent] = useState(null);

  const handleGatedClick = (type) => {
    setGatedContent(type);
    setEmailGateOpen(true);
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <HeroDark />

      {/* ========== TRUST BAR ========== */}
      <section className="bg-white py-12 border-b border-border/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          {/* Reviews */}
          <div className="flex flex-col sm:flex-row items-center gap-10">
            {[
              { name: 'Google', stars: 5 },
              { name: 'Course Report', stars: 5 },
              { name: 'Trustpilot', stars: 5 },
            ].map((r) => (
              <motion.div 
                key={r.name} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[14px] font-bold text-text-primary tracking-tight">{r.name}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-[16px] ${i < r.stars ? 'star' : 'text-border'}`}>★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Company logos */}
          <div className="flex items-center gap-6">
            <span className="text-[14px] text-text-secondary font-medium italic">Trusted by industry leaders</span>
            <div className="flex items-center gap-8">
              {['Infosys', 'Gartner', 'Pfizer', 'TCS'].map((c) => (
                <span key={c} className="text-[18px] font-black text-text-primary/40 tracking-tighter hover:text-accent transition-colors cursor-default">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="bg-secondary-bg py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { num: '500+', label: 'Happy Clients', icon: <Users className="w-8 h-8 text-accent" /> },
            { num: '100%', label: 'Satisfaction', icon: <CheckCircle className="w-8 h-8 text-accent" /> },
            { num: '24/7', label: 'Support', icon: <Activity className="w-8 h-8 text-accent" /> },
          ].map((s) => (
            <motion.div key={s.label} variants={itemVariants}>
              <ParallaxCard className="apple-card p-10 text-center flex flex-col items-center justify-center h-full group hover:shadow-xl transition-all duration-500">
                <div className="mb-6 p-4 rounded-2xl bg-accent/5 group-hover:bg-accent/10 transition-colors transform group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <p className="text-[36px] font-black text-text-primary mb-2 tracking-tighter">{s.num}</p>
                <p className="text-[15px] text-text-secondary font-medium uppercase tracking-widest">{s.label}</p>
              </ParallaxCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== COURSES ========== */}
      <DomainGrid />

      {/* ========== SERVICE CARDS ========== */}
      <section className="bg-secondary-bg py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[34px] md:text-[44px] font-black text-text-primary mb-16 tracking-tight"
          >
            Our <span className="text-accent underline decoration-accent/20 underline-offset-8">Support</span> Plans
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[900px] mx-auto"
          >
            {/* Monthly Plan */}
            <motion.div variants={itemVariants}>
              <ParallaxCard className="h-full">
                <div className="apple-card p-10 text-left h-full border border-border/50 hover:border-accent/40 transition-colors">
                  <div className="w-[56px] h-[56px] bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </div>
                  <h3 className="text-[24px] font-bold text-text-primary mb-4">Monthly Plan</h3>
                  <p className="text-[16px] text-text-secondary leading-relaxed font-light mb-8">
                    Daily 1–2 hours of expert support. Get consistent guidance from working professionals who understand real-world challenges.
                  </p>
                  <button onClick={() => handleGatedClick('pricing')} className="btn-primary w-full py-4 !text-[16px] font-bold rounded-2xl shadow-lg shadow-accent/25">
                    Request Pricing
                  </button>
                </div>
              </ParallaxCard>
            </motion.div>

            {/* Task-Based */}
            <motion.div variants={itemVariants}>
              <ParallaxCard className="h-full">
                <div className="apple-card p-10 text-left h-full border border-border/50 hover:border-accent/40 transition-colors">
                  <div className="w-[56px] h-[56px] bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-[24px] font-bold text-text-primary mb-4">Task-Based Plan</h3>
                  <p className="text-[16px] text-text-secondary leading-relaxed font-light mb-8">
                    Specific assignment or task help. Pay per task and get expert assistance for your immediate project needs.
                  </p>
                  <button onClick={() => handleGatedClick('pricing')} className="btn-primary w-full py-4 !text-[16px] font-bold rounded-2xl shadow-lg shadow-accent/25">
                    Request Pricing
                  </button>
                </div>
              </ParallaxCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== BOOKING FORM ========== */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <BookingForm />
        </div>
      </section>

      {/* ========== EMAIL GATE MODAL ========== */}
      {emailGateOpen && (
        <EmailGateModal
          onClose={() => setEmailGateOpen(false)}
          onSuccess={(email) => {
            setEmailGateOpen(false);
            if (gatedContent === 'syllabus') {
              window.location.href = '/manhattan-wms?unlocked=true';
            }
          }}
        />
      )}
    </>
  );
}
