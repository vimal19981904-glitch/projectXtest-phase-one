import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-hero-bg text-hero-text">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-[22px] font-bold mb-4 text-white">Project X</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              The unified Skill Training & On-Job Support Platform. Building careers, one skill at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {[
                { label: 'Home', href: '/' },
                { label: 'Job Support', href: '/job-support' },
                { label: 'Manhattan WMS', href: '/manhattan-wms' },
                { label: 'Work With Us', href: '/work-with-us' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-text-secondary hover:text-white transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-white uppercase tracking-wider">Courses</h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {['Manhattan WMS', 'SAP Training', 'Oracle Cloud', 'Cloud Computing'].map((c) => (
                <li key={c}>
                  <span className="text-[14px] text-text-secondary hover:text-white transition-colors cursor-pointer">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-white uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] text-text-secondary hover:text-white transition-colors no-underline"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.612l4.458-1.495A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.596-.84-6.32-2.239l-.44-.367-3.26 1.093 1.093-3.26-.367-.44A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
              <p className="text-[14px] text-text-secondary">
                📧 avpartners.consultants@outlook.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-text-secondary m-0">
            © {new Date().getFullYear()} Project X. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-[12px] text-text-secondary hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-[12px] text-text-secondary hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
