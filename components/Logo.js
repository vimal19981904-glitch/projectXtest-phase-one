'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Logo({ className = "", size = 44 }) {
  const scale = size / 200;
  
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 no-underline group transition-all duration-300 ${className}`}
    >
      <motion.div 
        className="relative flex-shrink-0"
        whileHover={{ scale: 1.12 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <defs>
            {/* Copper/Bronze gradient for the U-shape */}
            <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C68B59" />
              <stop offset="40%" stopColor="#D4975F" />
              <stop offset="100%" stopColor="#B07840" />
            </linearGradient>
            
            {/* Darker copper for depth */}
            <linearGradient id="copperDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C68B59" />
              <stop offset="100%" stopColor="#8B5E3C" />
            </linearGradient>

            {/* Silver gradient for anchor top */}
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B0BEC5" />
              <stop offset="50%" stopColor="#90A4AE" />
              <stop offset="100%" stopColor="#78909C" />
            </linearGradient>

            {/* Cyan glow for hover */}
            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#00E5FF" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip path for left half of U */}
            <clipPath id="leftU">
              <path d="M50 80 L50 160 Q50 200 100 200 L100 80 Z" />
            </clipPath>
            
            {/* Clip path for right half of U */}
            <clipPath id="rightU">
              <path d="M100 80 L100 200 Q150 200 150 160 L150 80 Z" />
            </clipPath>
          </defs>

          {/* ===== ANCHOR TOP (Silver/Gray) ===== */}
          <g className="anchor-top">
            {/* Vertical stem */}
            <rect x="95" y="48" width="10" height="40" rx="2" fill="url(#silverGrad)" />
            
            {/* Ring at top */}
            <circle cx="100" cy="32" r="18" fill="none" stroke="url(#silverGrad)" strokeWidth="8" />
            
            {/* Horizontal crossbar */}
            <rect x="45" y="78" width="110" height="8" rx="4" fill="url(#silverGrad)" />
            
            {/* Left arm node */}
            <circle cx="50" cy="82" r="10" fill="url(#silverGrad)" />
            <circle cx="50" cy="82" r="5" fill="#607D8B" />
            
            {/* Right arm node */}
            <circle cx="150" cy="82" r="10" fill="url(#silverGrad)" />
            <circle cx="150" cy="82" r="5" fill="#607D8B" />
            
            {/* Center junction node */}
            <circle cx="100" cy="82" r="7" fill="url(#silverGrad)" />
            <circle cx="100" cy="82" r="3.5" fill="#607D8B" />
          </g>

          {/* ===== U-SHAPE LEFT: Copper + Circuit Pattern ===== */}
          <path d="M50 80 L50 160 Q50 200 100 200 L100 80 Z" fill="url(#copperGrad)" />
          
          {/* Circuit traces on left side */}
          <g clipPath="url(#leftU)" stroke="#FF8C00" strokeWidth="1.5" fill="none" opacity="0.7">
            {/* Main vertical trace */}
            <path d="M75 90 L75 175" />
            {/* Branch traces */}
            <path d="M75 105 L62 105 L62 120" />
            <path d="M75 120 L88 120 L88 135" />
            <path d="M75 135 L60 135" />
            <path d="M75 150 L90 150 L90 165" />
            <path d="M75 165 L65 165 L65 180" />
            <path d="M62 120 L55 130" />
            {/* Circuit nodes (dots) */}
            <circle cx="75" cy="95" r="3" fill="#FF8C00" />
            <circle cx="62" cy="105" r="2.5" fill="#FF8C00" />
            <circle cx="88" cy="120" r="2.5" fill="#FF8C00" />
            <circle cx="60" cy="135" r="2.5" fill="#FF8C00" />
            <circle cx="90" cy="150" r="2.5" fill="#FF8C00" />
            <circle cx="65" cy="165" r="2.5" fill="#FF8C00" />
            <circle cx="88" cy="135" r="2" fill="#FF8C00" />
            <circle cx="55" cy="130" r="2" fill="#FF8C00" />
            <circle cx="75" cy="175" r="3" fill="#FF8C00" />
          </g>
          
          {/* Orbital ellipses around circuit (blue) */}
          <g clipPath="url(#leftU)" opacity="0.5" fill="none" stroke="#5DADE2" strokeWidth="1">
            <ellipse cx="75" cy="140" rx="28" ry="16" transform="rotate(-15 75 140)" />
            <ellipse cx="75" cy="140" rx="22" ry="12" transform="rotate(20 75 140)" />
            {/* Small blue dots on orbits */}
            <circle cx="58" cy="130" r="2.5" fill="#5DADE2" />
            <circle cx="93" cy="145" r="2.5" fill="#5DADE2" />
            <circle cx="65" cy="155" r="2" fill="#5DADE2" />
            <circle cx="85" cy="128" r="2" fill="#5DADE2" />
          </g>

          {/* ===== U-SHAPE RIGHT: Copper + Binary Matrix ===== */}
          <path d="M100 80 L100 200 Q150 200 150 160 L150 80 Z" fill="url(#copperGrad)" />
          
          {/* Binary text matrix on right side */}
          <g clipPath="url(#rightU)" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="'Courier New', monospace" fontWeight="bold">
            <text x="105" y="98">1 0 1</text>
            <text x="115" y="108">0 1 1 1</text>
            <text x="105" y="118">0 1 1 1 1</text>
            <text x="105" y="128">0 1 1 1 1</text>
            <text x="110" y="138">1 1  0 1</text>
            <text x="115" y="148">0 1 0</text>
            <text x="105" y="158">1 1 1 1 0</text>
            <text x="105" y="168">0 1 0 1 0</text>
            <text x="105" y="178">1 3 0 1 0</text>
            <text x="108" y="188">0 1 0 1 1</text>
            <text x="110" y="198">0 0 1 0 1</text>
          </g>

          {/* Binary digits floating above right side */}
          <g fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="'Courier New', monospace" fontWeight="bold">
            <text x="150" y="72">1</text>
            <text x="135" y="62">0 1</text>
            <text x="155" y="80">0</text>
          </g>

          {/* Binary digits floating on left side */}
          <g fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'Courier New', monospace" fontWeight="bold">
            <text x="30" y="158">1 0 1 1</text>
            <text x="25" y="168">1 0 1 1 1 0</text>
            <text x="28" y="178">1 0 1 1</text>
            <text x="32" y="188">1 0 1 1 0</text>
            <text x="38" y="198">1 1 0 1</text>
          </g>
        </svg>

        {/* Hover glow overlay — cyan energy swirl */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, rgba(93, 173, 226, 0.15) 40%, transparent 70%)',
            filter: 'blur(12px)',
            transform: 'scale(1.6)',
            zIndex: -1
          }}
        />
        
        {/* Second glow ring */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 pointer-events-none"
          style={{ 
            background: 'conic-gradient(from 0deg, transparent, rgba(0, 229, 255, 0.2), transparent, rgba(147, 112, 219, 0.15), transparent)',
            filter: 'blur(8px)',
            transform: 'scale(1.8)',
            zIndex: -1,
            animation: 'spin-slow 4s linear infinite'
          }}
        />
      </motion.div>
      
      <div className="flex flex-col">
        <span className="text-[22px] font-black tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300 leading-none">
          GapAnchor
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-text-secondary font-semibold opacity-50">
          Career Acceleration
        </span>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: scale(1.8) rotate(0deg); }
          to { transform: scale(1.8) rotate(360deg); }
        }
      `}</style>
    </Link>
  );
}
