const fs = require('fs');

// We need to use a more robust way to import domainData
const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const categoryMatches = Array.from(domainDataText.matchAll(/"category":\s*"([^"]+)"/g));
const categories = [...new Set(categoryMatches.map(m => m[1]))];

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');

console.log('Auditing Category Landing Pages:');
categories.forEach(cat => {
    // Both common ways categories are slugified
    const slug1 = cat.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
    const slug2 = cat.toLowerCase().replace(/ /g, '-').replace(/&/g, '-');
    const slug3 = cat.toLowerCase().replace(/ /g, '-'); // Literal with &
    
    const exists1 = dcmText.includes(`"${slug1}":`);
    const exists2 = dcmText.includes(`"${slug2}":`);
    const exists3 = dcmText.includes(`"${slug3}":`);
    
    if (exists1 || exists2 || exists3) {
        console.log(`[OK]      ${cat} (Found)`);
    } else {
        console.log(`[MISSING] ${cat} (Try: ${slug1})`);
    }
});
