'use client';

import BookingForm from '@/components/BookingForm';
import Link from 'next/link';
import { Zap, GraduationCap, Anchor, Star, Quote, ChevronRight } from 'lucide-react';

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
              <span className="text-hero-text/80">Consulting Firm Support</span>
            </div>

            <h1 className="text-[36px] md:text-[56px] font-bold leading-[1.1] mb-6">
              GapAnchor <span className="text-red-500">Consulting</span> /
              <br />
              Firm <span className="text-red-500">Support</span>
            </h1>
            <p className="text-[18px] text-hero-text/70 mb-8 max-w-[540px] leading-relaxed">
              Active industry practitioners step into your project alongside you — resolving on-the-job tasks, overcoming work crises, and coaching you to handle the same situations confidently in the future.
            </p>
            <a href="#booking" className="btn-white px-8 py-4">
              Get Consulting Firm Support
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

      {/* ========== HOW IT WORKS ========== */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6 text-red-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">You raise the task. We step in.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Facing an escalation, a deadline you don't own yet, or a tool you've never touched? Connect with a practitioner who has solved this exact problem — live, today.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">We resolve it with you, not for you.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our experts work through the task alongside you, explaining every decision so you understand the why — not just the fix. You walk away with the answer and the skill.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6 text-green-500">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">You'll never hit this wall again.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                After each session, you get a tailored action guide — a reference you own — so the next time this situation arises, you're the expert in the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-gray-50/50 py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 underline-offset-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by IT Professionals Across Industries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our clients work inside consulting firms and enterprise IT teams spanning these domains. Here's what they say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                domain: "SAP / ERP",
                badgeColor: "bg-blue-100 text-blue-800",
                quote: "I was two days into a go-live support role and had never touched SAP MM config before. GapAnchor had a live practitioner walking me through it within the hour. My client never knew there was a gap.",
                author: "Rajan Pillai",
                role: "SAP Functional Consultant",
                firm: "Mid-size ERP Consulting Firm, Bangalore",
                stars: 5,
              },
              {
                domain: "Warehouse & WMS",
                badgeColor: "bg-green-100 text-green-800",
                quote: "We were implementing Blue Yonder WMS for a 3PL client and hit a wave allocation issue none of us had seen. The GapAnchor expert not only fixed it — they trained our whole team on the root cause.",
                author: "Priya Menon",
                role: "WMS Implementation Lead",
                firm: "Logistics Tech Consultancy, Chennai",
                stars: 5,
              },
              {
                domain: "Cloud Infrastructure",
                badgeColor: "bg-purple-100 text-purple-800",
                quote: "I was a junior DevOps engineer put on a production incident. GapAnchor's support call was the most practical help I've received — not generic docs, actual hands-on guidance for my exact AWS setup.",
                author: "Sathish Kumar",
                role: "Cloud Engineer",
                firm: "IT Services Firm, Hyderabad",
                stars: 5,
              },
              {
                domain: "Supply Chain",
                badgeColor: "bg-orange-100 text-orange-800",
                quote: "Our consulting team was stuck on a demand planning model for a FMCG client. The practitioner from GapAnchor didn't just help with the model — they helped us document the approach for future engagements.",
                author: "Divya Suresh",
                role: "Supply Chain Analyst",
                firm: "Big 4 Advisory Practice, Mumbai",
                stars: 5,
              },
              {
                domain: "Data & Analytics",
                badgeColor: "bg-teal-100 text-teal-800",
                quote: "I was building a Power BI dashboard for a client I'd never worked with before. The GapAnchor session gave me not just the DAX fix but a pattern I've reused in three projects since.",
                author: "Karthik Ramesh",
                role: "BI Developer",
                firm: "Analytics Consulting Startup, Coimbatore",
                stars: 4,
              },
              {
                domain: "ITSM / ServiceNow",
                badgeColor: "bg-red-100 text-red-800",
                quote: "I was deployed on a ServiceNow implementation with almost no prior experience. GapAnchor became my silent co-consultant. My client rated that project as one of their best deliveries.",
                author: "Lakshmi Narayanan",
                role: "ServiceNow Consultant",
                firm: "IT Staffing & Consulting Firm, Pune",
                stars: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl relative border border-gray-100 shadow-sm">
                <span className={`absolute top-6 right-8 text-[11px] font-bold px-3 py-1 rounded-full ${t.badgeColor} uppercase tracking-tight`}>
                  {t.domain}
                </span>
                <Quote className="text-gray-200 w-12 h-12 mb-4" />
                <p className="text-gray-700 text-[15px] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{t.author}</h4>
                    <p className="text-gray-500 text-xs">{t.role} | {t.firm}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < t.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUE POSITIONING ========== */}
      <section className="bg-gray-950 py-24 text-center overflow-hidden relative">
        <div className="max-w-[720px] mx-auto px-6 relative z-10">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-10 leading-tight">
            You're <span className="text-red-500">Not New</span> to the Project Anymore.
          </h2>
          
          <div className="space-y-8 mb-16">
            <p className="text-gray-400 text-lg leading-relaxed">
              Every professional walks into a client engagement carrying some degree of uncertainty — a tool they haven't used, a domain they're still learning, a crisis they've never seen before. That's not a weakness. That's the reality of consulting.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              When you work with GapAnchor, you're not just getting a quick fix. You're building a bridge. Our practitioners step in as your silent backbone — finishing the task with you, coaching the skill into you, and anchoring you as the confident, capable resource your client already believes you are.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              By the time the engagement ends, you're not the consultant who needed help. You're the one who delivered — and who knows exactly how to do it again.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { label: '510+ Clients Supported' },
              { label: '20+ IT Domains Covered' },
              { label: 'Avg. 4.7★ Rating' },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/20 rounded-full px-6 py-2">
                <span className="text-white text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          <Link href="#booking" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-5 text-base font-semibold transition-all hover:scale-105 no-underline">
            Get Consulting Firm Support
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px]" />
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
      <section id="booking" className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Anchor Your Career?</h2>
            <p className="text-gray-600">Fill the form below and our consulting specialists will reach out within 2-4 hours.</p>
          </div>
          <BookingForm defaultService="Consulting Firm Support" />
        </div>
      </section>
    </>
  );
}
