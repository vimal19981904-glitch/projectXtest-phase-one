const fs = require('fs');

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// Reliable way to split entries in this specific file format
// Entries start with "key": { at the beginning of a line (possibly with spaces)
const entries = [];
const entryStarts = Array.from(dcmText.matchAll(/^\s*"([^"]+)":\s*\{/gm));

for (let i = 0; i < entryStarts.length; i++) {
    const key = entryStarts[i][1];
    const startIdx = entryStarts[i].index;
    const endIdx = (i < entryStarts.length - 1) ? entryStarts[i+1].index : dcmText.lastIndexOf('};');
    
    let block = dcmText.slice(startIdx, endIdx).trim();
    if (block.endsWith(',')) block = block.slice(0, -1);
    
    // Now we need to extract the CONTENT part.
    // The block is: "key": { CONTENT }
    // But CONTENT might contain other objects.
    // We want to find the LAST closing brace of the entry.
    
    // However, our current file is ALREADY malformed. 
    // So we should try to fix the malformed blocks.
    
    const firstBraceIdx = block.indexOf('{');
    let content = block.slice(firstBraceIdx + 1).trim();
    
    // If the content ends with a brace that was meant for a sub-object, 
    // we need to add the missing closing braces.
    
    // Count braces
    let openBraces = 1; // The one at firstBraceIdx
    let openBrackets = 0;
    
    for (let char of content) {
        if (char === '{') openBraces++;
        if (char === '}') openBraces--;
        if (char === '[') openBrackets++;
        if (char === ']') openBrackets--;
    }
    
    // If unbalanced, fix it
    while (openBrackets > 0) {
        content += '\n    ]';
        openBrackets--;
    }
    while (openBraces > 0) {
        content += '\n  }';
        openBraces--;
    }
    
    // Also remove any extra closing braces if we have too many
    while (openBraces < 0) {
        const lastBrace = content.lastIndexOf('}');
        if (lastBrace > -1) {
            content = content.slice(0, lastBrace) + content.slice(lastBrace + 1);
        }
        openBraces++;
    }

    entries.push({ key, content });
}

// De-duplicate by keeping richest
const map = {};
entries.forEach(entry => {
    let score = 0;
    if (entry.content.includes('"curriculum"')) score += 100;
    if (entry.content.includes('"overviewParagraphs"')) score += 50;
    if (entry.content.includes('"about"')) score += 10;
    
    if (!map[entry.key] || score > map[entry.key].score) {
        map[entry.key] = { content: entry.content, score };
    }
});

let output = 'export default {\n';
Object.keys(map).sort().forEach(key => {
    output += `  "${key}": {\n    ${map[key].content.trim()}\n  },\n`;
});
output = output.trimEnd().slice(0, -1) + '\n};';

fs.writeFileSync('./lib/domainContentMap.js', output);
console.log('Fixed malformed entries and re-wrote domainContentMap.js');
