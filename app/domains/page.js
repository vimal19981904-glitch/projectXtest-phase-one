'use client';

import DomainGrid from '@/components/DomainGrid';
import PageTransition from '@/components/PageTransition';

export default function DomainsIndex() {
  return (
    <PageTransition>
      <div className="bg-[#F5F5F7] min-h-screen pt-20">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <h1 className="text-[40px] md:text-[56px] font-black text-text-primary tracking-tight mb-4">
            Our Training <span className="text-accent">Domains</span>
          </h1>
          <p className="text-[19px] text-text-secondary max-w-2xl mb-12 font-light">
            Expert-led instruction across 60+ niche IT domains. Select a category below to explore specific job support and training modules.
          </p>
          
          <DomainGrid />
        </div>
      </div>
    </PageTransition>
  );
}
