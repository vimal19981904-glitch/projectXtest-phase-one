import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Define the URLs we want to scrape for the current job
const links = JSON.parse(fs.readFileSync('analytics_links_dump.json', 'utf-8'));

// Filter links that are actually courses - for Analytics domain, typically courses are the ones after line 107
// Since maxmunus URLs don't have a clear pattern, we manually select a subset from the dump for this batch
// Let's scrape the first 3 from Analytics to prove the script works perfectly
const coursesToScrape = links.filter(l => l.url && l.title && l.title.toLowerCase().includes('training') && !l.url.includes('/Services') && !l.url.includes('Online-Training')).slice(0, 3);

async function scrapeDomainCourses(domainName) {
  console.log(`Starting extraction for ${domainName}. Found ${coursesToScrape.length} target courses to test.`);
  
  const publicAuditDir = path.join(process.cwd(), 'public', 'maxmunus-audit');
  if (!fs.existsSync(publicAuditDir)) {
    fs.mkdirSync(publicAuditDir, { recursive: true });
  }

  const outputDir = path.join(process.cwd(), 'extracted_courses', domainName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: true });
  
  for (const course of coursesToScrape) {
    console.log(`\nProcessing: ${course.title} - ${course.url}`);
    
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(course.url, { waitUntil: 'load', timeout: 60000 });
      
      // Attempt to wait for curriculum or body sections to load
      await new Promise(r => setTimeout(r, 3000));
      
      // 1. EXTRACT DATA
      const courseData = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || '';
        
        // Extract paragraphs in main content
        const pTags = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t.length > 50);
        const description = pTags.slice(0, 3).join('\n\n'); // usually first few paragraphs
        
        // Extract curriculum - frequently inside panels or specific lists
        // we'll grab all bullet points from the main content column or tabs
        let curriculum = [];
        const possibleCurriculumLists = Array.from(document.querySelectorAll('ul, ol')).filter(list => {
           const text = list.innerText;
           return text.includes('Module') || text.includes('Chapter') || list.querySelectorAll('li').length > 5;
        });
        
        if (possibleCurriculumLists.length > 0) {
           curriculum = Array.from(possibleCurriculumLists[0].querySelectorAll('li')).map(li => li.innerText.trim());
        }

        return {
          title,
          description,
          curriculum
        };
      });
      
      courseData.url = course.url;
      courseData.category = domainName;
      
      const safeTitle = course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      
      // 2. SAVE JSON
      fs.writeFileSync(path.join(outputDir, `${safeTitle}.json`), JSON.stringify(courseData, null, 2));
      
      // 3. TAKE FULL PAGE SCREENSHOT
      const screenshotPath = path.join(publicAuditDir, `${domainName.replace(/\s+/g, '')}_${safeTitle}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      console.log(`Successfully extracted ${course.title}. Saved screenshot: ${screenshotPath}`);
      
    } catch (err) {
      console.error(`Error scraping ${course.title}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\nCompleted batch extraction for ${domainName}.`);
}

scrapeDomainCourses('Analytics');
