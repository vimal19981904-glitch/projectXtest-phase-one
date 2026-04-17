'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition - wraps content with an 'Apple-style' ease-out lifting transition.
 * @param children - content to wrap.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut"
        }}
        className="w-full h-full min-h-screen relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
