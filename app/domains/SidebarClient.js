'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, BookOpen } from 'lucide-react';


const SidebarContent = ({ domainData, openCategories, toggleCategory, pathname, setMobileSidebarOpen }) => (
  <div className="py-8 px-4 h-full flex flex-col">
    <div className="mb-6 px-3">
      <h2 className="text-[14px] font-bold text-[#86868B] uppercase tracking-wider">Our Domains</h2>
    </div>
    
    <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2">
      {domainData.map((d) => {
        const isOpen = openCategories[d.category] || false;
        
        return (
          <div key={d.category} className="flex flex-col">
            <button
              onClick={() => toggleCategory(d.category)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-none cursor-pointer transition-colors ${
                isOpen ? 'bg-[#E8E8ED] text-[#1D1D1F]' : 'bg-transparent text-[#1D1D1F] hover:bg-[#E8E8ED]/50'
              }`}
            >
              <span className="flex items-center gap-3 font-semibold text-[15px]">
                <span>{d.icon}</span> {d.category}
              </span>
              <ChevronDown className={`w-4 h-4 text-[#86868B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div 
              className={`flex-col gap-1 mt-1 mb-3 ${
                 isOpen ? 'flex' : 'hidden'
              }`}
            >
              {d.sub_domains.map(sub => {
                const isActive = pathname === sub.href;
                return (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`ml-9 mr-2 px-3 py-2 rounded-md text-[14px] no-underline transition-colors ${
                      isActive 
                        ? 'bg-[#0071E3]/10 text-[#0071E3] font-semibold' 
                        : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
                    }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    
    {/* Hide scrollbar styles locally */}
    <style jsx global>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  </div>
);

export default function SidebarClient({ domainData }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <>
      {/* Mobile Top Bar to Open Sidebar */}
      <div className="md:hidden w-full bg-white border-b border-[#D2D2D7] p-4 flex items-center justify-between sticky top-[56px] z-30 shadow-sm">
         <span className="font-bold text-[#1D1D1F] flex items-center gap-2">
           <BookOpen className="w-5 h-5 text-[#0071E3]" />
           Domain Directory
         </span>
         <button 
           onClick={() => setMobileSidebarOpen(true)}
           className="bg-[#F5F5F7] p-2 rounded-md border-none cursor-pointer"
         >
           <Menu className="w-5 h-5 text-[#1D1D1F]" />
         </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-[320px] bg-[#F5F5F7] sticky top-[64px] h-[calc(100vh-64px)] flex-shrink-0 z-10 border-r border-[#D2D2D7]/50">
         <SidebarContent 
           domainData={domainData}
           openCategories={openCategories}
           toggleCategory={toggleCategory}
           pathname={pathname}
           setMobileSidebarOpen={setMobileSidebarOpen}
         />
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileSidebarOpen(false)}>
           <div 
             className="absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-[#F5F5F7] shadow-2xl transition-transform animate-[slideInRight_0.3s_ease]"
             onClick={e => e.stopPropagation()}
           >
             <div className="flex justify-end p-4 border-b border-[#D2D2D7]">
               <button 
                 onClick={() => setMobileSidebarOpen(false)}
                 className="bg-transparent border-none p-2 cursor-pointer rounded-full hover:bg-black/5"
               >
                 <X className="w-6 h-6 text-[#1D1D1F]" />
               </button>
             </div>
             <div className="h-[calc(100vh-80px)]">
               <SidebarContent 
                 domainData={domainData}
                 openCategories={openCategories}
                 toggleCategory={toggleCategory}
                 pathname={pathname}
                 setMobileSidebarOpen={setMobileSidebarOpen}
               />
             </div>
           </div>
        </div>
      )}
    </>
  );
}
