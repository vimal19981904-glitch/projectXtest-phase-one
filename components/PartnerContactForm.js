'use client';

import { useState } from 'react';
import { sendPartnerInquiry } from '@/lib/emailjs';
import { domainData } from '@/lib/domainData';


export default function PartnerContactForm() {
  const [form, setForm] = useState({
    workEmail: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    businessPhone: '',
    website: '',
    country: 'United States',
    publicOrPrivate: '',
    totalEmployees: '',
    targetMarket: '',
    mutualCustomers: '',
    annualRevenue: '',
    primaryDomain: '',
    primaryServiceOffering: '',
    productInterest: [],
    businessDescription: '',
    subscribe: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setForm((prev) => ({ ...prev, productInterest: options }));
  };

  const activeSubDomains = domainData.find(d => d.category === form.primaryDomain)?.sub_domains || [];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendPartnerInquiry(form);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#f9fafb] p-12 text-center border-t-4 border-[#000000] animate-[fadeIn_0.5s_ease]">
        <h3 className="text-[28px] font-bold text-black mb-4">Thank You</h3>
        <p className="text-[16px] text-gray-700">
          Your inquiry has been sent to our Partner team. Someone will be in contact with you shortly.
        </p>
      </div>
    );
  }

  // Common input classes for the "minimalist bottom border" look
  const inputClass = "w-full bg-transparent border-0 border-b border-black rounded-none px-0 py-2 text-[14px] font-medium text-black outline-none focus:border-black focus:ring-0 placeholder-gray-500 transition-colors";
  const labelClass = "block text-[12px] font-bold text-black mb-1 mt-6";

  return (
    <div className="bg-[#fcfcfc] border border-gray-100 shadow-sm p-8 md:p-12">
      <h2 className="text-[32px] md:text-[36px] font-bold text-black mb-2 tracking-tight">Contact The Partner Team to Learn More</h2>
      <p className="text-[14px] text-gray-800 mb-8 font-medium">Complete the form below and someone from the Partner team will be in contact with you.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className={labelClass}>Work Email *</label>
          <input type="email" required value={form.workEmail} onChange={update('workEmail')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>First Name *</label>
          <input type="text" required value={form.firstName} onChange={update('firstName')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Last Name *</label>
          <input type="text" required value={form.lastName} onChange={update('lastName')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Job Title *</label>
          <input type="text" required value={form.jobTitle} onChange={update('jobTitle')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Business Phone *</label>
          <input type="tel" required value={form.businessPhone} onChange={update('businessPhone')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Website *</label>
          <input type="text" required value={form.website} onChange={update('website')} className={inputClass} placeholder="e.g. optum.com" />
        </div>

        <div>
          <label className={labelClass}>Country *</label>
          <select required value={form.country} onChange={update('country')} className={inputClass}>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Public or Private: *</label>
          <select required value={form.publicOrPrivate} onChange={update('publicOrPrivate')} className={inputClass}>
            <option value="" disabled>Select...</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Total Employees: *</label>
          <select required value={form.totalEmployees} onChange={update('totalEmployees')} className={inputClass}>
            <option value="" disabled>Select...</option>
            <option value="1-50">1-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Target Market: *</label>
          <select required value={form.targetMarket} onChange={update('targetMarket')} className={inputClass}>
            <option value="" disabled>Select...</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="SMB">SMB</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Number of Mutual Customers: *</label>
          <select required value={form.mutualCustomers} onChange={update('mutualCustomers')} className={inputClass}>
            <option value="" disabled>Select...</option>
            <option value="0">0</option>
            <option value="1-5">1-5</option>
            <option value="6-20">6-20</option>
            <option value="20+">20+</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Annual Revenue: *</label>
          <input type="text" required value={form.annualRevenue} onChange={update('annualRevenue')} className={inputClass} placeholder="e.g. 10000000" />
        </div>

        <div>
          <label className={labelClass}>Primary Service Offering: *</label>
          <input type="text" required value={form.primaryServiceOffering} onChange={update('primaryServiceOffering')} className={inputClass} />
        </div>

        <div className="pt-6">
          <label className={labelClass}>Primary Domain: *</label>
          <select required value={form.primaryDomain} onChange={(e) => {
            update('primaryDomain')(e);
            setForm(prev => ({ ...prev, productInterest: [] })); // Reset sub-domains when primary changes
          }} className={inputClass}>
            <option value="" disabled>Select Primary Domain...</option>
            {domainData.map(d => (
              <option key={d.category} value={d.category}>{d.category}</option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <label className={labelClass}>Specific Programs / Sub-domains: *</label>
          <select 
            multiple 
            required 
            value={form.productInterest} 
            onChange={handleMultiSelect} 
            className="w-full bg-gray-200/40 border border-gray-300 rounded-sm p-2 text-[14px] text-black h-40 outline-none focus:border-black"
            disabled={!form.primaryDomain}
          >
            {activeSubDomains.map(sub => (
              <option key={sub.name} value={sub.name}>{sub.name}</option>
            ))}
          </select>
          <p className="text-[11px] text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
        </div>

        <div className="pt-4">
          <label className={labelClass}>Business Description: *</label>
          <textarea 
            required 
            value={form.businessDescription} 
            onChange={update('businessDescription')} 
            className={`${inputClass} resize-none`} 
            rows={2} 
          />
        </div>

        <div className="flex items-start gap-3 pt-6 mb-8">
          <input 
            type="checkbox" 
            id="subscribe" 
            checked={form.subscribe} 
            onChange={update('subscribe')} 
            className="mt-1 w-4 h-4 rounded-sm border-2 border-black text-black focus:ring-0 cursor-pointer accent-black" 
          />
          <label htmlFor="subscribe" className="text-[13px] font-bold text-black cursor-pointer leading-tight">
            I'd like to receive additional information from GapAnchor, including product, service and event information.
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 mb-6">
            <p className="text-[13px] text-red-600 font-bold">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black border-2 border-black font-bold text-[14px] px-8 py-3 hover:bg-black hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
