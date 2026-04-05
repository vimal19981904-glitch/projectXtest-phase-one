const fs = require('fs');

function extractSubDomains(markdownPath, isScmTable = false) {
  const content = fs.readFileSync(markdownPath, 'utf8');
  const lines = content.split('\n');
  const subDomains = [];
  const seen = new Set();
  
  const ignoreList = [
    'online training', 'microsoft courses', 'oracle courses', 'data warehousing courses',
    'ibm courses', 'supply chain courses', 'programming', 'cloud computing courses',
    'salesforce training', 'analytics courses', 'devops training', 'automl training',
    'siem tools training', 'cpq training', 'erp training', 'classroom training', 
    'services', 'corporate training', 'recruitment', 'remote support', 
    'online job support', 'interview preparation', 'hire freelancer', 'company',
    'refund policy', 'contact', 'all courses', 'request for demo', 'reviews',
    'faq', 'testimonials', 'become our authorized training partner', 'become our trainer',
    'contact us', 'aiops training', 'google course'
  ];

  for (const line of lines) {
    if (line.startsWith('- [')) {
      const match = line.match(/^- \[(.*?)\]\((.*?)\)/);
      if (match) {
        addDomain(match[1]);
      }
    }
  }

  // Very specific logic for SCM file lines 215-389 which looks like table data
  if (isScmTable) {
     for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // If the line consists only of a number...
        if (/^\d+$/.test(line)) {
           // The next line might be the technology name
           if (i + 1 < lines.length) {
              const tech = lines[i+1].trim();
              if (tech && !/^\d+$/.test(tech) && tech.length > 3) {
                 addDomain(tech);
              }
           }
        }
     }
  }


  function addDomain(rawName) {
      let name = rawName.trim();
      name = name.replace(/\s+Training$/i, '').trim();
      const lowerName = name.toLowerCase();

      if (ignoreList.includes(lowerName)) {
         return;
      }

      if (!seen.has(lowerName)) {
        seen.add(lowerName);
        const slug = name.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
        
        subDomains.push({
          name: name,
          description: `${name} online training and job support.`,
          href: `/domains/${slug}-training`
        });
      }
  }

  return subDomains;
}

const ibmPath = 'C:\\Users\\ARUL XAVIER\\.gemini\\antigravity\\brain\\6749baab-7bc3-4769-92a1-57113bf6d2f4\\.system_generated\\steps\\106\\content.md';
const scmPath = 'C:\\Users\\ARUL XAVIER\\.gemini\\antigravity\\brain\\6749baab-7bc3-4769-92a1-57113bf6d2f4\\.system_generated\\steps\\107\\content.md';

const ibmData = extractSubDomains(ibmPath);
const scmData = extractSubDomains(scmPath, true);

fs.mkdirSync('src/data/domains', { recursive: true });

const ibmFileContent = `export const ibmSubDomains = ${JSON.stringify(ibmData, null, 2)};\n`;
fs.writeFileSync('src/data/domains/ibm.js', ibmFileContent, 'utf8');

const scmFileContent = `export const supplyChainSubDomains = ${JSON.stringify(scmData, null, 2)};\n`;
fs.writeFileSync('src/data/domains/supplychain.js', scmFileContent, 'utf8');

console.log('ibm subsets:', ibmData.length);
console.log('scm subsets:', scmData.length);
