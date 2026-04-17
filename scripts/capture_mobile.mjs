import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function capture() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to iPhone 12 Pro sizing (390 x 844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  try {
    // Navigate to localhost homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Define artifacts dir
    const artifactsDir = `C:\\Users\\ARUL XAVIER\\.gemini\\antigravity\\brain\\1fe3eb3c-d543-47d6-bb95-b70214699dd1`;
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }

    // 1. Hero Section Screenshot
    const heroPath = path.join(artifactsDir, 'mobile_preview_hero.png');
    await page.screenshot({ path: heroPath });
    console.log('Captured mobile Hero Section preview.');

    // 2. Scroll to Service Plans and take screenshot
    await page.evaluate(() => {
      window.scrollBy(0, 1500);
    });
    await new Promise(r => setTimeout(r, 1000)); // wait for scroll/animations
    const servicePath = path.join(artifactsDir, 'mobile_preview_service.png');
    await page.screenshot({ path: servicePath });
    console.log('Captured mobile Service Cards preview.');

    // 3. Scroll to Footer to see WhatsApp link and ChatWidget
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 1000)); // wait for scroll/animations
    const footerPath = path.join(artifactsDir, 'mobile_preview_footer.png');
    await page.screenshot({ path: footerPath });
    console.log('Captured mobile Footer preview.');

  } catch (err) {
    console.error("Error capturing preview: ", err.message);
  } finally {
    await browser.close();
  }
}

capture();
