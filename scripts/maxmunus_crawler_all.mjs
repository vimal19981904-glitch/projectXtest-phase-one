import puppeteer from 'puppeteer';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const START_URL = 'https://www.maxmunus.com/page/All-Courses';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeEverything() {
  console.log("=== STARTING FULL MAXMUNUS EXTRACTION ===");
  const publicAuditDir = path.join(process.cwd(), 'public', 'maxmunus-audit');
  if (!fs.existsSync(publicAuditDir)) fs.mkdirSync(publicAuditDir, { recursive: true });

  const outputBaseDir = path.join(process.cwd(), 'extracted_courses');
  if (!fs.existsSync(outputBaseDir)) fs.mkdirSync(outputBaseDir, { recursive: true });

  // 1. Fetch Categories
  console.log("1. Fetching available categories...");
  let categories = [];
  try {
    const { data } = await axios.get(START_URL);
    const $ = cheerio.load(data);
    
    const catLinks = new Set();
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      // Look for standard domain categories
      if (href && href.includes('/page/Online-Training/') && !href.endsWith('Online-Training')) {
        const text = $(el).text().trim();
        if (text) {
          catLinks.add(JSON.stringify({ title: text, url: href }));
        }
      }
    });
    categories = Array.from(catLinks).map(JSON.parse);
  } catch(e) {}
  
  if (categories.length === 0) {
    console.log("No categories found, using fallback list.");
    categories = JSON.parse(fs.readFileSync('maxmunus_categories_temp.json', 'utf-8')).filter(c => c.url.includes('/Online-Training/'));
  }
  console.log(`Found ${categories.length} categories.`);

  const browser = await puppeteer.launch({ headless: true });

  // Iterate over categories
  for (const cat of categories) {
    const catName = cat.title.replace(/[^a-zA-Z0-9]/g, '_');
    const catDir = path.join(outputBaseDir, catName);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    
    console.log(`\n============================\nScanning Category: ${cat.title}\n============================`);
    
    let courseLinks = [];
    try {
      const { data } = await axios.get(cat.url);
      const $ = cheerio.load(data);
      const links = new Set();
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        // If href does not include 'All-Courses' and usually looks like a course page
        if (href && href.includes('/page/') && !href.includes(cat.url)) {
           const text = $(el).text().trim();
           if (text.length > 3 && text.toLowerCase().includes('training') || text.toLowerCase().includes('course')) {
             links.add(JSON.stringify({ title: text, url: href }));
           }
        }
      });
      courseLinks = Array.from(links).map(JSON.parse);
    } catch(e) { console.log(`Error parsing ${cat.title}:`, e.message); }
    
    console.log(`-> Found ${courseLinks.length} potential courses.`);
    
    for (const course of courseLinks) {
       console.log(`  Scraping: ${course.title}...`);
       let page;
       try {
         page = await browser.newPage();
         await page.setViewport({ width: 1440, height: 900 });
         await page.goto(course.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
         
         const courseData = await page.evaluate(() => {
           const title = document.querySelector('h1')?.innerText?.trim() || '';
           const pTags = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t.length > 50);
           const description = pTags.slice(0, 3).join('\n\n');
           
           let curriculum = [];
           const lists = Array.from(document.querySelectorAll('ul, ol, .curriculum-section, [role="tabpanel"]'));
           lists.forEach(l => {
              if(l.innerText.includes('Module') || l.innerText.includes('Overview')) {
                 curriculum.push(l.innerText.trim().substring(0, 500)); // Just grab some context
              }
           });
           
           return { title, description, curriculum };
         });
         
         courseData.url = course.url;
         courseData.category = cat.title;
         
         const safeTitle = course.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
         fs.writeFileSync(path.join(catDir, `${safeTitle}.json`), JSON.stringify(courseData, null, 2));
         
         const screenshotPath = path.join(publicAuditDir, `${catName}_${safeTitle}.png`);
         await page.screenshot({ path: screenshotPath, fullPage: true });
         
       } catch (e) {
         console.log(`  --> Failed: ${e.message}`);
       } finally {
         if (page) await page.close();
       }
    }
  }

  await browser.close();
  console.log("=== FULL MAXMUNUS EXTRACTION COMPLETED ===");
}

scrapeEverything();
