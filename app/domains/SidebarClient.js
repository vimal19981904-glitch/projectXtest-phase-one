'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LayoutList, X, BookOpen, PanelLeftClose, PanelLeft } from 'lucide-react';
import { getDomainIcon, ICON_PROPS } from '@/lib/iconMap';

const SidebarContent = ({ domainData, openCategories, toggleCategory, pathname, setMobileSidebarOpen, collapsed, setCollapsed }) => (
  <div className="sidebar-premium py-6 px-3 h-full flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between mb-6 px-2">
      {!collapsed && (
        <h2 className="text-[11px] font-bold text-[#808090] uppercase tracking-[0.15em]">Domains</h2>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer text-[#808090] hover:text-white hover:bg-white/5 transition-all duration-200"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <PanelLeft size={18} strokeWidth={1.75} /> : <PanelLeftClose size={18} strokeWidth={1.75} />}
      </button>
    </div>

    {/* Domain list */}
    <div className="flex-1 overflow-y-auto sidebar-scrollbar flex flex-col gap-1">
      {domainData.map((d) => {
        const isOpen = openCategories[d.category] || false;
        const IconComponent = getDomainIcon(d.category);
        const hasActiveSub = d.sub_domains.some(sub => pathname === sub.href);

        return (
          <div key={d.category} className="flex flex-col">
            <button
              onClick={() => toggleCategory(d.category)}
              className={`sidebar-category-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-none cursor-pointer transition-all duration-200 relative group ${
                isOpen
                  ? 'bg-white/[0.08] text-white'
                  : hasActiveSub
                    ? 'bg-white/[0.04] text-[#c0c0d0]'
                    : 'bg-transparent text-[#909098] hover:bg-white/[0.05] hover:text-[#d0d0d8]'
              }`}
              title={collapsed ? d.category : undefined}
            >
              {/* Active indicator bar */}
              {(isOpen || hasActiveSub) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#3b82f6] rounded-r-full" />
              )}

              <span className={`flex-shrink-0 transition-all duration-200 ${
                isOpen ? 'text-[#60a5fa]' : hasActiveSub ? 'text-[#60a5fa]/70' : 'text-[#707078] group-hover:text-[#a0a0a8]'
              }`}>
                <IconComponent {...ICON_PROPS} />
              </span>

              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-[13px] font-semibold truncate">{d.category}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#60a5fa]' : 'text-[#505058]'
                  }`} />
                </>
              )}
            </button>

            {/* Expandable subdomain list */}
            {!collapsed && (
              <div
                className={`sidebar-subdomain-list overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[2000px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col gap-0.5 pl-2 ml-5 border-l border-white/[0.06]">
                  {d.sub_domains.map(sub => {
                    const isActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`sidebar-subdomain-link px-3 py-[7px] rounded-lg text-[13px] no-underline transition-all duration-200 ${
                          isActive
                            ? 'bg-[#3b82f6]/15 text-[#60a5fa] font-semibold'
                            : 'text-[#78787f] hover:text-[#c0c0c8] hover:bg-white/[0.04]'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default function SidebarClient({ domainData }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Auto-expand the category that contains the currently active subdomain
  useEffect(() => {
    domainData.forEach((category) => {
      const isActive = category.sub_domains.some(sub => pathname.includes(sub.href));
      if (isActive) {
        setOpenCategories(prev => ({ ...prev, [category.category]: true }));
      }
    });
  }, [pathname, domainData]);

  const toggleCategory = (categoryName) => {
    // If collapsed, expand first then open category
    if (collapsed) {
      setCollapsed(false);
      setOpenCategories(prev => ({ ...prev, [categoryName]: true }));
      return;
    }
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <>
      {/* Mobile Top Bar to Open Sidebar */}
      <div className="md:hidden w-full bg-[#0e0e12] border-b border-white/[0.06] p-4 flex items-center justify-between sticky top-[56px] z-30">
        <span className="font-bold text-white/90 flex items-center gap-2 text-[14px]">
          <BookOpen className="w-4 h-4 text-[#60a5fa]" />
          Domain Directory
        </span>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="bg-white/[0.06] p-2.5 rounded-lg border-none cursor-pointer"
        >
          <LayoutList className="w-5 h-5 text-white/80" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#0e0e12] sticky top-[64px] h-[calc(100vh-64px)] flex-shrink-0 z-10 border-r border-white/[0.06] transition-all duration-300 ${
          collapsed ? 'w-[64px]' : 'w-[280px]'
        }`}
      >
        <SidebarContent
          domainData={domainData}
          openCategories={collapsed ? {} : openCategories}
          toggleCategory={toggleCategory}
          pathname={pathname}
          setMobileSidebarOpen={setMobileSidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#0e0e12] shadow-2xl transition-transform animate-[slideInLeft_0.3s_ease]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <span className="text-[13px] font-bold text-white/70 uppercase tracking-wider">Domains</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="bg-transparent border-none p-2 cursor-pointer rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
            <div className="h-[calc(100vh-64px)] overflow-y-auto">
              <SidebarContent
                domainData={domainData}
                openCategories={openCategories}
                toggleCategory={toggleCategory}
                pathname={pathname}
                setMobileSidebarOpen={setMobileSidebarOpen}
                collapsed={false}
                setCollapsed={setCollapsed}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
