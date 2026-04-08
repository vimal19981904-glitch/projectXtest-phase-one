import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchCategories() {
  try {
    const url = 'https://www.maxmunus.com/page/All-Courses';
    console.log(`Fetching ${url}...`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // Maxmunus often uses lists or tables for courses. Let's find links inside the main content area.
    // We will extract all links and try to identify categories.
    // Or we can just look at the sidebar menu.
    const categories = [];
    
    // Example: Looking for links in the left sidebar or the main course list
    // This is a heuristic. We'll dump all unique links that contain "/page/"
    const links = new Set();
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('/page/') && !href.includes('All-Courses')) {
        const text = $(el).text().trim();
        if (text) {
           links.add(JSON.stringify({ title: text, url: href }));
        }
      }
    });

    const uniqueLinks = Array.from(links).map(JSON.parse);
    
    // Let's filter for ones that end with '-Courses' or similar, or just dump them to see what we have
    const possibleCategories = uniqueLinks.filter(l => l.title.includes('Courses') || l.title.includes('Training') || l.title.includes('Programming'));

    fs.writeFileSync('maxmunus_categories_temp.json', JSON.stringify(uniqueLinks, null, 2));
    console.log(`Found ${uniqueLinks.length} total page links.`);
    console.log('Sample of found links:', uniqueLinks.slice(0, 10));
    
  } catch (error) {
    console.error('Error fetching categories:', error.message);
  }
}

fetchCategories();
