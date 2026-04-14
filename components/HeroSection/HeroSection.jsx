'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AvatarNetwork from './AvatarNetwork';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center animate-pulse rounded-full" style={{ background: 'radial-gradient(circle, #0f2040 60%, transparent 100%)' }} />
});

// Globe container size (px) at various breakpoints
const GLOBE_CONTAINER = 600;

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center"
      style={{
        background: 'linear-gradient(135deg, #060d1b 0%, #0d1a2e 40%, #0f2040 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Background ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-8%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-8%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* ── Main Content Grid ── */}
      <div
        className="hero-grid relative z-10 w-full mx-auto"
        style={{
          maxWidth: 1400,
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: Text ── */}
        <div className="flex flex-col items-start" style={{ zIndex: 20 }}>
          {/* Badge */}
          <div
            className="text-[#94a3b8] text-[11px] font-semibold tracking-[0.15em] uppercase mb-8"
            style={{
              border: '1px solid rgba(79,70,229,0.35)',
              borderRadius: 999,
              padding: '5px 14px',
              background: 'rgba(30,41,59,0.5)',
              backdropFilter: 'blur(6px)',
            }}
          >
            Over 100+ Professional Domains
          </div>

          {/* H1 */}
          <h1
            className="text-white font-bold leading-[1.08] tracking-tight m-0 mb-6"
            style={{ fontSize: 'clamp(32px, 3.8vw, 60px)' }}
          >
            Build Your Career with<br />
            Global IT Leaders:<br />
            <span style={{ color: '#38bdf8' }}>
              From Foundation to<br />On-the-Job Mastery
            </span>
          </h1>

          {/* Sub text */}
          <p
            className="text-[#94a3b8] leading-relaxed mb-10"
            style={{ fontSize: 'clamp(15px, 1.1vw, 18px)', maxWidth: 480 }}
          >
            Connect with active IT professionals. Get real-world training and
            on-the-job support across all major enterprise technologies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/domains"
              className="text-[#0f172a] font-bold no-underline flex items-center gap-2 transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: '#ffffff',
                borderRadius: 999,
                padding: '13px 28px',
                fontSize: 15,
                boxShadow: '0 4px 24px rgba(255,255,255,0.12)',
              }}
            >
              Explore Training Programs
            </Link>

            <Link
              href="/job-support"
              className="text-white font-medium no-underline flex items-center gap-2 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.22)',
                borderRadius: 999,
                padding: '12px 26px',
                fontSize: 15,
              }}
            >
              Get Job Support
              {/* Chat icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </div>

          {/* Footer sub-text */}
          <p
            className="hidden md:block text-[#475569] leading-relaxed mt-10 mb-0"
            style={{ fontSize: 13, maxWidth: 500 }}
          >
            Connect with active IT professionals. Get real-world training and
            on-the-job support across all major enterprise technologies.
          </p>
        </div>

        {/* ── RIGHT: Globe + Avatars + Network ── */}
        <div
          className="globe-wrapper relative flex items-center justify-center w-full"
          style={{ height: 600 }}
        >
          {/* 
            Fixed 600x600 coordinate space for all 3D and Overlay elements.
            This ensures concentric alignment between the 3D globe and the Avatar ring.
          */}
          <div 
            className="relative w-[600px] h-[600px] flex items-center justify-center"
            style={{ transform: 'scale(var(--globe-scale, 1))', transformOrigin: 'center center' }}
          >
            {/* 3D Globe Layer */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
              <GlobeCanvas />
            </div>

            {/* Avatar & Mesh Layer */}
            <AvatarNetwork />
          </div>
        </div>
      </div>

      {/* Responsive overrides via a style tag */}
      <style>{`
        @media (max-width: 1199px) {
          .hero-grid { grid-template-columns: 45% 55% !important; }
          .globe-wrapper { --globe-scale: 0.9; }
        }
        @media (max-width: 767px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            padding: 80px 20px 40px 20px !important; 
            text-align: center;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid .flex-wrap {
            justify-content: center !important;
          }
          .globe-wrapper { 
            height: 380px !important; 
            --globe-scale: 0.65;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 480px) {
          .globe-wrapper { --globe-scale: 0.55; height: 320px !important; }
          h1 { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
}
