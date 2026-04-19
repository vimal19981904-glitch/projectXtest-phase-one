const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    console.log('Finding Job Support & Training...');
    const trigger = await page.waitForSelector('button ::-p-text("Job Support & Training")');
    await trigger.hover();
    await new Promise(r => setTimeout(r, 2000));

    console.log('Finding Enterprise SaaS...');
    const saas = await page.waitForSelector('span ::-p-text("Enterprise SaaS")');
    await saas.hover();
    await new Promise(r => setTimeout(r, 2000));

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'preview_megamenu.png' });
    
    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
