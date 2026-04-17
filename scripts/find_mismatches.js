const fs = require('fs');

// We need to use CommonJS for this script to run easily with node
const contentMapText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
// Mocking the export to get the object
let domainContentMap;
try {
  // Simple extraction of the default export object
  const match = contentMapText.match(/export default (\{[\s\S]*\});/);
  if (match) {
    // This is risky for 50k lines, let's use a different approach
    // We'll extract keys using regex
  }
} catch (e) {}

// Extract all keys from domainContentMap.js
const dcmKeys = Array.from(contentMapText.matchAll(/^  "([^"]+)":\s*\{/gm)).map(m => m[1]);
const dcmKeySet = new Set(dcmKeys);

// Extract slugs from domainData.js
const domainDataText = fs.readFileSync('./lib/domainData.js', 'utf8');
const slugMatches = Array.from(domainDataText.matchAll(/"href":\s*"\/domains\/([^"]+)"/g));
const slugs = slugMatches.map(m => m[1]);

console.log(`Total slugs in domainData.js: ${slugs.length}`);
console.log(`Total keys in domainContentMap.js: ${dcmKeys.length}`);

const missing = [];
const stubbed = [];
const matched = [];

slugs.forEach(slug => {
  if (!dcmKeySet.has(slug)) {
    missing.push(slug);
  } else {
    // Check if it's a stub (minimal lines)
    // We'll find the start and next key to estimate size
    const startIdx = contentMapText.indexOf(`  "${slug}": {`);
    const nextMatch = contentMapText.slice(startIdx + 10).match(/^  "([^"]+)":\s*\{/m);
    const endIdx = nextMatch ? startIdx + 10 + nextMatch.index : contentMapText.length;
    const entryText = contentMapText.slice(startIdx, endIdx);
    
    if (!entryText.includes('"curriculum"') && !entryText.includes('"overviewParagraphs"')) {
      stubbed.push(slug);
    } else {
      matched.push(slug);
    }
  }
});

console.log(`\nMatched with rich content: ${matched.length}`);
console.log(`Stubbed (minimal content): ${stubbed.length}`);
console.log(`Missing from content map: ${missing.length}`);

if (stubbed.length > 0) {
  console.log('\n--- Stubbed Domains (Looking for better keys) ---');
  stubbed.forEach(slug => {
    // Look for a key that contains the slug but is longer
    const betterKey = dcmKeys.find(k => k !== slug && k.includes(slug) && (k.includes('-training') || k.includes('-support')));
    if (betterKey) {
      console.log(` - ${slug}  ==> Try: ${betterKey}`);
    } else {
      console.log(` - ${slug}  (No better key found)`);
    }
  });
}

if (missing.length > 0) {
  console.log('\n--- Missing Domains (Looking for better keys) ---');
  missing.forEach(slug => {
    const betterKey = dcmKeys.find(k => k.includes(slug));
    if (betterKey) {
      console.log(` - ${slug}  ==> Found alternative: ${betterKey}`);
    } else {
      console.log(` - ${slug}  (Not found at all)`);
    }
  });
}
