import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
/* We now use a single dynamic template ID to save on EmailJS free-tier template limits */
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_dynamic';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

async function sendDynamicEmail(subject, detailsBlock) {
  // Enhanced detail logging for production debugging
  console.log('EmailJS: Attempting to send dynamic email...', { subject });

  if (!SERVICE_ID || !PUBLIC_KEY || !TEMPLATE_ID) {
    const missing = [];
    if (!SERVICE_ID) missing.push('SERVICE_ID');
    if (!TEMPLATE_ID) missing.push('TEMPLATE_ID');
    if (!PUBLIC_KEY) missing.push('PUBLIC_KEY');

    throw new Error(`EmailJS Configuration Missing: ${missing.join(', ')}`);
  }

  // Allow placeholders but log a heavy warning (don't block, let the 400 error happen so it's visible in console)
  if (TEMPLATE_ID.includes('YOUR_ACTUAL_ID')) {
    console.warn('CRITICAL: EmailJS Template ID is still a placeholder. This submission WILL fail.');
  }

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      subject: subject,
      message_details: detailsBlock,
      timestamp: new Date().toLocaleString(),
    }, PUBLIC_KEY);

    console.log('EmailJS Success:', result.status, result.text);
    return result;
  } catch (err) {
    console.error('EmailJS Send Failed:', err);
    throw err; // Re-throw to allow component to handle the error state
  }
}

export function sendLeadAlert(email) {
  const details = `Email: ${email}`;
  return sendDynamicEmail('NEW LEAD CAPTURED', details);
}

export function sendTrainingRequest({ fullName, phone, message }) {
  const details = `Name: ${fullName}\nPhone: ${phone}\nMessage: ${message || 'No message provided'}`;
  return sendDynamicEmail('NEW TRAINING DEMO REQUEST', details);
}

export function sendJobSupportRequest({ fullName, phone, message }) {
  const details = `Name: ${fullName}\nPhone: ${phone}\nMessage: ${message || 'No message provided'}`;
  return sendDynamicEmail('NEW JOB SUPPORT INQUIRY', details);
}

export function getWhatsAppUrl(serviceType = '') {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const text = encodeURIComponent(
    `Hi, I would like to enquire about ${serviceType || 'your services'}`
  );
  return `https://wa.me/${number}?text=${text}`;
}
