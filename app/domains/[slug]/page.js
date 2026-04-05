'use client';

import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import { domainContentMap } from '@/lib/domainContentMap';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import ParallaxCard from '@/components/ParallaxCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


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

export default function DomainContentPage({ params }) {
  const { slug } = use(params);
  const content = domainContentMap[slug];

  if (!content) {
    notFound();
  }

  // Base64 blur placeholder (pixelated 8x8 white/gray)
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmSBTwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP4//8/AwMDEwMDAwMDE0R0ZKT///8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0DA0MDAwMDAxMDAxMDAwMDAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0DAwMDE0f8RFR8v80+oMAAAAASUVORK5CYII=";

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto">
        {/* Dynamic Hero Section */}
        <div className="bg-[#1D1D1F] text-white py-32 px-8 relative overflow-hidden flex items-center min-h-[500px]">
          {/* Animated Background Depth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[120px]"
            style={{ backgroundColor: content.color }}
          />
          
          <div className="max-w-4xl relative z-10 mx-auto w-full">
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
              
              <h1 className="text-[48px] md:text-[72px] font-bold tracking-tight mb-8 leading-[1.05] text-white">
                {content.title}
              </h1>
              
              <p className="text-[22px] md:text-[24px] text-[#A1A1A6] leading-relaxed max-w-2xl mb-12 font-light">
                {content.heroDescription}
              </p>
              
              <div className="flex gap-5 flex-wrap">
                <Link 
                  href="/book-demo" 
                  className="bg-white text-[#1D1D1F] px-10 py-4 rounded-full text-[16px] font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] no-underline"
                >
                  Get Support Now
                </Link>
                <Link 
                   href="/domains"
                   className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full text-[16px] font-semibold hover:bg-white/5 transition-all no-underline"
                >
                  Explore Courses
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Animation Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="p-8 py-24 max-w-6xl mx-auto"
        >
          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-center">
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-8 tracking-tight">Professional On-Job Expertise</h2>
              <p className="text-[19px] text-[#6E6E73] leading-relaxed font-light mb-6">
                {content.about}
              </p>
              <div className="flex items-center gap-2 text-[#0071E3] font-bold group cursor-pointer">
                Learn more about our methodology <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <ParallaxCard className="bg-[#F5F5F7] p-10 rounded-[2.5rem] border border-[#D2D2D7]/30 shadow-sm">
                <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-8 flex items-center gap-3">
                  <ShieldCheck className="text-[#34C759] w-7 h-7" /> The Project X Advantage
                </h3>
                <ul className="space-y-6 m-0 p-0 list-none">
                  {[
                    { icon: Clock, text: "Real-time resolution for production outages" },
                    { icon: Users, text: "Direct access to Senior implementation leaders" },
                    { icon: CheckCircle2, text: "End-to-end technical task ownership" }
                  ].map((adv, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <adv.icon className="w-6 h-6 text-[#0071E3] flex-shrink-0 mt-0.5" />
                      <span className="text-[16px] text-[#424245] font-medium leading-snug">{adv.text}</span>
                    </li>
                  ))}
                </ul>
              </ParallaxCard>
            </motion.div>
          </div>

          {/* Features Grid - Staggered */}
          <div className="mb-32">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-12 text-center tracking-tight">Services & Support Scope</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {content.features.map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <ParallaxCard className="h-full">
                    <div className="border border-[#D2D2D7]/50 rounded-[2rem] p-10 bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all flex flex-col h-full group">
                       <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 bg-[#F5F5F7] group-hover:bg-[#0071E3]/10 transition-colors" style={{ color: content.color }}>
                         <CheckCircle2 className="w-6 h-6 transition-transform group-hover:scale-110" />
                       </div>
                       <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-4">{feature.title}</h3>
                       <p className="text-[17px] text-[#6E6E73] leading-relaxed font-light">{feature.desc}</p>
                    </div>
                  </ParallaxCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing/Plans */}
          <div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-16 text-center tracking-tight">Flexible Support Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {content.plans.map((plan, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <ParallaxCard className="h-full">
                    <div className={cn(
                      "rounded-[2.5rem] p-12 h-full flex flex-col",
                      idx === 0 ? 'bg-[#1D1D1F] text-white shadow-2xl' : 'bg-white border border-[#D2D2D7] text-[#1D1D1F]'
                    )}>
                      <h3 className="text-[24px] font-bold mb-3">{plan.name}</h3>
                      <div className={cn(
                        "text-[40px] font-bold mb-10 tracking-tight",
                        idx === 0 ? 'text-[#34C759]' : 'text-[#0071E3]'
                      )}>
                        {plan.price}
                      </div>
                      
                      <ul className="space-y-5 mb-12 m-0 p-0 list-none flex-1">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle2 className={cn("w-6 h-6 flex-shrink-0 mt-0.5", idx === 0 ? 'text-[#34C759]' : 'text-[#0071E3]')} />
                            <span className={cn("text-[16px] font-medium opacity-80", idx === 0 ? 'text-white/80' : 'text-[#6E6E73]')}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        href="/book-demo"
                        className={cn(
                          "block w-full py-5 rounded-full text-center text-[16px] font-bold transition-all shadow-md no-underline",
                          idx === 0 
                            ? 'bg-white text-[#1D1D1F] hover:bg-[#F5F5F7]' 
                            : 'bg-[#1D1D1F] text-white hover:bg-black transition-colors'
                        )}
                      >
                        Start Your Support Journey
                      </Link>
                    </div>
                  </ParallaxCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
