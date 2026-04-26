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

        /* Glow underline on hover */
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

        /* SVG logo sizing */
        .logo-svg {
          overflow: visible;
          display: block;
          /* Font smoothing for crisp rendering on all screens */
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        /* Animated gradient on the "A" stop-colors */
        .logo-container:hover .logo-grad-start {
          animation: grad-shift-start 1.8s ease infinite;
        }
        .logo-container:hover .logo-grad-end {
          animation: grad-shift-end 1.8s ease infinite;
        }
        @keyframes grad-shift-start {
          0%   { stop-color: #00C2FF }
          50%  { stop-color: #7B5EA7 }
          100% { stop-color: #00C2FF }
        }
        @keyframes grad-shift-end {
          0%   { stop-color: #7B5EA7 }
          50%  { stop-color: #00C2FF }
          100% { stop-color: #7B5EA7 }
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
           * SVG wordmark — letterforms baked into SVG text.
           * Font priority:
           *   1. 'Century Gothic'  — Windows desktop (unchanged, exact original look)
           *   2. var(--font-josefin) — loaded from Google Fonts via layout.js (iOS/Android)
           *   3. 'Josefin Sans'   — explicit name fallback
           *   4. sans-serif       — last resort
           *
           * overflow: visible prevents clipping at SVG viewport edge.
           * height="60" matches the original 50px text + descender space.
           */}
          <svg
            height="60"
            className="logo-svg"
            role="img"
            aria-label="GapAnchor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="logo-a-gradient"
                x1="0%" y1="0%"
                x2="100%" y2="100%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%"   stopColor="#00C2FF" className="logo-grad-start" />
                <stop offset="50%"  stopColor="#7B5EA7" />
                <stop offset="100%" stopColor="#00C2FF" className="logo-grad-end" />
              </linearGradient>
            </defs>

            <text
              y="50"
              fontFamily="'Century Gothic', var(--font-josefin), 'Josefin Sans', 'Trebuchet MS', sans-serif"
              fontWeight="700"
              fontSize="50"
              letterSpacing="-1"
            >
              {/* "Gap" — plain dark/white */}
              <tspan fill={textColor}>Gap</tspan>

              {/* "A" — gradient fill via SVG linearGradient */}
              <tspan fill="url(#logo-a-gradient)">A</tspan>

              {/* "nchor" — plain dark/white */}
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
