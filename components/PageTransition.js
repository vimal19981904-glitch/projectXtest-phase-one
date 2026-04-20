'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition - wraps content with a smooth cross-fade transition.
 * Uses mode="wait" so the exit animation completes before the new page enters.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ 
          duration: 0.35, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="w-full h-full min-h-screen relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
