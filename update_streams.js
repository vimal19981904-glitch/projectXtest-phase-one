const fs = require('fs');
const path = require('path');

// 1. Read domainData.js to get all ERP & Supply Chain slugs
const domainDataPath = path.join(__dirname, 'lib', 'domainData.js');
let domainDataContent = fs.readFileSync(domainDataPath, 'utf8');

// We need to extract the array of slugs. Since it's an ES module, we can extract the JSON part.
const match = domainDataContent.match(/export const domainData = (\[[\s\S]+\]);/);
if (!match) {
  console.error("Could not parse domainData");
  process.exit(1);
}

// Quick hack to parse JS object
let domainData;
try {
  // It might not be strictly JSON, so we use eval
  eval(`domainData = ${match[1]}`);
} catch (e) {
  console.error("Eval failed:", e);
  process.exit(1);
}

const erpCategory = domainData.find(d => d.category === "ERP & Supply Chain");
if (!erpCategory) {
  console.error("ERP category not found");
  process.exit(1);
}

const erpSlugs = erpCategory.sub_domains.map(sub => {
  const parts = sub.href.split('/');
  return parts[parts.length - 1];
});

console.log(`Found ${erpSlugs.length} ERP & Supply Chain slugs.`);

// 2. Read domainContentMap.js
const mapPath = path.join(__dirname, 'lib', 'domainContentMap.js');
let mapContent = fs.readFileSync(mapPath, 'utf8');

// The file exports a default object. It's too big/complex to easily regex replace safely.
// Actually, since I just need to add a streams: [] property to objects that don't have it,
// I can do a regex replace for each slug:
// From:
//   "slug": {
//     "title": "...",
// To:
//   "slug": {
//     "streams": [],
//     "title": "...",

let updateCount = 0;

for (const slug of erpSlugs) {
  // Check if it already has streams
  // A bit hacky but we'll look for the slug definition
  const slugRegex = new RegExp(`("${slug}"\\s*:\\s*\\{)([\\s\\S]*?)(?=,"[a-z0-9-]+":\\s*\\{|\\n\\};)`, 'g');
  
  mapContent = mapContent.replace(slugRegex, (match, p1, p2) => {
    if (p2.includes('"streams":')) {
      // Already has streams
      return match;
    } else {
      updateCount++;
      return `${p1}\n    "streams": [],${p2}`;
    }
  });
}

fs.writeFileSync(mapPath, mapContent, 'utf8');
console.log(`Updated ${updateCount} domains with empty streams array.`);
