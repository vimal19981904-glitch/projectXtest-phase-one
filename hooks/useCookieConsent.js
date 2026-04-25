'use client';

import { useState, useEffect } from 'react';

export function useCookieConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setConsent(savedConsent);
    } else {
      setConsent('not-set');
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setConsent('all');
    // Dispatch custom event for analytics to listen to
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setConsent('essential');
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  const declineAll = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setConsent('declined');
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  return { consent, acceptAll, acceptEssential, declineAll };
}
