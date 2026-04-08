import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function capture() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  try {
    // Navigate to localhost homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // The artifact directory
    const artifactsDir = `C:\\Users\\ARUL XAVIER\\.gemini\\antigravity\\brain\\f2324bda-fa93-4703-ae37-c8b9aa079de1`;
    
    // Take front page screenshot
    const homePath = path.join(artifactsDir, 'preview-home.png');
    await page.screenshot({ path: homePath });
    console.log('Captured homepage preview.');
    
    // Open the mega menu
    // We updated the trigger in NavMegaMenu to show on hover of "Project Training" button
    // Let's search for the button using aria-label or just text content
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const trainingBtn = btns.find(b => b.innerText.includes('Project Training'));
      if(trainingBtn) {
        // Trigger hover event
        const event = new MouseEvent('mouseenter', { view: window, bubbles: true, cancelable: true });
        trainingBtn.dispatchEvent(event);
      }
    });

    // wait for mega menu animation to open
    await new Promise(r => setTimeout(r, 1000));
    
    const megaMenuPath = path.join(artifactsDir, 'preview-megamenu.png');
    await page.screenshot({ path: megaMenuPath });
    console.log('Captured mega menu preview.');

  } catch (err) {
    console.log("Error capturing preview: ", err.message);
  } finally {
    await browser.close();
  }
}

capture();
