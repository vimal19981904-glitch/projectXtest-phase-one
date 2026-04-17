const fs = require('fs');

// Count keys in domainContentMap
const dcm = fs.readFileSync('./lib/domainContentMap.js', 'utf8');
const dcmKeys = Array.from(dcm.matchAll(/^  "([^"]+)":\s*\{/gm)).map(m => m[1]);

// Count keys in supplementalContentMap
const scm = fs.readFileSync('./lib/supplementalContentMap.js', 'utf8');
const scmKeys = Array.from(scm.matchAll(/^  "([^"]+)":\s*\{/gm)).map(m => m[1]);

console.log('domainContentMap entries:', dcmKeys.length);
console.log('supplementalContentMap entries:', scmKeys.length);

// Find keys in supplemental NOT in domain
const missing = scmKeys.filter(k => !dcmKeys.includes(k));
console.log('Missing from domainContentMap:', missing.length);
if (missing.length > 0) {
  console.log('\nMissing keys:');
  missing.forEach(k => console.log(' -', k));
}
