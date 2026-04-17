const fs = require('fs');

// Read the content map
const contentMapText = fs.readFileSync('./lib/domainContentMap.js', 'utf8');

// Extraction logic for keys
const keyMatches = Array.from(contentMapText.matchAll(/^  "([^"]+)":\s*\{/gm));
const entries = [];

for (let i = 0; i < keyMatches.length; i++) {
  const key = keyMatches[i][1];
  const startIdx = keyMatches[i].index;
  const endIdx = (i < keyMatches.length - 1) ? keyMatches[i+1].index : contentMapText.lastIndexOf('};');
  const text = contentMapText.slice(startIdx, endIdx);
  
  entries.push({
    key,
    text,
    startIdx,
    endIdx,
    isRich: text.includes('"curriculum"') || text.includes('"overviewParagraphs"')
  });
}

console.log(`Total entries found: ${entries.length}`);
const richEntries = entries.filter(e => e.isRich);
const stubEntries = entries.filter(e => !e.isRich);

console.log(`Rich entries: ${richEntries.length}`);
console.log(`Stub entries: ${stubEntries.length}`);

const updates = [];

stubEntries.forEach(stub => {
  // Find the best rich replacement
  // We look for a rich entry whose key contains the stub key or vice versa
  // Priority 1: Key matches exactly with '-training' or '-support'
  let bestMatch = richEntries.find(rich => 
    rich.key === `${stub.key}-training` || 
    rich.key === `${stub.key}-support` ||
    rich.key === `${stub.key}-online-training`
  );
  
  // Priority 2: Rich key contains stub key
  if (!bestMatch) {
    bestMatch = richEntries.find(rich => rich.key.includes(stub.key));
  }
  
  if (bestMatch) {
    console.log(`Mapping stub [${stub.key}] to rich [${bestMatch.key}]`);
    // Prepare the replacement text for the stub key
    // We want to keep the original key but use the content from the rich entry
    let newText = bestMatch.text.replace(`  "${bestMatch.key}": {`, `  "${stub.key}": {`);
    updates.push({
      original: stub.text,
      replacement: newText
    });
  }
});

console.log(`\nPlanned updates: ${updates.length}`);

if (updates.length > 0) {
  let finalContent = contentMapText;
  updates.forEach(update => {
    finalContent = finalContent.replace(update.original, update.replacement);
  });
  
  fs.writeFileSync('./lib/domainContentMap.js', finalContent);
  console.log('Successfully updated lib/domainContentMap.js with rich content migrations.');
}
