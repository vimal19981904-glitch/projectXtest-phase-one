const fs = require('fs');
const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// The goal is to ensure all properties in all objects have commas.
// And all items in arrays have commas.
// And all entry objects have commas between them.

// We'll use a regex to find properties: "key": value
// and ensure they end with a comma unless they are followed by a closing brace/bracket.

let fixed = dcmText.replace(/"([^"]+)":\s*([^,\n}]+)(?!\s*[,}])/g, '"$1": $2,');

// Wait, the negative lookahead (?! \s* [,}]) might be tricky.
// Let's use a more robust line-by-line formatter.

let lines = fixed.split('\n');
let finalLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let nextLine = lines[i+1];
    
    // If the line has a property and next line doesn't start with a closing brace/bracket
    if (line.includes('": ') && !line.trim().endsWith(',') && !line.trim().endsWith('{') && !line.trim().endsWith('[') && nextLine && !nextLine.trim().startsWith('}') && !nextLine.trim().startsWith(']')) {
        finalLines.push(line.trimEnd() + ',');
    } else {
        finalLines.push(line);
    }
}

fs.writeFileSync('./lib/domainContentMap.js', finalLines.join('\n'));
console.log('Final property comma pass complete.');
