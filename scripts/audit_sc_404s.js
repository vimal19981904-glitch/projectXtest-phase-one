const fs = require('fs');

const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');

// Regex to find the supply chain category section
const scSectionMatch = domainDataText.match(/"category":\s*"ERP & Supply Chain"[\s\S]*?"sub_domains":\s*\[([\s\S]*?)\]/);
if (scSectionMatch) {
    const subDomainsText = scSectionMatch[1];
    const slugMatches = Array.from(subDomainsText.matchAll(/"href":\s*"\/domains\/([^"]+)"/g));
    const slugs = slugMatches.map(m => m[1]);
    
    console.log(`Checking ${slugs.length} Supply Chain sub-domains:`);
    slugs.forEach(slug => {
        const exists = dcmText.includes(`"${slug}":`);
        if (!exists) {
            console.log(`[404] ${slug}`);
        } else {
            // console.log(`[OK]  ${slug}`);
        }
    });
} else {
    console.log('Could not find ERP & Supply Chain section in domainData.js');
}
