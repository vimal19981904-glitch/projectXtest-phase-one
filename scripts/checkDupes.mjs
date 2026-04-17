import { readFileSync } from 'fs';
import { createRequire } from 'module';

const src = readFileSync('./lib/domainContentMap.js', 'utf8');
const lines = src.split('\n');
const keyRegex = /^  "([^"]+)":\s*\{/;
const seen = {};
const dupes = [];

lines.forEach((line, idx) => {
  const m = line.match(keyRegex);
  if (m) {
    const key = m[1];
    if (seen[key]) {
      dupes.push({ key, first: seen[key], second: idx + 1 });
    } else {
      seen[key] = idx + 1;
    }
  }
});

if (dupes.length === 0) {
  console.log('✅ No duplicate keys found. Total keys:', Object.keys(seen).length);
} else {
  console.log(`❌ Found ${dupes.length} duplicate(s):`);
  dupes.forEach(d => console.log(`  DUPE: "${d.key}" | first at line: ${d.first} | second at line: ${d.second}`));
}

// Also try dynamic import to catch parse errors
try {
  const mod = await import('../lib/domainContentMap.js?' + Date.now());
  console.log('✅ Module loaded successfully. Keys:', Object.keys(mod.domainContentMap).length);
} catch(e) {
  console.error('❌ Module parse error:', e.message);
}
