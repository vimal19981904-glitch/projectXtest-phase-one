const fs = require('fs');

// Read the files
const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');
const scmText = fs.readFileSync('./lib/supplementalContentMap.js', 'utf-8');

// Extraction function
function extractMap(text) {
    const keys = Array.from(text.matchAll(/^  "([^"]+)":\s*\{/gm));
    const map = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i][1];
        const startIdx = keys[i].index;
        // Find the next key or the end of the object
        const nextKeyMatch = text.slice(startIdx + 10).match(/^  "([^"]+)":\s*\{/m);
        const endIdx = nextKeyMatch ? startIdx + 10 + nextKeyMatch.index : text.lastIndexOf('};');
        
        let entryText = text.slice(startIdx, endIdx).trim();
        // Remove trailing comma if present
        if (entryText.endsWith(',')) entryText = entryText.slice(0, -1);
        
        map[key] = entryText;
    }
    return map;
}

const dcmMap = extractMap(dcmText);
const scmMap = extractMap(scmText);

console.log(`DCM keys: ${Object.keys(dcmMap).length}`);
console.log(`SCM keys: ${Object.keys(scmMap).length}`);

// Merge Logic
// 1. All SCM entries should be in DCM
// 2. Short keys in DCM should be replaced by long rich keys if available

const finalMap = { ...dcmMap };

// Overwrite with identical keys from SCM (SCM is usually richer)
Object.keys(scmMap).forEach(key => {
    finalMap[key] = scmMap[key];
});

// Now handle slug mismatches
const slugs = Object.keys(finalMap);
const richKeys = slugs.filter(k => finalMap[k].includes('"curriculum"') || finalMap[k].includes('"overviewParagraphs"') || finalMap[k].includes('"about"'));

Object.keys(finalMap).forEach(key => {
    const isRich = finalMap[key].includes('"curriculum"') || finalMap[key].includes('"overviewParagraphs"');
    if (!isRich) {
        // Try to find a richer version
        const betterKey = richKeys.find(rk => rk !== key && (rk.includes(key) || key.includes(rk)));
        if (betterKey) {
            console.log(`Upgrading [${key}] with content from [${betterKey}]`);
            finalMap[key] = finalMap[betterKey].replace(new RegExp(`^  "${betterKey}":`, 'm'), `  "${key}":`);
        }
    }
});

// Build the final file
let output = 'export default {\n';
Object.keys(finalMap).sort().forEach(key => {
    output += finalMap[key] + ',\n';
});
output = output.slice(0, -2) + '\n};';

fs.writeFileSync('./lib/domainContentMap.js', output);
console.log('Final merge and cleanup complete.');
