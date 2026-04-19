const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    console.log('Navigating...');
    await page.goto('http://localhost:3000');
    await new Promise(r => setTimeout(r, 5000));

    console.log('Clicking Trigger...');
    // Use coordinates if selectors fail
    await page.mouse.move(500, 40);
    await new Promise(r => setTimeout(r, 1000));

    console.log('Screenshot...');
    await page.screenshot({ path: 'preview_full.png' });
    
    await browser.close();
    console.log('Done');
  } catch (err) {
    console.error(err);
  }
})();
