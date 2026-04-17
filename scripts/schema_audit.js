const fs = require('fs');
const content = fs.readFileSync('./lib/domainContentMap.js', 'utf8');

// Find entries with OLD schema (has 'features' but no 'curriculum')
const keyPattern = /^  "([^"]+)":\s*\{/gm;
const entries = {};
let match;
while ((match = keyPattern.exec(content)) !== null) {
  entries[match[1]] = match.index;
}

const keys = Object.keys(entries);
const oldSchemaKeys = [];
const newSchemaKeys = [];

keys.forEach((key, i) => {
  const start = entries[key];
  const end = i < keys.length - 1 ? entries[keys[i + 1]] : content.length;
  const chunk = content.slice(start, end);
  const hasCurriculum = chunk.includes('"curriculum"');
  const hasFeatures = chunk.includes('"features"');
  const hasBenefits = chunk.includes('"benefits"');
  
  if (!hasCurriculum) {
    oldSchemaKeys.push({ key, hasFeatures, hasBenefits });
  } else {
    newSchemaKeys.push(key);
  }
});

console.log('Total entries:', keys.length);
console.log('New schema (has curriculum):', newSchemaKeys.length);
console.log('Old schema (no curriculum):', oldSchemaKeys.length);
console.log('\nFirst 30 old-schema keys:');
oldSchemaKeys.slice(0, 30).forEach(e => console.log(` - ${e.key} [features:${e.hasFeatures}, benefits:${e.hasBenefits}]`));

// Check ERP/WMS category specifically
const erpKeys = oldSchemaKeys.filter(e => 
  e.key.includes('wms') || e.key.includes('erp') || e.key.includes('oracle') || 
  e.key.includes('jda') || e.key.includes('manhattan') || e.key.includes('infor') ||
  e.key.includes('sap') || e.key.includes('ibm') || e.key.includes('supply')
);
console.log('\nERP/WMS old-schema entries:', erpKeys.length);
erpKeys.forEach(e => console.log(` - ${e.key}`));
