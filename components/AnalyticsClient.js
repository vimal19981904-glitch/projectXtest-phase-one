'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';

export default function AnalyticsClient() {
  useEffect(() => {
    // Initial check
    initAnalytics();

    // Listen for consent updates
    const handleConsentUpdate = () => {
      initAnalytics();
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  return null;
}
