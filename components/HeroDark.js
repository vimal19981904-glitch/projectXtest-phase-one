'use client';

import Link from 'next/link';
import { domainData } from '@/lib/domainData';

export default function HeroDark() {
  // Flatten categories into a single list for the ticker
  const allDomains = domainData.map(d => `${d.icon} ${d.category}`);
  // Double the list for seamless infinite scroll
  const tickerItems = [...allDomains, ...allDomains, ...allDomains, ...allDomains];

  return (
    <section className="relative w-full bg-[#0a0f1a] overflow-hidden min-h-[600px] flex flex-col justify-center pt-16">
      
      {/* Background Graphic Element - replacing actual photo with a high quality abstract pattern for now */}
      <div 
        className="absolute top-0 right-0 w-full md:w-[60%] h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(0, 113, 227, 0.4) 0%, rgba(10, 15, 26, 0) 70%)'
        }}
      />
      <div className="absolute top-0 right-0 w-full h-[150%] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 0 L100 0 L100 100 L20 100 Z" fill="rgba(255,255,255,0.01)" />
          <path d="M70 0 L100 0 L100 100 L40 100 Z" fill="rgba(0,113,227,0.02)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-20 md:py-32">
        <div className="md:w-[60%] lg:w-[50%] flex flex-col items-start gap-6">
          <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[12px] font-semibold tracking-wide uppercase">
            Over 100+ Professional Domains
          </div>
          
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.05] tracking-tight text-white m-0">
            Train for the Project That Changes Your Course
          </h1>
          
          <p className="text-[17px] md:text-[19px] leading-relaxed text-[#86868B] max-w-[480px]">
            Connect with active IT professionals. Get real-world training and on-the-job support across all major enterprise technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link 
              href="/domains" 
              className="bg-white hover:bg-white/90 text-[#1D1D1F] px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all shadow-lg w-full sm:w-auto text-center"
            >
              Explore Project Training
            </Link>
            <Link 
              href="/job-support" 
              className="bg-transparent border-[1.5px] border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold text-[15px] transition-all w-full sm:w-auto text-center"
            >
              Get Job Support
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Ticker Strip at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-[#131924] border-t border-white/5 py-3 overflow-hidden">
        <div className="w-full flex whitespace-nowrap overflow-hidden">
          <div 
            className="flex gap-8 px-4 items-center whitespace-nowrap will-change-transform"
            style={{ 
              animation: 'marquee 60s linear infinite',
              minWidth: '200%'
            }}
          >
            {tickerItems.map((item, index) => (
              <div key={index} className="flex items-center gap-8">
                <span className="text-[14px] text-white/50 font-medium tracking-wide">
                  {item}
                </span>
                <span className="text-white/20 text-[10px]">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
