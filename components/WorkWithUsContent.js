'use client';

import BookingForm from '@/components/BookingForm';
import Link from 'next/link';

import { getDomainIcon, ICON_PROPS } from '@/lib/iconMap';

const courseCategories = [
  { name: 'AI & Machine Learning', category: 'AI & Machine Learning' },
  { name: 'Cloud & Infrastructure', category: 'Cloud & Infrastructure' },
  { name: 'ERP & Supply Chain', category: 'ERP & Supply Chain' },
  { name: 'Data & Analytics', category: 'Data & Analytics' },
  { name: 'DevOps & Automation', category: 'DevOps & Automation' },
  { name: 'Cybersecurity', category: 'Cybersecurity' },
];

export default function WorkWithUsContent() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-[#000000]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-hero-text">
            <div className="flex items-center gap-2 text-[13px] text-hero-text/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors no-underline text-hero-text/50">Home</Link>
              <span>/</span>
              <span className="text-hero-text/80">Work With Us</span>
            </div>

            <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5">
              Corporate{' '}
              <span className="text-[#38bdf8]">Training</span> &{' '}
              <br className="hidden md:block" />
              Talent <span className="text-[#38bdf8]">Solutions</span>
            </h1>
            <p className="text-[17px] text-hero-text/70 mb-8 max-w-[480px]">
              GapAnchor offers comprehensive upskilling and talent solutions to organizations across the globe — small to big and across various industries.
            </p>
            <a href="#contact" className="btn-white">
              Connect with us
            </a>
          </div>

          {/* Right illustration */}
          <div className="md:w-1/2 flex justify-center">
            <svg width="380" height="300" viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Corporate training scene */}
              {/* Whiteboard */}
              <rect x="120" y="60" width="160" height="110" rx="6" fill="#2D2D30" stroke="#555" strokeWidth="1" />
              <rect x="130" y="70" width="140" height="90" rx="3" fill="#F5F5F7" opacity="0.1" />
              {/* Chart on whiteboard */}
              <rect x="145" y="110" width="15" height="40" rx="2" fill="#0071E3" opacity="0.7" />
              <rect x="168" y="95" width="15" height="55" rx="2" fill="#34C759" opacity="0.7" />
              <rect x="191" y="100" width="15" height="50" rx="2" fill="#FF9500" opacity="0.7" />
              <rect x="214" y="85" width="15" height="65" rx="2" fill="#FF3B30" opacity="0.7" />
              {/* Trend line */}
              <polyline points="152,105 175,90 198,95 221,80" stroke="#F5F5F7" strokeWidth="2" fill="none" opacity="0.6" />
              {/* People */}
              <circle cx="140" cy="210" r="18" fill="#F5F5F7" opacity="0.7" />
              <rect x="126" y="232" width="28" height="35" rx="7" fill="#0071E3" opacity="0.5" />
              <circle cx="200" cy="220" r="18" fill="#F5F5F7" opacity="0.7" />
              <rect x="186" y="242" width="28" height="35" rx="7" fill="#FF3B30" opacity="0.5" />
              <circle cx="260" cy="210" r="18" fill="#F5F5F7" opacity="0.7" />
              <rect x="246" y="232" width="28" height="35" rx="7" fill="#34C759" opacity="0.5" />
              {/* Video play icons */}
              <circle cx="300" cy="80" r="16" fill="#FF3B30" opacity="0.8" />
              <polygon points="296,72 296,88 308,80" fill="white" />
              <circle cx="320" cy="120" r="12" fill="#FF3B30" opacity="0.6" />
              <polygon points="317,114 317,126 326,120" fill="white" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== STATS ROW ========== */}
      <section className="bg-white py-12 border-b border-border/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[28px] font-bold text-text-primary mb-1">200+ Happy Corporates</p>
            <p className="text-[14px] text-text-secondary max-w-[360px]">
              Exceptional feedback from our global learners made us #1 learning platform.
            </p>
          </div>
          <div className="flex gap-10">
            {[
              { score: '4.5', name: 'SwitchUp' },
              { score: '4.7', name: 'TrustPilot' },
              { score: '4.8', name: 'Course Report' },
            ].map((r) => (
              <div key={r.name} className="text-center">
                <p className="text-[24px] font-bold text-text-primary mb-1">{r.score}</p>
                <p className="text-[13px] text-text-secondary mb-1">{r.name}</p>
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="star text-[14px]">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW WE EMPOWER ========== */}
      <section className="bg-secondary-bg py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[28px] md:text-[34px] font-bold text-center mb-3">
            How we&apos;ll <span className="text-accent">empower</span> your teams?
          </h2>
          <p className="text-[15px] text-text-secondary text-center mb-10">
            Comprehensive training across cutting-edge technology domains
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseCategories.map((cat) => {
              const Icon = getDomainIcon(cat.category);
              return (
                <div key={cat.name} className="apple-card p-10 text-center flex flex-col items-center">
                  <div className="mb-6 p-4 rounded-2xl bg-accent/5 text-accent">
                    <Icon {...ICON_PROPS} size={32} />
                  </div>
                  <h3 className="text-[18px] font-bold text-text-primary mb-2">{cat.name}</h3>
                  <p className="text-[14px] text-text-secondary mb-4 font-light">Industry-standard curriculum with expert mentors.</p>
                  <p className="text-[13px] text-accent font-bold tracking-wider uppercase">View Programs</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ========== CONTACT FORM ========== */}
      <section id="contact" className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <BookingForm defaultService="Training" />
        </div>
      </section>


    </>
  );
}
