const fs = require('fs');

const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const slugMatches = Array.from(domainDataText.matchAll(/"href":\s*"\/domains\/([^"]+)"/g));
const slugs = [...new Set(slugMatches.map(m => m[1]))];

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
const dcmKeys = Array.from(dcmText.matchAll(/^\s*"([^"]+)":\s*\{/gm)).map(m => m[1]);
const dcmKeySet = new Set(dcmKeys);

const missing = slugs.filter(s => !dcmKeySet.has(s));
console.log(`Found ${missing.length} missing slugs.`);

const newEntries = {};

missing.forEach(slug => {
    // Look for best match
    let bestMatchKey = dcmKeys.find(k => k.startsWith(slug + '-') || slug.startsWith(k + '-'));
    
    if (bestMatchKey) {
        console.log(`Aliasing [${slug}] to [${bestMatchKey}]`);
        // Find the block in dcmText
        const startIdx = dcmText.indexOf(`"${bestMatchKey}": {`);
        const nextKeyMatch = dcmText.slice(startIdx + 10).match(/^\s*"([^"]+)":\s*\{/m);
        const endIdx = nextKeyMatch ? startIdx + 10 + nextKeyMatch.index : dcmText.lastIndexOf('};');
        let content = dcmText.slice(startIdx, endIdx).trim();
        if (content.endsWith(',')) content = content.slice(0, -1);
        
        // Rename key in the content
        newEntries[slug] = content.replace(`"${bestMatchKey}":`, `"${slug}":`);
    } else {
        // Create a professional stub
        console.log(`Creating stub for [${slug}]`);
        const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        newEntries[slug] = `  "${slug}": {
    "title": "${title} Training & Support",
    "category": "Technology",
    "icon": "🔗",
    "color": "#2563eb",
    "heroDescription": "Master ${title} with our specialized enterprise architectural support and job assistance.",
    "about": "GapAnchor provides Tier-1 support for ${title}. Our practitioners help you master complex configurations and resolve real-world project challenges.",
    "features": [
      { "title": "Real-Time Support", "desc": "On-demand assistance for production issues." },
      { "title": "Curriculum", "desc": "Customized learning path for your career goals." }
    ]
  }`;
    }
});

// Append to the end of the object in the file
let finalContent = dcmText.trim();
if (finalContent.endsWith('};')) {
    finalContent = finalContent.slice(0, -2);
    Object.values(newEntries).forEach(entry => {
        finalContent += ',\n' + entry;
    });
    finalContent += '\n};';
}

fs.writeFileSync('./lib/domainContentMap.js', finalContent);
console.log('Successfully fixed 404s by aliasing and stubbing.');
