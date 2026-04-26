import React from 'react';

export default function Logo({ variant = 'light' }) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#1A2332';

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

        /* Glow underline — appears on hover, blue → purple */
        .glow-line {
          position: absolute;
          bottom: 0px; left: 0px;
          width: 0%; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #00C2FF, #7B5EA7);
          opacity: 0;
          transition: width 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
        }
        .logo-container:hover .glow-line {
          width: 45%; opacity: 1;
        }

        /* SVG wrapper */
        .logo-svg {
          overflow: visible;
          display: block;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        /*
         * The letter "A":
         *   Default  → steel blue  (#4A9FD4) — matches Image 1
         *   Hover    → soft purple (#7B5EA7) — matches Image 2
         * SVG fill supports CSS transitions natively.
         */
        .logo-letter-a {
          fill: #4A9FD4;
          transition: fill 0.4s ease;
        }
        .logo-container:hover .logo-letter-a {
          fill: #7B5EA7;
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

          {/*
           * SVG wordmark — font priority:
           *   1. 'Century Gothic'     — Windows (unchanged desktop look)
           *   2. var(--font-josefin)  — Google Fonts fallback for iOS/Android
           *   3. 'Josefin Sans'       — explicit name fallback
           *   4. sans-serif           — last resort
           */}
          <svg
            height="60"
            className="logo-svg"
            role="img"
            aria-label="GapAnchor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              y="50"
              fontFamily="'Century Gothic', var(--font-josefin), 'Josefin Sans', 'Trebuchet MS', sans-serif"
              fontWeight="700"
              fontSize="50"
              letterSpacing="-1"
            >
              {/* "Gap" — dark/white depending on variant */}
              <tspan fill={textColor}>Gap</tspan>

              {/* "A" — steel blue → soft purple on hover via CSS class */}
              <tspan className="logo-letter-a">A</tspan>

              {/* "nchor" — dark/white depending on variant */}
              <tspan fill={textColor}>nchor</tspan>
            </text>
          </svg>

          <div className="sep"></div>
          <span className="tagline">Let's bridge the gap together.</span>
        </div>
      </div>
    </>
  );
}
