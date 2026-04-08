import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchCoursesForCategory(url, categoryName) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const courseLinks = new Set();
    
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('/page/')) {
        const text = $(el).text().trim();
        courseLinks.add(JSON.stringify({ title: text || href.split('/').pop(), url: href }));
      }
    });

    const uniqueLinks = Array.from(courseLinks).map(JSON.parse);
    fs.writeFileSync('analytics_links_dump.json', JSON.stringify(uniqueLinks, null, 2));
    console.log(`Dumped ${uniqueLinks.length} links to analytics_links_dump.json`);
    
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

fetchCoursesForCategory('https://www.maxmunus.com/page/Online-Training/Analytics-Courses', 'Analytics Courses');
