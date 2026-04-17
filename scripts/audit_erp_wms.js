const fs = require('fs');

const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const slugMatches = Array.from(domainDataText.matchAll(/"href":\s*"\/domains\/([^"]+)"/g));
const slugs = slugMatches.map(m => m[1]);

const contentMapText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
const dcmKeys = Array.from(contentMapText.matchAll(/^  "([^"]+)":\s*\{/gm)).map(m => m[1]);
const dcmKeySet = new Set(dcmKeys);

const erpSlugs = slugs.filter(s => s.includes('wms') || s.includes('erp') || s.includes('supply-chain') || s.includes('jda') || s.includes('oracle-epm'));

console.log(`Checking ${erpSlugs.length} ERP/WMS slugs...`);

erpSlugs.forEach(slug => {
    const exists = dcmKeySet.has(slug);
    if (!exists) {
        console.log(`[MISSING] ${slug}`);
    } else {
        const startIdx = contentMapText.indexOf(`  "${slug}": {`);
        const nextMatch = contentMapText.slice(startIdx + 10).match(/^  "([^"]+)":\s*\{/m);
        const endIdx = nextMatch ? startIdx + 10 + nextMatch.index : contentMapText.length;
        const entryText = contentMapText.slice(startIdx, endIdx);
        const isRich = entryText.includes('"curriculum"') || entryText.includes('"overviewParagraphs"');
        if (!isRich) {
            console.log(`[STUB]    ${slug}`);
        } else {
            // console.log(`[RICH]    ${slug}`);
        }
    }
});
