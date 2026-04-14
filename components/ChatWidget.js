'use client';

import { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '@/lib/chatbot';
import { saveChat } from '@/lib/supabase';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Catalina. How can I help you today? 👋" },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTimeout(async () => {
      const botText = getBotResponse(text);
      setMessages((prev) => [...prev, { from: 'bot', text: botText }]);
      await saveChat(text, botText);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Hover Tooltip Card ── */}
      {hovered && !open && (
        <div
          className="fixed z-50 flex items-center gap-3"
          style={{
            bottom: 90,
            right: 20,
            background: 'rgba(22,27,38,0.97)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '14px 20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            animation: 'slideUpFade 0.2s ease',
            minWidth: 220,
            pointerEvents: 'none',
          }}
        >
          <div>
            <p className="text-white font-bold text-[15px] m-0 leading-snug">Need help?</p>
            <p className="text-[#94a3b8] text-[13px] m-0 leading-snug mt-0.5">Chat with our support team.</p>
          </div>
        </div>
      )}

      {/* ── Animated Chat Button ── */}
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with Catalina"
        className="fixed z-50 flex items-center justify-center border-none cursor-pointer outline-none overflow-hidden"
        style={{
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
          boxShadow: hovered
            ? '0 8px 32px rgba(99,102,241,0.7), 0 0 0 5px rgba(99,102,241,0.15)'
            : '0 4px 20px rgba(99,102,241,0.5)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        {open ? (
          /* Close X */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : hovered ? (
          /* Smiley ghost face (spaceship.com style) */
          <svg width="32" height="32" viewBox="0 0 100 110" fill="none">
            {/* Ghost head */}
            <path
              d="M50 5 C25 5 10 25 10 48 L10 90 L22 78 L34 90 L46 78 L58 90 L70 78 L82 90 L90 78 L90 48 C90 25 75 5 50 5 Z"
              fill="white"
              opacity="0.95"
            />
            {/* Eyes */}
            <ellipse cx="35" cy="48" rx="7" ry="9" fill="#4f46e5" />
            <ellipse cx="65" cy="48" rx="7" ry="9" fill="#4f46e5" />
            {/* Smile */}
            <path
              d="M 35 65 Q 50 76 65 65"
              stroke="#4f46e5"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Default: 3-dot chat bubble */
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            {/* Bubble shape */}
            <path
              d="M50 8 C25 8 8 25 8 46 C8 60 16 72 28 79 L22 92 L42 82 C44.5 82.5 47.2 83 50 83 C75 83 92 66 92 46 C92 25 75 8 50 8 Z"
              fill="white"
              opacity="0.95"
            />
            {/* Dots */}
            <circle cx="33" cy="46" r="6" fill="#4f46e5" />
            <circle cx="50" cy="46" r="6" fill="#4f46e5" />
            <circle cx="67" cy="46" r="6" fill="#4f46e5" />
          </svg>
        )}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden"
          style={{
            bottom: 96,
            right: 24,
            width: 360,
            maxWidth: 'calc(100vw - 2rem)',
            height: 480,
            borderRadius: 20,
            background: '#ffffff',
            boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
            border: '1px solid rgba(0,0,0,0.06)',
            animation: 'slideUpFade 0.25s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-[15px] m-0 leading-tight">Catalina</p>
              <p className="text-white/75 text-[12px] m-0 leading-tight mt-0.5">Online · Replies instantly</p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#f8fafc' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] text-[14px] leading-relaxed"
                  style={{
                    padding: '10px 14px',
                    borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg, #6366f1, #4338ca)'
                      : '#ffffff',
                    color: msg.from === 'user' ? '#ffffff' : '#0f172a',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 14px',
              display: 'flex',
              gap: 8,
              borderTop: '1px solid rgba(0,0,0,0.06)',
              background: '#fff',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                fontSize: 14,
                outline: 'none',
                background: '#f8fafc',
                color: '#0f172a',
              }}
            />
            <button
              onClick={handleSend}
              aria-label="Send"
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#fff',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
