'use client';

import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, ShieldCheck, Clock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

export default function BookDemoPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-secondary-bg pt-[100px] pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors no-underline mb-12 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[15px] font-medium">Back to Home</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-[40px] md:text-[56px] font-black text-text-primary mb-8 tracking-tight leading-[1.1]">
                Book Your <span className="text-accent">Demo</span> Session
              </h1>
              <p className="text-[18px] text-text-secondary leading-relaxed mb-12 font-light max-w-[500px]">
                Get a personalized walkthrough of our training platform and on-job support services. Our experts will help you choose the right path for your career.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Calendar, title: "Flexible Scheduling", desc: "Choose a time that works best for your time zone and work hours." },
                  { icon: ShieldCheck, title: "Expert Guidance", desc: "Meet with senior industry professionals who understand your technical challenges." },
                  { icon: Clock, title: "Quick Turnaround", desc: "Get your demo scheduled within 24 hours of your request." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-text-primary mb-1">{item.title}</h3>
                      <p className="text-[15px] text-text-secondary font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border/30"
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
