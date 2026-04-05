import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/* ---------- helpers ---------- */

export async function saveLead(email) {
  if (!supabase) return console.warn('Supabase not configured');
  return supabase.from('leads').insert({ email });
}

export async function saveBooking({ fullName, phone, serviceType, message }) {
  if (!supabase) return console.warn('Supabase not configured');
  return supabase
    .from('bookings')
    .insert({ full_name: fullName, phone, service_type: serviceType, message });
}

export async function saveChat(userMessage, botResponse) {
  if (!supabase) return console.warn('Supabase not configured');
  return supabase
    .from('chats')
    .insert({ user_message: userMessage, bot_response: botResponse });
}

export async function trackVisitor(userAgent) {
  if (!supabase) return console.warn('Supabase not configured');
  return supabase.from('visitors').insert({ user_agent: userAgent });
}
