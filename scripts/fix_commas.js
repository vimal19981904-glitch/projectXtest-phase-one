const fs = require('fs');

const dcmText = fs.readFileSync('./lib/domainContentMap.js', 'utf-8');

// The error is likely a missing comma between entries.
// Patterns: } "key": {
// Fix: }, "key": {

let fixedText = dcmText.replace(/\}\s+"([^"]+)":\s*\{/g, '},\n  "$1": {');

// Also ensure the indentation is correct while we are at it
// (The previous script might have caused the missing comma)

fs.writeFileSync('./lib/domainContentMap.js', fixedText);
console.log('Fixed missing commas in domainContentMap.js');
