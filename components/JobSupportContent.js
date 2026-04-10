'use client';

import BookingForm from '@/components/BookingForm';
import Link from 'next/link';

export default function JobSupportContent() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-hero-bg relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-hero-text">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-hero-text/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors no-underline text-hero-text/50">Home</Link>
              <span>/</span>
              <span className="text-hero-text/80">On Job Support</span>
            </div>

            <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5">
              GapAnchor{' '}
              <span className="text-accent-red">On-Job</span> / Work
              <br />
              <span className="text-accent-red">Support</span>
            </h1>
            <p className="text-[17px] text-hero-text/70 mb-8 max-w-[480px]">
              Expert trainers and working professionals help you with on-the-job tasks and teach you to handle similar tasks in the future.
            </p>
            <a href="#booking" className="btn-white">
              Connect with us
            </a>
          </div>

          {/* Right illustration */}
          <div className="md:w-1/2 flex justify-center">
            <svg width="380" height="300" viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Two people collaborating */}
              {/* Person 1 */}
              <circle cx="130" cy="120" r="25" fill="#F5F5F7" opacity="0.8" />
              <rect x="110" y="150" width="40" height="50" rx="10" fill="#FF3B30" opacity="0.6" />
              {/* Person 1 arm */}
              <rect x="150" y="160" width="40" height="8" rx="4" fill="#F5F5F7" opacity="0.5" />
              {/* Person 2 */}
              <circle cx="260" cy="120" r="25" fill="#F5F5F7" opacity="0.8" />
              <rect x="240" y="150" width="40" height="50" rx="10" fill="#0071E3" opacity="0.6" />
              {/* Person 2 arm */}
              <rect x="200" y="160" width="40" height="8" rx="4" fill="#F5F5F7" opacity="0.5" />
              {/* Shared laptop */}
              <rect x="160" y="190" width="70" height="45" rx="5" fill="#2D2D30" stroke="#555" strokeWidth="1" />
              <rect x="167" y="197" width="56" height="30" rx="3" fill="#0071E3" opacity="0.3" />
              {/* Screen lines */}
              <rect x="174" y="204" width="30" height="3" rx="1.5" fill="#F5F5F7" opacity="0.6" />
              <rect x="174" y="211" width="42" height="3" rx="1.5" fill="#F5F5F7" opacity="0.4" />
              <rect x="174" y="218" width="20" height="3" rx="1.5" fill="#0071E3" opacity="0.7" />
              {/* Laptop stand */}
              <rect x="180" y="235" width="30" height="5" rx="2" fill="#3A3A3C" />
              {/* Settings gear */}
              <circle cx="310" cy="100" r="18" stroke="#F5F5F7" strokeWidth="1.5" fill="none" opacity="0.3" />
              <circle cx="310" cy="100" r="8" stroke="#F5F5F7" strokeWidth="1.5" fill="none" opacity="0.3" />
              {/* Chart */}
              <rect x="60" y="210" width="8" height="30" rx="3" fill="#34C759" opacity="0.5" />
              <rect x="75" y="200" width="8" height="40" rx="3" fill="#0071E3" opacity="0.5" />
              <rect x="90" y="215" width="8" height="25" rx="3" fill="#FF9500" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== STATS ROW ========== */}
      <section className="bg-white py-12 border-b border-border/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[28px] font-bold text-text-primary mb-1">510+ Happy Clients</p>
            <p className="text-[14px] text-text-secondary max-w-[360px]">
              Our clients share their happiness for the exceptional training and work support they got from us.
            </p>
          </div>
          <div className="flex gap-10">
            {[
              { score: '4.5', name: 'SwitchUp' },
              { score: '4.7', name: 'TrustPilot' },
              { score: '4.8', name: 'Course Report' },
            ].map((r) => (
              <div key={r.name} className="text-center">
                <p className="text-[24px] font-bold text-text-primary mb-1">{r.score}</p>
                <p className="text-[13px] text-text-secondary mb-1">{r.name}</p>
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="star text-[14px]">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHO WE ARE ========== */}
      <section className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[34px] font-bold text-text-primary mb-6">
            Who We <span className="text-accent">Are?</span>
          </h2>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            GapAnchor is a premier online training and on-job support platform dedicated to bridging the gap between learning and real-world application. Our expert trainers — working professionals with years of industry experience — provide hands-on support that empowers you to tackle complex tasks with confidence. Whether you need daily guidance or help with a specific assignment, we&apos;re here to accelerate your career growth.
          </p>
        </div>
      </section>

      {/* ========== SERVICE CARDS ========== */}
      <section className="bg-secondary-bg py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[28px] md:text-[34px] font-bold text-center mb-10">
            Our Support <span className="text-accent">Plans</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
            <div className="apple-card p-8">
              <div className="w-[48px] h-[48px] bg-accent/10 rounded-2xl flex items-center justify-center mb-5 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-text-primary mb-2">Monthly Plan</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
                Daily 1–2 hours of expert support from working professionals. Consistent guidance to help you grow on the job every day.
              </p>
              <ul className="space-y-2 text-[14px] text-text-secondary">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Daily 1-2 hours support</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Dedicated trainer</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Screen sharing sessions</li>
              </ul>
            </div>

            <div className="apple-card p-8">
              <div className="w-[48px] h-[48px] bg-accent/10 rounded-2xl flex items-center justify-center mb-5 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-text-primary mb-2">Task-Based Plan</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
                Specific assignment or task help. Get expert assistance for your immediate project needs, pay per task.
              </p>
              <ul className="space-y-2 text-[14px] text-text-secondary">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Pay per task</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Flexible scheduling</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Quick turnaround</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOOKING FORM ========== */}
      <section id="booking" className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <BookingForm defaultService="Job Support" />
        </div>
      </section>
    </>
  );
}
