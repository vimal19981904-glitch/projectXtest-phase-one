'use client';

import { useState } from 'react';
import { saveBooking } from '@/lib/supabase';
import { sendTrainingRequest, sendJobSupportRequest, getWhatsAppUrl } from '@/lib/emailjs';

export default function BookingForm({ defaultService = 'Training' }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    serviceType: defaultService,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError(null); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Try to save to Supabase
      const { error: supabaseError } = await saveBooking(form);
      if (supabaseError) throw new Error(`Database Error: ${supabaseError.message}`);

      // 2. Try to send email notification
      if (form.serviceType === 'Job Support') {
        await sendJobSupportRequest(form);
      } else {
        await sendTrainingRequest(form);
      }

      // If we reach here, both succeeded
      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission failed:', err);
      setError(err.message || 'Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="apple-card p-10 text-center max-w-[560px] mx-auto animate-[slideUp_0.4s_ease]">
        <div className="w-[64px] h-[64px] bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-[24px] font-semibold text-text-primary mb-2">Thank You!</h3>
        <p className="text-[15px] text-text-secondary mb-6">
          A consultant will call you shortly.
        </p>
        <a
          href={getWhatsAppUrl(form.serviceType)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="apple-card p-8 max-w-[560px] mx-auto">
      <h3 className="text-[22px] font-semibold text-text-primary mb-1">Book a Free Demo</h3>
      <p className="text-[14px] text-text-secondary mb-6">
        Fill in your details and our consultant will reach out to you.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          value={form.fullName}
          onChange={update('fullName')}
          placeholder="Full Name"
          className="apple-input"
          required
        />
        <input
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          placeholder="Phone Number"
          className="apple-input"
          required
        />
        <select
          value={form.serviceType}
          onChange={update('serviceType')}
          className="apple-input appearance-none cursor-pointer"
        >
          <option>Training</option>
          <option>Job Support</option>
        </select>
        <textarea
          value={form.message}
          onChange={update('message')}
          placeholder="Message (optional)"
          className="apple-input resize-none"
          rows={3}
        />
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-[slideUp_0.3s_ease]">
            <p className="text-[13px] text-red-600 font-medium">{error}</p>
            <p className="text-[11px] text-red-400 mt-1 italic">Please check if your EmailJS Template ID is correctly set in Vercel.</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
}
