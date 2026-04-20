'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookieConsent() {
  const { consent, acceptAll, acceptEssential } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner after 1.5s delay if consent is not set
    if (consent === 'not-set') {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (consent !== null) {
      setShowBanner(false);
    }
  }, [consent]);

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[10000] w-full"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-[#060d1f]/95 backdrop-blur-md border-t border-[rgba(74,158,255,0.15)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-3 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Content */}
              <div className="flex flex-col gap-1 text-center md:text-left">
                <h3 className="text-white text-[15px] font-bold m-0 leading-tight">
                  We use cookies to improve your experience
                </h3>
                <p className="text-[rgba(255,255,255,0.6)] text-[13px] m-0 max-w-[800px] leading-relaxed">
                  GapAnchor uses cookies to analyze site traffic, personalize 
                  content, and support our IT consulting network features. 
                  By accepting, you help us improve how consultants and 
                  practitioners connect on our platform.{' '}
                  <Link href="/cookie-policy" className="text-[#4a9eff] hover:underline font-medium">
                    Cookie Policy
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={acceptEssential}
                  className="flex-1 md:flex-none px-5 py-2 rounded-[8px] text-[#4a9eff] border border-[rgba(74,158,255,0.2)] text-[14px] font-semibold hover:bg-[#4a9eff]/5 transition-all whitespace-nowrap"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 md:flex-none px-5 py-2 rounded-[8px] bg-[#4a9eff] text-white text-[14px] font-semibold hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(74,158,255,0.3)] whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
