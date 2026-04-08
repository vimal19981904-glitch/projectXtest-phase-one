'use client';

import { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '@/lib/chatbot';
import { saveChat } from '@/lib/supabase';

import { getWhatsAppUrl } from '@/lib/emailjs';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Monalisa. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { from: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Small delay for realism
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
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="chat-bubble fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 w-[56px] h-[56px] rounded-full bg-accent text-white shadow-lg flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:shadow-xl"
        aria-label="Chat with Monalisa"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-border/30 flex flex-col overflow-hidden animate-[slideUp_0.3s_ease]"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="bg-accent text-white px-5 py-4 flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-white/20 flex items-center justify-center text-[16px] font-bold">
              M
            </div>
            <div>
              <p className="text-[15px] font-semibold m-0">Monalisa</p>
              <p className="text-[12px] opacity-80 m-0">Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary-bg/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-accent text-white rounded-br-md'
                      : 'bg-white text-text-primary shadow-sm rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/30 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="apple-input !py-2.5 !text-[14px] flex-1"
            />
            <button
              onClick={handleSend}
              className="bg-accent text-white rounded-xl px-4 border-none cursor-pointer hover:bg-accent-hover transition-colors"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
