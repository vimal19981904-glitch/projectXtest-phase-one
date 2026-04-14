'use client';

export default function AvatarRing() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 30 // Sits on top of the globe canvas
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 50, pointerEvents: 'auto' }}>
        {/* Central GapAnchor Name overlaying the Globe */}
        <div className="flex flex-col items-center justify-center font-bold">
          <div className="bg-[#0f172a]/80 backdrop-blur-md px-6 py-3 rounded-xl border border-[#38bdf8]/50 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
            <h2 className="text-[#ffffff] text-[28px] tracking-widest font-extrabold uppercase m-0 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">
              {/* Optional tiny icon, can remove if they just want text */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              GapAnchor
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
