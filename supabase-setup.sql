-- ============================================
-- PROJECT X — SUPABASE DATABASE SETUP
-- Run this in the Supabase SQL Editor
-- ============================================

-- Visitor tracking
create table if not exists visitors (
  id uuid default gen_random_uuid() primary key,
  visited_at timestamp default now(),
  user_agent text
);

-- Lead capture (email gate)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  captured_at timestamp default now()
);

-- Booking/demo requests 
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  full_name text,
  phone text,
  service_type text,
  message text,
  booked_at timestamp default now()
);

-- Chat logs (Amy Spain bot)
create table if not exists chats (
  id uuid default gen_random_uuid() primary key,
  user_message text,
  bot_response text,
  sent_at timestamp default now()
);

-- Enable Row Level Security (optional but recommended)
alter table visitors enable row level security;
alter table leads enable row level security;
alter table bookings enable row level security;
alter table chats enable row level security;

-- Allow anonymous inserts (needed for client-side writes)
create policy "Allow anonymous insert" on visitors for insert with check (true);
create policy "Allow anonymous insert" on leads for insert with check (true);
create policy "Allow anonymous insert" on bookings for insert with check (true);
create policy "Allow anonymous insert" on chats for insert with check (true);
