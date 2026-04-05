'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (isAuth === 'true') {
      setAuthorized(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'projectx2026') {
      sessionStorage.setItem('adminAuth', 'true');
      setAuthorized(true);
      fetchData();
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setAuthorized(false);
  };

  const fetchData = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const [leadsRes, bookingsRes] = await Promise.all([
        supabase.from('leads').select('*').order('captured_at', { ascending: false }).limit(50),
        supabase.from('bookings').select('*').order('booked_at', { ascending: false }).limit(50)
      ]);
      setLeads(leadsRes.data || []);
      setBookings(bookingsRes.data || []);
    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#1D1D1F] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px] bg-white rounded-[18px] p-10 shadow-2xl animate-[slideUp_0.4s_ease]">
          <h1 className="text-[24px] font-bold text-[#1D1D1F] mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[#1D1D1F]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="apple-input"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-accent-red text-[13px]">{error}</p>}
            <button type="submit" className="btn-primary w-full h-[48px] text-[15px] font-semibold">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#D2D2D7] h-[64px] mb-8 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[#1D1D1F]">Project X Admin</h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className="btn-secondary !py-2 !px-4 !text-[13px]">Refresh Data</button>
            <button onClick={handleLogout} className="btn-primary !bg-[#FF3B30] !hover:bg-[#FF3B30]/90 !py-2 !px-4 !text-[13px]">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-[12px] p-6 border border-[#D2D2D7]/50">
            <p className="text-[#6E6E73] text-[13px] font-semibold mb-1">Total Leads</p>
            <h2 className="text-[28px] font-bold text-[#1D1D1F]">{leads.length}</h2>
          </div>
          <div className="bg-white rounded-[12px] p-6 border border-[#D2D2D7]/50">
            <p className="text-[#6E6E73] text-[13px] font-semibold mb-1">Total Bookings</p>
            <h2 className="text-[28px] font-bold text-[#1D1D1F]">{bookings.length}</h2>
          </div>
          <div className="bg-white rounded-[12px] p-6 border border-[#D2D2D7]/50">
            <p className="text-[#6E6E73] text-[13px] font-semibold mb-1">Latest Lead</p>
            <h2 className="text-[14px] font-bold text-[#1D1D1F] truncate">{leads[0]?.email || 'None'}</h2>
          </div>
          <div className="bg-white rounded-[12px] p-6 border border-[#D2D2D7]/50">
            <p className="text-[#6E6E73] text-[13px] font-semibold mb-1">Latest Booking</p>
            <h2 className="text-[14px] font-bold text-[#1D1D1F] truncate">{bookings[0]?.full_name || 'None'}</h2>
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-12">
          {/* Table 1: Leads */}
          <section>
            <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-4">Lead Capture Log</h2>
            <div className="apple-card overflow-hidden !p-0 border border-[#D2D2D7]/50">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#1D1D1F]/5">
                    <tr>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Captured At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D2D2D7]/30">
                    {leads.length > 0 ? leads.map((lead, i) => (
                      <tr key={lead.id} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4 text-[14px] text-[#6E6E73]">{i + 1}</td>
                        <td className="px-6 py-4 text-[14px] text-[#1D1D1F] font-medium">{lead.email}</td>
                        <td className="px-6 py-4 text-[14px] text-[#6E6E73]">{new Date(lead.captured_at).toLocaleString()}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="3" className="px-6 py-10 text-center text-[#6E6E73]">No records yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Table 2: Bookings */}
          <section>
            <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-4">Demo Bookings Log</h2>
            <div className="apple-card overflow-hidden !p-0 border border-[#D2D2D7]/50">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#1D1D1F]/5">
                    <tr>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1D1D1F] uppercase tracking-wider">Booked At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D2D2D7]/30">
                    {bookings.length > 0 ? bookings.map((book, i) => (
                      <tr key={book.id} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4 text-[14px] text-[#6E6E73]">{i + 1}</td>
                        <td className="px-6 py-4 text-[14px] text-[#1D1D1F] font-bold">{book.full_name}</td>
                        <td className="px-6 py-4 text-[14px] text-[#1D1D1F]">{book.phone}</td>
                        <td className="px-6 py-4 text-[14px] text-[#0071E3] font-medium">{book.service_type}</td>
                        <td className="px-6 py-4 text-[14px] text-[#6E6E73] max-w-xs truncate">{book.message || '-'}</td>
                        <td className="px-6 py-4 text-[14px] text-[#6E6E73]">{new Date(book.booked_at).toLocaleString()}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" className="px-6 py-10 text-center text-[#6E6E73]">No records yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
