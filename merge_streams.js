const fs = require('fs');
const path = require('path');

const MAP_PATH = path.join(__dirname, 'lib', 'domainContentMap.js');
const STREAMS_PATH = path.join(__dirname, 'lib', 'generatedStreams.json');

function merge() {
  const mapRaw = fs.readFileSync(MAP_PATH, 'utf8');
  const streams = JSON.parse(fs.readFileSync(STREAMS_PATH, 'utf8'));

  let updatedMap = mapRaw;

  for (const [slug, streamData] of Object.entries(streams)) {
    console.log(`Merging ${slug}...`);
    
    // Check if the domain exists in the map
    const domainRegex = new RegExp(`"${slug}": \\{([\\s\\S]*?)\\n  \\},`, 'g');
    const match = domainRegex.exec(mapRaw);

    if (match) {
      let domainContent = match[1];
      const streamStr = JSON.stringify(streamData, null, 8).replace(/^/gm, '  ').trimStart();
      
      if (domainContent.includes('"streams": []')) {
        domainContent = domainContent.replace('"streams": []', `"streams": ${streamStr}`);
      } else if (!domainContent.includes('"streams":')) {
        // Inject after heroDescription
        domainContent = domainContent.replace(/"heroDescription":\s*"[^"]*",/, (m) => `${m}\n    "streams": ${streamStr},`);
      } else {
        console.log(`Skipping ${slug}: streams already populated.`);
        continue;
      }
      updatedMap = updatedMap.replace(match[0], `"${slug}": {${domainContent}\n  },`);
    } else {
      console.log(`Skipping ${slug}: domain not found in map.`);
    }
  }

  fs.writeFileSync(MAP_PATH, updatedMap);
  console.log("Merge complete.");
}

merge();
