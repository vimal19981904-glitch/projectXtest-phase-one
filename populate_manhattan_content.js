const fs = require('fs');
const path = require('path');

const SOURCE_MD = "c:\\Users\\ARUL XAVIER\\AppData\\Local\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState\\sessions\\28A490AFC6635CCB54BB834B708B962602A983BC\\transfers\\2026-16\\Manhattan WMS Training.md";
const CONTENT_MAP_PATH = path.join(__dirname, 'lib', 'domainContentMap.js');

function parseMarkdown(md) {
    const cleanMd = md.replace(/\r\n/g, '\n')
                      .replace(/&#x20;/g, '')
                      .replace(/&x20;/g, '')
                      .replace(/\\&/g, '&')
                      .replace(/\\/g, '');
    const sections = cleanMd.split(/\n## /);
    const parsedData = [];

    sections.forEach((section, index) => {
        if (!section.trim()) return;

        const lines = section.trim().split('\n');
        let title = lines[0].replace(/#/g, '').replace(/\*\*/g, '').trim();
        
        if (!title || (title.toLowerCase() === 'manhattan wms training' && index > 0)) return;

        const content = lines.slice(1).join('\n');
        const cleanContent = content.replace(/MaxMunus/g, 'GapAnchor');
        const cleanTitle = title.replace(/MaxMunus/g, 'GapAnchor');

        // Better splitting: only split on standalone headers or specific markers
        // Use a negative lookahead or check for line starts
        const splitRegex = /\n(?:[*•-]\s*)?(?:Course Content|Online Job Support|Course Information|Individual Training Benefit|CORPORATE TRAINING BENEFIT|Certification Details|FAQs for)/i;
        
        const introSection = cleanContent.split(splitRegex)[0];
        const paragraphs = introSection.split(/\n{2,}/).map(p => p.trim()).filter(p => p.length > 20);

        parsedData.push({
            title: cleanTitle,
            about: paragraphs
        });
    });

    return parsedData;
}

async function run() {
    console.log("Reading source...");
    const md = fs.readFileSync(SOURCE_MD, 'utf8');
    const parsedSections = parseMarkdown(md);

    const streams = parsedSections.map(section => {
        let desc = section.about[0] || `Master ${section.title} with GapAnchor.`;
        if (desc.length > 200) desc = desc.substring(0, 197) + '...';

        return {
            name: section.title,
            description: desc,
            body: section.about.length > 0 ? section.about : [`Comprehensive training for ${section.title}.`]
        };
    });

    let contentMap = fs.readFileSync(CONTENT_MAP_PATH, 'utf8');
    const wmsKey = '"manhattan-wms-training": {';
    const startIndex = contentMap.indexOf(wmsKey);
    const streamsStart = contentMap.indexOf('"streams": [', startIndex);
    
    if (streamsStart !== -1) {
        let bracketCount = 1;
        let streamsEnd = -1;
        for (let i = streamsStart + 12; i < contentMap.length; i++) {
            if (contentMap[i] === '[') bracketCount++;
            if (contentMap[i] === ']') bracketCount--;
            if (bracketCount === 0) {
                streamsEnd = i + 1;
                break;
            }
        }

        if (streamsEnd !== -1) {
            const newStreamsJson = `"streams": ${JSON.stringify(streams, null, 6)}`;
            contentMap = contentMap.substring(0, streamsStart) + newStreamsJson + contentMap.substring(streamsEnd);
        }
    }

    contentMap = contentMap.replace(/MaxMunus/g, 'GapAnchor');
    fs.writeFileSync(CONTENT_MAP_PATH, contentMap);
    console.log("Updated with better splitting logic.");
}

run().catch(console.error);
