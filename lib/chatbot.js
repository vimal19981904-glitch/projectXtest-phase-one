/**
 * Amy Spain FAQ Bot — pure keyword matching, zero external APIs.
 */

const FAQ_RULES = [
  {
    keywords: ['price', 'cost', 'fee', 'pricing', 'amount', 'charge'],
    response:
      "Our Monthly Plan starts at an affordable rate with daily 1–2 hour support. Click 'Get Pricing' for full details!",
  },
  {
    keywords: ['syllabus', 'course', 'topics', 'learn', 'content', 'wms', 'manhattan', 'curriculum'],
    response:
      "We cover Manhattan WMS end-to-end — basics to advanced configuration. Click 'View Syllabus' to see the full breakdown.",
  },
  {
    keywords: ['job', 'support', 'work', 'project', 'task', 'assignment'],
    response:
      'Our Job Support helps you with live tasks and assignments at work. Monthly and task-based plans available!',
  },
  {
    keywords: ['demo', 'trial', 'free', 'try', 'session', 'sample'],
    response:
      'Yes! Book a free demo — fill the booking form and our consultant will call you shortly.',
  },
  {
    keywords: ['contact', 'call', 'phone', 'reach', 'whatsapp', 'email'],
    response:
      'Reach us on WhatsApp or phone from the contact bar at the top of the page.',
  },
  {
    keywords: ['trainer', 'catalina', 'who', 'instructor', 'experience', 'teacher'],
    response:
      'Catalina is our lead trainer with 10+ years of WMS implementation experience across global clients.',
  },
  {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
    response:
      "Hello! 👋 I'm Catalina. How can I help you today? Ask me about courses, pricing, job support, or anything else!",
  },
];

const DEFAULT_RESPONSE =
  'Great question! Fill in the booking form and our consultant will get back to you with full details.';

export function getBotResponse(userMessage) {
  const lower = userMessage.toLowerCase().trim();

  for (const rule of FAQ_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }

  return DEFAULT_RESPONSE;
}
