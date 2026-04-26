/**
 * ============================================================
 *  ✅ LOCKED — DO NOT MODIFY — APPROVED BY USER 2026-04-26
 * ============================================================
 *  Logo component — GapAnchor wordmark
 *
 *  APPROVED DESIGN:
 *  - Font: 'Century Gothic' (Windows) → 'Josefin Sans' (mobile fallback)
 *  - "Gap" + "nchor" → solid #1A2332 (dark variant: #FFFFFF)
 *  - "A" → diagonal gradient: #00C2FF → #7B5EA7 → #00C2FF (135deg)
 *  - Hover → gradient "breathes" in 1.8s ease loop (colorshift-logo)
 *  - Underline glow: cyan→purple shimmer slides in on hover
 *
 *  DO NOT change colors, fonts, animations, or layout without
 *  EXPLICIT instruction from the user.
 * ============================================================
 */
import React from 'react';

export default function Logo({ variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <>
      <style>{`
        .logo-wrapper {
          width: 340px;
          display: flex;
          align-items: center;
        }

        .logo-container {
          transform: scale(0.55);
          transform-origin: left center;
          white-space: nowrap;
          display: inline-flex; align-items: center; gap: 22px;
          padding: 10px 0; background: transparent;
          cursor: pointer; user-select: none;
          position: relative;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .logo-wrapper { width: 140px; }
          .logo-container { transform: scale(0.40); gap: 12px; }
          .sep, .tagline { display: none !important; }
        }

        /* Glow underline — blue → purple, appears on hover */
        .glow-line {
          position: absolute;
          bottom: 0px; left: 0px;
          width: 0%; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #00C2FF, #7B5EA7, #00C2FF);
          background-size: 200% 100%;
          opacity: 0;
          transition: width 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
        }
        .logo-container:hover .glow-line {
          width: 45%; opacity: 1;
          animation: shimmer-logo 2s linear infinite;
        }
        @keyframes shimmer-logo {
          0%   { background-position: 0% 50% }
          100% { background-position: 200% 50% }
        }

        /* Full wordmark — Century Gothic on Windows, Josefin Sans on mobile */
        .wordmark {
          font-family: 'Century Gothic', var(--font-josefin), 'Josefin Sans', 'Trebuchet MS', sans-serif;
          font-size: 50px;
          font-weight: 700;
          letter-spacing: -1px;
          display: inline-flex;
          align-items: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* "Gap" and "nchor" — solid dark navy */
        .w-dark {
          color: ${isDark ? '#FFFFFF' : '#1A2332'};
        }

        /* "A" — diagonal cyan→purple→cyan gradient, exact user spec */
        .w-multi {
          background: linear-gradient(135deg, #00C2FF 0%, #7B5EA7 50%, #00C2FF 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* On hover: the gradient breathes (slow 1.8s loop, not flashing) */
        .logo-container:hover .w-multi {
          animation: colorshift-logo 1.8s ease infinite;
        }
        @keyframes colorshift-logo {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Separator line */
        .sep {
          width: 1.5px; height: 36px;
          background: #DDDDDD; flex-shrink: 0;
          transition: background 0.4s ease;
        }
        .logo-container:hover .sep { background: #7B5EA7; }

        /* Tagline */
        .tagline {
          font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 15px; font-weight: 700;
          color: #AAAAAA; letter-spacing: 0.3px;
          transition: color 0.5s ease;
        }
        .logo-container:hover .tagline { color: ${isDark ? '#FFFFFF' : '#000000'}; }
      `}</style>

      <div className="logo-wrapper">
        <div className="logo-container">
          <div className="glow-line"></div>

          <span className="wordmark">
            <span className="w-dark">Gap</span>
            <span className="w-multi">A</span>
            <span className="w-dark">nchor</span>
          </span>

          <div className="sep"></div>
          <span className="tagline">Let's bridge the gap together.</span>
        </div>
      </div>
    </>
  );
}
