const http = require('http');

const url = 'http://localhost:3000/domains/blueyonder-training';

http.get(url, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Content-Length:', body.length, 'bytes');
    
    // Check key content markers
    const checks = [
      ['Title tag',             body.includes('Blue Yonder')],
      ['Stream cards section',  body.includes('Specialized Training Streams') || body.includes('Training Streams')],
      ['MMS stream',            body.includes('MMS')],
      ['TMS stream',            body.includes('TMS')],
      ['WMS stream',            body.includes('WMS')],
      ['Demand Planning',       body.includes('Demand Planning')],
      ['Labor Management',      body.includes('Labor Management')],
      ['Luminate',              body.includes('Luminate')],
      ['No MaxMunus leak',      !body.includes('MaxMunus')],
      ['GapAnchor present',     body.includes('GapAnchor')],
    ];
    
    let allPassed = true;
    checks.forEach(([label, result]) => {
      const icon = result ? '✅' : '❌';
      if (!result) allPassed = false;
      console.log(`  ${icon} ${label}`);
    });
    
    console.log('\n' + (allPassed ? '🎉 All checks passed!' : '⚠  Some checks failed.'));
  });
}).on('error', err => {
  console.error('Request failed:', err.message);
});
