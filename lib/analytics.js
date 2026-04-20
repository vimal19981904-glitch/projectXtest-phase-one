/**
 * Analytics Utility for GapAnchor
 * Handles consent-gated tracking initialization.
 */

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  const consent = localStorage.getItem('cookieConsent');
  
  if (consent !== 'all') {
    console.log('Analytics skipped: Consent not granted.');
    return;
  }

  // Example: Initialize Google Analytics or GTM
  // Replace with actual GA4 ID
  const GA_ID = 'G-XXXXXXXXXX'; 

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, {
    page_path: window.location.pathname,
  });

  // Google Consent Mode v2 compatibility
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });

  console.log('Analytics initialized successfully.');
};

export const trackEvent = (eventName, params) => {
  if (typeof window !== 'undefined' && localStorage.getItem('cookieConsent') === 'all' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};
