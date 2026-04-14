'use client';

import { avatarData } from '@/data/avatarData';
import { useRef } from 'react';

const CONTAINER = 600;
const CENTER = 300;
const RING_RADIUS = 220;

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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible"
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

      {/* SVG Mesh - Restoring the original curved network */}
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

      {/* Central Branding Badge - Premium floating text */}
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
  const imgRef = useRef(null);
  const fallbackImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80';

  return (
    <div
      className="absolute group pointer-events-auto"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 50
      }}
    >
      <div
        className="relative rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]"
        style={{
          width: 52,
          height: 52,
          border: '2px solid rgba(56, 189, 248, 0.8)',
          background: '#0a192f',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
        }}
      >
        <img
          ref={imgRef}
          src={avatar.image || fallbackImg}
          alt={avatar.name}
          onError={() => { if(imgRef.current) imgRef.current.src = fallbackImg; }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tooltip on Hover */}
      <div
        className="absolute bottom-[125%] left-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        style={{ transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 110 }}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border border-sky-500/30 rounded-xl px-4 py-2 text-center shadow-2xl">
          <p className="text-white text-[14px] font-bold m-0 leading-tight">{avatar.name}</p>
          <p className="text-sky-400 text-[11px] font-semibold m-0 uppercase tracking-widest">{avatar.nickname || avatar.title}</p>
        </div>
        {/* Tooltip tail */}
        <div className="w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-sky-500/30 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}
