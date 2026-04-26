import React from 'react';

export default function Logo() {
  return (
    <>
      <style>{`
        .logo-wrapper {
          width: 340px; /* Actual space it takes up in the navbar */
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
          0% { background-position: 0% 50% }
          100% { background-position: 200% 50% }
        }

        .wordmark {
          font-family: 'Century Gothic', 'Montserrat', sans-serif;
          font-size: 50px; font-weight: 900;
          letter-spacing: -1px;
          display: inline-flex; align-items: center;
        }

        .w-dark { color: #1A2332; }

        .w-multi {
          display: inline-block;
          background: linear-gradient(135deg, #00C2FF 0%, #7B5EA7 50%, #00C2FF 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-container:hover .w-multi {
          animation: colorshift-logo 1.8s ease infinite;
        }
        @keyframes colorshift-logo {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        .sep {
          width: 1.5px; height: 36px;
          background: #DDDDDD; flex-shrink: 0;
          transition: background 0.4s ease;
        }
        .logo-container:hover .sep { background: #7B5EA7; }

        .tagline {
          font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 15px; font-weight: 700;
          color: #AAAAAA; letter-spacing: 0.3px;
          transition: color 0.5s ease;
        }
        .logo-container:hover .tagline { color: #000000; }
      `}</style>

      <div className="logo-wrapper">
        <div className="logo-container">
          <div className="glow-line"></div>
          <span className="wordmark">
            <span className="w-dark">Gap</span><span className="w-multi">A</span><span className="w-dark">nchor</span>
          </span>
          <div className="sep"></div>
          <span className="tagline">Let's bridge the gap together.</span>
        </div>
      </div>
    </>
  );
}
