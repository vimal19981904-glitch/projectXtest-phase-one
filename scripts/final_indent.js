const fs = require('fs');

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// Extraction function
function extractMap(text) {
    const keys = Array.from(text.matchAll(/^\s*"([^"]+)":\s*\{/gm));
    const map = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i][1];
        const startIdx = keys[i].index;
        const nextKeyMatch = text.slice(startIdx + 10).match(/^\s*"([^"]+)":\s*\{/m);
        const endIdx = nextKeyMatch ? startIdx + 10 + nextKeyMatch.index : text.lastIndexOf('};');
        
        let entryText = text.slice(startIdx, endIdx).trim();
        if (entryText.endsWith(',')) entryText = entryText.slice(0, -1);
        
        const contentMatch = entryText.match(/":\s*\{([\s\S]*)\}/);
        if (contentMatch) {
            let content = contentMatch[1].trim();
            // Basic JSON formatting for the content string
            try {
                const parsed = JSON.parse('{' + content + '}');
                content = JSON.stringify(parsed, null, 2).slice(1, -1).trim();
            } catch (e) {
                // Fallback to basic indent if JSON parse fails (e.g. trailing commas in source)
                content = content.split('\n').map(line => '  ' + line.trim()).join('\n');
            }
            map[key] = content;
        }
    }
    return map;
}

const map = extractMap(dcmText);
let output = 'export default {\n';
const sortedKeys = Object.keys(map).sort();

sortedKeys.forEach(key => {
    output += `  "${key}": {\n`;
    const lines = map[key].split('\n');
    lines.forEach(line => {
        output += `    ${line}\n`;
    });
    output += `  },\n`;
});

output = output.trimEnd();
if (output.endsWith(',')) output = output.slice(0, -1);
output += '\n};';

fs.writeFileSync('./lib/domainContentMap.js', output);
console.log('Final professional formatting complete.');
