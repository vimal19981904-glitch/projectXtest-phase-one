const fs = require('fs');
const content = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
const keys = Array.from(content.matchAll(/^\s*"([^"]+)":\s*\{/gm)).map(m => m[1]);
fs.writeFileSync('./scripts/final_keys.txt', keys.sort().join('\n'));
console.log(`Saved ${keys.length} keys to scripts/final_keys.txt`);
