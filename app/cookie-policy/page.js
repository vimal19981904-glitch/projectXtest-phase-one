export const metadata = {
  title: 'Cookie Policy | GapAnchor',
  description: 'Learn how GapAnchor uses cookies to improve your IT consulting and training experience.',
};

export default function CookiePolicyPage() {
  const lastUpdated = 'April 20, 2026';

  const cookieData = [
    { name: '_ga', type: 'Analytics', purpose: 'Google Analytics visitor tracking', duration: '2 years' },
    { name: '_gid', type: 'Analytics', purpose: 'GA session tracking', duration: '24 hours' },
    { name: 'cookieConsent', type: 'Essential', purpose: 'Stores user consent choice', duration: '1 year' },
    { name: 'sessionToken', type: 'Essential', purpose: 'User login session', duration: 'Session' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - GapAnchor",
    "description": "Information about cookies used on the GapAnchor platform.",
    "publisher": {
      "@type": "Organization",
      "name": "GapAnchor"
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] pt-[120px] pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1000px] mx-auto bg-[#060d1f] border border-white/5 rounded-[24px] p-8 md:p-12 shadow-2xl">
        <h1 className="text-white text-[32px] md:text-[48px] font-black mb-4 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-[rgba(255,255,255,0.6)] text-[16px] mb-12">
          Last updated: {lastUpdated}
        </p>

        <section className="mb-12">
          <p className="text-[rgba(255,255,255,0.8)] text-[18px] leading-relaxed mb-6">
            This Cookie Policy explains how GapAnchor (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <p className="text-[rgba(255,255,255,0.8)] text-[18px] leading-relaxed">
            In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-white text-[24px] font-bold mb-6">What are cookies?</h2>
          <p className="text-[rgba(255,255,255,0.8)] text-[16px] leading-relaxed mb-4">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </section>

        <section className="mb-12 overflow-hidden">
          <h2 className="text-white text-[24px] font-bold mb-6">Types of Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-4 text-white font-bold border-b border-white/10">Cookie Name</th>
                  <th className="text-left p-4 text-white font-bold border-b border-white/10">Type</th>
                  <th className="text-left p-4 text-white font-bold border-b border-white/10">Purpose</th>
                  <th className="text-left p-4 text-white font-bold border-b border-white/10">Duration</th>
                </tr>
              </thead>
              <tbody>
                {cookieData.map((cookie, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-[#4a9eff] font-mono text-[14px]">{cookie.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[12px] font-bold uppercase tracking-wider ${
                        cookie.type === 'Essential' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {cookie.type}
                      </span>
                    </td>
                    <td className="p-4 text-[rgba(255,255,255,0.7)] text-[14px]">{cookie.purpose}</td>
                    <td className="p-4 text-[rgba(255,255,255,0.6)] text-[14px]">{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-white text-[24px] font-bold mb-6">How can I control cookies?</h2>
          <p className="text-[rgba(255,255,255,0.8)] text-[16px] leading-relaxed mb-6">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Banner that appeared on your first visit to our site.
          </p>
          <p className="text-[rgba(255,255,255,0.8)] text-[16px] leading-relaxed">
            Essential cookies cannot be rejected as they are strictly necessary to provide you with services. If you have any questions about our use of cookies or other technologies, please contact us.
          </p>
        </section>
      </div>
    </main>
  );
}
