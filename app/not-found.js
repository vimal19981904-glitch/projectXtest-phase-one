'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[120px] font-black text-accent/10 select-none">404</span>
        <h1 className="text-[32px] md:text-[44px] font-bold text-text-primary mt-[-40px] mb-6">
          Lost in Knowledge?
        </h1>
        <p className="text-[16px] text-text-secondary max-w-[460px] mx-auto mb-12 font-light">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track with our training programs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="btn-primary px-8 py-4 rounded-full flex items-center gap-2 no-underline"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link 
            href="/book-demo" 
            className="btn-secondary px-8 py-4 rounded-full flex items-center gap-2 no-underline"
          >
            <MessageSquare className="w-5 h-5" />
            Book a Demo
          </Link>
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent/5 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-pulse delay-1000" />
    </div>
  );
}
