import { Suspense } from 'react';
import ManhattanWMSContent from '@/components/ManhattanWMSContent';

export const metadata = {
  title: 'Manhattan WMS Training — Project X',
  description: 'Master Manhattan WMS with our expert-led certification program. Detailed modules on Inbound, Outbound, Inventory, and Labor Management.',
};

export default function ManhattanWMSPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1D1D1F] flex items-center justify-center text-white">Loading Course...</div>}>
      <ManhattanWMSContent />
    </Suspense>
  );
}
