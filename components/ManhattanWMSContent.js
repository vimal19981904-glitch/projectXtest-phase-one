'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import EmailGateModal from '@/components/EmailGateModal';

const syllabus = [
  {
    title: 'Module 1: Introduction to Manhattan WMS',
    topics: [
      'Overview of Warehouse Management Systems',
      'Manhattan WMS Architecture',
      'Key Features and Benefits',
      'Industry Use Cases',
    ],
  },
  {
    title: 'Module 2: System Configuration',
    topics: [
      'Facility Setup and Configuration',
      'Zone and Location Management',
      'Item Master Configuration',
      'User and Role Management',
    ],
  },
  {
    title: 'Module 3: Inbound Operations',
    topics: [
      'Purchase Order Management',
      'Receiving and Putaway',
      'Quality Inspection Workflows',
      'ASN Processing',
    ],
  },
  {
    title: 'Module 4: Outbound Operations',
    topics: [
      'Order Management and Allocation',
      'Wave Planning and Execution',
      'Pick, Pack and Ship Processes',
      'Load Planning and Manifesting',
    ],
  },
  {
    title: 'Module 5: Inventory Management',
    topics: [
      'Cycle Counting Procedures',
      'Inventory Adjustments',
      'Replenishment Strategies',
      'Lot and Serial Number Tracking',
    ],
  },
  {
    title: 'Module 6: Advanced Topics',
    topics: [
      'Labor Management System (LMS)',
      'Slotting Optimization',
      'Billing and Invoicing',
      'Reporting and Analytics',
      'Integration with ERP Systems',
    ],
  },
];

export default function ManhattanWMSContent() {
  const searchParams = useSearchParams();
  const [syllabusUnlockedByForm, setSyllabusUnlockedByForm] = useState(false);
  const syllabusUnlocked = searchParams.get('unlocked') === 'true' || syllabusUnlockedByForm;

  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [openModules, setOpenModules] = useState({});

  const toggleModule = (i) => {
    setOpenModules((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-[#000000]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 text-[13px] text-hero-text/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors no-underline text-hero-text/50">Home</Link>
            <span>/</span>
            <span className="text-hero-text/80">Manhattan WMS</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-hero-text">
              <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5">
                Manhattan WMS{' '}
                <span className="text-[#38bdf8]">Training</span>{' '}
                & Certification
              </h1>
              <p className="text-[17px] text-hero-text/70 mb-8 max-w-[480px]">
                Master Manhattan Warehouse Management System from basics to advanced configuration with real-world scenarios and hands-on labs.
              </p>
              <a href="#booking" className="btn-primary">
                Book Demo
              </a>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <svg width="340" height="260" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Warehouse illustration */}
                <rect x="60" y="60" width="220" height="150" rx="8" fill="#2D2D30" stroke="#555" strokeWidth="1" />
                <rect x="70" y="70" width="200" height="130" rx="4" fill="#1a1a1c" />
                {/* Shelves */}
                <rect x="90" y="90" width="40" height="100" rx="3" fill="#3A3A3C" />
                <rect x="100" y="95" width="20" height="8" rx="1" fill="#0071E3" opacity="0.6" />
                <rect x="100" y="108" width="20" height="8" rx="1" fill="#FF3B30" opacity="0.6" />
                <rect x="100" y="121" width="20" height="8" rx="1" fill="#34C759" opacity="0.6" />
                <rect x="100" y="134" width="20" height="8" rx="1" fill="#FF9500" opacity="0.6" />

                <rect x="150" y="90" width="40" height="100" rx="3" fill="#3A3A3C" />
                <rect x="160" y="95" width="20" height="8" rx="1" fill="#FF9500" opacity="0.6" />
                <rect x="160" y="108" width="20" height="8" rx="1" fill="#0071E3" opacity="0.6" />
                <rect x="160" y="121" width="20" height="8" rx="1" fill="#FF3B30" opacity="0.6" />
                <rect x="160" y="134" width="20" height="8" rx="1" fill="#34C759" opacity="0.6" />

                <rect x="210" y="90" width="40" height="100" rx="3" fill="#3A3A3C" />
                <rect x="220" y="95" width="20" height="8" rx="1" fill="#34C759" opacity="0.6" />
                <rect x="220" y="108" width="20" height="8" rx="1" fill="#FF9500" opacity="0.6" />
                <rect x="220" y="121" width="20" height="8" rx="1" fill="#0071E3" opacity="0.6" />
                <rect x="220" y="134" width="20" height="8" rx="1" fill="#FF3B30" opacity="0.6" />

                {/* Forklift */}
                <rect x="90" y="165" width="30" height="15" rx="3" fill="#FF9500" opacity="0.8" />
                <rect x="88" y="155" width="5" height="25" rx="1" fill="#FF9500" opacity="0.6" />
                <circle cx="95" cy="183" r="5" fill="#555" />
                <circle cx="115" cy="183" r="5" fill="#555" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RELATED SOLUTIONS ========== */}
      <section className="relative py-24 bg-[#0a0a0c] overflow-hidden">
        {/* Background Image with heavy dark overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-[#000000] z-0" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] md:text-[44px] font-bold text-white mb-5 leading-[1.1] tracking-tight">
              Everything Works Better With<br />Manhattan Solutions
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/80 max-w-[800px] mx-auto font-light">
              Manhattan offers a complete breadth of solutions that when unified, provides total coverage for your supply chain commerce needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-[220px] w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=800&q=80" alt="Transportation" width={800} height={220} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="p-8 flex-1">
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Transportation Management</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed font-light">
                  Manage every carrier, rate, route, and load with Manhattan Active® Transportation Management.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-[220px] w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="Labor" width={800} height={220} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="p-8 flex-1">
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Labor Management</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed font-light">
                  Empower employees to be more productive — and happier with their work — using Manhattan Active® Labor Management&apos;s AI-enabled software.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-[220px] w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80" alt="Order" width={800} height={220} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="p-8 flex-1">
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Order Management</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed font-light">
                  Manhattan Active® Order Management provides stores with visibility into available inventory held anywhere, supporting endless aisle selling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SYLLABUS ========== */}
      <section className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[28px] md:text-[34px] font-bold text-center mb-3">
            Training <span className="text-accent">Syllabus</span>
          </h2>
          <p className="text-[15px] text-text-secondary text-center mb-10">
            Comprehensive curriculum from basics to advanced WMS configuration
          </p>

          {!syllabusUnlocked ? (
            <div className="text-center py-12">
              <div className="w-[72px] h-[72px] bg-secondary-bg rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6E6E73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-text-primary mb-2">Syllabus is locked</h3>
              <p className="text-[14px] text-text-secondary mb-6">Enter your email to unlock the full training syllabus</p>
              <button
                onClick={() => setEmailGateOpen(true)}
                className="btn-primary"
              >
                View Syllabus
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {syllabus.map((mod, i) => (
                <div key={i} className="apple-card">
                  <button
                    onClick={() => toggleModule(i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-[16px] font-semibold text-text-primary">{mod.title}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`text-text-secondary transition-transform duration-300 ${openModules[i] ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className={`accordion-content ${openModules[i] ? 'open' : ''}`}>
                    <ul className="px-6 pb-4 space-y-2">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="text-[14px] text-text-secondary flex items-center gap-2">
                          <span className="text-accent text-[12px]">●</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== TRAINER BIO ========== */}
      <section className="bg-secondary-bg py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[28px] md:text-[34px] font-bold text-center mb-10">
            Meet Your <span className="text-accent">Trainer</span>
          </h2>
          <div className="apple-card p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white text-[40px] font-bold shrink-0">
              A
            </div>
            <div>
              <h3 className="text-[22px] font-semibold text-text-primary mb-1">Amy Spain</h3>
              <p className="text-[14px] text-accent font-medium mb-3">Lead WMS Trainer & Consultant</p>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
                With over 10+ years of Manhattan WMS implementation experience across global clients, Amy Spain brings deep expertise in warehouse management, system configuration, and supply chain optimization. She has trained 500+ professionals across Fortune 500 companies.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Manhattan WMS', 'Supply Chain', '10+ Years', 'Global Clients'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-[12px] font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOOKING ========== */}
      <section id="booking" className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <BookingForm defaultService="Training" />
        </div>
      </section>

      {/* ========== EMAIL GATE ========== */}
      {emailGateOpen && (
        <EmailGateModal
          onClose={() => setEmailGateOpen(false)}
          onSuccess={() => {
            setEmailGateOpen(false);
            setSyllabusUnlockedByForm(true);
          }}
        />
      )}
    </>
  );
}
