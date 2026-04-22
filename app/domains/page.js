'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DomainsIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/domains/manhattan-wms-training');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <div className="animate-pulse text-[#86868B] font-medium">Redirecting...</div>
    </div>
  );
}
