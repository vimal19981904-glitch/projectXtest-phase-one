const payload = {
  service_id: 'service_txr27fk',
  template_id: 'NEXT_PUBLIC_EMAILJS_TEMP',
  user_id: 'ItLopAW7qxKU7jacO',
  template_params: {
    subject: 'TEST FROM NODE',
    message_details: 'Testing the API from local script',
    timestamp: new Date().toLocaleString()
  }
};

fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://project-xtest-phase-one.vercel.app',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
  body: JSON.stringify(payload)
})
  .then(async res => {
    console.log('Status:', res.status);
    console.log('Response:', await res.text());
  })
  .catch(console.error);
