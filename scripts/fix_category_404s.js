const fs = require('fs');

const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const categoryMatches = Array.from(domainDataText.matchAll(/"category":\s*"([^"]+)"/g));
const categories = [...new Set(categoryMatches.map(m => m[1]))];

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');

const categoryEntries = {};

categories.forEach(cat => {
    const slug = cat.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
    if (!dcmText.includes(`"${slug}":`)) {
        console.log(`Creating landing page for [${cat}] -> [${slug}]`);
        categoryEntries[slug] = `  "${slug}": {
    "title": "${cat} Center",
    "category": "${cat}",
    "icon": "📂",
    "color": "#0ea5e9",
    "heroDescription": "Comprehensive training and enterprise support for all ${cat} solutions.",
    "about": "Explore our deep catalog of ${cat} expertise. We provide Tier-1 architectural support, implementation guidance, and specialized job training across all major platforms in this category.",
    "features": [
      { "title": "Expert Network", "desc": "Access to 500+ specialized consultants." },
      { "title": "Implementation Support", "desc": "End-to-end guidance for enterprise deployments." }
    ]
  }`;
    }
});

let finalContent = dcmText.trim();
if (finalContent.endsWith('};')) {
    finalContent = finalContent.slice(0, -2);
    Object.values(categoryEntries).forEach(entry => {
        finalContent += ',\n' + entry;
    });
    finalContent += '\n};';
}

fs.writeFileSync('./lib/domainContentMap.js', finalContent);
console.log('Successfully created Category Landing Pages.');
