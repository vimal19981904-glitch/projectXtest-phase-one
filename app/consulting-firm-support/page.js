import PartnerContactForm from '@/components/PartnerContactForm';
import Link from 'next/link';

export const metadata = {
  title: 'Contact The Partner Team | GapAnchor',
  description: 'Complete the form below and someone from the GapAnchor Partner team will be in contact with you.',
};

export default function ConsultingFirmSupportPage() {
  return (
    <div className="bg-[#f2f2f2] min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors no-underline">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Contact The Partner Team</span>
        </div>
      </div>
      
      <div className="max-w-[800px] mx-auto px-6">
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-sm">
          <PartnerContactForm />
        </div>
      </div>
    </div>
  );
}
