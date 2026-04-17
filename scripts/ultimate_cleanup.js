const fs = require('fs');

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// Extraction function that handles both indented and non-indented keys
function extractMap(text) {
    // Matches keys at start of line OR with spaces
    const keys = Array.from(text.matchAll(/^\s*"([^"]+)":\s*\{/gm));
    const map = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i][1];
        const startIdx = keys[i].index;
        
        // Find end of this object by looking for the next key or the closing brace of the main object
        const nextKeyMatch = text.slice(startIdx + 10).match(/^\s*"([^"]+)":\s*\{/m);
        const endIdx = nextKeyMatch ? startIdx + 10 + nextKeyMatch.index : text.lastIndexOf('};');
        
        let entryText = text.slice(startIdx, endIdx).trim();
        if (entryText.endsWith(',')) entryText = entryText.slice(0, -1);
        
        // Cleanup the content part (everything after the first { and before the last })
        const contentMatch = entryText.match(/":\s*\{([\s\S]*)\}/);
        if (contentMatch) {
            const content = contentMatch[1].trim();
            
            // Score the richness
            let score = 0;
            if (content.includes('"curriculum"')) score += 100;
            if (content.includes('"overviewParagraphs"')) score += 50;
            if (content.includes('"about"')) score += 10;
            if (content.includes('"benefits"')) score += 5;
            if (content.includes('"features"')) score += 2;
            
            // Only keep the richest version
            if (!map[key] || score > map[key].score) {
                map[key] = { content, score };
            }
        }
    }
    return map;
}

const map = extractMap(dcmText);
console.log(`Unique keys found: ${Object.keys(map).length}`);

// Final Assembly with 2-space indentation
let output = 'export default {\n';
const sortedKeys = Object.keys(map).sort();

sortedKeys.forEach(key => {
    output += `  "${key}": {\n`;
    // Indent the content by 4 spaces (2 for the object, 2 more for inside)
    const lines = map[key].content.split('\n');
    lines.forEach(line => {
        output += `    ${line.trim()}\n`;
    });
    output += `  },\n`;
});

// Remove last comma and close
output = output.trimEnd();
if (output.endsWith(',')) output = output.slice(0, -1);
output += '\n};';

fs.writeFileSync('./lib/domainContentMap.js', output);
console.log('Final de-duplication and re-formatting complete.');
