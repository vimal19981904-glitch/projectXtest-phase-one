import * as cheerio from 'cheerio';
import fs from 'fs/promises';

const BASE_URL = 'https://www.maxmunus.com';
const START_URL = 'https://www.maxmunus.com/page/Analytics-Courses';

// Cluster 5 (Part 2): Data & Analytics
const TARGET_KEYWORDS = ['tableau', 'power-bi', 'qlik', 'informatica', 'hadoop', 'spark', 'big-data', 'data-science', 'microstrategy', 'business-objects', 'pentaho', 'databricks'];
const EXCLUDE_KEYWORDS = ['job-support']; // Explicitly avoiding job-support pages if looking for deep courses

async function fetchHtml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (e) {
    console.error(`Failed to fetch ${url}`, e.message);
    return null;
  }
}

async function start() {
  console.log(`Starting crawl at: ${START_URL}`);
  const html = await fetchHtml(START_URL);
  if (!html) return;

  const $ = cheerio.load(html);
  const links = new Set();
  
  // Find all course links
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/page/')) {
       // Only push matching keywords
       const lowerHref = href.toLowerCase();
       const matchesTarget = TARGET_KEYWORDS.some(kw => lowerHref.includes(kw));
       //const isNotJobSupport = !EXCLUDE_KEYWORDS.some(kw => lowerHref.includes(kw));
       
       if (matchesTarget) {
         // Resolve relative links
         let fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
         links.add(fullUrl);
       }
    }
  });

  const targetLinks = Array.from(links).slice(0, 50); // Let's limit to 50 for phase 1 just to be safe.
  console.log(`Found ${targetLinks.length} target JDA/SAP pages to deep-crawl...`);

  const results = [];

  for (let i = 0; i < targetLinks.length; i++) {
    const url = targetLinks[i];
    console.log(`[${i+1}/${targetLinks.length}] Scraping: ${url}`);
    const pageHtml = await fetchHtml(url);
    if (!pageHtml) continue;

    const $$ = cheerio.load(pageHtml);
    
    // We want the primary content area, not header/footer. MaxMunus content is usually in paragraphs and nested lists.
    // Heuristic: Extract all paragraphs with substantial text.
    let overview = '';
    $$('p').each((_, el) => {
      const text = $$(el).text().trim().replace(/\s+/g, ' ');
      // The first substantial paragraph that isn't Contact boilerplate
      if (text.length > 100 && !text.toLowerCase().includes('successfully conducted 1000+ corporate training') && !text.toLowerCase().includes('few of the clients')) {
        if (!overview) {
          overview = text;
        }
      }
    });

    // Heuristic: Extract course content bullets. Usually inside ul > li.
    const syllabus = [];
    $$('ul li').each((_, el) => {
      const text = $$(el).text().trim().replace(/\s+/g, ' ');
      // Filter out small nav links or boilerplate
      if (text.length > 10 && text.length < 250 && !text.toLowerCase().includes('training') && !text.toLowerCase().includes('maxmunus') && !text.includes('USA:')) {
         syllabus.push(text);
      }
    });

    // Duration extraction: Usually mentioned somewhere like "Duration: 20 Hours"
    let duration = 'Flexible / Custom (Typically 30-40 Hours)';
    const fullText = $$('body').text().replace(/\s+/g, ' ');
    const durationMatch = fullText.match(/(\d+\s*(?:-|to)?\s*\d*\s*hours?)/i);
    if (durationMatch) {
       duration = durationMatch[1];
    }

    const title = $$('title').text().replace('| Online Training & Certification Program', '').replace('Online Job Support', '').trim();

    results.push({
      original_url: url,
      title: title,
      category: 'Data & Analytics', // Cluster 5 (Part 2)
      overview: overview || "Comprehensive technical overview and architecture configuration guide for enterprise deployment.",
      duration: duration,
      raw_syllabus_bullets: syllabus.slice(0, 15) // take top 15 bullets to avoid grabbing footer links
    });
    
    // Add brief delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  await fs.writeFile('raw_extraction_Analytics.json', JSON.stringify(results, null, 2));
  console.log(`Extraction complete. Saved to raw_extraction_Analytics.json.`);
}

start().catch(console.error);
