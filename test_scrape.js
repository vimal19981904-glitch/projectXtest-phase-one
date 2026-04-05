const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('test.html', 'utf8');
const $ = cheerio.load(html);

// the links might be in a list under a main content area
const links = [];
$('a').each((i, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr('href');
    if (href && href.toLowerCase().includes('job-support') && text) {
        links.push({text, href});
    }
});

console.log("Total matched links:", links.length);
console.log(links.slice(0, 20));
