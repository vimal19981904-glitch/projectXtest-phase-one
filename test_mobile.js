const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 375, height: 812});
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    console.log('Navigating...');
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
    
    console.log('Page loaded. Clicking menu...');
    await page.click('button[aria-label="Toggle menu"]');
    
    console.log('Waiting for animation...');
    await new Promise(r => setTimeout(r, 1000));
    
    const content = await page.content();
    console.log('DOM contains mobile menu?', content.includes('Search Catalog'));
    
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
