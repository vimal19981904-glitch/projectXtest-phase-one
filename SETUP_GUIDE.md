# GapAnchor — Setup & Deployment Guide

## 1. Prerequisites
- Node.js 18+ installed
- A free [Supabase](https://supabase.com) account
- A free [EmailJS](https://www.emailjs.com) account
- A free [Vercel](https://vercel.com) account

---

## 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Note your **Project URL** and **anon public key** from **Settings → API**
3. Open **SQL Editor** and run the contents of `supabase-setup.sql`
4. Add the URL and key to your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 3. EmailJS Setup

1. Go to [emailjs.com](https://www.emailjs.com) → **Sign Up** (free: 200 emails/month)
2. **Add Email Service** (Gmail/Outlook) → note the **Service ID**
3. Create 3 email templates:

### Template 1: LEAD_ALERT
- Template ID: `template_lead_alert`
- Subject: `NEW LEAD CAPTURED`
- Body: `New lead captured: {{email}}`

### Template 2: TRAINING
- Template ID: `template_training`  
- Subject: `NEW TRAINING DEMO REQUEST`
- Body: `Name: {{full_name}}, Phone: {{phone}}, Message: {{message}}`

### Template 3: JOB_SUPPORT
- Template ID: `template_job_support`
- Subject: `NEW JOB SUPPORT INQUIRY`
- Body: `Name: {{full_name}}, Phone: {{phone}}, Message: {{message}}`

4. Go to **Account → API Keys** → note your **Public Key**
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key
   ```

---

## 4. WhatsApp Setup

Update the WhatsApp number in `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=919052403388
```
Format: country code + number, no + sign.

---

## 5. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 6. Deploy to Vercel

### Option A: CLI
```bash
npm i -g vercel
vercel
```

### Option B: GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import Project**
3. Select your repo
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Deploy!

---

## 7. Project Structure

```
├── app/
│   ├── globals.css          # Apple design system + Tailwind
│   ├── layout.js            # Root layout (nav, footer, chat)
│   ├── page.js              # Homepage
│   ├── job-support/page.js  # Job Support page
│   ├── manhattan-wms/page.js # Manhattan WMS course page
│   └── work-with-us/page.js # Corporate training page
├── components/
│   ├── Navbar.js            # Apple-style frosted glass nav
│   ├── Footer.js            # Site footer
│   ├── BookingForm.js       # Booking form + thank-you screen
│   ├── ChatWidget.js        # Amy Spain FAQ chat bot
│   └── EmailGateModal.js    # Email capture modal
├── lib/
│   ├── supabase.js          # Supabase client + helpers
│   ├── emailjs.js           # EmailJS wrapper
│   └── chatbot.js           # FAQ keyword bot logic
├── supabase-setup.sql       # Database schema
└── .env.local               # Environment variables
```
