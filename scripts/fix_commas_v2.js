const fs = require('fs');
const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// The file structure is:
//   "key": {
//     ...
//   },
//   "key": {

// We need to ensure every }, that is followed by a "key": { has a comma.
// We'll look for }, at the end of a line followed by " at the start of the next line.

let lines = dcmText.split('\n');
let fixedLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let nextLine = lines[i+1];
    
    // If this line is just a closing brace and next line starts an entry
    if (line.trim() === '}' && nextLine && nextLine.trim().startsWith('"') && nextLine.includes('": {')) {
        fixedLines.push(line.replace('}', '},'));
    } else {
        fixedLines.push(line);
    }
}

fs.writeFileSync('./lib/domainContentMap.js', fixedLines.join('\n'));
console.log('Fixed missing commas using line-by-line analysis');
