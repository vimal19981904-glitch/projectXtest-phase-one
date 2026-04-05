'use client';

import { useState } from 'react';
import { saveLead } from '@/lib/supabase';
import { sendLeadAlert } from '@/lib/emailjs';

export default function EmailGateModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await saveLead(email);
      await sendLeadAlert(email);
      onSuccess?.(email);
    } catch (err) {
      console.error(err);
      onSuccess?.(email); // still allow access even if save fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bg-white rounded-[20px] p-8 w-[90%] max-w-[420px] shadow-2xl animate-[slideUp_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="float-right text-text-secondary hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer text-[20px] leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="w-[56px] h-[56px] bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <h3 className="text-[22px] font-semibold text-text-primary mb-2">
          Enter your email to continue
        </h3>
        <p className="text-[14px] text-text-secondary mb-6">
          We&#39;ll send you the details and keep you updated on our latest offerings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="apple-input"
            required
            autoFocus
          />
          {error && <p className="text-accent-red text-[13px] m-0">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>

        <p className="text-[12px] text-text-secondary text-center mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
