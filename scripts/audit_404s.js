const fs = require('fs');

const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const slugMatches = Array.from(domainDataText.matchAll(/"href":\s*"\/domains\/([^"]+)"/g));
const slugs = slugMatches.map(m => m[1]);

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
const dcmKeys = Array.from(dcmText.matchAll(/^\s*"([^"]+)":\s*\{/gm)).map(m => m[1]);
const dcmKeySet = new Set(dcmKeys);

console.log(`Auditing ${slugs.length} total slugs...`);

const missing = slugs.filter(s => !dcmKeySet.has(s));
console.log(`Found ${missing.length} missing slugs in domainContentMap.js`);

// Supply Chain specifically
const scMissing = missing.filter(s => s.includes('supply-chain') || s.includes('wms') || s.includes('jda') || s.includes('manhattan'));
console.log(`Supply Chain missing: ${scMissing.length}`);

scMissing.forEach(s => console.log(` - ${s}`));

// Strategy: For each missing slug, find if there is a similar key that IS in the map
const fixes = [];

missing.forEach(slug => {
    // Try adding suffixes
    const candidates = [
        `${slug}-training`,
        `${slug}-support`,
        `${slug}-job-support`,
        `${slug}-online-training`,
        slug.replace(/-training$/, ''),
        slug.replace(/-support$/, '')
    ];
    
    let match = candidates.find(c => dcmKeySet.has(c));
    
    if (match) {
        fixes.push({ slug, match });
    }
});

console.log(`\nFound ${fixes.length} potential fixes by aliasing.`);
fixes.forEach(f => console.log(` [FIX] Mapping ${f.slug} -> ${f.match}`));
