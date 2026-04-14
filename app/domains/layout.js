import { domainData } from '@/lib/domainData';
import SidebarClient from './SidebarClient';

export default function DomainsLayout({ children }) {
  return (
    <div className="bg-[#F5F5F7] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - persists across route changes */}
      <SidebarClient domainData={domainData} />
      
      {/* Main Content Area */}
      <main className="flex-1 bg-white ml-0 md:ml-0 md:border-l border-[#D2D2D7] min-h-[calc(100vh-64px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
