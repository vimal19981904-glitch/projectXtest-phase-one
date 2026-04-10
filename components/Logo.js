'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Logo({ className = "" }) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-4 no-underline group transition-all duration-300 ${className}`}
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 15px rgba(255, 120, 0, 0.4))" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Anchor Top Section */}
          <g className="anchor-top" stroke="#8B9DB3" strokeWidth="6" strokeLinecap="round">
            <circle cx="100" cy="35" r="18" fill="none" strokeWidth="8" />
            <path d="M100 53V90" />
            <path d="M60 85H140" />
            <circle cx="60" cy="85" r="6" fill="#8B9DB3" />
            <circle cx="140" cy="85" r="6" fill="#8B9DB3" />
          </g>

          {/* U-Shaped Base with Gradients */}
          <defs>
            <linearGradient id="leftOrange" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="rightBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Circuit Pattern Clipping */}
            <clipPath id="leftClip">
              <path d="M40 90C40 150 100 155 100 155V90H40Z" />
            </clipPath>
            <clipPath id="rightClip">
              <path d="M160 90C160 150 100 155 100 155V90H160Z" />
            </clipPath>
          </defs>

          {/* Left Side: Orange + Circuit Tree */}
          <path 
            d="M40 90C40 150 100 155 100 155V90H40Z" 
            fill="url(#leftOrange)" 
            filter="url(#glow)"
          />
          <g clipPath="url(#leftClip)" opacity="0.6" stroke="white" strokeWidth="2">
            <path d="M60 100V140" />
            <path d="M60 115H80" />
            <path d="M60 130H75" />
            <circle cx="80" cy="115" r="3" fill="white" />
            <circle cx="75" cy="130" r="3" fill="white" />
            <path d="M45 110L60 120" />
            <circle cx="45" cy="110" r="3" fill="white" />
          </g>
          
          {/* Right Side: Blue-Gray + Binary Matrix */}
          <path 
            d="M160 90C160 150 100 155 100 155V90H160Z" 
            fill="url(#rightBlue)" 
          />
          <g clipPath="url(#rightClip)" opacity="0.4" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">
            <text x="110" y="110">01</text>
            <text x="135" y="110">010</text>
            <text x="110" y="125">11110</text>
            <text x="110" y="140">101010</text>
            <text x="110" y="155">01011</text>
          </g>

          {/* Middle U Gap */}
          <path d="M70 90C70 125 130 125 130 90H155C155 150 45 150 45 90H70Z" fill="white" opacity="0" />
        </svg>

        {/* Dynamic Glow Overlay */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 120, 0, 0.4) 0%, rgba(59, 130, 246, 0) 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
            animation: 'pulse-glow 2s infinite ease-in-out'
          }}
        />
      </motion.div>
      
      <div className="flex flex-col">
        <span className="text-[24px] font-black tracking-tighter text-text-primary group-hover:text-accent transition-colors duration-300 leading-none">
          GapAnchor
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold opacity-60">
          Career Acceleration
        </span>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </Link>
  );
}

