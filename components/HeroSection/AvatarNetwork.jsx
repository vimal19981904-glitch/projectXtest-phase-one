'use client';

import { avatarData } from '@/data/avatarData';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTAINER = 600;

// Perfectly aligned 8-person ring
const positions = [
  { x: 300, y: 60 },
  { x: 470, y: 140 },
  { x: 540, y: 300 },
  { x: 470, y: 460 },
  { x: 300, y: 540 },
  { x: 130, y: 460 },
  { x: 60,  y: 300 },
  { x: 130, y: 140 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], 
  [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 0], [7, 1],
  [0, 3], [1, 6], [2, 5], [4, 7]
];

function getCurvePath(p1, p2) {
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  const ctrlX = midX + (midX - 300) * 0.15;
  const ctrlY = midY + (midY - 300) * 0.15;
  return `M ${p1.x} ${p1.y} Q ${ctrlX} ${ctrlY} ${p2.x} ${p2.y}`;
}

export default function AvatarNetwork() {
  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto overflow-visible group/network"
      style={{ width: CONTAINER, height: CONTAINER }}
    >
      {/* Dynamic Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1
        }}
      />

      {/* SVG Mesh */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        style={{ zIndex: 10 }}
        viewBox="0 0 600 600"
      >
        {edges.map(([a, b], i) => (
          <path
            key={`edge-${i}`}
            d={getCurvePath(positions[a], positions[b])}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ))}
      </svg>

      {/* Avatar Nodes Layer */}
      {avatarData.slice(0, 8).map((avatar, i) => (
        <AvatarNode 
          key={`avatar-${i}`}
          avatar={avatar}
          x={positions[i].x}
          y={positions[i].y}
        />
      ))}

      {/* Central Branding Badge */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
        style={{ width: 'auto' }}
      >
        <span 
          className="text-[20px] sm:text-[28px] font-bold tracking-[0.4em] text-white opacity-95 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
          style={{ 
            fontFamily: 'var(--font-outfit), sans-serif',
            background: 'linear-gradient(to bottom, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          GapAnchor
        </span>
      </div>
    </div>
  );
}

function AvatarNode({ avatar, x, y }) {
  const [isHovered, setIsHovered] = useState(false);
  const fallbackImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80';

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{
        left: x,
        top: y,
        zIndex: isHovered ? 200 : 50
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-full overflow-hidden transition-all duration-700 ease-out"
        style={{
          width: 52,
          height: 52,
          border: isHovered ? '1.5px solid #60a5fa' : '1px solid rgba(56, 189, 248, 0.3)',
          background: '#0a192f',
          boxShadow: isHovered 
            ? '0 0 30px rgba(56, 189, 248, 0.4)' 
            : '0 0 15px rgba(56, 189, 248, 0.05)'
        }}
      >
        <Image
          src={avatar.image || fallbackImg}
          alt={avatar.name}
          width={52}
          height={52}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          unoptimized
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`} />
      </div>

      <AnimatePresence>
        {/* Simple Name Tag - Always show if global hover OR local hover */}
        <div className="absolute top-[110%] left-1/2 -translate-x-1/2 pointer-events-none">
            <div 
              className={`
                bg-[#0f172a]/80 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[10px] font-medium border border-white/5 shadow-xl
                transition-all duration-700 ease-out whitespace-nowrap tracking-wide
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover/network:opacity-100 group-hover/network:translate-y-0'}
              `}
              style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
            >
              {avatar.name}
            </div>
        </div>

        {/* Refined Sharp Rectangle Code Snippet Card - ONLY on local hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-[125%] left-1/2 -translate-x-1/2 mb-1 pointer-events-none"
            style={{ zIndex: 210 }}
          >
            <div 
              className="bg-[#0f172a]/95 backdrop-blur-2xl border border-white/20 px-2 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
              style={{ fontFamily: 'monospace', fontSize: '9px', minWidth: '110px' }}
            >
              <div className="space-y-0 leading-[1.2]">
                <p className="m-0 text-gray-500">
                  <span className="text-purple-400">const</span> expert = {'{'}
                </p>
                <p className="m-0 pl-2">
                  <span className="text-blue-400">name</span>: <span className="text-green-400">"{avatar.name}"</span>,
                </p>
                <p className="m-0 pl-2">
                  <span className="text-blue-400">role</span>: <span className="text-yellow-400">"{avatar.title}"</span>
                </p>
                <p className="m-0 text-gray-500">{'}'};</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
