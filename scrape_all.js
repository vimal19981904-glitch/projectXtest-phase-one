const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const categories = [
    { title: 'Salesforce Online Job Support', url: 'https://www.maxmunus.com/page/Salesforce-Online-Job-Support' },
    { title: 'SIEM Tools Job Support', url: 'https://www.maxmunus.com/page/SIEM-Tools-Job-Support' },
    { title: 'Analytics Job Support', url: 'https://www.maxmunus.com/page/Analytics-Job-Support' },
    { title: 'Programming Job Support', url: 'https://www.maxmunus.com/page/Programming-Job-Support' },
    { title: 'Cloud Technologies Job Support', url: 'https://www.maxmunus.com/page/Cloud-Technologies-Job-Support' },
    { title: 'Supply Chain Technologies', url: 'https://www.maxmunus.com/page/Suppy-Chain-Technologies-Job-Support' },
    { title: 'All Other Technology', url: 'https://www.maxmunus.com/page/All-Other-Technology-Job-Support' },
    { title: 'Data Warehousing Job Support', url: 'https://www.maxmunus.com/page/Data-Warehousing-Job-Support' },
    { title: 'Microsoft Online Job Support', url: 'https://www.maxmunus.com/page/Microsoft-Online-Job-Support' },
    { title: 'ERP Job Support', url: 'https://www.maxmunus.com/page/ERP-Job-Support' },
    { title: 'IBM Online Job Support', url: 'https://www.maxmunus.com/page/IBM-Online-Job-Support' },
    { title: 'Oracle Online Job Support', url: 'https://www.maxmunus.com/page/Oracle-Online-Job-Support' },
    { title: 'DLP job support', url: 'https://www.maxmunus.com/page/dlp-job-support' },
    { title: 'CPQ Job support', url: 'https://www.maxmunus.com/page/cpq-job-support' },
    { title: 'DevOps job support', url: 'https://www.maxmunus.com/page/devops-job-support' },
    { title: 'PLM job support', url: 'https://www.maxmunus.com/page/plm-job-support' },
    { title: 'Technology job support', url: 'https://www.maxmunus.com/page/technology-job-support' }
];

async function scrape() {
    const results = {};
    for (const cat of categories) {
        console.log(`Scraping ${cat.title}...`);
        try {
            const res = await axios.get(cat.url);
            const $ = cheerio.load(res.data);
            const links = [];
            $('a').each((i, el) => {
                const text = $(el).text().trim();
                const href = $(el).attr('href');
                if (href && text && (href.toLowerCase().includes('job-support') || text.toLowerCase().includes('job support'))) {
                    // filter out generic main category links if possible
                    if(text.toLowerCase() !== 'online job support') {
                        links.push({
                            name: text,
                            href: `/domains/${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
                        });
                    }
                }
            });
            
            // deduplicate
            const uniqueLinks = Array.from(new Set(links.map(l => l.name)))
                .map(name => links.find(l => l.name === name));
            
            results[cat.title] = uniqueLinks;
            console.log(`Found ${uniqueLinks.length} for ${cat.title}`);
        } catch (e) {
            console.error(`Failed ${cat.title}`);
        }
    }
    
    fs.writeFileSync('maxmunus_domains.json', JSON.stringify(results, null, 2));
    console.log("Done extracting.");
}

scrape();
