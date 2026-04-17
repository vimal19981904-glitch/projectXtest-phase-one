const payloads = [
  {
    name: "Valid Template ID",
    data: {
      service_id: 'service_txr27fk',
      template_id: 'NEXT_PUBLIC_EMAILJS_TEMP',
      user_id: 'ItLopAW7qxKU7jacO',
      template_params: { subject: 'TEST', message_details: 'TEST' }
    }
  },
  {
    name: "Fallback Template ID (template_dynamic)",
    data: {
      service_id: 'service_txr27fk',
      template_id: 'template_dynamic',
      user_id: 'ItLopAW7qxKU7jacO',
      template_params: { subject: 'TEST', message_details: 'TEST' }
    }
  }
];

async function runTests() {
  for (const p of payloads) {
    console.log(`\nTesting: ${p.name}`);
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://project-xtest-phase-jy1871wmj-vimal19981904-9737s-projects.vercel.app'
        },
        body: JSON.stringify(p.data)
      });
      console.log('Status:', res.status);
      console.log('Response:', await res.text());
    } catch (err) {
      console.error(err);
    }
  }
}
runTests();
