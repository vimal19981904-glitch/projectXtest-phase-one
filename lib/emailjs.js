import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
/* We now use a single dynamic template ID to save on EmailJS free-tier template limits */
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_dynamic';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

async function sendDynamicEmail(subject, detailsBlock) {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured — skipping email');
    return;
  }
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      subject: subject,           
      message_details: detailsBlock, 
      timestamp: new Date().toLocaleString(),
    }, PUBLIC_KEY);
  } catch (err) {
    console.error('EmailJS send failed:', err);
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
