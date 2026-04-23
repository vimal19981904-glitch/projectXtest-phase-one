// Quick verification — run with: node scripts/verify_by.js
const fs = require('fs');

const map = fs.readFileSync('lib/domainContentMap.js', 'utf8');

const key = '"blueyonder-training"';
const idx = map.indexOf(key);

if (idx === -1) {
  console.log('❌  Key "blueyonder-training" NOT found in domainContentMap.js');
  // Show keys that ARE present
  const keys = [...map.matchAll(/^  "([^"]+)":\s*\{/gm)].map(m => m[1]);
  console.log('Available top-level keys:', keys.join(', '));
} else {
  console.log('✅  Key "blueyonder-training" FOUND at char', idx);

  // Count streams
  const streamMatches = [...map.matchAll(/"name":\s*"Blue Yonder/g)];
  // scope to only within the blueyonder block
  // find end of blueyonder block
  const blockStart = idx;
  let bracketCount = 0;
  let foundStart = false;
  let blockEnd = -1;
  for (let i = map.indexOf('{', blockStart); i < map.length; i++) {
    if (map[i] === '{') { bracketCount++; foundStart = true; }
    else if (map[i] === '}') {
      bracketCount--;
      if (foundStart && bracketCount === 0) { blockEnd = i; break; }
    }
  }

  const block = blockEnd !== -1 ? map.substring(blockStart, blockEnd + 1) : '';
  const streamsInBlock = [...block.matchAll(/"name":\s*"Blue Yonder/g)];
  console.log('Stream cards in block:', streamsInBlock.length);

  // Show stream names
  const nameMatches = [...block.matchAll(/"name":\s*"([^"]+)"/g)].filter(m => m[1].includes('Blue Yonder'));
  nameMatches.forEach((m, i) => console.log(` ${i+1}. ${m[1]}`));
}
